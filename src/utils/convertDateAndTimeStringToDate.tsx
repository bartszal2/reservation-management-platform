export const convertDateAndTimeStringToDate = (
  date: string,
  time: string
): Date => {
  const hours = time.slice(0, 2);
  const minutes = time.slice(3, 5);

  const dateValue = new Date(date);
  dateValue.setHours(parseInt(hours));
  dateValue.setMinutes(parseInt(minutes));
  dateValue.setSeconds(0);
  dateValue.setMilliseconds(0);

  return dateValue;
};
