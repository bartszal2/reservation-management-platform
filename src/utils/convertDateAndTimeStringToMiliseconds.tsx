export const convertDateAndTimeStringToMiliseconds = (
  date: string | Date,
  time: string
): number => {
  const hoursValue: string = time.slice(0, 2);
  const minutesValue: string = time.slice(3, 5);
  const secondsValue: string = time.slice(6, 8);

  const dateValue: Date = new Date(date);
  dateValue.setHours(parseInt(hoursValue));
  dateValue.setMinutes(parseInt(minutesValue));
  dateValue.setSeconds(secondsValue.length > 0 ? parseInt(secondsValue) : 0);
  dateValue.setMilliseconds(0);

  return dateValue.getTime();
};
