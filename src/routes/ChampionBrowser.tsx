import { ChangeEvent, useEffect, useState } from "react";
import { fetchChampionData, fetchCurrentVersion } from "../services/league/api";
import { capitalizeFirstLetter } from "../services/league/utils";
import ChampionSearchBar from "../components/ChampionSearchBar";
import "../styles/champion-browser.css";

export default function ChampionBrowser() {
  const [version, setVersion] = useState<string | null>(null);
  const [champions, setChampions] = useState<Champion[] | null>(null);

  const [search, setSearch] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [filteredChampions, setFilteredChampions] = useState<Champion[] | null>(null);

  useEffect(() => {
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

  useEffect(() => {
    if (champions) {
      const filtered = champions.filter((champion) => {
        const nameMatch = champion.name.toLowerCase().includes(search.toLowerCase());
        const tagMatch = champion.tags.some((tag) => tag.toLowerCase() === selectedClass.toLowerCase() || selectedClass.toLowerCase() === "");
        return nameMatch && tagMatch;
      });
      setFilteredChampions(filtered);
    }
  }, [search, selectedClass]);

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  const handleClassSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
  };

  return (
    <div className="main-element">
      <h1>League Champion Browser</h1>
      <p>Browse all League of Legends champions for the current patch.</p>

      <div className="filter-row">
        <ChampionSearchBar onSearch={handleSearch} />

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
              href={`https://universe.leagueoflegends.com/en_US/champion/${champion.id.toLowerCase()}/`}
              target="_blank">
              <div className="champion-image">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`}
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
