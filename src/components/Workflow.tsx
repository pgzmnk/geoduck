import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import styles from "./Workflow.module.css";

const Sidebar = () => {
  const onDragStart = (event, nodeType, nodeMessage) => {
    event.dataTransfer.setData("application/reactflow", nodeMessage);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className={styles.description}>
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className={styles.dndnode + " " + styles.input}
        onDragStart={(event) => onDragStart(event, "input", "input")}
        draggable
      >
        Input Node
      </div>
      <div
        className={styles.dndnode}
        onDragStart={(event) => onDragStart(event, "default", "* FROM cities")}
        draggable
      >
        * FROM cities
      </div>
      <div
        className={styles.dndnode + " " + styles.output}
        onDragStart={(event) => onDragStart(event, "output", "output")}
        draggable
      >
        Output Node
      </div>
    </aside>
  );
};

const initialNodes = [
  {
    id: "1",
    type: "input",
    sourcePosition: "right",
    data: { label: "CREATE TABLE newtable AS" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    type: "default",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "SELECT" },
    position: { x: 450, y: 5 },
  },

  {
    id: "3",
    type: "default",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "* FROM cities" },
    position: { x: 650, y: 5 },
  },
];
const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

export const Workflow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [query, setQuery] = useState('')

  const structureSql = () => {
    console.log('nodes:', nodes)
    console.log('edges:', edges)
    let sql = ''

    nodes.forEach((node) => {
      if (node.type === 'input') {
        sql += node.data.label + ' '
      } else if (node.type === 'default') {
        sql += node.data.label + ' '
      }
    })
    console.log('sql:', sql)
    setQuery(sql)

  }



  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds))
      structureSql()
    }, []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        sourcePosition: "right",
        targetPosition: "left",
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
      console.log("nodes:", nodes);
    },

    [reactFlowInstance]
  );


  return (
    <>
      <h1>{query}</h1>
      <div className={styles.dndflow}>

        <ReactFlowProvider>
          <Sidebar />
          <div
            className={styles.reactflowWrapper}
            ref={reactFlowWrapper}
            class="w-full	"
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <Controls />
              <Background color="#ccc" variant="dots" />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
};
