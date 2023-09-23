export function degreesToCompass(degrees: number) {
  const directions = ["N", "NW", "W", "SW", "S", "SE", "E", "NE"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

export function getDayAsString(day: number) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[day];
}
