import { RedditPost } from "./interface";

export function getTimeSinceUtcTimestamp(utcTimestamp: number) {
  const utcMilliseconds = utcTimestamp * 1000;
  const currentTime = Date.now();

  const millis = currentTime - utcMilliseconds;

  let result: number;
  let unit: string;

  if (millis < 1000) {
    result = millis;
    unit = "milliseconds";
  } else if (millis < 60 * 1000) {
    result = millis / 1000;
    unit = "seconds";
  } else if (millis < 60 * 60 * 1000) {
    result = millis / 1000 / 60;
    unit = "minutes";
  } else if (millis < 24 * 60 * 60 * 1000) {
    result = millis / 1000 / 60 / 60;
    unit = "hours";
  } else if (millis < 7 * 24 * 60 * 60 * 1000) {
    result = millis / 1000 / 60 / 60 / 24;
    unit = "days";
  } else if (millis < 30 * 24 * 60 * 60 * 1000) {
    result = millis / 1000 / 60 / 60 / 24 / 7;
    unit = "weeks";
  } else if (millis < 365 * 24 * 60 * 60 * 1000) {
    result = millis / 1000 / 60 / 60 / 24 / 30;
    unit = "months";
  } else {
    result = millis / 1000 / 60 / 60 / 24 / 365;
    unit = "years";
  }

  return `${result.toFixed(0)} ${unit}`;
}

export function utcTimestampToUtcDate(utcTimestamp: number) {
  return new Date(utcTimestamp * 1000);
}

export function classifyRedditPost(post: RedditPost) {
  if (post.post_hint === "image" && !post.selftext) {
    return "Image";
  } else if (post.post_hint === "image" && post.selftext) {
    return "TextImage";
  } else if (post.post_hint === "video" || post.post_hint === "rich:video" || post.is_video) {
    return "Video";
  } else if (post.gallery_data && post.gallery_data.items.length > 1) {
    return "Images";
  } else if (post.is_self && post.selftext) {
    return "Text";
  } else {
    return null;
  }
}
