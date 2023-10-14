export function formatLabels(timestamps: string[]) {
  const formattedDates = timestamps.map((dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);

    return `${month} ${day}`;
  });

  return formattedDates;
}

export function formatNumber(num: string | number, withLetters = false, decimalPrecision = 2) {
  if (num === undefined || num === null) return "-1";
  if (typeof num == "string") return "-1";

  // Float
  if (num % 1 !== 0) {
    return (Math.round(num * 100) / 100).toLocaleString();
  }

  if ((num < 10000 && num > -10000) || !withLetters) {
    return num.toLocaleString();
  }

  // < 100K
  if (num < 100_000 && num > -100_000) {
    if ((num / 1000) % 1 === 0) {
      return `${num / 1000}K`;
    }
    return toFixedPrecision(num / 1000, decimalPrecision) + "K";
  }

  // < 10M
  if (num < 10_000_000 && num > -10_000_000) {
    return Math.round(num / 1000).toLocaleString() + "K";
  }

  // < 1B
  if (num < 1_000_000_000 && num > -1_000_000_000) {
    if ((num / 1_000_000) % 1 === 0) {
      return `${num / 1_000_000}M`;
    }
    return toFixedPrecision(num / 1_000_000, decimalPrecision) + "M";
  }

  // If has no decimals, return as whole number instead (10.00b => 10b)
  if ((num / 1_000_000_000) % 1 === 0) {
    return `${num / 1_000_000_000}B`;
  }

  return toFixedPrecision(num / 1_000_000_000, decimalPrecision) + "B";
}

function toFixedPrecision(number: number, precision = 2) {
  return number.toFixed(precision).replace(/\.?0*$/, "");
}
