import { useContext } from "react";
import { loadInitialData } from "@/utils/duckdbFunctions";
import { MapContext } from "@/context/context";
import * as rd from "@duckdb/react-duckdb";

export async function InitFunctions() {
  // render initial map data
  const db = rd.useDuckDB();
  const { map } = useContext(MapContext);
  loadInitialData();
}
