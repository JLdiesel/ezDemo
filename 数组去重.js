function unique(arr, key) {
  const res = new Map();

  return arr.filter((arr) => !res.has(arr[key]) && res.set(arr[key], 1));
}
