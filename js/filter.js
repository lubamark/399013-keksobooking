'use strict';

(function () {
  var priceRank = {
    LOW: 10000,
    MIDDLE: 50000
  };
  var pins = [];

  window.onSuccess = function (data) {
    pins = data;
    window.render(pins);
  };

  var filterForm = document.querySelector('.map__filters');
  var filterType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRooms = filterForm.querySelector('#housing-rooms');
  var filterGuests = filterForm.querySelector('#housing-guests');
  var filterFeatures = filterForm.querySelector('#housing-features');
  var checkboxes = filterFeatures.querySelectorAll('.map__checkbox');

  var filterOnType = function (item) {
    if (filterType.value === 'any') {
      return true;
    }
    return item.offer.type === filterType.value;
  };
  var filterOnPrice = function (item) {
    switch (filterPrice.value) {
      case 'low':
        return item.offer.price < priceRank.LOW;
      case 'middle':
        return item.offer.price >= priceRank.LOW && item.offer.price < priceRank.MIDDLE;
      case 'high':
        return item.offer.price >= priceRank.MIDDLE;
      default:
        return true;
    }

  };
  var filterOnRooms = function (item) {
    if (filterRooms.value === 'any') {
      return true;
    }
    return item.offer.rooms.toString() === filterRooms.value;
  };
  var filterOnGuests = function (item) {
    if (filterGuests.value === 'any') {
      return true;
    }
    return item.offer.guests.toString() === filterGuests.value;
  };
  var filterOnFeatures = function (item) {
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked && item.offer.features.indexOf(checkboxes[i].value) === -1) {
        return false;
      }
    }
    return true;
  };
  var clearPins = function () {
    var currentPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < currentPins.length; i++) {
      currentPins[i].remove();
    }
  };
  var updatePins = function () {
    clearPins();
    var filteredPins = pins
      .filter(filterOnType)
      .filter(filterOnPrice)
      .filter(filterOnRooms)
      .filter(filterOnGuests)
      .filter(filterOnFeatures);
    window.render(filteredPins);
  };

  filterForm.addEventListener('change', function () {
    window.debounce(updatePins);
  });
})();