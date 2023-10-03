import axios from "axios";
import { RedditResponse } from "./interface";

const LIMIT = 5;
const REDDIT_BASE_URL = "https://www.reddit.com"

export const POST_LINK = (permalink: string) => `${REDDIT_BASE_URL}${permalink}`;

export async function fetchSubFeed(sub: string, after?: string): Promise<RedditResponse> {
  const response = await axios.get(`${REDDIT_BASE_URL}/r/${sub}.json`, {
    params: {
      raw_json: 1,
      limit: LIMIT,
      after: after
    }
  });
  return response.data;
}
