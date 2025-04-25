/**
 * Totals the sales for a salesperson's previous orders, using metafields to get the salesperson's name
*/

function getSalesperson(order) {
  return order?.purchasingEntity?.PurchasingCompany?.company?.primarySalesperson?.value;
}

export default function main(input) {
  const orders = input.getOrderData || [];
  const salesperson = getSalesperson(input.order);

  console.log(salesperson);

  let total = 0;

  if (salesperson !== undefined) {
    //Loop through orders using forEach
    orders.forEach((order) => {
      // Add null checks for all potentially undefined properties
      const amount = order?.currentTotalPriceSet?.shopMoney?.amount;
      const orderSalesperson = getSalesperson(order);

      console.log(orderSalesperson);

      if (amount > 0 && amount != null && orderSalesperson != undefined) {
        if (orderSalesperson === salesperson) {
          total += amount;
          console.log(total);
        }
      }
    });
  }

  return {
    totalSales: total,
  };
}
