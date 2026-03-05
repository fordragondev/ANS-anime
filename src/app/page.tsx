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

import { useDesign } from "@/components/DesignProvider";
import { HomeV1 } from "./HomeV1";
import { HomeV2 } from "./HomeV2";

export default function Home() {
  const { activeDesign } = useDesign();
  return activeDesign === "v1" ? <HomeV1 /> : <HomeV2 />;
}
