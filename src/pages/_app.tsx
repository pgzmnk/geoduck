import React from "react";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import {
  DuckDBConnectionProvider,
  DuckDBPlatform,
  DuckDBProvider,
} from "@duckdb/react-duckdb";

import * as duckdb from "@duckdb/duckdb-wasm";
import duckdb_wasm from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm";
import duckdb_wasm_eh from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm";
import duckdb_wasm_coi from "@duckdb/duckdb-wasm/dist/duckdb-coi.wasm";
import "@/styles/globals.css";
import "@/styles/shell.css";
import "xterm/css/xterm.css";

import { ThemeProvider } from "@material-tailwind/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import Context from "../context/context";

class ExtraURL {
  constructor(url: string, meta: string) {}
}
global.URL = global.URL || ExtraURL;

export const DUCKDB_BUNDLES: duckdb.DuckDBBundles = {
  mvp: {
    mainModule: duckdb_wasm,
    mainWorker:
      global.window &&
      new URL(
        "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js",
        import.meta.url
      ).toString(),
  },
  eh: {
    mainModule: duckdb_wasm_eh,
    mainWorker:
      global.window &&
      new URL(
        "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js",
        import.meta.url
      ).toString(),
  },
  coi: {
    mainModule: duckdb_wasm_coi,
    mainWorker:
      global.window &&
      new URL(
        "@duckdb/duckdb-wasm/dist/duckdb-browser-coi.worker.js",
        import.meta.url
      ).toString(),
    pthreadWorker:
      global.window &&
      new URL(
        "@duckdb/duckdb-wasm/dist/duckdb-browser-coi.pthread.worker.js",
        import.meta.url
      ).toString(),
  },
};

const logger = new duckdb.ConsoleLogger(duckdb.LogLevel.WARNING);

export default function App({ Component, pageProps }: AppProps) {
  const customTheme = {
    component: {
      defaultProps: {},
      valid: {},
      styles: {},
    },
  };
  return (
    <DuckDBPlatform logger={logger} bundles={DUCKDB_BUNDLES}>
      <DuckDBProvider>
        <DuckDBConnectionProvider>
          <NextThemeProvider enableSystem={false}>
            <ThemeProvider value={customTheme}>
              <Context>
                <Component {...pageProps} />
                <Analytics />
              </Context>
            </ThemeProvider>
          </NextThemeProvider>
        </DuckDBConnectionProvider>
      </DuckDBProvider>
    </DuckDBPlatform>
  );
}
