import { useState, useEffect } from "react";
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
  const [width, setWidth] = useState(window.innerWidth);
  const [underBreakpoint, setUnderBreakpoint] = useState(window.innerWidth < BREAKPOINT);

  let sidebar = document.getElementById("sidebar");

  const toggleSidebar = () => {
    sidebar!.classList.toggle("sidebar-open");
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleResizeWindow = () => {
    const currentWidth = window.innerWidth;
    setWidth(currentWidth);
    setUnderBreakpoint(currentWidth < BREAKPOINT);

    if (!underBreakpoint && sidebarExpanded) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    if (!sidebar) {
      sidebar = document.getElementById("sidebar");
    }

    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [width, sidebarExpanded]);

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
