const HOUSE_TYPE_MAP = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};


const addFeatureElements = (features, featuresContainer) => {
  if (!features) {
    featuresContainer.remove();
    return;
  }

  const featureElements = featuresContainer.querySelectorAll('.popup__feature');

  featureElements.forEach((featuresListItem) => {
    const isNecessary = features.some(
      (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`));
    if (!isNecessary) {
      featuresListItem.remove();
    }
  });
};


const addPhotoElements = (photos, containerPhotos, photoItem) => {
  const templateFragment = document.createDocumentFragment();
  if (!photos) {
    containerPhotos.remove();
  } else {
    photos.forEach((arrayPhotoItem) => {
      const photoFragment = photoItem.cloneNode(true);
      photoFragment.src = arrayPhotoItem;
      templateFragment.appendChild(photoFragment);
    });
  }
  return templateFragment;
};

const addTextContent = (data, element) => {
  if (data) {
    element.textContent = data;
  } else {
    element.remove();
  }
};

const setSrc = (data, element) => {
  if (data) {
    element.src = data;
  } else {
    element.remove();
  }
};

const addTextContentCapacity = (rooms, guests, element) => {
  element.textContent = `${rooms} ${rooms === 1 ? 'комната' : 'комнаты'} для ${guests} ${guests === 1 ? 'гость' : 'гостей'}`;
};


const createAnnouncementCard = (data) => {
  const templateCard = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = templateCard.cloneNode(true);
  const containerPhotos = cardElement.querySelector('.popup__photos');
  const photoItem = cardElement.querySelector('.popup__photo');

  addTextContent(data.offer.title, cardElement.querySelector('.popup__title'));
  addTextContent(`${data.location.lat}, ${data.location.lng}`, cardElement.querySelector('.popup__text--address'));
  addTextContent(`${data.offer.price} ₽/ночь`, cardElement.querySelector('.popup__text--price'));
  addTextContent(HOUSE_TYPE_MAP[data.offer.type], cardElement.querySelector('.popup__type'));
  addTextContentCapacity(data.offer.rooms, data.offer.guests, cardElement.querySelector('.popup__text--capacity'));
  addTextContent(`Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`, cardElement.querySelector('.popup__text--time'));
  addFeatureElements(data.offer.features, cardElement.querySelector('.popup__features'));
  addTextContent(data.offer.description, cardElement.querySelector('.popup__description'));
  cardElement.querySelector('.popup__photos').appendChild(addPhotoElements(data.offer.photos, containerPhotos, photoItem));
  setSrc(data.author.avatar, cardElement.querySelector('.popup__avatar'));

  return cardElement;
};


export {createAnnouncementCard};
