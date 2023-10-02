import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import { SKILL_ICON_URL, WOM_URL, HISCORE_URL, fetchRunescapeUser } from "../services/osrs/api";

import "../styles/routes/osrs-hiscores.css";

interface RunescapeSkill {
  metric: string;
  experience: number;
  rank: number;
  level: number;
}

export default function HiScores() {
  const [skills, setSkills] = useState<RunescapeSkill[]>([]);
  const [username, setUsername] = useState<string>("");
  const [lastUsername, setLastUsername] = useState<string | null>(localStorage.getItem("lastUsername") || null);

  // Effect to run once when component mounts
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
    if (username.toLowerCase() === lastUsername?.toLowerCase()) {
      // Dont search again if the username is the same as the last search
      return;
    }

    if (!username) {
      // If the username is empty, clear the data and localStorage
      setSkills([]);
      setLastUsername(null);
      localStorage.removeItem("lastUsername");
      localStorage.removeItem("skills");
      return;
    }

    // Fetch user data
    let fetchedSkills: RunescapeSkill[] = [];
    let fetchedLastUsername: string | null = null;
    const response = await fetchRunescapeUser(username);

    if (!response) {
      // Response is "404 Not Found"
      console.warn(`Could not find [${username}]`);
      fetchedSkills = [];
    } else if (response.latestSnapshot !== null && typeof response.latestSnapshot === "object") {
      // User found
      fetchedSkills = Object.values(response.latestSnapshot.data.skills) as RunescapeSkill[];
      fetchedLastUsername = response.displayName;
    } else {
      // User found, but has no stats
      console.warn(`[${username}] is registered on WOM but is not on the HiScores`);
      fetchedSkills = [];
    }

    if (fetchedSkills !== null && fetchedLastUsername) {
      setSkills(fetchedSkills);
      setLastUsername(fetchedLastUsername);
      localStorage.setItem("lastUsername", fetchedLastUsername);
      localStorage.setItem("skills", JSON.stringify(fetchedSkills));
    } else {
      // If the fetched stats are null, clear data
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
          src={SKILL_ICON_URL(skill.metric)}
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
    <div className="main-element">
      <h1>Old School RuneScape HiScores</h1>
      <p>Check your Old School RuneScape progression and see where you rank in the community.</p>

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

      {skills.length > 0 && lastUsername && (
        <div>
          <h2 id="hiscores-text">{lastUsername}</h2>

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

          <p id="hiscores-text">
            <a
              href={HISCORE_URL(lastUsername)}
              target="_blank">
              Official HiScores
            </a>
            ·
            <a
              href={WOM_URL(lastUsername)}
              target="_blank">
              Wise Old Man
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
