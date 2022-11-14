export const valueLessThanTen = (value: number): string | number => {
  if (value < 10) {
    return "0" + value;
  } else {
    return value;
  }
};
