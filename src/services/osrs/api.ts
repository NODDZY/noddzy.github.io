import axios, { AxiosError } from "axios";
import { PlayerInfoResponse, Snapshot } from "./interface";
import { Period } from "./enum";

// Using Wise Old Man instead of official Jagex API because of missing CORS response header
// See: https://docs.wiseoldman.net/
const WOM_API_URL = "https://api.wiseoldman.net/v2/players/";
const WOM_BASE_URL = "https://wiseoldman.net";
const HISCORE_BASE_URL = "https://secure.runescape.com/m=hiscore_oldschool";

export const SKILL_ICON_URL = (metric: string) => `${WOM_BASE_URL}/img/runescape/icons_small/${metric}.png`;
export const HISCORE_URL = (username: string) => `${HISCORE_BASE_URL}/hiscorepersonal?user1=${encodeURI(username)}`;
export const WOM_URL = (username: string) => `${WOM_BASE_URL}/players/${encodeURI(username)}`;

export async function fetchRunescapeUser(username: string): Promise<PlayerInfoResponse | null> {
  try {
    console.log(`Fetching Runescape user [${username}]`);
    const response = await axios.get(`${WOM_API_URL}${username}`);
    return response.data;
  } catch (error) {
    if ((error as AxiosError)?.response?.status === 404) {
      return null;
    } else {
      throw error;
    }
  }
}

export async function fetchUserSnapshots(username: string, period: Period): Promise<Snapshot[]> {
  console.log(`Fetching snapshots [${username}] for [${period}]`);
  const response = await axios.get(`${WOM_API_URL}${username}/snapshots`, { params: { period: period } });
  return response.data;
}
