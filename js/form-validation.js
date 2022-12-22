const minTitleLength = 30;
const maxTitleLength = 100;

const formAnnouncement = document.querySelector('.ad-form');
const inputTitleAnnouncement = formAnnouncement.querySelector('#title');
const inputPriceAnnoucement = formAnnouncement.querySelector('#price');
const inputRoomsAnnoucement = formAnnouncement.querySelector('#room_number');
const inputCapacityAnnoucement = formAnnouncement.querySelector('#capacity');
const inputHouseType = formAnnouncement.querySelector('#type');
const inputPriceHouse = formAnnouncement.querySelector('#price');
const inputTimeIn = formAnnouncement.querySelector('#timein');
const inputTimeOut = formAnnouncement.querySelector('#timeout');

const checksFormValidation = () => {
  const checksCorrectnessFieldInputTitle = () => {
    const valueLength = inputTitleAnnouncement.value.length;
    if (valueLength < minTitleLength) {
      inputTitleAnnouncement.setCustomValidity(`Еще ${minTitleLength - valueLength} символов`);
    } else if (valueLength > maxTitleLength)
    {
      inputTitleAnnouncement.setCustomValidity(`Удалите лишние ${valueLength - maxTitleLength} символы`);
    } else {
      inputTitleAnnouncement.setCustomValidity('');
    }
    inputTitleAnnouncement.reportValidity();
  };
  inputTitleAnnouncement.addEventListener('input', checksCorrectnessFieldInputTitle );

  const checkCorrectnessFieldInputPrice = () => {
    const minValuePrice = +inputPriceAnnoucement.min;
    const maxValuePrice = +inputPriceAnnoucement.max;
    const valueInputPrice = inputPriceAnnoucement.value;
    if (valueInputPrice > maxValuePrice) {
      inputPriceAnnoucement.value = maxValuePrice;
      inputPriceAnnoucement.setCustomValidity(`Максимальная сумма за ночь ${maxValuePrice}`);
    }
    else if (valueInputPrice < minValuePrice) {
      inputPriceAnnoucement.value = minValuePrice;
    }
    else {
      inputPriceAnnoucement.setCustomValidity('');
    }
    inputPriceAnnoucement.reportValidity();
  };
  inputPriceAnnoucement.addEventListener('input', checkCorrectnessFieldInputPrice);


  const getRoomToCapacity = () => {
    const capacityOptions = inputCapacityAnnoucement.querySelectorAll('option');
    const roomCapacity = {
      1: [1],
      2: [1, 2],
      3: [1, 2, 3],
      100: [0],
    };
    capacityOptions.forEach((option) => {
      option.disabled = true;
    });
    roomCapacity[inputRoomsAnnoucement.value].forEach((value) => {
      const changeCapacity = inputCapacityAnnoucement.querySelector(`option[value='${value}']`);
      changeCapacity.disabled = false;
      inputCapacityAnnoucement.value = value;
    });
  };

  inputRoomsAnnoucement.addEventListener('change', getRoomToCapacity);

  const setMinAmountTypeHousing = () => {
    switch (inputHouseType.value) {
      case 'bungalow':
        inputPriceHouse.min = 0;
        inputPriceHouse.placeholder = 0;
        break;
      case 'flat':
        inputPriceHouse.min = 1000;
        inputPriceHouse.placeholder = 1000;
        break;
      case 'hotel':
        inputPriceHouse.min = 3000;
        inputPriceHouse.placeholder = 3000;
        break;
      case 'house':
        inputPriceHouse.min = 5000;
        inputPriceHouse.placeholder = 5000;
        break;
      case 'palace':
        inputPriceHouse.min = 10000;
        inputPriceHouse.placeholder = 10000;
        break;
    }
  };

  inputHouseType.addEventListener('change', setMinAmountTypeHousing);


  const comparesTimeIn = () => {
    inputTimeOut.value = inputTimeIn.value;
  };

  inputTimeIn.addEventListener('input', comparesTimeIn);

  const comparesTimeOut = () => {
    inputTimeIn.value = inputTimeOut.value;
  };

  inputTimeOut.addEventListener('input', comparesTimeOut);

};

export {checksFormValidation};
