import { useEffect, useState } from "react";

import { fetchSubFeed } from "../services/reddit/api";
import { RedditResponse, RedditPost } from "../services/reddit/interface";

export default function RedditScroller() {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [after, setAfter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRedditFrontPage = async () => {
    setIsLoading(true);
    try {
      const response = await fetchSubFeed(after);
      const newPosts: RedditPost[] = response.data.children.map((post: RedditResponse) => post.data);
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
    <div className="main-element">
      <h1>Reddit Scroller</h1>
      <p>TODO_TODO_TODO_TODO_TODO</p>

      <div className="posts">
        {posts.map((post) => (
          <div
            key={post.id}
            className="post">
            <h2>{post.title}</h2>
            <p>{post.author}</p>
            <p>{post.score} points</p>
          </div>
        ))}
      </div>

      {isLoading && <p>Loading...</p>}
      {after && !isLoading && <button onClick={handleLoadMore}>Load More</button>}
      <button
        className="to-top-button"
        onClick={handleToTop}>
        To Top
      </button>
    </div>
  );
}
