import { ChangeEvent, useEffect, useState } from "react";

import { fetchChampionData, fetchCurrentVersion, UNIVERSE_URL, ICON_URL } from "../services/league/api";
import { capitalizeFirstLetter } from "../services/league/utils";
import { Champion } from "../services/league/interface";

import "../styles/champion-browser.css";

export default function ChampionBrowser() {
  const [version, setVersion] = useState<string | null>(null);
  const [champions, setChampions] = useState<Champion[] | null>(null);

  const [search, setSearch] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [filteredChampions, setFilteredChampions] = useState<Champion[] | null>(null);

  // Effect to run once when component mounts
  useEffect(() => {
    // Fetch champion list for current patch
    async function fetchList() {
      const currentVersion = await fetchCurrentVersion();
      setVersion(currentVersion);
      if (currentVersion) {
        const currentChampions = await fetchChampionData(currentVersion);
        const currentChampionsList: Champion[] = Object.values(currentChampions);
        setChampions(currentChampionsList);
        setFilteredChampions(currentChampionsList);
      }
    }

    fetchList();
  }, []);

  // Effect to filter champions based on user input
  useEffect(() => {
    if (champions) {
      const filtered = champions.filter((champion) => {
        const nameMatch = champion.name.toLowerCase().includes(search.toLowerCase());
        const tagMatch = champion.tags.some((tag) => tag.toLowerCase() === selectedClass.toLowerCase() || selectedClass.toLowerCase() === "");
        return nameMatch && tagMatch;
      });
      setFilteredChampions(filtered);
    }
  }, [search, selectedClass, champions]);

  // Set search input string
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };

  // Set class input
  const handleClassSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
  };

  return (
    <div className="main-element">
      <h1>League Champion Browser</h1>
      <p>Browse all League of Legends champions for the current patch.</p>

      <div className="filter-row">
        <input
          type="text"
          placeholder="Search champions..."
          value={search}
          onChange={handleSearch}
        />

        <select
          id="championClass"
          onChange={handleClassSelect}>
          <option value="">All</option>
          <option value="assassin">Assassin</option>
          <option value="fighter">Fighter</option>
          <option value="mage">Mage</option>
          <option value="marksman">Marksman</option>
          <option value="support">Support</option>
          <option value="tank">Tank</option>
        </select>
      </div>

      <div className="champion-grid">
        {filteredChampions &&
          filteredChampions.map((champion) => (
            <a
              key={champion.key}
              className="champion-item"
              href={UNIVERSE_URL(champion.id)}
              target="_blank">
              <div className="champion-image">
                <img
                  src={ICON_URL(version!, champion.id)}
                  alt={`${champion.id.toLowerCase()}.png`}
                />
              </div>
              <div className="champion-info">
                <div className="champion-name">{champion.name}</div>
                <div className="champion-title">{capitalizeFirstLetter(champion.title)}</div>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
}
