"use client";

import { MonitorProvider } from "@/context/MonitorContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MonitorProvider>{children}</MonitorProvider>;
}
