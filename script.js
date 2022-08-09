'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    //first is funct who runs, second if not allowed geolocation
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      map = L.map('map').setView(coords, 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Display marker on click on map
      //handling clicks on map
      map.on(
        'click',
        function (mapE) {
          // displaying form as user click before anything
          mapEvent = mapE;
          form.classList.remove('hidden');
          inputDistance.focus();
        },
        function () {
          alert('permission not allowed');
        }
      );

      //submit event is triggered
      //after pressing enter > triggers popup
      form.addEventListener('submit', function () {
        // clear input fields
        inputDistance.value =
          inputCadence.value =
          inputDistance.value =
          inputElevation.value =
            '';

        //display marker
        const { lat, lng } = mapEvent.latlng;
        // console.log(lat);

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 150,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup',
            })
          )
          .setPopupContent('Workout')
          .openPopup();
      });
    }
  );
//need to change as per types selected
inputType.addEventListener('change', function () {
  //need to toggle class ('form__row--hidden') in cdencence and elevation in nearest parent
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden'); //here we dom transverse to move up in dom tree
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
