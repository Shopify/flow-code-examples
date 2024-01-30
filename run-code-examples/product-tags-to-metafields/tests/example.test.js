import main from "../index";

describe("main", () => {
  it("returns { colorMetafield: ['blue','red','green'] } when product already has ['blue'] for metafield and tags are blue,red,green", () => {
    const input = {
      product: {
        tags: [
          "color:red",
          "color:green",
          "color:blue",
        ],
        metafields: [
          {
            namespace: "custom",
            key: "product_colors",
            value: '["blue"]',
          },
        ],
      },
    };

    const expectedOutput = {
      colorMetafield: JSON.stringify(["blue","red","green"]),
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });
  it("returns { colorMetafield: ['blue','red','green'] } when product already has ['red', 'green'] for metafield and tags are blue,red", () => {
    const input = {
      product: {
        tags: [
          "color:red",
          "color:green",
        ],
        metafields: [
          {
            namespace: "custom",
            key: "product_colors",
            value: '["blue", "red"]',
          },
        ],
      },
    };

    const expectedOutput = {
      colorMetafield: JSON.stringify(["blue","red","green"]),
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });
});
