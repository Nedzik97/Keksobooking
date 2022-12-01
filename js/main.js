function getRandomInteger(min, max) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper =  Math.max(Math.abs(min), Math.abs(max));
  const getQuantity = (Math.random() * (upper - lower) + lower);
  return Math.floor(getQuantity);
}

console.log(getRandomInteger(20, 50));


function getRandomNumberFloatingPoint(minNumber, maxNumber, floatingPoint) {
  const lower = Math.min(Math.abs(minNumber), Math.abs(maxNumber));
  const upper = Math.max(Math.abs(minNumber), Math.abs(maxNumber));
  const  getQuantityFloat = (Math.random() * (upper - lower) + lower);
  return getQuantityFloat.toFixed(floatingPoint);
}


console.log(getRandomNumberFloatingPoint(140, 100, 1));

