import main from "../index";

describe("main", () => {
  [
    {
      name: "is false for business days",
      scheduledAt: "2024-02-22T14:32:00Z",
      expected: false
    },
    {
      name: "is true for weekends",
      scheduledAt: "2024-02-24T23:32:00Z",
      expected: true
    },
  ].forEach(({name, scheduledAt, expected}) => {
    it(name, () => {
      const input = {
        scheduledAt: scheduledAt,
        shop: {
          timezoneOffsetMinutes: -300
        }
      };

      const expectedOutput = {
        isWeekend: expected,
      };

      const result = main(input);
      expect(result).toEqual(expectedOutput);
    });
  });
});
