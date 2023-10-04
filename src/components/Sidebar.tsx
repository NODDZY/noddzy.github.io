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

  const routes = [
    { to: "reddit-scroller", text: "Reddit Scroller" },
    { to: "forecast", text: "Weather Forecast" },
    { to: "pokeapi", text: "PokéAPI Lookup" },
    { to: "hiscores", text: "OSRS HiScores" },
    { to: "lol-champions", text: "Champion Browser" }
  ];

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
        {routes.map((link) => (
          <div key={link.to}>
            <Link
              className={`sidebar-text${isActiveLink(link.to) ? " active-link" : ""}`}
              onClick={handleSidebarClick}
              to={link.to}>
              {link.text}
            </Link>
          </div>
        ))}

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
