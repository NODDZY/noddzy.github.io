import { useEffect, useState } from "react";
import { JSONTree } from "react-json-tree";

import { runQuery, BASE_URL } from "../services/pokeapi/api";
import "../styles/routes/pokeapi.css";
import { FiLoader } from "react-icons/fi";

export default function Pokedex() {
  const [query, setQuery] = useState<string>("pokemon/bulbasaur");
  const [prevQuery, setPrevQuery] = useState<string>(query);
  const [response, setResponse] = useState<object | null>(null);
  const [search, toggleSearch] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);

  const fetchResponse = async () => {
    setIsLoading(true);
    try {
      const response = await runQuery(query);
      setResponse(response);
      setPrevQuery(query);
      setNotFound(false);
    } catch (error) {
      console.error("Error reaching PokéAPI", error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResponse();
  }, [search]);

  const handleHints = (query: string) => {
    setQuery(query);
    toggleSearch(!search);
  };

  const jsonString = JSON.stringify(response, null, 2) || "";
  const jsonSize = new TextEncoder().encode(jsonString).length / 1000; // kB
  const jsonLines = (jsonString.match(/\r?\n/g) || "").length + 1;

  return (
    <div className="main-element">
      <h1>PokéAPI Lookup</h1>
      <p>Run queries to the RESTful PokeAPI. The API is linked to an extensive database detailing everything about the Pokémon main game series.</p>
      <div className="search-bar">
        <label>{BASE_URL}</label>
        <input
          type="text"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              toggleSearch(!search);
            }
          }}
          value={query}
        />
        <button onClick={() => toggleSearch(!search)}>{isLoading ? <FiLoader className="spin" /> : "Submit"}</button>
      </div>
      <p>
        Need a hint? Try <a onClick={() => handleHints("pokemon/bulbasaur")}>pokemon/bulbasaur</a>,{" "}
        <a onClick={() => handleHints("pokemon?limit=151")}>pokemon?limit=151</a> or <a onClick={() => handleHints("region/1")}>region/1</a>.
      </p>
      <p>
        Direct link to results:{" "}
        <a
          href={BASE_URL + prevQuery}
          target="_blank">
          {BASE_URL + prevQuery}
        </a>
      </p>
      {response && !notFound ? (
        <div className="response-area">
          <h3>Resource for {prevQuery}</h3>
          <p className="json-info">
            JSON ({jsonSize} kB, {jsonLines} lines)
          </p>
          <div className="json-viewer">
            <JSONTree
              data={response}
              hideRoot
              shouldExpandNodeInitially={(keyName, data) =>
                !(
                  (Array.isArray(data) && data.length > 3) ||
                  (!Number.isInteger(keyName[0]) && Object.keys(data as object).length > 3) ||
                  (Number.isInteger(keyName[1]) && Array.isArray(data))
                )
              }
            />
          </div>
        </div>
      ) : (
        <div className="response-area">
          <h3>Resource not found</h3>
          <p className="json-info">JSON (undefined)</p>
        </div>
      )}
    </div>
  );
}
