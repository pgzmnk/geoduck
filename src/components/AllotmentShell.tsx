import React, { useState, useRef, useCallback } from "react";

import styles from "@/styles/Content.module.css";
import { Shell } from "@/components/Shell";

interface AllotmentShellProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
export const AllotmentShell = ({
  collapsed,
  setCollapsed,
}: AllotmentShellProps) => {
  return (
    <div class="font-sans text-black">
      <div class="container mx-auto m-4 px-4">
        <div class="flex w-full h-100">
          <div class="flex-none w-32">01</div>
          <div class="flex-auto w-60 ...">02</div>
          <div class="flex-auto w-32 right-0">
            <button
              onClick={() => {
                setCollapsed(!collapsed);
              }}
              class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Button
            </button>
          </div>
        </div>
        <div class="container mx-auto px-0 m-4">
          <Shell />
        </div>
      </div>
    </div>
  );
};
