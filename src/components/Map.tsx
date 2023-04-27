import React, { useState, useRef, useEffect } from "react";

import mapboxgl from "mapbox-gl";
import styles from "./Map.module.css";
import * as wkt from "wkt";

import * as rd from "@duckdb/react-duckdb";
import { runQueryDuckDb } from "@/utils/duckdbFunctions";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API;

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-102.41);
  const [lat, setLat] = useState(18.77);
  const [zoom, setZoom] = useState(4);
  const db = rd.useDuckDB();

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.once("load", () => {
      map.current.resize();
    });
    map.current.once("idle", () => {
      map.current.resize();
    });

    map.current.on("load", () => {
      map.current.addLayer({
        id: "rpd_parks",
        type: "fill",
        source: {
          type: "vector",
          url: "mapbox://mapbox.3o7ubwm8",
        },
        "source-layer": "RPD_Parks",
        layout: {
          visibility: "visible",
        },
        paint: {
          "fill-color": "rgba(61,153,80,0.55)",
        },
      });
    });
    map.current.on("style.load", () => {
      map.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      // add the DEM source as a terrain layer with exaggerated height
      map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
    });

    map.current.on("load", () => {
      const getData = async (tableName: string, geoType: string) => {
        const _data = await runQueryDuckDb(db, `FROM ${tableName};`);
        var objectId = `${geoType}s_${tableName}`;

        if (_data) {
          const data = JSON.parse(_data);

          var geojson = {};
          switch (geoType) {
            case "point":
              geojson = {
                type: "FeatureCollection",
                features: data.map((record) => {
                  return {
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: [record.longitude, record.latitude],
                    },
                    properties: {
                      title: record.name,
                    },
                  };
                }),
              };
              if ("type" in geojson) {
                if (!map.current.getSource(objectId)) {
                  if (!map.current.hasImage("custom-marker")) {
                    map.current.loadImage(
                      "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
                      (error, image) => {
                        if (error) throw error;
                        map.current.addImage("custom-marker", image);
                        map.current.addSource(objectId, {
                          type: "geojson",
                          data: geojson,
                        });

                        map.current.addLayer({
                          id: objectId,
                          type: "symbol",
                          source: objectId,
                          layout: {
                            "icon-image": "custom-marker",
                            // get the title name from the source's "title" property
                            "text-field": ["get", "title"],
                            "text-font": [
                              "Open Sans Semibold",
                              "Arial Unicode MS Bold",
                            ],
                            "text-offset": [0, 1.25],
                            "text-anchor": "top",
                          },
                        });
                      }
                    );
                  }
                }
              }

              break;
            case "polygon":
              // transform data into format for polygon mapbox addSource
              geojson = {
                type: "FeatureCollection",
                features: data.map((record) => {
                  return {
                    type: "Feature",
                    geometry: wkt.parse(record.geometry_str),
                    properties: {
                      title: record.name,
                      score: record.score,
                    },
                  };
                }),
              };

              if ("type" in geojson) {
                map.current.addSource(objectId, {
                  type: "geojson",
                  data: geojson,
                });
                map.current.addLayer({
                  id: `layer_${objectId}`,
                  type: "fill",
                  source: objectId,
                  paint: {
                    "fill-color": [
                      "interpolate",
                      ["linear"],
                      ["get", "score"],
                      0,
                      "#f6fbfa",
                      100,
                      "#1d483f",
                    ],
                    "fill-outline-color": "#ffc0cb",
                    "fill-opacity": 1,
                  },
                });
                console.log("~~out", map.current.getLayer(`layer_${objectId}`));
              }
              break;
            default:
              break;
          }
        }
      };

      getData("cities", "point");
      getData("ent", "polygon");
    });
  });

  return (
    <div>
      <div className={styles.sidebar}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div
        class="h-[80vh] w-full"
        ref={mapContainer}
        className={styles.map_container}
      />
    </div>
  );
}
