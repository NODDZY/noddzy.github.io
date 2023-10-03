import axios from "axios";

const LIMIT = 25;

export async function fetchSubFeed(after?: string) {
    const response = await axios.get(`https://www.reddit.com/r/all.json?limit=${LIMIT}&raw_json=1&after=${after}`);
    return response.data;
  }