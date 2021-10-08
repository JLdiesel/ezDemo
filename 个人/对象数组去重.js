const obj = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 1 }];
let newObj = obj.reduce(
  (prev, current) =>
    prev.some((item) => item.id === current.id) ? prev : prev.concat(current),
  []
);
