"use client";
import { useEffect } from "react";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize smooth scroll for the entire app
  useSmoothScroll();

  return <>{children}</>;
}
