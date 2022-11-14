export const dateStringToDateLocalString = (date: string): string => {
  return new Date(date).toLocaleDateString();
};
