"use client";
import { installScrollMotion } from "@/lib/scroll-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function MotionSystem() {
  const pathname = usePathname();
  useEffect(() => installScrollMotion(), [pathname]);
  return <div className='scroll-progress' aria-hidden='true' />;
}
