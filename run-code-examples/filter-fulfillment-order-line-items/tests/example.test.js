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
});
