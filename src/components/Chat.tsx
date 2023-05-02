import React from "react";

interface ChatProps { }

export const Chat = (props: ChatProps) => {
  return (
    <div>
      <div className="chat chat-start">
        <div className="chat-bubble">Rendering polygons...<br />Successfully rendered polygons.</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble">Test command.</div>
      </div>
    </div>
  );
};
