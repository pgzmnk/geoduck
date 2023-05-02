import { createContext, useState, useRef } from "react";

export const MapContext = createContext({
  map: null,
});

export default function Context({ children }) {
  const map = useRef(null);

  return <MapContext.Provider value={{ map }}>{children}</MapContext.Provider>;
}
