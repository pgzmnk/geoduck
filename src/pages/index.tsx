import { Allotments } from "@/components/Allotments";

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>GeoDuck</title>
        <meta name="description" content="Quack" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div style={{ height: 100, width: 100 }}>
          <Allotments />
        </div>
      </main>
    </>
  );
}
