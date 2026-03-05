/**
 * HOME PAGE ENTRY POINT - Design Toggle Router
 * 
 * This file acts as a "traffic cop" component. It does not contain any UI or
 * business logic of its own. Its sole responsibility is to read the global design 
 * state from the DesignProvider and render either the original V1 design or the 
 * experimental V2 design.
 * 
 * V1 Logic lives in: src/app/HomeV1.tsx
 * V2 Logic lives in: src/app/HomeV2.tsx
 */
"use client";

import dynamic from "next/dynamic";
import { useDesign } from "@/components/DesignProvider";

// Using next/dynamic ensures that clients only download the javascript
// for the version of the homepage they are actively viewing.
const HomeV1 = dynamic(() => import("./HomeV1").then((mod) => mod.HomeV1), { ssr: false });
const HomeV2 = dynamic(() => import("./HomeV2").then((mod) => mod.HomeV2), { ssr: false });

export default function Home() {
  const { activeDesign } = useDesign();
  return activeDesign === "v1" ? <HomeV1 /> : <HomeV2 />;
}
