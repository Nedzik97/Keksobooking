import {activeForm} from './form-state.js';
import {getHouseRentalCount} from './random-object.js';
import {createCardAnnouncement} from './card-offer.js';
const randomData = getHouseRentalCount();

const BASIC_LAT = 35.68948;
const BASIC_LNG = 139.69170;
const MAIN_PIN_SIZE = 52;
const AD_PIN_SIZE = 40;
const DECIMAL_PLACE = 5;

const adress = document.querySelector('#address');

const addMapToPage = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      activeForm();
    })
    .setView({
      lat: 59.92749,
      lng: 30.31127,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
    iconAnchor: [MAIN_PIN_SIZE/2, MAIN_PIN_SIZE],
  });

  const adPin = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [AD_PIN_SIZE, AD_PIN_SIZE],
    iconAnchor: [AD_PIN_SIZE/2, AD_PIN_SIZE],
  });


  const mainPinMarker = L.marker(
    {
      lat: BASIC_LAT,
      lng: BASIC_LNG,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    // console.log(evt.target.getLatLng());
  });

  const markerGroup = L.layerGroup().addTo(map);


  const createMarker = (point) => {
    const {location} = point;
    const adMarker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: adPin,
      },
    );
    adMarker
      .addTo(markerGroup)
      .bindPopup(createCardAnnouncement(randomData));
  };

  randomData.forEach((point) => {
    createMarker(point);
  });

  // временно вызвана функция


  const resetMap = () => map.setView({
    lat: BASIC_LAT,
    lng: BASIC_LNG,
  });
  resetMap();
  // временно вызвана функция

  const resetMarker = () => {
    mainPinMarker.setLatLng({
      lat: BASIC_LAT,
      lng: BASIC_LNG,
    });
  };
  resetMarker();
  // временно вызвына функция


  adress.setAttribute('value', `${mainPinMarker._latlng.lat}, ${mainPinMarker._latlng.lng}`);

  mainPinMarker.on('drag', (evt) => {
    const coordinates = evt.target.getLatLng();
    adress.value = `${coordinates.lat.toFixed(DECIMAL_PLACE)}, ${coordinates.lng.toFixed(DECIMAL_PLACE)}`;
  });

};

export {addMapToPage};
