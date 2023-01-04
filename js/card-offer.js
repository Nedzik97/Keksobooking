const HOUSE_TYPE_MAP = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};


const addFeatureElements = (features, featuresAnnouncement) => {
  if (!features) {
    featuresAnnouncement.remove();
  }
  featuresAnnouncement.forEach((featureListItem) => {
    const isNeedFeatures = features.some((featuresItem) => featureListItem.classList.contains(`popup__feature--${featuresItem}`));
    if (!isNeedFeatures) {
      featureListItem.remove();
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
  if (rooms <= 1) {
    element.textContent = `${rooms} комната для ${guests} гостей`;
  } else if (rooms < 5) {
    element.textContent = `${rooms} комнаты для ${guests} гостей`;
  } else if (rooms >= 5) {
    element.textContent = `${rooms} комнат для ${guests} гостей`;
  } else if (guests <= 1) {
    element.textContent = `${rooms} комнаты для ${guests} гостя`;
  } else {
    element.remove();
  }
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
  addFeatureElements(data.offer.features, cardElement.querySelectorAll('.popup__feature'));
  addTextContent(data.offer.description, cardElement.querySelector('.popup__description'));
  cardElement.querySelector('.popup__photos').appendChild(addPhotoElements(data.offer.photos, containerPhotos, photoItem));
  setSrc(data.author.avatar, cardElement.querySelector('.popup__avatar'));

};


export {createAnnouncementCard};
