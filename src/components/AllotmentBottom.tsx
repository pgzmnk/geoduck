import React from "react";
import { Chat } from "@/components/Chat";
import { DataPreview } from "@/components/DataPreview";
import { Shell } from "@/components/Shell";
import { Workflow } from "@/components/Workflow";
import { IconButton } from "@material-tailwind/react";

import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";

interface AllotmentBottomProps {
  collapsed: boolean;
  expand: boolean;
  setCollapsed: (collapsed: boolean) => void;
  setExpand: (expand: boolean) => void;
}
export const AllotmentBottom = ({
  collapsed,
  setCollapsed,
  expand,
  setExpand,
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
    <div
      className="geoduck-bottom-allotment container mx-auto p-4 px-4 dark:bg-zinc-800"
      data-testid="allotment-bottom"
    >
      <div className="flex w-full h-100">
        <div className="geoduck-bottom-allotment-wrap w-80 grow">
          <Tabs value="shell" className="geoduck-bottom-allotment-tabs">
            <div className="geoduck-bottom-tabs-header">
              <TabsHeader>
                {tabChoices.map(({ label, value }) => (
                  <>
                    <Tab
                      key={value}
                      value={value}
                      data-testid={`allotment-bottom-tab-${value}`}
                    >
                      {label}
                    </Tab>
                  </>
                ))}
              </TabsHeader>
              <div className="geoduck-bottom-allotment-buttons flex w-max gap-4">
                <IconButton
                  onClick={() => {
                    setExpand(!expand);
                  }}
                >
                  {expand ? (
                    <i class="fas fa-solid fa-compress"></i>
                  ) : (
                    <i class="fas fa-solid fa-expand"></i>
                  )}
                </IconButton>
                <IconButton
                  onClick={() => {
                    setCollapsed(!collapsed);
                  }}
                >
                  {collapsed ? (
                    <i className="fas fa-solid fa-chevron-up" />
                  ) : (
                    <i className="fas fa-solid fa-chevron-down" />
                  )}
                </IconButton>
              </div>
            </div>

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
                    <p className="uppercase font-extrabold dark:text-white">
                      {title}
                    </p>
                    <p className="dark:text-white">{description}</p>
                  </div>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
