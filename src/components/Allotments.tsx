import { useState, useRef, useCallback } from "react";
import * as React from "react";

import { Allotment, AllotmentHandle } from "allotment";
import "allotment/dist/style.css";
import styles from "@/styles/Content.module.css";
import { AllotmentBottom } from "@/components/AllotmentBottom";
import { AllotmentLeft } from "@/components/AllotmentLeft";
import Map from "@/components/Map";
import { Loader } from "@/components/Loader";

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
  const [leftAllotmentVisible, setLeftAllotmentVisible] = useState(true);
  const [bottomAllotmentVisible, setBottomAllotmentVisible] = useState(true);

  const leftAllotmentRef = useRef<AllotmentHandle>(null!);
  const bottomAllotmentRef = useRef<AllotmentHandle>(null!);
  const onHeightChange = useCallback(
    (newHeight: number[]) =>
      setBottomAllotmentVisible(newHeight[1] === minHeight),
    [setBottomAllotmentVisible]
  );
  return (
    <div
      className={styles.container}
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <Allotment ref={leftAllotmentRef}>
        <Allotment.Pane minSize={minWidth} maxSize={100} visible>
          <Loader />
          {/* <AllotmentLeft
            collapsed={leftAllotmentVisible}
            setCollapsed={(newCollapsed: boolean) => {
              setLeftAllotmentVisible(newCollapsed);
              console.log("newCollapsed", newCollapsed);
              console.log("leftAllotmentVisible", leftAllotmentVisible);
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
          /> */}
        </Allotment.Pane>
        <Allotment.Pane>
          <Allotment
            vertical
            ref={bottomAllotmentRef}
            onChange={onHeightChange}
          >
            <Map />
            <Allotment.Pane minSize={minHeight} visible>
              <AllotmentBottom
                collapsed={bottomAllotmentVisible}
                setCollapsed={(newCollapsed: boolean) => {
                  setBottomAllotmentVisible(newCollapsed);
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
