function getRandomNumber(min, max) {
  let getQuantity = Math.floor(Math.random() * (max - min + 1) + min);
  if (min >= max) {
    getQuantity = (Math.random() * (max - min + 1) + min);
  }
  return getQuantity;
}


for (let i = 1; i <= 10; i++) {
  getRandomNumber(0, 50);
}


function getRandomNumberFloatingPoint(minNumber, maxNumber, numSimbolsAfterCom) {
  let getQuantitySecond = (Math.random() * (maxNumber - minNumber + 1) + minNumber);
  if (minNumber >= maxNumber) {
    getQuantitySecond = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
  }
  return getQuantitySecond.toFixed(numSimbolsAfterCom);
}


for (let i = 1; i <= 10; i++) {
  getRandomNumberFloatingPoint(140, 100, 4);
}
