import { useState } from "react";
import * as React from "react";

import { Allotment } from "allotment";
import "allotment/dist/style.css";
import styles from "@/styles/Content.module.css";

const Content = () => (
  <div className={styles.container}>
    <div className={styles.card}>
      <svg
        className={styles.svg}
        preserveAspectRatio="none"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeWidth="20"
          d="M0 0l200 200M0 200L200 0"
        ></path>
      </svg>
    </div>
  </div>
);

export function Allotments() {
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [bottomDrawerVisible, setBottomDrawerVisible] = useState(true);

  return (
    <div
      className={styles.container}
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <button
        className={styles.button}
        type="button"
        onClick={() => {
          setLeftSidebarVisible((leftSidebarVisible) => !leftSidebarVisible);
        }}
      >
        {leftSidebarVisible ? "Hide" : "Show"}
      </button>
      <button
        className={styles.button}
        type="button"
        onClick={() => {
          setBottomDrawerVisible((bottomDrawerVisible) => !bottomDrawerVisible);
        }}
      >
        {bottomDrawerVisible ? "Hide" : "Show"}
      </button>
      <Allotment
        minSize={100}
        maxSize={2000}
        snap
        onVisibleChange={(_index, value) => {
          setLeftSidebarVisible(value);
        }}
      >
        <Allotment.Pane visible={leftSidebarVisible}>
          <Content />
        </Allotment.Pane>
        <Allotment.Pane>
          <Allotment
            vertical
            snap
            onVisibleChange={(_index, value) => {
              setBottomDrawerVisible(value);
            }}
          >
            <Content />
            <Allotment.Pane visible={bottomDrawerVisible}>
              <Content />
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
