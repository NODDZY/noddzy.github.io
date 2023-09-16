import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside id="sidebar">
      <nav>
        <ul>
          <li>
            <Link
              className="sidebarText"
              to={`hiscores`}>
              OSRS HiScores
            </Link>
          </li>
          <li>
            <Link
              className="sidebarText"
              to={`nothinghere`}>
              ERROR
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
