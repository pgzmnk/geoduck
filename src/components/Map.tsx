import React, { useState, useRef, useEffect, useContext } from "react";

import mapboxgl from "mapbox-gl";
import styles from "./Map.module.css";
import * as rd from "@duckdb/react-duckdb";
import { MapContext, MapLayersContext } from "@/context/context";
import { RenderLayer } from "@/utils/mapFunctions";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API;

export default function Map() {
  const mapContainer = useRef(null);
  const { map } = useContext(MapContext);
  const { layers, setLayers } = useContext(MapLayersContext)
  const [lng, setLng] = useState(-102.41);
  const [lat, setLat] = useState(18.77);
  const [zoom, setZoom] = useState(4);
  const db = rd.useDuckDB();

  // useEffect(() => {
  //   // render layers on map
  //   layers.map((layer) => {
  //     RenderLayer(layer);
  //   });
  // }, [layers]);

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
  });

  return (
    <div>
      <div className={styles.sidebar}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div
        class="h-[100vh] w-full"
        ref={mapContainer}
        className={styles.map_container}
      />
    </div>
  );
}
