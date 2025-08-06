// Filter line items based on merchants desired parameter
function shouldSplitLineItem(orderLineItems, fulfillmentOrderLineItem) {
   return orderLineItems.some(lineItem => {
    return lineItem.variant.product.title === fulfillmentOrderLineItem.productTitle && lineItem.variant.product.tags.includes("Refrigerated");
  });
}

export default function main(input) {
  const fulfillmentOrder = input.fulfillmentOrder
  const orderLineItems = input.fulfillmentOrder.order.lineItems
  const fulfillmentOrderSplitLineItems = []
  const fulfillmentOrderSplits = []

  fulfillmentOrder.lineItems.forEach(fulfillmentOrderLineItem => {
    if (shouldSplitLineItem(orderLineItems, fulfillmentOrderLineItem)) {
      fulfillmentOrderSplitLineItems.push({
        "id": fulfillmentOrderLineItem.id,
        "quantity": fulfillmentOrderLineItem.totalQuantity
      })
    }
  });

  if (fulfillmentOrderSplitLineItems.length >= 0) {
    fulfillmentOrderSplits.push({
      "fulfillmentOrderId": fulfillmentOrder.id,
      "fulfillmentOrderLineItems": fulfillmentOrderSplitLineItems,
    })
  }

  return {
    fulfillmentOrderSplits: JSON.stringify(fulfillmentOrderSplits, null),
  }
}
