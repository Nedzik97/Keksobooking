const getRandomInteger = (min, max) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper =  Math.max(Math.abs(min), Math.abs(max));
  const randomNumber = (Math.random() * (upper - lower) + lower);
  return Math.floor(randomNumber);
};


const getRandomNumberFloatingPoint = (minNumber, maxNumber, floatingPoint) => {
  const lower = Math.min(Math.abs(minNumber), Math.abs(maxNumber));
  const upper = Math.max(Math.abs(minNumber), Math.abs(maxNumber));
  const  randomNumberFloat = (Math.random() * (upper - lower) + lower);
  const randomDigitFloat = randomNumberFloat.toFixed(floatingPoint);
  return parseFloat(randomDigitFloat);
};


const getRandomLength = (array) => {
  const mainArray = array;
  const maxLength = mainArray.length;
  const lengthOfArray = getRandomInteger(1, maxLength);
  const randomArray = [];

  for(let i = 0; i < lengthOfArray; i++) {
    const indexOfEl = getRandomInteger(0, 5);
    const el = mainArray[indexOfEl];

    if (!randomArray.includes(el)) {
      randomArray.push(el);
    }
  }
  return randomArray;
};


const getZeroBeforeInt = (min, max) => {
  const randomValue = getRandomInteger(min, max);
  if (randomValue < 10) {
    return `0${randomValue}`;
  }
  return randomValue;
};

export {getRandomInteger, getRandomNumberFloatingPoint, getRandomLength, getZeroBeforeInt};


