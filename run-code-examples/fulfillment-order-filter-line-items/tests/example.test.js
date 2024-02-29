import main from "../index";

describe("main", () => {
  it("filters fulfillment order line items based on product tags", () => {
    const input = {
      fulfillmentOrder: {
        id: "gid://shopify/FulfillmentOrder/1",
        lineItems: [
          {
            "id": "gid://shopify/FulfillmentOrderLineItem/1",
            "totalQuantity": 1,
            "productTitle": "Dry Product"
          },
          {
            "id": "gid://shopify/FulfillmentOrderLineItem/2",
            "totalQuantity": 1,
            "productTitle": "Refrigerated Product"
          }
        ],
        order: {
          lineItems: [
          {
            "variant": {
              "product": {
                "title": "Dry Product",
                "tags": [
                  "Dry"
                ]
              }
            }
          },
          {
            "variant": {
              "product": {
                "title": "Refrigerated Product",
                "tags": [
                  "Refrigerated"
                ]
              }
            }
          }
          ]
        }
      }
    };

    const expectedOutput = {
      fulfillmentOrderSplits: "[{\"fulfillmentOrderId\":\"gid://shopify/FulfillmentOrder/1\",\"fulfillmentOrderLineItems\":[{\"id\":\"gid://shopify/FulfillmentOrderLineItem/2\",\"quantity\":1}]}]",
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });

  it("filters fulfillment order line items when multiple products have the specified tag", () => {
    const input = {
      fulfillmentOrder: {
        id: "gid://shopify/FulfillmentOrder/1",
        lineItems: [
          {
            "id": "gid://shopify/FulfillmentOrderLineItem/1",
            "totalQuantity": 1,
            "productTitle": "Refrigerated Product 1"
          },
          {
            "id": "gid://shopify/FulfillmentOrderLineItem/2",
            "totalQuantity": 1,
            "productTitle": "Refrigerated Product 2"
          }
        ],
        order: {
          lineItems: [
          {
            "variant": {
              "product": {
                "title": "Refrigerated Product 1",
                "tags": [
                  "Refrigerated"
                ]
              }
            }
          },
          {
            "variant": {
              "product": {
                "title": "Refrigerated Product 2",
                "tags": [
                  "Refrigerated"
                ]
              }
            }
          }
          ]
        }
      }
    };

    const expectedOutput = {
      fulfillmentOrderSplits: "[{\"fulfillmentOrderId\":\"gid://shopify/FulfillmentOrder/1\",\"fulfillmentOrderLineItems\":[{\"id\":\"gid://shopify/FulfillmentOrderLineItem/1\",\"quantity\":1},{\"id\":\"gid://shopify/FulfillmentOrderLineItem/2\",\"quantity\":1}]}]",
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });

  it("filters fulfillment order line items based on product tags when more then one tag is present", () => {
    const input = {
      fulfillmentOrder: {
        id: "gid://shopify/FulfillmentOrder/1",
        lineItems: [
          {
            "id": "gid://shopify/FulfillmentOrderLineItem/1",
            "totalQuantity": 1,
            "productTitle": "Dry Product"
          },
          {
            "id": "gid://shopify/FulfillmentOrderLineItem/2",
            "totalQuantity": 1,
            "productTitle": "Refrigerated Product"
          }
        ],
        order: {
          lineItems: [
          {
            "variant": {
              "product": {
                "title": "Dry Product",
                "tags": [
                  "Dry",
                  "Automated"
                ]
              }
            }
          },
          {
            "variant": {
              "product": {
                "title": "Refrigerated Product",
                "tags": [
                  "Refrigerated",
                  "Automated"
                ]
              }
            }
          }
          ]
        }
      }
    };

    const expectedOutput = {
      fulfillmentOrderSplits: "[{\"fulfillmentOrderId\":\"gid://shopify/FulfillmentOrder/1\",\"fulfillmentOrderLineItems\":[{\"id\":\"gid://shopify/FulfillmentOrderLineItem/2\",\"quantity\":1}]}]",
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });

  it("filters returns empty fulfillmentOrderLineItems array when no products match the specified tags", () => {
    const input = {
      fulfillmentOrder: {
        id: "gid://shopify/FulfillmentOrder/1",
        lineItems: [
          {
            "id": "gid://shopify/FulfillmentOrderLineItem/1",
            "totalQuantity": 1,
            "productTitle": "Dry Product 1"
          },
          {
            "id": "gid://shopify/FulfillmentOrderLineItem/2",
            "totalQuantity": 1,
            "productTitle": "Dry Product 2"
          }
        ],
        order: {
          lineItems: [
          {
            "variant": {
              "product": {
                "title": "Dry Product 1",
                "tags": [
                  "Dry"
                ]
              }
            }
          },
          {
            "variant": {
              "product": {
                "title": "Dry Product 2",
                "tags": []
              }
            }
          }
          ]
        }
      }
    };

    const expectedOutput = {
      fulfillmentOrderSplits: "[{\"fulfillmentOrderId\":\"gid://shopify/FulfillmentOrder/1\",\"fulfillmentOrderLineItems\":[]}]",
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });

  it("filters returns empty fulfillmentOrderLineItems array when no product tags are present", () => {
    const input = {
      fulfillmentOrder: {
        id: "gid://shopify/FulfillmentOrder/1",
        lineItems: [
          {
            "id": "gid://shopify/FulfillmentOrderLineItem/1",
            "totalQuantity": 1,
            "productTitle": "Dry Product"
          },
          {
            "id": "gid://shopify/FulfillmentOrderLineItem/2",
            "totalQuantity": 1,
            "productTitle": "Refrigerated Product"
          }
        ],
        order: {
          lineItems: [
          {
            "variant": {
              "product": {
                "title": "Dry Product",
                "tags": []
              }
            }
          },
          {
            "variant": {
              "product": {
                "title": "Refrigerated Product",
                "tags": []
              }
            }
          }
          ]
        }
      }
    };

    const expectedOutput = {
      fulfillmentOrderSplits: "[{\"fulfillmentOrderId\":\"gid://shopify/FulfillmentOrder/1\",\"fulfillmentOrderLineItems\":[]}]",
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });
});
