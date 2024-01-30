/**
 * Calculate what percent of the order total shipping costs represent. Returns 55.5% as 55.5.
*/
export default function main({order}) {
  const subtotal = order.subtotalPriceSet.shopMoney.amount;
  const shipping = order.totalShippingPriceSet.shopMoney.amount;
  return { percentShipping: (shipping / subtotal) * 100};
}
