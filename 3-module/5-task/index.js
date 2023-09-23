function getMinMax(str) {

  let result = {};
  
  let arr = str
            .split(' ')
            .map(item => +item)
            .filter(item => isFinite(item))
            .sort((a, b) => a - b);

  result.min = arr[0];
  result.max = arr[arr.length - 1];

  return result;
}
