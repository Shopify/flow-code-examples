import main from "../index";

describe("main", () => {
  [
    {
      name: "is true for business hours",
      scheduledAt: "2024-01-24T14:32:00Z",
      expected: true
    },
    {
      name: "is false for outside business hours",
      scheduledAt: "2024-01-24T23:32:00Z",
      expected: false
    },
    {
      name: "is true for opening",
      scheduledAt: "2024-01-24T14:00:00Z",
      expected: true
    },
    {
      name: "is false at closing",
      scheduledAt: "2024-01-24T22:00:00Z",
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
        isBusinessHours: expected,
      };

      const result = main(input);
      expect(result).toEqual(expectedOutput);
    });
  });
});
