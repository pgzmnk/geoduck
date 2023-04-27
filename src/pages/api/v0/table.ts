"use client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as duckdb from "@duckdb/duckdb-wasm";
import * as rd from "@duckdb/react-duckdb";

type ResponseData = {
  message: string;
  data?: Dataset[];
};

type Dataset = {
  name: string;
  query: string;
};

const data: Dataset[] = [
  // {
  //   name: "cpv_geo_ageb",
  //   query:
  //     "https://open-demo-datasets.s3.us-west-2.amazonaws.com/inegi/cpv_2020/geo_cpv_00_routerjoin.parquet",
  // },
  {
    name: "cities",
    query:
      "SELECT cityName as name, * FROM 'https://open-demo-datasets.s3.us-west-2.amazonaws.com/kepler/cities.csv'",
  },
  {
    name: "ent",
    query:
      "SELECT CVEGEO as name, * FROM 'https://open-demo-datasets.s3.us-west-2.amazonaws.com/inegi/00ent_epsg4326.parquet'"
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    switch (req.method) {
      case "GET":
        res.status(200).json({ message: "GET method", data: data });
        break;
      case "POST":
        res.status(200).json({ message: "POST method", data: data });
        break;
      case "PUT":
        res.status(200).json({ message: "PUT method" });
        break;
      case "DELETE":
        res.status(200).json({ message: "DELETE method" });
        break;
      default:
        res.status(405).end(); //Method Not Allowed
        break;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
