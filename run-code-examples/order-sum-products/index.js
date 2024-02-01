/**
 * Check how many products of a certain type have been ordered
*/

export default function main({order}) {
  // Get all line items whose title contains the word "test"
  const items = order.lineItems.filter((lineItem) => lineItem.title.includes("test"));

  // Sum the quantity of all line items that matches
  const productCount = items.reduce((accum, currentValue) => accum + currentValue.quantity, 0);

  // Return true if there are any matching products
  const hasProduct = productCount > 0 ? true : false;

  return {
    hasProduct: hasProduct,
    productCount: productCount
  }
}
