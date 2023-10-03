export interface RedditResponse {
  kind: string;
  data: {
    after: string;
    dist: number;
    children: RedditResponseChild[];
    before: string;
  };
}

export interface RedditResponseChild {
  kind: string;
  data: RedditPost;
}

export interface RedditPost {
  id: string;
  subreddit: string;
  subreddit_name_prefixed: string;
  created_utc: number;
  title: string;
  selftext: string;
  author: string;
  score: number;
  num_comments: number;
  permalink: string;
  url: string;
  spoiler: boolean;
  post_hint: string;
}
