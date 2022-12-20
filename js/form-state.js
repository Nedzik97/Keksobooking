const addFormState = (elementFormAds, elementFormFilters) => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');
  const adFormElements = elementFormAds.children;
  const arrayFormElements = Array.from(adFormElements);
  arrayFormElements.forEach((currentElement) => {
    currentElement.setAttribute('disabled', true);
  });

  elementFormFilters.classList.add('ad-form--disabled');
  const mapFilters = document.querySelector('.map__filters');
  const formFilterElements = mapFilters.children;
  const arrayFormFilterElements = Array.from(formFilterElements);
  arrayFormFilterElements.forEach((currentElement) => {
    currentElement.setAttribute('disabled', true);
  });
};


export {addFormState};


