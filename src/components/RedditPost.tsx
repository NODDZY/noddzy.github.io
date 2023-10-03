import { useEffect, useState } from "react";
import { marked } from "marked";
import { FiChevronDown, FiChevronUp, FiFileText, FiFilm, FiImage } from "react-icons/fi";

import { GALLERY_IMAGE_URL, POST_LINK, SUB_LINK } from "../services/reddit/api";
import { getTimeSinceUtcTimestamp, utcTimestampToUtcDate, classifyRedditPost } from "../services/reddit/utils";
import { RedditPost } from "../services/reddit/interface";

interface RedditPostComponentProps {
  post: RedditPost;
  expandedPostId: string | null;
  handleExpandPost: (postId: string) => void;
}

type Types = "Image" | "TextImage" | "Text" | "Video" | "Images" | "Unknown";

export default function RedditPostComponent({ post, expandedPostId, handleExpandPost }: RedditPostComponentProps) {
  const [type, setType] = useState<Types | null>(null);

  useEffect(() => {
    setType(classifyRedditPost(post));
  }, []);

  return (
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
          {type === "Text" && <FiFileText />}
          {(type === "Image" || type === "TextImage" || type === "Images") && <FiImage />}
          {type === "Video" && <FiFilm />} submitted{" "}
          <span title={utcTimestampToUtcDate(post.created_utc).toUTCString()}>{getTimeSinceUtcTimestamp(post.created_utc)} ago</span> by {post.author} to{" "}
          <a
            href={SUB_LINK(post.subreddit_name_prefixed)}
            className="subreddit">
            {post.subreddit_name_prefixed}
          </a>
        </p>
        <p className="points">
          {post.score} points | {post.num_comments} comments
        </p>

        {expandedPostId === post.id && type && (
          <div className="expanded-content">
            {(() => {
              switch (type) {
                case "Image":
                  return (
                    <img
                      src={post.url}
                      alt={post.title}></img>
                  );

                case "TextImage":
                  return (
                    <>
                      <img
                        src={post.url}
                        alt={post.title}></img>
                      <p dangerouslySetInnerHTML={{ __html: marked(post.selftext) }}></p>
                    </>
                  );

                case "Text":
                  return <p dangerouslySetInnerHTML={{ __html: marked(post.selftext) }}></p>;

                case "Video":
                  return (
                    <video
                      autoPlay
                      controls>
                      <source src={post.media.reddit_video.fallback_url} />
                      Your browser does not support the video tag.
                    </video>
                  );

                case "Images":
                  return (
                    <>
                      {post.gallery_data.items.map((image) => (
                        <img
                          key={image.id}
                          src={GALLERY_IMAGE_URL(image.media_id, post.media_metadata[image.media_id].m.substring("image/".length))}
                          alt={image.media_id}></img>
                      ))}
                    </>
                  );
              }
            })()}
          </div>
        )}
      </div>

      {type && (
        <div
          className="post-preview"
          onClick={() => handleExpandPost(post.id)}>
          {post.id === expandedPostId ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      )}
    </div>
  );
}
