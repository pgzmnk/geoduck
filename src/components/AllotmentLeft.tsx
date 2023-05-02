import React, { useState, useRef, useCallback, useEffect } from "react";
import { Shell } from "@/components/Shell";
import { IconButton } from "@material-tailwind/react";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { RenderLayer } from "@/utils/mapFunctions";

function LayerCard(props) {
  const { layer } = props;

  return (
    <>
      {layer ? (
        <Card className="w-100% my-1 rounded-md	">
          <CardBody className="text-left">
            <Typography variant="p" className="mb-1">
              <b>{layer.name}</b>
            </Typography>
          </CardBody>
          <CardFooter divider className="uppercase">
            <Typography variant="small"> {layer.type}</Typography>
          </CardFooter>
        </Card>
      ) : (
        <p>No layers defined.</p>
      )}
    </>
  );
}

const Layers = () => {
  // state for the layers array
  const [layers, setLayers] = useState([
    { name: "cities", type: "point", tableName: "cities" },
    { name: "ent", type: "polygon", tableName: "ent" },
  ]);
  const [collapsed, setCollapsed] = useState(false);

  // render layers on map
  layers.map((layer) => {
    RenderLayer(layer);
  });

  // render layer cards on ui
  return (
    <div className="flex-column">
      <div class="flex flex-row">
        <div>
          <Button
            size="sm"
            color="white"
            className="flex items-center gap-3 outline outline-offset-2 outline-2	hover:outline-4"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            {collapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
            Map Layers
          </Button>
        </div>
        <div class="px-4">
          <IconButton size="md" color="pink">
            <i className="fas fa-solid fa-square-plus" />
          </IconButton>
        </div>
      </div>
      <div class="py-10 pl-5">
        {!collapsed ? layers.map((layer) => <LayerCard key={layer} layer={layer} />) : null}
      </div>
    </div>
  );
};

export default function TransparentTabs() {
  const data = [
    {
      label: "Layers",
      value: "layers",
      desc: <Layers />,
    },
    {
      label: "Components",
      value: "components",
      desc: <LayerCard />,
    },
  ];

  return (
    <Tabs value="layers" className="max-w-[40rem]">
      <TabsHeader
        className="bg-transparent"
        indicatorProps={{
          className: "bg-blue-500/10 shadow-none text-blue-500",
        }}
      >
        {data.map(({ label, value, desc }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            <div>{desc}</div>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}

interface AllotmentLeftProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
export const AllotmentLeft = ({
  collapsed,
  setCollapsed,
}: AllotmentLeftProps) => {
  return (
    <div>
      <TransparentTabs />
      <div class="absolute bottom-0">
        <IconButton
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          {collapsed ? (
            <i className="fas fa-solid fa-angle-double-right" />
          ) : (
            <i className="fas fa-solid fa-angle-double-left" />
          )}
        </IconButton>
      </div>
    </div>
  );
};
