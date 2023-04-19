import React, { useState, useRef, useCallback } from "react";

import styles from "@/styles/Content.module.css";
import { Shell } from "@/components/Shell";
import { IconButton } from "@material-tailwind/react";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
} from "@material-tailwind/react";

interface AllotmentBottomProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
export const AllotmentBottom = ({
  collapsed,
  setCollapsed,
}: AllotmentBottomProps) => {
  const data = [
    {
      label: "Chat",
      value: "chat",
      desc: `Coming soon...`,
    },
    {
      label: "Shell",
      value: "shell",
      desc: <Shell />,
    },
  ];

  return (
    <div class="font-sans text-black">
      <div class="container mx-auto m-4 px-4">
        <div class="flex-none w-14 ">
          <IconButton
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            // variant="outlined"
          >
            {collapsed ? (
              <i className="fas fa-solid fa-angle-double-up" />
            ) : (
              <i className="fas fa-solid fa-angle-double-down" />
            )}
          </IconButton>
        </div>
        <div class="flex w-full h-100">
          <div class="w-80 grow">
            <Tabs value="shell">
              <TabsHeader>
                {data.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    {desc}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
