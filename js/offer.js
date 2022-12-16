import {getHouseRentalCount} from './random-object.js';
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const templateFRAGMENT = document.createDocumentFragment();
const announcementMap = document.querySelector('.map__canvas');

const mapTypeHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};


const getRandomFeatures = (array, list) => {
  list.forEach((featureListItem) => {
    const isNeedFeatures = array.some((someComfort) => featureListItem.classList.contains(`popup__feature--${someComfort}`));
    if (!isNeedFeatures) {
      featureListItem.remove();}
  });
};


const getRandomPhotos = (array, container, element) => {
  if (!array) {
    container.remove();
  } else {
    array.forEach((arrayItem) => {
      const photoFragment = element.cloneNode(true);
      photoFragment.src = arrayItem;
      templateFRAGMENT.appendChild(photoFragment);
    });
  }
  return templateFRAGMENT;
};

const checkDataMissing = (data, element) => {
  if (data && !data.includes('undefined')) {
    if (data.indexOf('.png') >= 0) {
      element.src = data;
    } else {
      element.textContent = data;
    }
  } else {
    element.remove();
  }
};

const returnSimilarCard = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const photosContainer = cardElement.querySelector('.popup__photos');
  const photoItem = cardElement.querySelector('.popup__photo');

  checkDataMissing(data.offer.title, cardElement.querySelector('.popup__title'));
  checkDataMissing(`${data.offer.adress.lat}, ${data.offer.adress.lng}`, cardElement.querySelector('.popup__text--address'));
  checkDataMissing(`${data.offer.price} ₽/ночь`, cardElement.querySelector('.popup__text--price'));
  checkDataMissing(mapTypeHousing[data.offer.type], cardElement.querySelector('.popup__type'));
  checkDataMissing(`${data.offer.rooms} комнаты для ${data.offer.guests} гостей`, cardElement.querySelector('.popup__text--capacity'));
  checkDataMissing(`Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`, cardElement.querySelector('.popup__text--time'));

  if (!data.offer.features) {
    cardElement.querySelector('.popup__feature').remove();
  } else {
    getRandomFeatures(data.offer.features, cardElement.querySelectorAll('.popup__feature'));
  }

  checkDataMissing(data.offer.description, cardElement.querySelector('.popup__description'));
  cardElement.querySelector('.popup__photos').appendChild(getRandomPhotos(data.offer.photos, photosContainer, photoItem));
  checkDataMissing(data.author.avatar, cardElement.querySelector('.popup__avatar'));

  return cardElement;
};

const randomData = getHouseRentalCount();
randomData.forEach((element) => {
  const eachElement = element;
  announcementMap.append(returnSimilarCard(eachElement));
});

export {returnSimilarCard};
