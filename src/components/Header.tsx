import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiAlignLeft } from "react-icons/fi";

export default function Header() {
  const [width, setWidth] = useState(window.innerWidth);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const BREAKPOINT = 960;

  let sidebar = document.getElementById("sidebar");

  const toggleSidebar = () => {
    sidebar!.classList.toggle("sidebar-open");
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleResizeWindow = () => {
    setWidth(window.innerWidth);

    if (width >= BREAKPOINT && sidebarExpanded) {
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
    <header id="header">
      {width < BREAKPOINT && (
        <div
          id="hamburger-menu"
          onClick={toggleSidebar}>
          <FiAlignLeft />
          <span>Menu</span>
        </div>
      )}
      {sidebarExpanded && width < BREAKPOINT && (
        <div
          className="backdrop"
          onClick={toggleSidebar}></div>
      )}
      <div id="header-title">
        <Link
          id="header-title-inner"
          to={`/`}>
          <p className="name">
            <span className="clip">▙ ▚ ∞ ▞ ▟</span>
          </p>
        </Link>
      </div>
      <div id="header-content"></div>
    </header>
  );
}
