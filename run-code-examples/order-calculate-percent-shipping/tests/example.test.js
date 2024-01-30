import main from "../index";

describe("main", () => {
  it("returns { percentShipping: 50 } when the shipping cost is 50 on a 100 order", () => {
    const input = {
      order: {
        subtotalPriceSet: {
          shopMoney: {
            amount: 100,
          },
        },
        totalShippingPriceSet: {
          shopMoney: {
            amount: 50,
          },
        },
      },
    };

    const expectedOutput = {
      percentShipping: 50,
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });
});
