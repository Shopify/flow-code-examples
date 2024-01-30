/**
 * Count number of products that include an engraving message, stored as a line item attribute
*/
export default function main({order}) {
  const engravedItems = [];
  let engravedQty = 0;

  order.lineItems.forEach(lineItem => {
    const engravedAttr = lineItem.customAttributes.find((attr) => attr.key == "Engraving");

    if(engravedAttr && engravedAttr.value){
      engravedQty += lineItem.quantity;
      engravedItems.push({
        title: lineItem.title,
        quantity: lineItem.quantity,
        engraving: engravedAttr.value
      });
    }
  });

  return {
    engravedQty: engravedQty,
    engravedItems: engravedItems
  }
}
