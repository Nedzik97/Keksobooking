import { markerGroup } from './map.js';

const mapFiltersForm = document.querySelector('.map__filters');
const livingTypeInput = document.querySelector('#housing-type');
const priceInput = document.querySelector('#housing-price');
const roomsInput = document.querySelector('#housing-rooms');
const guestsInput = document.querySelector('#housing-guests');

const PricesByValues = {
  low: {
    min: 0,
    max: 10000
  },
  high: {
    min: 50000,
    max: 100000
  },
  middle: {
    min: 10000,
    max: 50000
  },
  any: {
    min: 0,
    max: 100000
  },
};

const setMapFilters = (cb) => {
  mapFiltersForm.addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

const filterByLivingType = ({offer}) => {
  if (livingTypeInput.value === 'any') {
    return offer;
  }
  if (offer.type === livingTypeInput.value) {
    return offer;
  }
};

const filterByPrice = ({offer}) => offer.price >= PricesByValues[priceInput.value].min && offer.price <= PricesByValues[priceInput.value].max;

const filterByRooms = ({offer}) => {
  if (roomsInput.value === 'any' || offer.rooms === Number(roomsInput.value)) {
    return true;
  }
  return false;
};


const filterByGuests = ({offer}) => {
  if (guestsInput.value === 'any' || offer.guests === Number(guestsInput.value)) {
    return true;
  }
  return false;
};

const filterByFeatures = ({offer}) => {
  const filtersFeatures = [];
  const checkedFilters = document.querySelector('.map__features').querySelectorAll('input:checked');
  checkedFilters.forEach((el) => filtersFeatures.push(el.value));
  if (offer.features){
    return filtersFeatures.every((feature) => offer.features.includes(feature));
  }
  return false;
};

const filterOffers = (offers) => offers.filter((offer) =>
  (filterByLivingType(offer) &&
filterByPrice(offer) &&
filterByRooms(offer) &&
filterByGuests(offer) &&
filterByFeatures(offer)));

export { setMapFilters, filterOffers, mapFiltersForm };
