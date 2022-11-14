export const saveToLocalstorage = (name: string, value: any): void => {
  localStorage.setItem(name, JSON.stringify(value));
};
