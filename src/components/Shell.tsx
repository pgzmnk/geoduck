import * as duckdb from "@duckdb/duckdb-wasm";

import * as rd from "@duckdb/react-duckdb";
import React from "react";
const FontFaceObserver = require("fontfaceobserver");

import shell_wasm from "@duckdb/duckdb-wasm-shell/dist/shell_bg.wasm";

const SHELL_FONT_FAMILY = "Roboto Mono";

interface ShellProps {
  backgroundColor?: string;
  padding?: number[];
  borderRadius?: number[];
}

export const Shell: React.FC<ShellProps> = (props: ShellProps) => {
  const termContainer = React.useRef<HTMLDivElement | null>(null);
  const db = rd.useDuckDB();
  const resolveDB = rd.useDuckDBResolver();
  const shellDBResolver = React.useRef<
    [(db: duckdb.AsyncDuckDB) => void, (err: any) => void] | null
  >(null);
  const shellStatusUpdater =
    React.useRef<duckdb.InstantiationProgressHandler | null>(null);

  // Launch DuckDB
  React.useEffect(() => {
    if (!db.resolving()) {
      resolveDB();
    }
  }, [db]); // eslint-disable-line

  // Embed the shell into the term container
  React.useEffect(() => {
    console.assert(termContainer.current != null);
    global.window &&
      (async () => {
        const shell = require("@duckdb/duckdb-wasm-shell");
        const regular = new FontFaceObserver(SHELL_FONT_FAMILY).load();
        const bold = new FontFaceObserver(SHELL_FONT_FAMILY, {
          weight: "bold",
        }).load();
        await Promise.all([regular, bold]);

        await shell.embed({
          shellModule: shell_wasm,
          container: termContainer.current!,
          fontFamily: SHELL_FONT_FAMILY,
          resolveDatabase: (p: duckdb.InstantiationProgressHandler) => {
            if (db.error != null) {
              return Promise.reject(db.error);
            }
            if (db.value != null) {
              return Promise.resolve(db.value);
            }
            shellStatusUpdater.current = p;
            const result = new Promise<duckdb.AsyncDuckDB>(
              (resolve, reject) => {
                shellDBResolver.current = [resolve, reject];
              }
            );
            return result;
          },
        });
      })();
  }, []); // eslint-disable-line

  // Propagate the react state updates to the wasm progress handler
  React.useEffect(() => {
    if (db.value != null) {
      if (shellDBResolver.current != null) {
        const resolve = shellDBResolver.current[0];
        shellDBResolver.current = null;
        resolve(db.value);
      }
    } else if (db.error != null) {
      if (shellDBResolver.current != null) {
        const reject = shellDBResolver.current[1];
        shellDBResolver.current = null;
        reject(db.error);
      }
    } else if (db.progress != null) {
      if (shellStatusUpdater.current) {
        shellStatusUpdater.current(db.progress);
      }
    }
  }, [db]);

  return (
    <div className="shell_container flex-none min-w-full px-4 sm:px-6 md:px-0 overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50 max-h-96 lg:supports-scrollbars:pr-2 lg:max-h-96">
      <div ref={termContainer} className="term_container" />
    </div>
  );
};
