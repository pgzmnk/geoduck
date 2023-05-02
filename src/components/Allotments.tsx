import { useState, useRef, useCallback } from "react";
import * as React from "react";

import { Allotment, AllotmentHandle } from "allotment";
import "allotment/dist/style.css";
import styles from "@/styles/Content.module.css";
import { AllotmentBottom } from "@/components/AllotmentBottom";
import { AllotmentLeft } from "@/components/AllotmentLeft";
import Map from "@/components/Map";
import { InitFunctions } from "@/utils/initFunctions";
import { ComplexNavbar } from "@/components/Navbar";

const minHeight = 70;
const minWidth = 30;

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

  InitFunctions();

  return (
    <div
      className={styles.container}
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <ComplexNavbar />
      <Allotment ref={leftAllotmentRef}>
        <Allotment.Pane minSize={minWidth} maxSize={100} visible>
          <AllotmentLeft
            collapsed={leftAllotmentVisible}
            setCollapsed={(newCollapsed: boolean) => {
              setLeftAllotmentVisible(newCollapsed);
              if (leftAllotmentRef.current) {
                if (newCollapsed) {
                  leftAllotmentRef.current.resize([10, 400]);
                } else {
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
