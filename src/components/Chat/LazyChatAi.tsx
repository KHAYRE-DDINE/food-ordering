"use client";

import dynamic from "next/dynamic";

export const LazyChatAi = dynamic(
  () => import("./ChatAi").then((module) => module.ChatAi),
  { ssr: false }
);
