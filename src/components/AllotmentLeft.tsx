import React, { useState, useRef, useCallback } from "react";
import { Shell } from "@/components/Shell";
import { IconButton } from "@material-tailwind/react";

interface AllotmentLeftProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
export const AllotmentLeft = ({
  collapsed,
  setCollapsed,
}: AllotmentLeftProps) => {
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
