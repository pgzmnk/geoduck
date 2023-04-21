import type { NextApiRequest, NextApiResponse } from "next";
import * as duckdb from "@duckdb/duckdb-wasm";

type ResponseData = {
  message: string;
};

type PostRequestData = {
  name: string;
  query: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    switch (req.method) {
      case "GET":
        res.status(200).json({ message: "GET method" });
        break;
      case "POST":
        res.status(200).json({ message: "POST method" });
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
