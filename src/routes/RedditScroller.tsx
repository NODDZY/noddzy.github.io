import { useEffect, useState } from "react";

import { POST_LINK, fetchSubFeed } from "../services/reddit/api";
import { RedditPost } from "../services/reddit/interface";
import "../styles/routes/reddit-scroller.css";

export default function RedditScroller() {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [selectedSub, setselectedSub] = useState<string>("all");
  const [after, setAfter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleLoadMore = () => {
    fetchRedditFrontPage();
  };

  const handleToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="main-element reddit-scroller">
      <h1>Reddit Scroller</h1>
      <p>TODO: {posts.length}</p>

      <div className="posts">
        {posts.map((post) => (
          <div
            key={post.id}
            className="post">
            <h2 title={post.title}>
              <a
                href={POST_LINK(post.permalink)}
                target="_blank">
                {post.title}
              </a>
            </h2>
            <p>{post.author}</p>
            <p>{post.score} points</p>
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
