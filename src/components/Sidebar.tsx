import { Link, useLocation } from "react-router-dom";

import { SidebarProps } from "../pages/MainPage";
import projects from "../assets/projects.json";

interface ProjectItemProp {
  title: string;
  description: string;
  link: string;
}

export default function Sidebar({ sidebarExpanded, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  function handleSidebarClick() {
    if (sidebarExpanded) {
      toggleSidebar();
    }
  }

  const isActiveLink = (path: string) => {
    return location.pathname === `/${path}`;
  };

  const ProjectItem = ({ title, description, link }: ProjectItemProp) => (
    <div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="sidebar-text"
        onClick={handleSidebarClick}
        title={description}>
        {title}
      </a>
    </div>
  );

  return (
    <aside
      id="sidebar"
      className="sidebar">
      <nav>
        <div>
          <p className="sidebar-text sidebar-header">Routes</p>
        </div>
        <div>
          <Link
            className={`sidebar-text${isActiveLink("hiscores") ? " active-link" : ""}`}
            onClick={handleSidebarClick}
            to={`hiscores`}>
            OSRS HiScores
          </Link>
        </div>
        <div>
          <Link
            className={`sidebar-text${isActiveLink("forecast") ? " active-link" : ""}`}
            onClick={handleSidebarClick}
            to={`forecast`}>
            Weather Forecast
          </Link>
        </div>
        <div>
          <Link
            className={`sidebar-text${isActiveLink("lol-champions") ? " active-link" : ""}`}
            onClick={handleSidebarClick}
            to={`lol-champions`}>
            Champion Browser
          </Link>
        </div>

        <div>
          <p className="sidebar-text sidebar-header">Projects</p>
        </div>
        {projects.map((item, index) => (
          <ProjectItem
            key={index}
            {...item}
          />
        ))}

        <div className="sidebar-bottom">
          <a
            className="sidebar-text"
            href="https://github.com/NODDZY"
            target="_blank"
            onClick={handleSidebarClick}
            rel="noopener noreferrer">
            GitHub Account
          </a>
        </div>
      </nav>
    </aside>
  );
}
