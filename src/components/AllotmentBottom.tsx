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
  const tabChoices = [
    {
      label: "SQL",
      title: "DuckDB shell",
      description: "Directly interact with the underlying DuckDB instance.",
      value: "shell",
      desc: <Shell />,
    },
    {
      label: "Workflow",
      title: "Workflow",
      description:
        "Design and execute multi-step spatial analytics procedures with a visual language.",
      value: "workflow",
      desc: <Workflow />,
    },
    {
      label: "Data",
      title: "Data",
      description: "Preview tables.",
      value: "data",
      desc: <DataPreview />,
    },
    {
      label: "Chat",
      title: "SQL",
      description:
        "Translate plain English to SQL. Build complex SQL queries from your prompts. (beta)",
      value: "chat",
      desc: <Chat />,
    },
  ];

  return (
    <div className="container mx-auto m-4 px-4" data-testid="allotment-bottom">
      <div className="flex w-full h-100">
        <div className="w-80 grow">
          <Tabs value="shell">
            <TabsHeader>
              {tabChoices.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  data-testid={`allotment-bottom-tab-${value}`}
                >
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
              {tabChoices.map(({ value, desc, title, description }) => (
                <TabPanel key={value} value={value}>
                  <div className="flex flex-col py-4">
                    <p className="uppercase font-extrabold">{title}</p>
                    <p>{description}</p>
                  </div>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </div>
      <div className="absolute top-0 right-0 p-4 pl-10">
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
  );
};
