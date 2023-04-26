import React, { useState, useRef, useEffect } from "react";

import mapboxgl from 'mapbox-gl';
import styles from './Map.module.css'

import * as rd from "@duckdb/react-duckdb"
import { runQueryDuckDb } from "@/utils/duckdbFunctions";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.41);
  const [lat, setLat] = useState(37.77);
  const [zoom, setZoom] = useState(9);
  const db = rd.useDuckDB()

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });



  useEffect(() => {
    if (!map.current) return;
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.once('load', () => { map.current.resize() })
    map.current.once('idle', () => { map.current.resize() })

    map.current.on('load', () => {
      map.current.addLayer({
        id: 'rpd_parks',
        type: 'fill',
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.3o7ubwm8'
        },
        'source-layer': 'RPD_Parks',
        layout: {
          visibility: 'visible',
        },
        paint: {
          'fill-color': 'rgba(61,153,80,0.55)'
        }
      });
    })
    map.current.on('style.load', () => {
      map.current.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
      // add the DEM source as a terrain layer with exaggerated height
      map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

    });



    map.current.on('click', (e) => {

      console.log('e: ', e)

      const getData = async () => {
        const _data = await runQueryDuckDb(db, "SELECT * FROM cities;")

        if (_data) {
          const data = JSON.parse(_data)

          // transform data into format for mapbox addSource
          var geojson = {
            'type': 'FeatureCollection',
            'features': data.map((city) => {
              return {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [city.longitude, city.latitude]
                },
                'properties': {
                  'title': city.cityName
                }
              }
            })
          }

          if (!map.current.getSource('points_cities')) {

            if (!map.current.hasImage('custom-marker')) {
              map.current.loadImage(
                'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                (error, image) => {
                  if (error) throw error;
                  map.current.addImage('custom-marker', image);
                  map.current.addSource('points_cities', {
                    'type': 'geojson',
                    'data': geojson
                  });

                  map.current.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'points_cities',
                    'layout': {
                      'icon-image': 'custom-marker',
                      // get the title name from the source's "title" property
                      'text-field': ['get', 'title'],
                      'text-font': [
                        'Open Sans Semibold',
                        'Arial Unicode MS Bold'
                      ],
                      'text-offset': [0, 1.25],
                      'text-anchor': 'top'
                    }
                  });
                }
              )
            }
          }



        }
      }

      getData()

    });
  })


  return (
    <div >
      <div className={styles.sidebar}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div class="h-[80vh] w-full" ref={mapContainer} className={styles.map_container} />
    </div>
  );
}

