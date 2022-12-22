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

const addFormState = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');
  const adFormElements = adForm.children;
  const arrayFormElements = Array.from(adFormElements);
  arrayFormElements.forEach((currentElement) => {
    currentElement.setAttribute('disabled', true);
  });

  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.add('ad-form--disabled');
  const formFilterElements = mapFilters.children;
  const arrayFormFilterElements = Array.from(formFilterElements);
  arrayFormFilterElements.forEach((currentElement) => {
    currentElement.setAttribute('disabled', true);
  });
};


export {getRandomInteger, getRandomNumberFloatingPoint, getRandomLength, addFormState};


