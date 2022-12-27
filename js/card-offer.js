const HOUSE_TYPE_MAP = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};


const addFeatureElements = (arrayFeatures, listFeaturesInAnnouncement) => {
  listFeaturesInAnnouncement.forEach((featureListItem) => {
    const isNeedFeatures = arrayFeatures.some((featuresItem) => featureListItem.classList.contains(`popup__feature--${featuresItem}`));
    if (!isNeedFeatures && arrayFeatures) {
      featureListItem.remove();
    }
  });
};


const addPhotoElements = (arrayPhotos, containerForPhotos, photoItem) => {
  const templateFragment = document.createDocumentFragment();
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

const addTextContent = (data, element) => {
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
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);
  const photosContainer = cardElement.querySelector('.popup__photos');
  const photoItem = cardElement.querySelector('.popup__photo');

  data.forEach((elementData) => {
    addTextContent(elementData.offer.title, cardElement.querySelector('.popup__title'));
    addTextContent(`${elementData.offer.adress.lat}, ${elementData.offer.adress.lng}`, cardElement.querySelector('.popup__text--address'));
    addTextContent(`${elementData.offer.price} ₽/ночь`, cardElement.querySelector('.popup__text--price'));
    addTextContent(HOUSE_TYPE_MAP[elementData.offer.type], cardElement.querySelector('.popup__type'));
    addTextContent(`${elementData.offer.rooms} комнаты для ${elementData.offer.guests} гостей`, cardElement.querySelector('.popup__text--capacity'));
    addTextContent(`Заезд после ${elementData.offer.checkin}, выезд до ${elementData.offer.checkout}`, cardElement.querySelector('.popup__text--time'));
    addFeatureElements(elementData.offer.features, cardElement.querySelectorAll('.popup__feature'));
    addTextContent(elementData.offer.description, cardElement.querySelector('.popup__description'));
    cardElement.querySelector('.popup__photos').appendChild(addPhotoElements(elementData.offer.photos, photosContainer, photoItem));
    addTextContent(elementData.author.avatar, cardElement.querySelector('.popup__avatar'));
  });
  return cardElement;
};


export {createCardAnnouncement};
