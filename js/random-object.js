import {getRandomInteger, getRandomNumberFloatingPoint, getRandomLength} from './util.js';

const QUANTITYENTITY = 10;
const houseTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkinTimes = ['12:00', '13:00', '14:00'];
const checkoutTimes = ['12:00', '13:00', '14:00'];
const houseFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.'
];
const photoIndexes = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

const headlines = [
  'Любите захватывающий вид? Райский шалаш для молодоженов. Исключительный случай – дом в нашем районе со скидкой!',
  'Увлекательное место для отдыха с друзьями',
  'Устали от шума и городской суеты? Тогда это место для вас',
  'Этот дом возле озера может стать вашим на этот уикенд',
  'Живите красиво уже сегодня, подчеркните свой статус, квартира в самом центре города для вас!'
];

const houseDescriptions = [
  'Чудесный дом с видом на море, а также собственный пляж!',
  'У меня небольшая светлая комната с приятными светло-серыми обоями. На всю стену — огромное окно, через которое к комнате утром заглядывает солнышко.',
  'Квартира с большой гостинной комнатой в которой вам точно будет комфортно',
  'Уютный домик в лесу для семьи. На территории есть все удобства для отдыха',
  'Небольшая квартира-студия с личным кабинетом и панорамными окнами из которых открывается великолепный вид на Манхэттен'
];


const createRandomAuthor = () => {
  const author = {
    avatar: `img/avatars/user${photoIndexes.shift()}.png`
  };
  return author;
};


const createRandomLocation = () => {
  const location = {
    lat: getRandomNumberFloatingPoint(35.65, 35.70, 5),
    lng: getRandomNumberFloatingPoint(139.7, 139.8, 5)
  };
  return location;
};


const createRandomOffer = (location) => {
  const offer = {
    title: headlines[getRandomInteger(0, 4)],
    adress: location,
    price: getRandomInteger(1000, 15000),
    type: houseTypes[getRandomInteger(0, 4)],
    rooms: getRandomInteger(1, 10),
    guests: getRandomInteger(1, 20),
    checkin: checkinTimes[getRandomInteger(0, 2)],
    checkout: checkoutTimes[getRandomInteger(0, 2)],
    features: getRandomLength(houseFeatures),
    description: houseDescriptions[getRandomInteger(0, 4)],
    photos: getRandomLength(photos)
  };
  return offer;
};


const getHouseRental = () => {
  const location = createRandomLocation();

  return {
    author: createRandomAuthor(),
    offer: createRandomOffer(location),
    location,
  };
};


const getHouseRentalCount = () => Array.from({length: QUANTITYENTITY}, getHouseRental);

export {getHouseRentalCount};
