const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');


const addFormState = (elementFormAds, elementFormFilters) => {
  elementFormAds.classList.add('ad-form--disabled');
  const adFormElements = elementFormAds.children;
  const arrayFormElements = Array.from(adFormElements);
  arrayFormElements.forEach((currentElement) => {
    currentElement.setAttribute('disabled', true);
  });

  elementFormFilters.classList.add('ad-form--disabled');
  const formFilterElements = elementFormFilters.children;
  const arrayFormFilterElements = Array.from(formFilterElements);
  arrayFormFilterElements.forEach((currentElement) => {
    currentElement.setAttribute('disabled', true);
  });
};


export {adForm, mapFilters};
export {addFormState};


