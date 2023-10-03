export interface RedditResponse {
  kind: string;
  data: RedditPost;
}

export interface RedditPost {
  id: string;
  subreddit: string;
  subreddit_name_prefixed: string;
  title: string;
  author: string;
  score: number;
  url: string;
  spoiler: boolean;
  post_hint: string;
}
