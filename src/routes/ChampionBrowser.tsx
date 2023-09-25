import { useEffect, useState } from "react";
import { fetchChampionData, fetchCurrentVersion } from "../services/league/api";
import { capitalizeFirstLetter } from "../services/league/utils";
import ChampionSearchBar from "../components/ChampionSearchBar";
import "../styles/champion-browser.css";

export default function ChampionBrowser() {
  const [version, setVersion] = useState<string | null>(null);
  const [champions, setChampions] = useState<Champion[] | null>(null);

  const [filteredChampions, setFilteredChampions] = useState<Champion[] | null>(null);

  useEffect(() => {
    async function fetchList() {
      const currentVersion = await fetchCurrentVersion();
      setVersion(currentVersion);
      if (currentVersion) {
        const currentChampions = await fetchChampionData(currentVersion);
        setChampions(currentChampions);
        setFilteredChampions(currentChampions);
      }
    }

    fetchList();
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (champions) {
      const filtered = Object.values(champions).filter((champion) => champion.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredChampions(filtered);
    }
  };

  return (
    <div className="main-element">
      <h1>League Champion Browser</h1>
      <p>Browse all League of Legends champions for the current patch.</p>

      <ChampionSearchBar onSearch={handleSearch} />

      <div className="champion-grid">
        {filteredChampions &&
          Object.values(filteredChampions).map((champion) => (
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
