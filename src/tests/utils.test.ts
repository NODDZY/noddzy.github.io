import { describe, it, expect, suite } from "vitest";

import { capitalizeFirstLetter } from "../services/league/utils";
import { degreesToCardinal, msToKph, getDayAsString } from "../services/weather/utils";

suite("Champion browser", () => {
  describe("capitalizeFirstLetter function", () => {
    it("should capitalize the first letter of a string", () => {
      const input = "mundivagant";
      const result = capitalizeFirstLetter(input);
      expect(result).toBe("Mundivagant");
    });

    it("should handle an empty string", () => {
      const input = "";
      const result = capitalizeFirstLetter(input);
      expect(result).toBe("");
    });

    it("should handle non-string input", () => {
      const input = 123;
      const result = capitalizeFirstLetter(input as any);
      expect(result).toBe(123);
    });
  });
});

suite("Weather forecast", (test) => {
  test("degreesToCardinal should return the correct cardinal direction", () => {
    const testCases = [
      { input: 0, expected: "N" },
      { input: 45, expected: "NE" },
      { input: 90, expected: "E" },
      { input: 135, expected: "SE" },
      { input: 180, expected: "S" },
      { input: 225, expected: "SW" },
      { input: 270, expected: "W" },
      { input: 315, expected: "NW" }
    ];

    for (const { input, expected } of testCases) {
      const result = degreesToCardinal(input);
      expect(result).toBe(expected);
    }
  });

  test("getDayAsString should return the correct day of the week", () => {
    const testCases = [
      { input: 0, expected: "Sunday" },
      { input: 4, expected: "Thursday" },
      { input: 6, expected: "Saturday" }
    ];

    for (const { input, expected } of testCases) {
      const result = getDayAsString(input);
      expect(result).toBe(expected);
    }
  });

  test("msToKph should convert meters per second to kilometers per hour", () => {
    const testCases = [
      { input: 1, expected: 3.6 },
      { input: 5, expected: 18 },
      { input: 10, expected: 36 }
    ];

    for (const { input, expected } of testCases) {
      const result = msToKph(input);
      expect(result).toBe(expected);
    }
  });
});
