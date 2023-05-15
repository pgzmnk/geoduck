import React from "react";

interface ChatProps {}

export const Chat = (props: ChatProps) => {
  return (
    <div className="chatBox flex-none min-w-full px-4 sm:px-6 md:px-0 overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50 max-h-96 lg:supports-scrollbars:pr-2 lg:max-h-96">
      <div className="chat chat-start">
        <div className="chat-bubble">
          Rendering polygons...
          <br />
          Successfully rendered polygons.
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble">Test command.</div>
      </div>
    </div>
  );
};
