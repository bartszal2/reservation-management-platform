export const dateStringToLocalString = (date: string): string => {
  return new Date(date).toLocaleString();
};
