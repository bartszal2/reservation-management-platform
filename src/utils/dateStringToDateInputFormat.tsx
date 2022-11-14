import { valueLessThanTen } from "./valueLessThanTenFormat";

export const dateStringToInputFormat = (date: string): string => {
  const dateValue: Date = new Date(date);

  const day: number = dateValue.getDate();
  const month: number = dateValue.getMonth() + 1;
  const year: number = dateValue.getFullYear();

  return `${year}-${valueLessThanTen(month)}-${valueLessThanTen(day)}`;
};
