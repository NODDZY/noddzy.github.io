import axios from "axios";
import { RedditResponse } from "./interface";

const LIMIT = 10;
const REDDIT_BASE_URL = "https://www.reddit.com";
const IMAGE_BASE_URL = "https://i.redd.it";

export const SUB_LINK = (name: string) => `${REDDIT_BASE_URL}/${name}`;
export const POST_LINK = (permalink: string) => `${REDDIT_BASE_URL}${permalink}`;
export const GALLERY_IMAGE_URL = (id: string, extention: string) => `${IMAGE_BASE_URL}/${id}.${extention}`;

export async function fetchSubFeed(sub: string, top: boolean, after?: string): Promise<RedditResponse> {
  const response = await axios.get(`${REDDIT_BASE_URL}/r/${sub}${top ? "/top" : ""}.json`, {
    params: {
      raw_json: 1,
      limit: LIMIT,
      t: "all",
      after: after
    }
  });
  return response.data;
}
