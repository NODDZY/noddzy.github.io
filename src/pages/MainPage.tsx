import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export interface SidebarProps {
  sidebarExpanded: boolean;
  underBreakpoint: boolean;
  toggleSidebar(): void;
}

export default function Root() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const BREAKPOINT = 960;
  const [underBreakpoint, setUnderBreakpoint] = useState(window.innerWidth < BREAKPOINT);

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle("sidebar-open");
    }
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleResizeWindow = () => {
    const width = window.innerWidth;
    setUnderBreakpoint(width < BREAKPOINT);

    if (!underBreakpoint && sidebarExpanded) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    sidebarRef.current = document.getElementById("sidebar") as HTMLDivElement;

    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  });

  return (
    <>
      <Header
        sidebarExpanded={sidebarExpanded}
        underBreakpoint={underBreakpoint}
        toggleSidebar={() => toggleSidebar()}
      />
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        underBreakpoint={underBreakpoint}
        toggleSidebar={() => toggleSidebar()}
      />

      <div id="main">
        <Outlet />
      </div>
    </>
  );
}
