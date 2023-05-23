import * as rd from "@duckdb/react-duckdb";

export async function LoadInitialData() {
  const db = rd.useDuckDB();

  var tableNames = [];

  fetch("/api/v0/table")
    .then((res) => res.json())
    .then((res) => {
      res.data.forEach((table) => {
        const query = `CREATE OR REPLACE TABLE ${table.name} AS ${table.query};`;
        runQueryDuckDb(db, query);
        tableNames.push(table.name);
      });
    });

  return tableNames;
}

export async function runQueryDuckDb(db: any, query: string) {
  async function wait() {
    console.log("waiting for db connection...");
    if (db!.value!) {
      setTimeout(wait, 2000);
    } else {
      const c = await db!.value!.connect();
      const response = await c.query(query);
      console.log("obtained duckdb response: ", response.toString());
      return response.toString();
    }
  }
  try {
    wait();
  } catch (error) {
    // Show error in console to helps the user debug. In the future, the error should be surfaced to the UI.
    console.log("error: ", error);
  }
}
