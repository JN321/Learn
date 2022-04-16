// 收集所有的入参 ==> 存放所有参数的数组 ==> 累加这个数组 ==> 累加
function add() {
  let arr = [...arguments];
  const resultFn = function () {
    arr = [...arr, ...arguments];
    return resultFn;
  };
  resultFn.toString = function () {
    return arr.reduce((prev, current) => prev + current);
  };
  return resultFn;
}

console.log("" + add(1, 2)(2, 6, 7, 8)(3)(1, 2, 3, 4));
