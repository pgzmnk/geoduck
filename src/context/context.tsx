import { createContext, useState, useRef } from "react";

export const MapContext = createContext({
  map: null,
});

export const MapLayersContext = createContext({
  layers: [
    { name: "cities", type: "point", tableName: "cities" },
    { name: "ent", type: "polygon", tableName: "ent" },
  ],
  setLayers: ([]) => {},
});

export default function Context({ children }) {
  const map = useRef(null);

  return <MapContext.Provider value={{ map }}>{children}</MapContext.Provider>;
}
