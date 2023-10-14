import { useEffect, useState } from "react";
import { FiLoader, FiSearch } from "react-icons/fi";

import { ExperienceChart, ExperienceTable } from "../components/osrs";
import { HISCORE_URL, WOM_URL, fetchRunescapeUser, fetchUserSnapshots } from "../services/osrs/api";
import { Period } from "../services/osrs/enum";
import { RunescapeSkill } from "../services/osrs/interface";

import "../styles/routes/osrs-hiscores.css";

export default function HiScores() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, toggleSearch] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [skills, setSkills] = useState<RunescapeSkill[]>([]);
  const [username, setUsername] = useState<string>("");
  const [lastUsername, setLastUsername] = useState<string | null>(localStorage.getItem("osrs-username"));

  const [snapshotDates, setsnapshotDates] = useState<string[]>([]);
  const [snapshotExperience, setsnapshotExperience] = useState<number[]>([]);
  const [snapshotRanks, setsnapshotRanks] = useState<number[]>([]);

  // Effect to run once when component mounts
  useEffect(() => {
    // Load lastUsername and skills from localStorage when the component mounts.
    const storedUsername = localStorage.getItem("osrs-username");
    if (storedUsername) {
      setLastUsername(storedUsername);
      setUsername(storedUsername);
      toggleSearch(!search);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (username.toLowerCase() === lastUsername?.toLowerCase()) {
        // Don't search again if the username is the same as the last search
        setIsLoading(false);
        return;
      }

      if (!username) {
        // If the username is empty, clear the data and localStorage
        setSkills([]);
        setLastUsername(null);
        localStorage.removeItem("osrs-username");
        setIsLoading(false);
        return;
      }

      // Fetch user data
      let fetchedSkills: RunescapeSkill[] = [];
      let fetchedLastUsername: string | null = null;
      const response = await fetchRunescapeUser(username);

      if (!response) {
        // Response is "404 Not Found"
        console.warn(`Could not find [${username}]`);
        setError(`Could not find "${username}"`);
        fetchedSkills = [];
      } else if (response.latestSnapshot !== null && typeof response.latestSnapshot === "object") {
        // User found
        setError(null);
        fetchedSkills = Object.values(response.latestSnapshot.data.skills);
        fetchedLastUsername = response.displayName;
      } else {
        // User found but has no stats
        console.warn(`[${username}] is registered on WOM but is not on the HiScores`);
        setError(`User "${username}" is registered on Wise Old Man but does not appear on the official HiScores`);
        fetchedSkills = [];
      }

      if (fetchedSkills !== null && fetchedLastUsername) {
        setSkills(fetchedSkills);
        setLastUsername(fetchedLastUsername);
        localStorage.setItem("osrs-username", fetchedLastUsername);

        const snapshots = await fetchUserSnapshots(fetchedLastUsername, Period.month);
        setsnapshotDates(snapshots.map((snapshot) => snapshot.createdAt).reverse());
        setsnapshotExperience(snapshots.map((snapshot) => snapshot.data.skills.overall.experience).reverse());
        setsnapshotRanks(snapshots.map((snapshot) => snapshot.data.skills.overall.rank).reverse());
      } else {
        // If the fetched stats are null, clear data
        setSkills([]);
        setLastUsername(null);
        localStorage.removeItem("osrs-username");
      }
      setIsLoading(false);
    };

    fetchData();
  }, [search]);

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
              toggleSearch(!search);
            }
          }}
          placeholder="Username"
        />
        <button
          id="search-button"
          onClick={() => toggleSearch(!search)}>
          {isLoading ? <FiLoader className="spin" /> : <FiSearch />}
        </button>
      </div>

      {skills.length > 0 && lastUsername ? (
        <div>
          <h2 className="hiscores-text">{lastUsername}</h2>
          <ExperienceTable skills={skills} />

          <p className="hiscores-text">
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
          <br />
          {snapshotExperience.length === 0 || (
            <ExperienceChart
              timestamps={snapshotDates}
              data={snapshotExperience}
              color="RGB(100, 108, 255)"
              title="Experience"
              label="EXP"
            />
          )}
          <br />
          {snapshotRanks.length === 0 || (
            <ExperienceChart
              timestamps={snapshotDates}
              data={snapshotRanks}
              color="RGB(204, 122, 0)"
              title="Rank overall"
              label="Rank"
            />
          )}
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}
