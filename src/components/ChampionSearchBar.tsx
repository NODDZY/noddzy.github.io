import { useState, ChangeEvent } from "react";

interface ChampionSearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function ChampionSearchBar({ onSearch }: ChampionSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search champions..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}
