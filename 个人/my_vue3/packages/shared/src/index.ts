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
const hasOwnProperty = Object.prototype.hasOwnProperty;

export const hasOwn = (value, key) => hasOwnProperty.call(value, key);
// 位运算& | 适合权限的组合 let user=增加| 删除  user&增加>0 user&修改=0
export const enum ShapeFlags {
  ELEMENT = 1,
  FUNCTION_COMPONENT = 1 << 1,
  STATEFUL_COMPONENT = 1 << 2,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENTS_KEPT_ALIVE = 1 << 9,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTION_COMPONENT
}
export function isVnode(value) {
  return !!value?.__v_isVnode;
}
