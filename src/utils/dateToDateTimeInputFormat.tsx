import { valueLessThanTen } from "./valueLessThanTenFormat";

export const dateToDateTimeInputFormat = (date: Date): string => {
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1;
  const year: number = date.getFullYear();
  const hours: number = date.getHours();
  const mintues: number = date.getMinutes();

  return `${year}-${valueLessThanTen(month)}-${valueLessThanTen(
    day
  )}T${valueLessThanTen(hours)}:${valueLessThanTen(mintues)}`;
};
