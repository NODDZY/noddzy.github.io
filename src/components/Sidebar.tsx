import { Link } from "react-router-dom";
import { ProjectItemProp } from "../services/interfaces";

const ProjectItem = ({ title, description, link }: ProjectItemProp) => (
  <div>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="sidebar-text"
      title={description}>
      {title}
    </a>
  </div>
);

export default function Sidebar() {
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
            className="sidebar-text"
            to={`hiscores`}>
            OSRS HiScores
          </Link>
        </div>
        <div>
          <Link
            className="sidebar-text"
            to={`yr`}>
            Weather Forecast
          </Link>
        </div>
        
        <div>
          <p className="sidebar-text sidebar-header">Projects</p>
        </div>
        {githubItems.map((item, index) => (
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
            rel="noopener noreferrer">
            GitHub Account
          </a>
        </div>
      </nav>
    </aside>
  );
}

const githubItems = [
  {
    title: "Visual NPC Dialogue",
    description: "RuneLite Plugin. Adds dialogue to the chatbox and above NPCs heads.",
    link: "https://github.com/NODDZY/visual-npc-dialogue"
  },
  {
    title: "Herb Patch Overlay",
    description:
      "RuneLite plugin. Renders colored overlays on herb patches to easily see if herb is ready to be harvested.",
    link: "https://github.com/NODDZY/herbpatch-overlay"
  },
  {
    title: "Sourcerunner Python",
    description: "Static website to safely (compile and) run python source code using virtualization.",
    link: "https://github.com/NODDZY/sourcerunner-py"
  },
  {
    title: "Updater Scripts",
    description: "Collection of batch scripts to download/update various portable applications on Windows.",
    link: "https://github.com/NODDZY/updater-scripts"
  },
  {
    title: "Romhacking",
    description: "Miscellaneous romhacks.",
    link: "https://github.com/NODDZY/romhacking"
  }
];
