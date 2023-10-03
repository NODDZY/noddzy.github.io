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
  } else {
    result = millis / 1000 / 60 / 60 / 24;
    unit = "days";
  }

  return `${result.toFixed(0)} ${unit}`;
}

export function utcTimestampToUtcDate(utcTimestamp: number) {
  return new Date(utcTimestamp * 1000);
}
