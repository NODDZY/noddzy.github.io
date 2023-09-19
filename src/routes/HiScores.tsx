import { useEffect, useState } from "react";
import { fetchSkillsRunescape } from "../services/api";
import { FiSearch } from "react-icons/fi";
import { RunescapeSkill } from "../services/interfaces";
import "../styles/osrs-hiscores.css";

export default function Hiscores() {
  const [skills, setSkills] = useState<RunescapeSkill[]>([]);
  const [username, setUsername] = useState<string>("");
  const [lastUsername, setLastUsername] = useState<string | null>(localStorage.getItem("lastUsername") || null);

  useEffect(() => {
    // Load lastUsername and skills from localStorage when the component mounts.
    const storedUsername = localStorage.getItem("lastUsername");
    if (storedUsername) {
      setLastUsername(storedUsername);
    }
    const storedSkills = JSON.parse(localStorage.getItem("skills") || "[]");
    setSkills(storedSkills);
  }, []);

  const search = async () => {
    if (username === lastUsername) {
      // Don't search again if the username is the same as the last search.
      return;
    }

    if (!username) {
      // If the username is empty, clear the data and localStorage.
      setSkills([]);
      setLastUsername(null);
      localStorage.removeItem("lastUsername");
      localStorage.removeItem("skills");
      return;
    }

    const fetchedSkills = await fetchSkillsRunescape(username);

    if (fetchedSkills !== null) {
      setSkills(fetchedSkills);
      setLastUsername(username);
      localStorage.setItem("lastUsername", username);
      localStorage.setItem("skills", JSON.stringify(fetchedSkills));
    } else {
      // If the fetched stats are null, clear the data and localStorage.
      setSkills([]);
      setLastUsername(null);
      localStorage.removeItem("lastUsername");
      localStorage.removeItem("skills");
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
      <p className="hiscores-text">
        Check your Old School RuneScape progression and see where you rank in the community.
      </p>

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

      {skills.length > 0 && (
        <div>
          <h2 id="hiscores-username">{lastUsername}</h2>

          <table id="skill-table">
            <thead>
              <tr>
                <th className="column-img"></th>
                <th className="column-skill">Skill</th>
                <th className="column">Rank</th>
                <th className="column">Level</th>
                <th className="column">XP</th>
              </tr>
            </thead>
            <tbody>{skillItem}</tbody>
          </table>

          <p id="hiscores-links">
            <a href={`https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${lastUsername}`}>Official HiScores</a>
            ·
            <a href={`https://wiseoldman.net/players/${lastUsername}`}>Wise Old Man</a>
          </p>
        </div>
      )}
    </div>
  );
}
