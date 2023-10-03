import { useEffect, useState } from "react";
import { marked } from "marked";
import { FiChevronDown } from "react-icons/fi";

import { POST_LINK, SUB_LINK, fetchSubFeed } from "../services/reddit/api";
import { RedditPost } from "../services/reddit/interface";
import { getTimeSinceUtcTimestamp, utcTimestampToUtcDate } from "../services/reddit/utils";
import "../styles/routes/reddit-scroller.css";

export default function RedditScroller() {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [selectedSub, setselectedSub] = useState<string>("all");
  const [after, setAfter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, toggleRefresh] = useState<boolean>(false);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const presetSubs = ["all", "2007scape", "AnarchyChess", "greentext", "lotrmemes", "ProgrammerHumor", "LeagueOfMemes", "ghibli", "ImaginarySliceOfLife"];

  const fetchRedditFrontPage = async () => {
    setIsLoading(true);
    try {
      const response = await fetchSubFeed(selectedSub, after);
      const newPosts: RedditPost[] = response.data.children.map((child) => child.data);
      setPosts([...posts, ...newPosts]);
      setAfter(response.data.after);
    } catch (error) {
      console.error("Error fetching Reddit front page:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRedditFrontPage();
  }, []);

  useEffect(() => {
    fetchRedditFrontPage();
  }, [refresh]);

  useEffect(() => {
    setAfter("");
    setPosts([]);
    toggleRefresh(!refresh);
  }, [selectedSub]);

  const handleLoadMore = () => {
    fetchRedditFrontPage();
  };

  const handleToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExpandPost = (postId: string) => {
    setExpandedPostId(postId === expandedPostId ? null : postId);
  };

  return (
    <div className="main-element reddit-scroller">
      <h1>Reddit Scroller</h1>
      <p>TODO: {posts.length}</p>

      <div className="subreddit-buttons">
        {presetSubs.map((subreddit) => (
          <button
            key={subreddit}
            onClick={() => setselectedSub(subreddit)}
            className={selectedSub === subreddit ? "selected" : ""}>
            {subreddit}
          </button>
        ))}
      </div>

      <div className="posts">
        {posts.map((post) => (
          <div
            key={post.id}
            className="post">
            <div>
              <h2 title={post.title}>
                <a
                  href={POST_LINK(post.permalink)}
                  target="_blank">
                  {post.title}
                </a>
              </h2>
              <p>
                submitted <span title={utcTimestampToUtcDate(post.created_utc).toUTCString()}>{getTimeSinceUtcTimestamp(post.created_utc)} ago</span> by{" "}
                {post.author} to{" "}
                <a
                  href={SUB_LINK(post.subreddit_name_prefixed)}
                  className="subreddit">
                  {post.subreddit_name_prefixed}
                </a>
              </p>
              <p className="points">
                {post.score} points | {post.num_comments} comments
              </p>

              {expandedPostId === post.id && (
                <div className="expanded-content">
                  <p dangerouslySetInnerHTML={{ __html: marked(post.selftext) }}></p>
                </div>
              )}
            </div>

            <div
              className="post-preview"
              onClick={() => handleExpandPost(post.id)}>
              <FiChevronDown />
            </div>
          </div>
        ))}
      </div>

      {isLoading && <p>Loading...</p>}
      {after && !isLoading && (
        <div className="button-row">
          <button onClick={handleLoadMore}>Load More</button>
          <button onClick={handleToTop}>To Top</button>
        </div>
      )}
    </div>
  );
}
