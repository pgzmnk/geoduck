import { useState, useRef, useCallback } from "react";
import * as React from "react";
import { useWindowSize } from "rooks";
import { Allotment, AllotmentHandle } from "allotment";
import "allotment/dist/style.css";
import 'simplebar-react/dist/simplebar.min.css';
import styles from "@/styles/Content.module.css";
import { AllotmentBottom } from "@/components/AllotmentBottom";
import { AllotmentLeft } from "@/components/AllotmentLeft";
import Map from "@/components/Map";
import { InitFunctions } from "@/utils/initFunctions";
import { ComplexNavbar } from "@/components/Navbar";

const minHeight = 70;

const minWidth = 50;
const navbarHeight = 100;

export function Allotments() {
  const [leftAllotmentVisible, setLeftAllotmentVisible] = useState(true);
  const [bottomAllotmentVisible, setBottomAllotmentVisible] = useState(true);
  const [bottomAllotmentExpanded, setBottomAllotmentExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);  
  }

  const maxHeight = innerHeight;
  const leftAllotmentRef = useRef<AllotmentHandle>(null!);
  const bottomAllotmentRef = useRef<AllotmentHandle>(null!);
  const onHeightChange = useCallback(
    (newHeight: number[]) =>
      setBottomAllotmentVisible(newHeight[1] === minHeight),
    [setBottomAllotmentVisible]
  );

  InitFunctions();

  return (
    <>
      <div
        className={`${styles.navbar} overflow-hidden ${darkMode ? 'dark': 'light'}` }
        style={{ maxHeight: navbarHeight, minWidth: "100vw" }}
      >
        <ComplexNavbar leftAllotmentVisible={leftAllotmentVisible} setLeftAllotmentVisible={setLeftAllotmentVisible} />
      </div>
      <div
        className={`${styles.container} ${darkMode ? 'dark': 'light'}`}
        style={{
          minHeight: `calc(100vh - ${navbarHeight}px)`,
          minWidth: "100vw",
        }}
      >
        <Allotment ref={leftAllotmentRef} >
          <Allotment.Pane minSize={minWidth} maxSize={300} visible={leftAllotmentVisible} >
            <AllotmentLeft
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              collapsed={leftAllotmentVisible}
              setCollapsed={(newCollapsed: boolean) => {
                setLeftAllotmentVisible(newCollapsed);
                // if (leftAllotmentRef.current) {
                //   if (newCollapsed) {
                //     leftAllotmentRef.current.resize([10, 0]);
                //   } else {
                //     leftAllotmentRef.current.reset();
                //   }
                // }
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
                  expand={bottomAllotmentExpanded}
                  setExpand={(isExpanded: boolean) => {
                    setBottomAllotmentExpanded(isExpanded);
                    if (bottomAllotmentRef.current) {
                      if (isExpanded) {
                        bottomAllotmentRef.current.resize([0, 600]);
                      } else {
                        bottomAllotmentRef.current.reset();
                      }
                    }
                  }}
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
    </>
  );
}
