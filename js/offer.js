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
    if (!isNeedFeatures) {
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

  addTextContentAndSetSrs(data.offer.title, cardElement.querySelector('.popup__title'));
  addTextContentAndSetSrs(`${data.offer.adress.lat}, ${data.offer.adress.lng}`, cardElement.querySelector('.popup__text--address'));
  addTextContentAndSetSrs(`${data.offer.price} ₽/ночь`, cardElement.querySelector('.popup__text--price'));
  addTextContentAndSetSrs(mapTypeHousing[data.offer.type], cardElement.querySelector('.popup__type'));
  addTextContentAndSetSrs(`${data.offer.rooms} комнаты для ${data.offer.guests} гостей`, cardElement.querySelector('.popup__text--capacity'));
  addTextContentAndSetSrs(`Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`, cardElement.querySelector('.popup__text--time'));

  if (!data.offer.features) {
    cardElement.querySelector('.popup__feature').remove();
  } else {
    addFeaturesToAnnouncement(data.offer.features, cardElement.querySelectorAll('.popup__feature'));
  }

  addTextContentAndSetSrs(data.offer.description, cardElement.querySelector('.popup__description'));
  cardElement.querySelector('.popup__photos').appendChild(addPhotoToAnnouncement(data.offer.photos, photosContainer, photoItem));
  addTextContentAndSetSrs(data.author.avatar, cardElement.querySelector('.popup__avatar'));

  return cardElement;
};

const randomData = getHouseRentalCount();
randomData.forEach((element) => {
  const eachElement = element;
  mapBlock.append(createCardAnnouncement(eachElement));
});

export {createCardAnnouncement};
