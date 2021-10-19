/* var twoSum = function (nums, target) {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        const num1 = nums[i]
        const num2=target-nums[i]
        map.set(nums[i],i )
    map.forEach((value, key) => {
        
    })
}
}; */

var twoSum = (nums, target) => {
  for (let i = 0; i < nums.length; ) {
    const num2 = target - nums[i];
    delete nums[i];
    if (nums.filter((n) => n == num2).length != 0 && nums[i] != num2)
      return [i, nums.findIndex((n) => n == num2)];
    else i++;
  }
};
console.log(twoSum([1, 5, 3, 3, 3, 3, 3], 6));
