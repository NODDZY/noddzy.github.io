export function degreesToCardinal(degrees: number) {
  const directions = ["N", "NW", "W", "SW", "S", "SE", "E", "NE"];
  const index = Math.round((360 - degrees) / 45) % 8;
  const cardinal = directions[index]
  //console.log(`Converting [${degrees}] into cardinal direction [${cardinal}]`);
  return cardinal;
}

export function getDayAsString(day: number) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[day];
}

export function msToKph(ms: number) {
  const kph = ms * 3.6
  //console.log(`Converting [${ms}m/s] into [${kph}km/h]`);
  return kph;
}
