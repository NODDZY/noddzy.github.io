import { useEffect, useState } from "react";

import { fetchSubFeed } from "../services/reddit/api";
import { RedditPost } from "../services/reddit/interface";
import "../styles/routes/reddit-scroller.css";
import RedditPostComponent from "../components/RedditPost";

export default function RedditScroller() {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [selectedSub, setselectedSub] = useState<string>("all");
  const [topPosts, setTopPosts] = useState<boolean>(false);
  const [after, setAfter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, toggleRefresh] = useState<boolean>(false);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const presetSubs = ["all", "2007scape", "AnarchyChess", "LeagueOfMemes", "ProgrammerHumor", "Art", "pettyrevenge", "ghibli", "lotrmemes", "todayilearned"];

  const fetchRedditFrontPage = async () => {
    setIsLoading(true);
    try {
      const response = await fetchSubFeed(selectedSub, topPosts, after);
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
  }, [selectedSub, topPosts]);

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
      <div className="settings-row">
        <button onClick={() => setTopPosts(!topPosts)}>Filter: {topPosts ? "Top" : "New"}</button>
      </div>
      <p>Scroll through selected subreddits. Only inline content currently supported (no embeds).</p>

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
          <RedditPostComponent
            key={post.id}
            post={post}
            expandedPostId={expandedPostId}
            selectedSub={selectedSub}
            handleExpandPost={handleExpandPost}
          />
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
