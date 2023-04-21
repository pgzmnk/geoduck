import React, { useState, useRef, useEffect } from "react";
import { createMap } from "@unfolded/map-sdk";

export default function Map() {
  const [map, setMap] = useState(null);
  return <UnfoldedMap setMap={setMap} />;
}

function UnfoldedMap({ setMap }) {
  const mountContainerRef = useRef(null);

  useEffect(() => {
    const loadMap = async () => {
      const mapInstance = await createMap({});

      setMap(mapInstance);
      mapInstance.addToDOM(mountContainerRef?.current);
    };
    loadMap();
  }, [setMap]);

  return (
    <div className="unfolded">
      <div ref={mountContainerRef} />
    </div>
  );
}
