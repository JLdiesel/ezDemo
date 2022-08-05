
export const isObject = (value: any) => {
  return typeof value === 'object' && value !== null;
};
export const isFunction = (value: any) => {
  return typeof value === 'function';
};
export const isArray = (value: any) => {
  return Array.isArray(value);
};
export const isString = (value: any) => {
  return typeof value === 'string';
};
export const isNumber = (value: any) => {
  return typeof value === 'number';
};
export const isBoolean = (value: any) => {
  return typeof value === 'boolean';
};
