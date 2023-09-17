import { useState } from "react";
import { fetchSkillsRunescape } from "../services/api";
import { FiSearch } from "react-icons/fi";
import { RunescapeSkill } from "../services/interfaces";
import "../styles/osrs-hiscores.css";

const DESCRIPTION = "Check your Old School RuneScape progression and see where you rank in the community.";

export default function Hiscores() {
  const [skills, setSkills] = useState<RunescapeSkill[]>([]);
  const [username, setUsername] = useState<string>("");
  const [lastUsername, setLastUsername] = useState<string>();

  const search = async () => {
    if (username && (skills.length || username.toLowerCase() !== lastUsername?.toLowerCase())) {
      setLastUsername(username);
      const fetchedSkills = await fetchSkillsRunescape(username);
      setSkills(fetchedSkills);
    } else {
      setSkills([]);
    }
  };

  const skillItem = skills.map((skill) => (
    <tr key={skill.metric}>
      <td className="column-img">
        <img
          src={`src/assets/runescape_skill_icons/${skill.metric}.png`}
          alt={`${skill.metric} icon`}
        />
      </td>
      <td className="column-skill">{skill.metric.charAt(0).toUpperCase() + skill.metric.slice(1)}</td>
      <td className="column">{skill.rank !== -1 ? skill.rank : "-"}</td>
      <td className="column">{skill.level}</td>
      <td className="column">{skill.experience !== -1 ? skill.experience.toLocaleString() : "-"}</td>
    </tr>
  ));

  return (
    <div
      className="main-element"
      id="hiscores">
      <h1 className="hiscores-text">Old School RuneScape HiScores</h1>
      <p className="hiscores-text">{DESCRIPTION}</p>

      <div id="search-row">
        <input
          id="search-input"
          type="text"
          onChange={(event) => setUsername(event.target.value)}
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              search();
            }
          }}
          placeholder="Username"
        />
        <button
          id="search-button"
          onClick={search}>
          <FiSearch />
        </button>
      </div>

      {skills.length > 0 && <h2 id="hiscores-username">{lastUsername}</h2>}
      <table id="skill-table">
        <thead>
          {skills.length > 0 && (
            <tr>
              <th className="column-img"></th>
              <th className="column-skill">Skill</th>
              <th className="column">Rank</th>
              <th className="column">Level</th>
              <th className="column">XP</th>
            </tr>
          )}
        </thead>
        <tbody>{skillItem}</tbody>
      </table>
    </div>
  );
}
