import { useTheme } from 'next-themes';
import { useState, useRef, useCallback, useEffect } from "react";
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
import {
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";

const minHeight = 70;

const minWidth = 50;
const navbarHeight = 100;

export function Allotments() {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState('light');
  const [leftAllotmentVisible, setLeftAllotmentVisible] = useState(true);
  const [bottomAllotmentVisible, setBottomAllotmentVisible] = useState(true);
  const [bottomAllotmentExpanded, setBottomAllotmentExpanded] = useState(false);
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();

  const toggleDarkMode = () => {
    setTheme(theme == 'dark' ? 'light': 'dark');   
  }

  useEffect(()=>{
    setCurrentTheme(theme);
  }, [theme]);

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
        className={`${styles.navbar} overflow-hidden ${currentTheme}` }
        style={{ maxHeight: navbarHeight, minWidth: "100vw" }}
      >
        <ComplexNavbar leftAllotmentVisible={leftAllotmentVisible} setLeftAllotmentVisible={setLeftAllotmentVisible} />
        <IconButton variant="text" onClick={()=> setLeftAllotmentVisible(!leftAllotmentVisible)} className="geoduck-left-allotment-collapse fixed bottom-3 left-0 bg-blue-500 text-white z-50 rounded-r-lg">
            {leftAllotmentVisible ? <i class="fa-solid fa-table-columns h-4 w-4"></i> : <i class="fa-solid fa-bars h-4 w-4"></i>}
        </IconButton>
      </div>
      <div
        className={`${styles.container} ${currentTheme}`}
        style={{
          minHeight: `calc(100vh - ${navbarHeight}px)`,
          minWidth: "100vw",
        }}
      >
        <Allotment ref={leftAllotmentRef} >
          <Allotment.Pane minSize={minWidth} maxSize={300} visible={leftAllotmentVisible} >
            <AllotmentLeft
              darkMode={currentTheme == 'dark'}
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
