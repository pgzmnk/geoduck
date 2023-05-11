import React, { useState, Fragment } from "react";
import { IconButton } from "@material-tailwind/react";
import { useContext } from "react";
import { MapContext } from "@/context/context";
import * as rd from "@duckdb/react-duckdb";
import { renderMapData } from "@/utils/mapFunctions";


import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  RectangleStackIcon,
  SwatchIcon,
} from "@heroicons/react/24/solid";

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
import { ModalAddLayer } from "@/components/ModalAddLayer";

function LayerCard(props) {
  const { layer } = props;

  return (
    <>
      {layer ? (
        <Card className="w-100% my-0.5 rounded-md	">
          <CardBody className="text-left">
            <Typography className="text-base">
              <b>{layer.name}</b>
            </Typography>
          </CardBody>
          <CardFooter divider className="uppercase">
            <Typography className="text-sm"> {layer.type}</Typography>
          </CardFooter>
        </Card>
      ) : (
        <p>No components defined yet.</p>
      )}
    </>
  );
}

function Layers() {
  // state for the layers array
  const [layers, setLayers] = useState([
    { name: "cities", type: "point", tableName: "cities" },
    { name: "ent", type: "polygon", tableName: "ent" },
  ]);
  const [collapsed, setCollapsed] = useState(false);
  const db = rd.useDuckDB();
  const { map } = useContext(MapContext);

  // render layers on map
  layers.map((layer) => {
    RenderLayer(layer);
  });

  // add layer function
  async function AddLayer() {
    console.log("- add layer -");
    const newLayer = {
      name: "new layer",
      type: "point",
      tableName: "new layer",
    };
    setLayers([...layers, newLayer]);

    // renderMapData(map, db, newLayer.tableName);
  }

  // render layer cards on ui
  return (
    <div className="flex-column">
      <div className="flex flex-row">
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
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
            Map Layers
          </Button>
        </div>
        <div className="px-4">
          <ModalAddLayer addLayerFunction={AddLayer} />
        </div>
      </div>
      <div className="py-5 pl-2">
        {!collapsed
          ? layers.map((layer) => <LayerCard key={layer.name} layer={layer} />)
          : null}
      </div>
    </div>
  );
}

export default function TransparentTabs() {
  const tabChoices = [
    {
      label: "Layers",
      value: "layers",
      icon: RectangleStackIcon,
      desc: <Layers />,
    },
    {
      label: "Components",
      value: "components",
      icon: SwatchIcon,
      desc: <LayerCard />,
    },
  ];

  return (
    <Tabs value="layers" className="max-w-[40rem]">
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className: "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
        }}
      >
        {tabChoices.map(({ label, value, desc, icon }) => (
          <Tab
            key={value}
            value={value}
            data-testid={`allotment-left-tab-${value}`}
          >
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {tabChoices.map(({ value, desc }) => (
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
    <div data-testid="allotment-left">
      <TransparentTabs />
      <div className="absolute bottom-0">
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
