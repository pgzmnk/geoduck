import React, { useState } from "react";
import * as rd from "@duckdb/react-duckdb";

export function Loader() {
  const db = rd.useDuckDB();
  console.log("Loader");

  const loadData = async () => {
    fetch("/api/v0/table")
      .then((res) => res.json())
      .then((res) => {
        res.data.forEach((table) => {
          const query = `CREATE OR REPLACE TABLE ${table.name} AS SELECT * FROM '${table.query}';`;
          const result = runQueryDuckDb(db, query);
        });
      });
  };
  React.useEffect(() => {
    loadData();
  });

  return (
    <div>
      <h1>load</h1>
    </div>
  );
}

export async function runQueryDuckDb(db: any, query: string) {
  try {
    const c = await db!.value!.connect();
    const response = await c.query(query);
    const result = response.toString();
  } catch (error) {
    console.log("error: ", error);
  }
}
