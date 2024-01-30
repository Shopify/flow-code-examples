/**
 * Check if a product variant is on sale based on the compare-at price
**/
export default function main({productVariant}) {
  const diffPercent = (1 - (productVariant.price / productVariant.compareAtPrice)) * 100;
  if (diffPercent > 20) {
    return { discountType: "clearance" };
  } else if (diffPercent > 0) {
    return { discountType: "sale" };
  } else {
    return { discountType: "list price" };
  }
}
