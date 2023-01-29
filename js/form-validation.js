import {resetDefaultSliderPrice} from './slider.js';
import { sendData } from './api.js';
import { blockSubmitButton, unblockSubmitButton } from './form.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE_BUNGALOW = 0;
const MIN_PRICE_FLAT = 1000;
const MIN_PRICE_HOTEL = 3000;
const MIN_PRICE_HOUSE = 5000;
const MIN_PRICE_PALACE = 10000;


const announcementForm = document.querySelector('.ad-form');
const announcementTitleField = announcementForm.querySelector('#title');
const annoucementPriceField = announcementForm.querySelector('#price');
const annoucementRoomField = announcementForm.querySelector('#room_number');
const annoucementCapacityField = announcementForm.querySelector('#capacity');
const houseTypeField = announcementForm.querySelector('#type');
const priceHouseField = announcementForm.querySelector('#price');
const timeInField = announcementForm.querySelector('#timein');
const timeOutField = announcementForm.querySelector('#timeout');


const checkTitleIsCorrect = () => {
  const valueLength = announcementTitleField.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    announcementTitleField.setCustomValidity(`Еще ${MIN_TITLE_LENGTH - valueLength} символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    announcementTitleField.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} символы`);
  } else {
    announcementTitleField.setCustomValidity('');
  }
  announcementTitleField.reportValidity();
};

const checkPriceIsCorrect = () => {
  const minPriceValue = +annoucementPriceField.min;
  const maxPriceValue = +annoucementPriceField.max;
  const priceValue = annoucementPriceField.value;
  if (priceValue > maxPriceValue) {
    annoucementPriceField.value = maxPriceValue;
    annoucementPriceField.setCustomValidity(`Максимальная сумма за ночь ${maxPriceValue}`);
  } else if (priceValue < minPriceValue) {
    annoucementPriceField.value = minPriceValue;
  } else {
    annoucementPriceField.setCustomValidity('');
  }
  annoucementPriceField.reportValidity();
};

const setRatioRoomsToCapacity = () => {
  const capacityOptions = annoucementCapacityField.querySelectorAll('option');
  const roomCapacity = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };
  capacityOptions.forEach((option) => {
    option.disabled = true;
  });
  roomCapacity[annoucementRoomField.value].forEach((value) => {
    const changeCapacity = annoucementCapacityField.querySelector(`option[value='${value}']`);
    changeCapacity.disabled = false;
    annoucementCapacityField.value = value;
  });
};

const setMinAmountHouseType = () => {
  switch (houseTypeField.value) {
    case 'bungalow':
      priceHouseField.min = MIN_PRICE_BUNGALOW;
      priceHouseField.placeholder = MIN_PRICE_BUNGALOW;
      resetDefaultSliderPrice(0);
      break;
    case 'flat':
      priceHouseField.min = MIN_PRICE_FLAT;
      priceHouseField.placeholder = MIN_PRICE_FLAT;
      resetDefaultSliderPrice(1000);
      break;
    case 'hotel':
      priceHouseField.min = MIN_PRICE_HOTEL;
      priceHouseField.placeholder = MIN_PRICE_HOTEL;
      resetDefaultSliderPrice(3000);
      break;
    case 'house':
      priceHouseField.min = MIN_PRICE_HOUSE;
      priceHouseField.placeholder = MIN_PRICE_HOUSE;
      resetDefaultSliderPrice(5000);
      break;
    case 'palace':
      priceHouseField.min = MIN_PRICE_PALACE;
      priceHouseField.placeholder = MIN_PRICE_PALACE;
      resetDefaultSliderPrice(10000);
      break;
  }
};

const syncTimeInWithTimeOut = () => {
  timeOutField.value = timeInField.value;
};

const syncTimeOutWithTimeIn = () => {
  timeInField.value = timeOutField.value;
};

const checksFormValidation = () => {
  announcementTitleField.addEventListener('input', checkTitleIsCorrect );
  annoucementPriceField.addEventListener('input', checkPriceIsCorrect);
  annoucementRoomField.addEventListener('change', setRatioRoomsToCapacity);
  houseTypeField.addEventListener('change', setMinAmountHouseType);
  timeInField.addEventListener('input', syncTimeInWithTimeOut);
  timeOutField.addEventListener('input', syncTimeOutWithTimeIn);
};

const setUserFromSubmit = (onSuccess, onFail) => {
  announcementForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    blockSubmitButton();
    sendData(
      () => {
        onSuccess();
        unblockSubmitButton();
      },
      () => {
        onFail();
        unblockSubmitButton();
      },
      new FormData(evt.target)
    );
  }
  );
};

export {checksFormValidation, announcementForm, setUserFromSubmit};
