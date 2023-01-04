import {enableForm} from './form-state.js';
import {createAnnouncementCard} from './card-offer.js';
import {getData} from './data.js';


// const data = getData();

const BASIC_LAT = 35.68948;
const BASIC_LNG = 139.69170;
const MAIN_PIN_SIZE = 52;
const AD_PIN_SIZE = 40;
const DECIMAL_PLACE = 5;
const INITIAL_MAP_LAT = 59.92749;
const INITIAL_MAP_LNG = 30.31127;
const adress = document.querySelector('#address');

const map = L.map('map-canvas');

const addMapToPage = () => {
  map.on('load', () => {
    enableForm();
  })
    .setView({
      lat: INITIAL_MAP_LAT,
      lng: INITIAL_MAP_LNG,
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


  const markerGroup = L.layerGroup().addTo(map);


  const createMarkers = () => {
    getData().then((element) => {
      element.forEach((card) => {
        const adPinIcon = L.icon({
          iconUrl: 'img/pin.svg',
          iconSize: [AD_PIN_SIZE, AD_PIN_SIZE],
          iconAnchor: [AD_PIN_SIZE/2, AD_PIN_SIZE],
        });
        const marker = L.marker(
          {
            lat: card.location.lat,
            lng: card.location.lng,
          },
          {
            icon: adPinIcon,
          },
        );

        marker
          .addTo(markerGroup)
          .addTo(map)
          .bindPopup(() => {
            console.log(card)
            createAnnouncementCard(card);
          });
      });
    });
  };

  createMarkers();

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
