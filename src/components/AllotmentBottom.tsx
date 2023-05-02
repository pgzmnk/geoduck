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
      title: "DuckDB shell",
      description: "Directly interact with the underlying DuckDB instance.",
      value: "shell",
      desc: <Shell />,
    },
    {
      label: "Workflow",
      title: "Data",
      description: "Data description text",
      value: "workflow",
      desc: <Workflow />,
    },
    {
      label: "Data",
      title: "Workflow",
      description: "Workflow description text",
      value: "data",
      desc: <DataPreview />,
    },
    {
      label: "Chat",
      title: "SQL",
      description: "SQL description text",
      value: "chat",
      desc: <Chat />,
    },
  ];

  return (
    <div class="font-sans text-black">
      <div class="container mx-auto m-4 px-4">
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
                {data.map(({ value, desc, title, description }) => (
                  <TabPanel key={value} value={value}>
                    <div class="flex flex-col py-4">
                      <p class="uppercase font-extrabold">{title}</p>
                      <p>{description}</p>
                    </div>
                    {desc}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </div>
        <div class="absolute top-0 right-0 p-4 pl-10">
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
  );
};
