/**
 * Checks the current workflow is scheduled to run during the weekend (using Shop's timezone)
*/
export default function main(input) {
  let scheduledAt = new Date(input.scheduledAt);
  //convert to shop's time
  scheduledAt = new Date(scheduledAt.setMinutes(scheduledAt.getMinutes() + input.shop.timezoneOffsetMinutes));
  const dayOfWeek = scheduledAt.getDay();
  return {
    isWeekend: (dayOfWeek === 6) || (dayOfWeek  === 0),
  };
}
