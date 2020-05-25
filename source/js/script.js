'use strict';

(function () {

  if ('NodeList' in window && !NodeList.prototype.forEach) {

    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  var itemTabs = document.querySelectorAll('.tabs__item');
  var itemTabsTitle = document.querySelector('.tabs__content h3');

  if (itemTabs) {
    itemTabs.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        var target = evt.target;
        itemTabsTitle.innerText = target.innerText;

        var activeItem = document.querySelector('.tabs__item.tabs__item--active');
        activeItem.classList.remove('tabs__item--active');
        item.classList.add('tabs__item--active');
      });
    });
  }

  var phone = document.querySelector('#phone');
  if (phone) {
    phone.addEventListener('input', function () {
      if (phone.value.length < 16) {
        phone.setCustomValidity('Введите номер телефона полностью');
      } else {
        phone.setCustomValidity('');
      }
    });
  }

  var accordion = document.querySelector('.accordion');
  var accItemActive = document.querySelector('.accordion__item.accordion__item--active');

  accordion.addEventListener('click', function (evt) {
    evt.preventDefault();

    var target = evt.target;

    var parent = target.parentElement;

    if (parent.className === 'accordion__item-header') {
      parent.parentElement.classList.toggle('accordion__item--active');
    } else if (parent.className === 'accordion__item' || target.className === 'accordion__item') {
      parent.classList.toggle('accordion__item--active');

    } else if (accItemActive) {
      parent.classList.remove('accordion__item--active');
    }
  });

})();
