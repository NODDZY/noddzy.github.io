import { useEffect, useState } from "react";
import { fetchChampionData, fetchCurrentVersion } from "../services/league/api";
import { capitalizeFirstLetter } from "../services/league/utils";
import "../styles/champion-browser.css";

export default function ChampionBrowser() {
  const [version, setVersion] = useState<string | null>(null);
  const [champions, setChampions] = useState<Object | null>(null);

  useEffect(() => {
    async function fetchList() {
      const currentVersion = await fetchCurrentVersion();
      setVersion(currentVersion);
      if (currentVersion) {
        const currentChampions = await fetchChampionData(currentVersion);
        setChampions(currentChampions);
      }
    }

    fetchList();
  }, []);

  return (
    <div className="main-element">
      <h1>League Champion Browser</h1>
      <p>Browse all League of Legends champions for the current patch.</p>

      <div className="champion-grid">
        {champions &&
          Object.values(champions).map((champion) => (
            <a
              key={champion.key}
              className="champion-item"
              href={`https://universe.leagueoflegends.com/en_US/champion/${champion.id.toLowerCase()}/`}
              target="_blank">
              <div className="champion-image">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`}
                  alt={champion.name}
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
