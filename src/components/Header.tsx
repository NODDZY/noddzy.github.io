import { Link } from "react-router-dom";
import { FiAlignLeft } from "react-icons/fi";
import { SidebarProps } from "../pages/MainPage";

export default function Header({ sidebarExpanded, underBreakpoint, toggleSidebar }: SidebarProps) {
  return (
    <header id="header">
      {underBreakpoint && (
        <div
          id="hamburger-menu"
          onClick={toggleSidebar}>
          <FiAlignLeft />
          <span>Menu</span>
        </div>
      )}

      {sidebarExpanded && underBreakpoint && (
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
    </header>
  );
}
