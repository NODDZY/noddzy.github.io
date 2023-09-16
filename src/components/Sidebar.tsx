import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside id="sidebar">
      <nav>
        <div>
          <p className="sidebar-text sidebar-header">Elements</p>
        </div>
        <div>
          <Link
            className="sidebar-text"
            to={`hiscores`}>
            OSRS HiScores
          </Link>
        </div>
      </nav>
    </aside>
  );
}
