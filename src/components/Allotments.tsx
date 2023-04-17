import { useState } from "react";
import ReactDOM from "react-dom";
import { Allotment } from "allotment";
// import "allotment/dist/style.css";

export function Allotments() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(true);

  return (
    <Allotment>
      {leftSidebarOpen === true && (
        <Allotment.Pane minSize={200} visible>
          <div>Pane Left</div>
        </Allotment.Pane>
      )}
      <Allotment.Pane minSize={100} snap visible>
        {leftSidebarOpen === false && <h1>Open Button</h1>}
        <Allotment vertical>
          <Allotment.Pane minSize={200} visible>
            {bottomDrawerOpen === false && <h1>open shell</h1>}
          </Allotment.Pane>
          {bottomDrawerOpen === true && (
            <Allotment.Pane preferredSize={300} maxSize={600} visible>
              <h1>Shell button</h1>
            </Allotment.Pane>
          )}
        </Allotment>
      </Allotment.Pane>
    </Allotment>
  );
}
