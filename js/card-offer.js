import {getHouseRentalCount} from './random-object.js';
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const templateFragment = document.createDocumentFragment();
const mapBlock = document.querySelector('.map__canvas');

const mapTypeHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};


const addFeaturesToAnnouncement = (arrayFeatures, listFeaturesInAnnouncement) => {
  listFeaturesInAnnouncement.forEach((featureListItem) => {
    const isNeedFeatures = arrayFeatures.some((featuresItem) => featureListItem.classList.contains(`popup__feature--${featuresItem}`));
    if (!isNeedFeatures && arrayFeatures) {
      featureListItem.remove();
    }
  });
};


const addPhotoToAnnouncement = (arrayPhotos, containerForPhotos, photoItem) => {
  if (!arrayPhotos) {
    containerForPhotos.remove();
  } else {
    arrayPhotos.forEach((arrayPhotoItem) => {
      const photoFragment = photoItem.cloneNode(true);
      photoFragment.src = arrayPhotoItem;
      templateFragment.appendChild(photoFragment);
    });
  }
  return templateFragment;
};

const addTextContentAndSetSrs = (data, element) => {
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

const createCardAnnouncement = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const photosContainer = cardElement.querySelector('.popup__photos');
  const photoItem = cardElement.querySelector('.popup__photo');

  data.forEach((elementData) => {
    addTextContentAndSetSrs(elementData.offer.title, cardElement.querySelector('.popup__title'));
    addTextContentAndSetSrs(`${elementData.offer.adress.lat}, ${elementData.offer.adress.lng}`, cardElement.querySelector('.popup__text--address'));
    addTextContentAndSetSrs(`${elementData.offer.price} ₽/ночь`, cardElement.querySelector('.popup__text--price'));
    addTextContentAndSetSrs(mapTypeHousing[elementData.offer.type], cardElement.querySelector('.popup__type'));
    addTextContentAndSetSrs(`${elementData.offer.rooms} комнаты для ${elementData.offer.guests} гостей`, cardElement.querySelector('.popup__text--capacity'));
    addTextContentAndSetSrs(`Заезд после ${elementData.offer.checkin}, выезд до ${elementData.offer.checkout}`, cardElement.querySelector('.popup__text--time'));
    addFeaturesToAnnouncement(elementData.offer.features, cardElement.querySelectorAll('.popup__feature'));
    addTextContentAndSetSrs(elementData.offer.description, cardElement.querySelector('.popup__description'));
    cardElement.querySelector('.popup__photos').appendChild(addPhotoToAnnouncement(elementData.offer.photos, photosContainer, photoItem));
    addTextContentAndSetSrs(elementData.author.avatar, cardElement.querySelector('.popup__avatar'));
  });
  return cardElement;
};

const randomData = getHouseRentalCount();
mapBlock.append(createCardAnnouncement(randomData));

export {createCardAnnouncement};
