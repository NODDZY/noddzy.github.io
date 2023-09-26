import axios from "axios";

const DDRAGON_URL = "https://ddragon.leagueoflegends.com";

export async function fetchCurrentVersion(): Promise<string> {
  const leagueVersions = await axios.get(`${DDRAGON_URL}/api/versions.json`);
  const currentLeagueVersion = leagueVersions.data[0];
  console.log(`League of Legends [${currentLeagueVersion}]`);

  return currentLeagueVersion;
}

export async function fetchChampionData(version: string) {
  const leagueChampionsResponse = await axios.get(`${DDRAGON_URL}/cdn/${version}/data/en_US/champion.json`);
  const leagueChampionsData = leagueChampionsResponse.data.data;
  console.log(`Champion data: `, leagueChampionsData);
  return leagueChampionsData;
}
