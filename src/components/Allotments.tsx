import { useState, useRef, useCallback } from "react";
import * as React from "react";

import { Allotment, AllotmentHandle } from "allotment";
import "allotment/dist/style.css";
import styles from "@/styles/Content.module.css";
import { AllotmentBottom } from "@/components/AllotmentBottom";
import { AllotmentLeft } from "@/components/AllotmentLeft";

const minHeight = 70;
const minWidth = 30;

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

  const leftAllotmentRef = useRef<AllotmentHandle>(null!);
  const bottomAllotmentRef = useRef<AllotmentHandle>(null!);
  const onHeightChange = useCallback(
    (newHeight: number[]) => setBottomDrawerVisible(newHeight[1] === minHeight),
    [setBottomDrawerVisible]
  );
  return (
    <div
      className={styles.container}
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <Allotment ref={leftAllotmentRef}>
        <Allotment.Pane minSize={minWidth} maxSize={100} visible>
          <AllotmentLeft
            collapsed={leftSidebarVisible}
            setCollapsed={(newCollapsed: boolean) => {
              setLeftSidebarVisible(newCollapsed);
              console.log("newCollapsed", newCollapsed);
              console.log("leftSidebarVisible", leftSidebarVisible);
              if (leftAllotmentRef.current) {
                if (newCollapsed) {
                  console.log("resize");
                  leftAllotmentRef.current.resize([10, 400]);
                } else {
                  console.log("reset");
                  leftAllotmentRef.current.reset();
                }
              }
            }}
          />
        </Allotment.Pane>
        <Allotment.Pane>
          <Allotment
            vertical
            ref={bottomAllotmentRef}
            onChange={onHeightChange}
          >
            <Content />
            <Allotment.Pane minSize={minHeight} visible>
              <AllotmentBottom
                collapsed={bottomDrawerVisible}
                setCollapsed={(newCollapsed: boolean) => {
                  setBottomDrawerVisible(newCollapsed);
                  if (bottomAllotmentRef.current) {
                    if (newCollapsed) {
                      bottomAllotmentRef.current.resize([10000, minHeight]);
                    } else {
                      bottomAllotmentRef.current.reset();
                    }
                  }
                }}
              />
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
