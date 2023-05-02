import React from "react";
import { Chat } from "@/components/Chat";
import { DataPreview } from "@/components/DataPreview";
import { Shell } from "@/components/Shell";
import { Workflow } from "@/components/Workflow";
import { IconButton } from "@material-tailwind/react";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
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
      label: "SQL",
      value: "shell",
      desc: <Shell />,
    },
    {
      label: "Workflow",
      value: "workflow",
      desc: <Workflow />,
    },
    {
      label: "Data",
      value: "data",
      desc: <DataPreview />,
    },
    {
      label: "Chat",
      value: "chat",
      desc: <Chat />,
    },
  ];

  return (
    <div class="font-sans text-black">
      <div class="container mx-auto m-4 px-4">
        <div class="flex w-full">
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
          <div class="absolute top-0 right-0 p-4">
            <IconButton
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            >
              {collapsed ? (
                <i className="fas fa-solid fa-angle-double-up" />
              ) : (
                <i className="fas fa-solid fa-angle-double-down" />
              )}
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
