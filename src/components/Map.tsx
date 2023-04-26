import React, { useState, useRef, useEffect } from "react";

import mapboxgl from 'mapbox-gl';
import styles from './Map.module.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

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
  });

  return (
    <div >
      <div className={styles.sidebar}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div class="h-full w-full" ref={mapContainer} className={styles.map_container} />
    </div>
  );
}

