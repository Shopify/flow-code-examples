import main from "../index"; // Replace 'your-file' with the actual file path

describe("main", () => {
  it("returns { productCount: 2, hasProduct: true } when the number of products with test in their title is 1", () => {
    const input = {
      order: {
        lineItems: [
          {
            title: "test product",
            quantity: 2,
          },
          {
            title: "another product",
            quantity: 1,
          },
        ],
      },
    };

    const expectedOutput = {
      productCount: 2,
      hasProduct: true,
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });

  describe("main", () => {
    it("returns { productCount: 0, hasProduct: false } when the number of products with test in their title is 0", () => {
      const input = {
        order: {
          lineItems: [
            {
              title: "product",
              quantity: 2,
            },
            {
              title: "another product",
              quantity: 1,
            },
          ],
        },
      };

      const expectedOutput = {
        productCount: 0,
        hasProduct: false,
      };

      const result = main(input);
      expect(result).toEqual(expectedOutput);
    });
  });
});
