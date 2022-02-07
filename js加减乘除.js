const numberCal = {
  // 加法运算
  add(a, b) {
    let c, d, e;
    try {
      c = a.toString().split('.')[1].length;
    } catch (f) {
      c = 0;
    }
    try {
      d = b.toString().split('.')[1].length;
    } catch (f) {
      d = 0;
    }

    return (
      (e = Math.pow(10, Math.max(c, d))), (this.mul(a, e) + this.mul(b, e)) / e
    );
  },

  // 减法运算
  sub(a, b) {
    let c, d, e;
    try {
      c = a.toString().split('.')[1].length;
    } catch (f) {
      c = 0;
    }
    try {
      d = b.toString().split('.')[1].length;
    } catch (f) {
      d = 0;
    }

    return (
      (e = Math.pow(10, Math.max(c, d))), (this.mul(a, e) - this.mul(b, e)) / e
    );
  },

  // 乘法运算
  mul(a, b) {
    let c = 0,
      d = a.toString(),
      e = b.toString();
    try {
      c += d.split('.')[1].length;
    } catch (f) {}
    try {
      c += e.split('.')[1].length;
    } catch (f) {}

    return (
      (Number(d.replace('.', '')) * Number(e.replace('.', ''))) /
      Math.pow(10, c)
    );
  },

  // 除法运算
  div(a, b) {
    let c,
      d,
      e = 0,
      f = 0;
    try {
      e = a.toString().split('.')[1].length;
    } catch (g) {}
    try {
      f = b.toString().split('.')[1].length;
    } catch (g) {}

    return (
      (c = Number(a.toString().replace('.', ''))),
      (d = Number(b.toString().replace('.', ''))),
      this.mul(c / d, Math.pow(10, f - e))
    );
  },
};
console.log(numberCal.add(1.52, 5.23) === 6.75); //true
console.log(numberCal.sub(1.52, 5.23) === -3.71); //true
console.log(numberCal.div(5.55, 1.11) === 5); //true
console.log(numberCal.mul(5.55, 1.11) === 6.1605); //true
console.log(1.52 + 5.23 === 6.75); //true
console.log(1.52 - 5.23 === -3.71);
//false
console.log(5.55 / 1.11 === 5);
//false
console.log(5.55 * 1.11 === 6.1605);
//false
