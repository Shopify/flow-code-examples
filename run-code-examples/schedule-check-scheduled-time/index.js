/**
 * Checks the current workflow is scheduled to run during business hours (using Shop's timezone)
*/
export default function main(input) {
  const scheduledAt = new Date(input.scheduledAt);
  //convert to shop's time
  scheduledAt.setMinutes(scheduledAt.getMinutes() + input.shop.timezoneOffsetMinutes);
  const hours = scheduledAt.getUTCHours()
  return {
    isBusinessHours: (hours >= 9 && hours < 17)
  };
}
