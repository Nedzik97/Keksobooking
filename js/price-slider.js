const sliderElement = document.querySelector('.ad-form__slider');
const inputPrice = document.querySelector('#price');

const createSliderPrice = () => {

  noUiSlider.create(sliderElement, {
    start: [5000],
    connect: 'lower',
    step: 100,
    range: {
      'min': [0],
      '10%': [500, 100],
      '50%': [4000, 500],
      '70%': [10000, 500],
      'max': [100000]
    }
  });

  sliderElement.noUiSlider.on('update', () => {
    inputPrice.value = Math.floor(sliderElement.noUiSlider.get());
  });

};

export {createSliderPrice};
