import React, { useState, Fragment } from "react";
import { IconButton } from "@material-tailwind/react";
import { useContext } from "react";
import { MapContext } from "@/context/context";
import * as rd from "@duckdb/react-duckdb";
import { renderMapData } from "@/utils/mapFunctions";
import { Switch } from "@material-tailwind/react";

import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  RectangleStackIcon,
  SwatchIcon,
  ChevronRightIcon, 
  ChevronDownIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  InboxIcon,
  PowerIcon
} from "@heroicons/react/24/solid";

import {
  Accordion,
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
import {
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
import { RenderLayer } from "@/utils/mapFunctions";
import { ModalAddLayer } from "@/components/ModalAddLayer";

function LayerCard(props) {
  const { layer } = props;


  return (
    <>
      {layer ? (
        <ListItem>
          <ListItemPrefix>
              <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
          </ListItemPrefix>
          <Typography variant="h6" color="blue-gray" className="dark:text-white">
              {layer.name} 
          </Typography>
          {' - '}
          <Typography variant="small" color="gray" className="font-normal dark:text-white">
              {layer.type}
          </Typography>        
        </ListItem>
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
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
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
    <div id="geoduck-allotment-left" className="flex-column ">
      <div className="flex flex-row">
        <div>
        
      <List className="dark:text-white">
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0 dark:text-white" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3 dark:text-white">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5 " />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal dark:text-white">
                Map Layers
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
             {layers.map((layer) => <LayerCard key={layer.name} layer={layer} />)}
            </List>
          </AccordionBody>
        </Accordion>
        <ModalAddLayer addLayerFunction={AddLayer} />
      </List>
        </div>

      </div>
      
    </div>
  );
}

interface AllotmentLeftProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}
export const AllotmentLeft = ({
  collapsed,
  setCollapsed,
  darkMode,
  toggleDarkMode
}: AllotmentLeftProps) => {

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
    <>
    <div data-testid="allotment-left" className="dark:bg-zinc-800 h-full">
      <Tabs value="layers" className="max-w-[40rem]">
      <TabsHeader
        className="geoduck-sidebar-tab-nav rounded-none border-b border-blue-gray-50 bg-transparent p-0 "
        indicatorProps={{
          className: "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none ",
        }}
      >
        {tabChoices.map(({ label, value, desc, icon }) => (
          <Tab
            key={value}
            value={value}
            data-testid={`allotment-left-tab-${value}`}
          >
            <div className="flex items-center gap-2 dark:text-white">
              {React.createElement(icon, { className: "w-5 h-5 dark:text-white" })}
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
      <List>
      <hr className="my-2 border-blue-gray-50" />
        <ListItem className="dark:text-white">
          <ListItemPrefix>
            <i class="fa-solid fa-file h-5 w-5 dark:text-white"></i>
          </ListItemPrefix>
          Docs
        </ListItem>
        <ListItem className="dark:text-white">
          <ListItemPrefix>
            <i className="fa-brands fa-github h-5 w-5 dark:text-white"></i>
          </ListItemPrefix>
          Github
        </ListItem>
        <ListItem className="dark:text-white">
          <ListItemPrefix>
            <i class="fas fa-life-ring  h-5 w-5 dark:text-white"></i>
          </ListItemPrefix>
          Help
        </ListItem>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem className="dark:text-white" onClick={()=>{
          toggleDarkMode();
        }}>
          <ListItemPrefix>
          {darkMode ? <i class="fa-solid fa-moon h-5 w-5"></i>  : <i class="fa-solid fa-sun h-5 w-5"></i> }
          
          </ListItemPrefix>
          {darkMode ? 'Dark Mode' : 'Light Mode'}
        </ListItem>
      </List>
    </Tabs>
    </div>
    
    </>
  );
};
