import main from "../index";

describe("main", () => {
  [
    {
      name: "is true for business days",
      scheduledAt: "2024-02-22T14:32:00Z",
      expected: true
    },
    {
      name: "is true for business days",
      scheduledAt: "2024-02-19T11:32:00Z",
      expected: true
    },
    {
      name: "is false for business days on weekend in shop's timezone",
      scheduledAt: "2024-02-19T04:32:00Z",
      expected: false
    },
    {
      name: "is false for weekends",
      scheduledAt: "2024-02-24T23:32:00Z",
      expected: false
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
        isBusinessDay: expected,
      };

      const result = main(input);
      expect(result).toEqual(expectedOutput);
    });
  });
});
