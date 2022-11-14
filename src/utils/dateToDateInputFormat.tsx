import { valueLessThanTen } from "./valueLessThanTenFormat";

export const dateToDateInputFormat = (date: Date): string => {
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1;
  const year: number = date.getFullYear();

  return `${year}-${valueLessThanTen(month)}-${valueLessThanTen(day)}`;
};
