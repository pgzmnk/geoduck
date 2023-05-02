import { useContext } from "react";
import { loadInitialData } from "@/utils/duckdbFunctions";
import { renderMapData } from "@/utils/mapFunctions";
import { MapContext } from "@/context/context";
import * as rd from "@duckdb/react-duckdb";

export async function InitFunctions() {
  // render initial map data
  const db = rd.useDuckDB();
  const { map } = useContext(MapContext);
  loadInitialData().then(async (tableNames) => {
    renderMapData(map, db, tableNames);
  });
}
