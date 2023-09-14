import { useState } from "react";
import { fetchStatsRunescape } from "../services/api";
import { FiSearch } from "react-icons/fi";
import "../styles/HiScores.css";

const DESCRIPTION = "Check your Old School RuneScape progression and see where you rank in the community.";

export default function HiscoresList() {
  const [stats, setStats] = useState<Skill[]>([]);
  const [username, setUsername] = useState<string>("");
  const [lastUsername, setLastUsername] = useState<string>();

  const search = async () => {
    if (username.toLowerCase() !== lastUsername?.toLowerCase() || stats.length === 0) {
      if (username) {
        const fetchedStats = await fetchStatsRunescape(username);
        setLastUsername(username);
        setStats(fetchedStats);
      } else {
        setStats([]);
      }
    }
  };

  const listItems = stats.map((skill) => (
    <tr key={skill.metric}>
      <td className="column-img">
        <img
          src={`src/assets/runescape_skill_icons/${skill.metric}.png`}
          alt={`${skill.metric} icon`}
        />
      </td>
      <td className="column-skill">{skill.metric.charAt(0).toUpperCase() + skill.metric.slice(1)}</td>
      <td className="column-rank">{skill.rank !== -1 ? skill.rank : "-"}</td>
      <td className="column-level">{skill.level}</td>
      <td className="column-xp">{skill.experience !== -1 ? skill.experience.toLocaleString() : "-"}</td>
    </tr>
  ));

  return (
    <div>
      <h1>Old School RuneScape HiScores</h1>
      <p className="description">{DESCRIPTION}</p>

      <div className="search-row">
        <input
          type="text"
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />
        <button
          onClick={search}
          tabIndex={-1}>
          <FiSearch />
        </button>
      </div>

      {stats.length > 0 && <h2>{lastUsername}</h2>}
      <table>
        <thead>
          {stats.length > 0 && (
            <tr>
              <th className="column-img"></th>
              <th className="column-skill">Skill</th>
              <th className="column-rank">Rank</th>
              <th className="column-level">Level</th>
              <th className="column-xp">XP</th>
            </tr>
          )}
        </thead>
        <tbody>{listItems}</tbody>
      </table>
    </div>
  );
}
