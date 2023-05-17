import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { useWindowSize } from "rooks";
import { Allotment, AllotmentHandle } from "allotment";
import "allotment/dist/style.css";
import "simplebar-react/dist/simplebar.min.css";
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
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("light");
  const [leftAllotmentVisible, setLeftAllotmentVisible] = useState(true);
  const [bottomAllotmentVisible, setBottomAllotmentVisible] = useState(true);
  const [bottomAllotmentExpanded, setBottomAllotmentExpanded] = useState(false);
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [leftAllotmentDragStartWidth, setLeftAllotmentDragStartWidth] = useState(null);

  const toggleDarkMode = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  useEffect(()=>{
    console.log(leftAllotmentDragStartWidth);
  }, [leftAllotmentDragStartWidth])

  const maxHeight = innerHeight;
  const leftAllotmentEl = document.getElementById("geoduck-allotment-left");
  const leftAllotmentCollapseEl = document.getElementById("geoduck-left-allotment-collapse");
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
        className={`${styles.navbar} overflow-hidden ${currentTheme}`}
        style={{ maxHeight: navbarHeight, minWidth: "100vw" }}
      >
        <ComplexNavbar
          leftAllotmentVisible={leftAllotmentVisible}
          setLeftAllotmentVisible={setLeftAllotmentVisible}
        />
        <button
          id={"geoduck-left-allotment-collapse"}
          onClick={() => setLeftAllotmentVisible(!leftAllotmentVisible)}
          className={`geoduck-left-allotment-collapse fixed bottom-3 left-0 bg-blue-500 text-white z-50 rounded-r-lg ${
            leftAllotmentVisible
              ? "geoduck-allotment-visible"
              : "geoduck-allotment-invisible"
          }`}
        >
          {leftAllotmentVisible ? (
            <i className="fa-solid fa-table-columns h-4 w-4"></i>
          ) : (
            <i className="fa-solid fa-bars h-4 w-4"></i>
          )}
        </button>
      </div>
      <div
        className={`${styles.container} ${currentTheme}`}
        style={{
          minHeight: `calc(100vh - ${navbarHeight}px)`,
          minWidth: "100vw",
        }}
      >
        <Allotment
          ref={leftAllotmentRef}
          onChange={() => {
            if (
              leftAllotmentEl &&
              leftAllotmentCollapseEl
            ) {
              let leftAllotmentWidth = leftAllotmentEl.offsetWidth;
              if(leftAllotmentDragStartWidth && leftAllotmentWidth < 100 && leftAllotmentWidth < leftAllotmentDragStartWidth){
                setLeftAllotmentVisible(false);
              }
              
              leftAllotmentCollapseEl.style.left =
                leftAllotmentWidth +
                32 +
                "px";
            }
          }}

          onDragStart={()=>{
            if(leftAllotmentEl){
              setLeftAllotmentDragStartWidth(leftAllotmentEl.offsetWidth);
            }
          }}
          onDragEnd={()=>{
            setLeftAllotmentDragStartWidth(null);
          }}
        >
          <Allotment.Pane
            minSize={minWidth}
            maxSize={300}
            visible={leftAllotmentVisible}
          >
            <AllotmentLeft
              darkMode={currentTheme == "dark"}
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
            {leftAllotmentDragStartWidth}
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
