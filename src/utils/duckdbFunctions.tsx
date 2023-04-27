import React, { useState } from "react";
import * as rd from "@duckdb/react-duckdb";

export async function loadInitialData() {
  const db = rd.useDuckDB();

  fetch("/api/v0/table")
    .then((res) => res.json())
    .then((res) => {
      res.data.forEach((table) => {
        const query = `CREATE OR REPLACE TABLE ${table.name} AS ${table.query};`;
        console.log("- query", query);
        runQueryDuckDb(db, query);
      });
    });
}

export async function runQueryDuckDb(db: any, query: string) {
  try {
    const c = await db!.value!.connect();
    const response = await c.query(query);
    return response.toString();
  } catch (error) {
    console.log("error: ", error);
  }
}
