let obj = {};
let assignOjb = {};
const arr = [
  { id: 1, options: [] },
  { id: 2, options: [] },
];
for (const item of arr) {
  assignOjb[item.id] = '';
}
obj = Object.assign({}, obj, assignOjb);
