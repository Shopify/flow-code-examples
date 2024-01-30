import main from "../index";

describe("main", () => {
  it("returns { engravedQty: 2, engravedItems: [...] } when the order has custom attributes with engraving message", () => {
    const input = {
      order : {
        lineItems: [
          {
            title: "Engraved Product",
            quantity: 2,
            customAttributes: [{
              key: "Engraving",
              value: "Happy Birthday!"
            }]
          },
          {
            title: "Not engraved Product",
            quantity: 2,
            customAttributes: []
          },

        ]
      }
    };

    const expectedOutput = {
      engravedQty: 2,
      engravedItems: [
        {
          title: "Engraved Product",
          quantity: 2,
          engraving: "Happy Birthday!"
        }
      ]
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });
});
