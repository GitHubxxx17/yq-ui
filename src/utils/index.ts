export const isObject = (obj: any): boolean => {
  return obj && typeof obj === "object";
};

export const isNumber = (number: any): boolean => {
  return number && !Number.isNaN(number) && typeof number === "number";
};
