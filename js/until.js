function getRandomInteger(min, max) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper =  Math.max(Math.abs(min), Math.abs(max));
  const randomNumber = (Math.random() * (upper - lower) + lower);
  return Math.floor(randomNumber);
}

getRandomInteger(20, 50);


function getRandomNumberFloatingPoint(minNumber, maxNumber, floatingPoint) {
  const lower = Math.min(Math.abs(minNumber), Math.abs(maxNumber));
  const upper = Math.max(Math.abs(minNumber), Math.abs(maxNumber));
  const  randomNumberFloat = (Math.random() * (upper - lower) + lower);
  const randomDigitFloat = randomNumberFloat.toFixed(floatingPoint);
  return parseFloat(randomDigitFloat);
}

(getRandomNumberFloatingPoint(140, 100, 1));

const getArrayLength = (array) => {
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

export {getRandomInteger, getRandomNumberFloatingPoint, getArrayLength};
