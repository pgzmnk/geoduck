import { Workflow } from "@/components/Workflow"; // import the component;
import React from "react";
import styles from "@/styles/Content.module.css";

export default function WorkflowPage() {
  return (
    <>
      <h1>test</h1>
      <main className="w-screen h-screen text-black	max-h-screen	">
        <div className={`${styles.container} `}>
          <Workflow />
        </div>
      </main>
    </>
  );
}
