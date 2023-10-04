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
  is_self: boolean;
  is_video: boolean;
  media_embed: object;
  media: {
    reddit_video: {
      fallback_url: string;
      is_gif: boolean;
    };
  };
  media_metadata: {
    [mediaId: string]: {
      status: string;
      e: string;
      m: string;
    };
  };
  gallery_data: {
    items: {
      media_id: string;
      id: number;
    }[];
  };
}
