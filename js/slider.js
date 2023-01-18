const sliderElement = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');


noUiSlider.create(sliderElement, {
  start: 5000,
  connect: 'lower',
  step: 100,
  range: {
    'min': 0,
    'max': 100000
  }
});

sliderElement.noUiSlider.on('update', () => {
  priceField.value = Math.floor(sliderElement.noUiSlider.get());
});


const defaultSliderPrice = (minValue) => {
  sliderElement.noUiSlider.updateOptions({
    start: minValue,
    connect: 'lower',
    step: 100,
    range: {
      'min': minValue,
      'max': 100000
    }
  });
};

export {sliderElement, defaultSliderPrice};
