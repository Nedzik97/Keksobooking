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
  return randomDigitFloat;
}

getRandomNumberFloatingPoint(140, 100, 1);


const houseTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkinTimes = ['12:00', '13:00', '14:00'];
const checkoutTimes = ['12:00', '13:00', '14:00'];
const houseFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.'
];

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


const createRandomAuthor = () => {
  const author = {
    avatar: `img/avatars/user${getRandomInteger(1, 10)}.png`
  };
  return author;
};

createRandomAuthor();


const createRandomLocation = () => {
  const location = {
    lat: (getRandomNumberFloatingPoint(35.65, 35.70, 5)),
    lng: (getRandomNumberFloatingPoint(139.7, 139.8, 5))
  };
  return location;
};

createRandomLocation();


const createRandomOffer = () => {
  const offer = {
    title: '«Любите захватывающий вид? Райский шалаш для молодоженов. Исключительный случай – дом в нашем районе со скидкой!»',
    adress: createRandomLocation(),
    price: getRandomInteger(1000, 15000),
    rooms: houseTypes[getRandomInteger(0, 4)],
    guests: getRandomInteger(1, 20),
    checkin: checkinTimes[getRandomInteger(0, 2)],
    checkout: checkoutTimes[getRandomInteger(0, 2)],
    features: getArrayLength(houseFeatures),
    description: 'У меня небольшая светлая комната с приятными светло-серыми обоями. На всю стену — огромное окно, через которое к комнате утром заглядывает солнышко.',
    photos: getArrayLength(photos)
  };
  return offer;
};

createRandomOffer();


const getHouseRental = () => ({
  author: createRandomAuthor(),
  offer: createRandomOffer(),
  location: createRandomLocation()
});

const QUANTITYENTITY = 10;

const getHouseRentalCount =  Array.from({length: QUANTITYENTITY}, getHouseRental);

