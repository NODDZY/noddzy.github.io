import { useEffect, useState } from "react";

import { fetchSubFeed } from "../services/reddit/api";
import { RedditPost } from "../services/reddit/interface";
import "../styles/routes/reddit-scroller.css";
import RedditPostComponent from "../components/RedditPost";

export default function RedditScroller() {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [selectedSub, setselectedSub] = useState<string>("all");
  const [topPosts, setTopPosts] = useState<boolean>(localStorage.getItem("reddit-setting-filter-top") === "true" || false);
  const [infiniteScroll, setInfiniteScroll] = useState<boolean>(localStorage.getItem("reddit-setting-infinitescroll") === "true" || false);
  const [after, setAfter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, toggleRefresh] = useState<boolean>(true);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [expandedPostLog, setExpandedPostLog] = useState<string[]>([]);

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
  }, [refresh]);

  useEffect(() => {
    localStorage.setItem("reddit-setting-filter-top", topPosts.toString());
    localStorage.setItem("reddit-setting-infinitescroll", infiniteScroll.toString());
  }, [infiniteScroll, topPosts]);

  useEffect(() => {
    setAfter("");
    setPosts([]);
    toggleRefresh(!refresh);
  }, [selectedSub, topPosts]);

  const handleLoadMore = () => {
    fetchRedditFrontPage();
  };

  const isAtBottomOfPage = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    return scrollTop + windowHeight >= documentHeight;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (infiniteScroll && isAtBottomOfPage() && !isLoading) {
        handleLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [infiniteScroll, after]);

  const handleToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExpandPost = (postId: string) => {
    if (!expandedPostLog.includes(postId)) {
      setExpandedPostLog([...expandedPostLog, postId]);
    }
    setExpandedPostId(postId === expandedPostId ? null : postId);
  };

  return (
    <div className="main-element reddit-scroller">
      <h1>Reddit Scroller</h1>
      <div className="settings-row">
        <button onClick={() => setTopPosts(!topPosts)}>Filter: {topPosts ? "Top posts" : "New posts"}</button>
        <button onClick={() => setInfiniteScroll(!infiniteScroll)}>Infinite scrolling: {infiniteScroll ? "On" : "Off"}</button>
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
            expandedPostLog={expandedPostLog}
            selectedSub={selectedSub}
            handleExpandPost={handleExpandPost}
          />
        ))}
      </div>

      {isLoading && <p>Loading...</p>}
      {after && !isLoading && !infiniteScroll && (
        <div className="button-row">
          <button onClick={handleLoadMore}>Load More</button>
          <button onClick={handleToTop}>To Top</button>
        </div>
      )}
    </div>
  );
}
