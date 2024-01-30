import main from "../index";

describe("main", () => {
  it("returns clearance if discount > 20% ", () => {
    const input = {
      productVariant: {
        price: 10,
        compareAtPrice: 20,
      },
    };

    const expectedOutput = {
      discountType: "clearance",
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });

  it("returns sale if discount > 0% and less than 20 ", () => {
    const input = {
      productVariant: {
        price: 18,
        compareAtPrice: 20,
      },
    };

    const expectedOutput = {
      discountType: "sale",
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });

  it("returns list price if no discount", () => {
    const input = {
      productVariant: {
        price: 20,
        compareAtPrice: 20,
      },
    };

    const expectedOutput = {
      discountType: "list price",
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });


});
