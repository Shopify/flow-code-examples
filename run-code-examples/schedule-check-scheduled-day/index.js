/**
 * Checks if the current workflow run is scheduled to run on a business day (using the Shop's timezone)
*/
export default function main(input) {
  let scheduledAt = new Date(input.scheduledAt);
  //convert to shop's time
  scheduledAt = new Date(scheduledAt.setMinutes(scheduledAt.getMinutes() + input.shop.timezoneOffsetMinutes));
  const dayOfWeek = scheduledAt.getDay();
  return {
    isBusinessDay: !((dayOfWeek === 6) || (dayOfWeek  === 0)),
  };
}
