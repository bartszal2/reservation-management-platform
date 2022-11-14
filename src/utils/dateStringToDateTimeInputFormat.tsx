import { valueLessThanTen } from "./valueLessThanTenFormat";

export const dateStringToDateTimeInputFormat = (date: string): string => {
  const dateValue: Date = new Date(date);

  const day: number = dateValue.getDate();
  const month: number = dateValue.getMonth() + 1;
  const year: number = dateValue.getFullYear();
  const hours: number = dateValue.getHours();
  const mintues: number = dateValue.getMinutes();

  return `${year}-${valueLessThanTen(month)}-${valueLessThanTen(
    day
  )}T${valueLessThanTen(hours)}:${valueLessThanTen(mintues)}`;
};
