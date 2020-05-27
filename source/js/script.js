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

  // var phone = document.querySelector('#phone');
  // if (phone) {
  //   phone.addEventListener('input', function () {
  //     if (phone.value.length < 16) {
  //       phone.setCustomValidity('Введите номер телефона полностью');
  //     } else {
  //       phone.setCustomValidity('');
  //     }
  //   });
  // }

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

  var page = document.querySelector('.page');
  var popupOpenBtn = document.querySelector('.nav__btn-popup');
  var popupCloseBtn = document.querySelector('.popup__btn-close');
  var popupForm = document.querySelector('#order-call');
  var inputName = document.querySelector('input#popup-name');
  var inputPhone = document.querySelector('input#popup-phone');
  var popupApplication = document.querySelector('#application-accepted');
  var forms = document.querySelectorAll('form');

  var isStorageSupport = true;
  var storageName = '';
  var storagePhone = '';

  try {
    storageName = localStorage.getItem('inputName');
    storagePhone = localStorage.getItem('inputPhone');
  } catch (err) {
    isStorageSupport = false;
  }

  if (popupOpenBtn) {
    popupOpenBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      poupOpen(popupForm);

      if (storageName) {
        inputName.value = storageName;
        inputPhone.focus();
      } else {
        inputName.focus();
      }

      if (storagePhone) {
        inputPhone.value = storagePhone;
        inputName.focus();
      } else {
        inputPhone.focus();
      }
    });
  }

  if (popupCloseBtn) {
    popupCloseBtn.addEventListener('click', function (evt) {
      evt.preventDefault();

      popupClose(popupForm);

    });
  }

  function poupOpen(popup) {
    popup.classList.add('popup--active');
    page.classList.add('page--overlay');
  }

  function popupClose(popup) {
    document.addEventListener('keydown', function (evt) {
      evt.preventDefault();
      if (evt.keyCode === 27) {
        popup.classList.remove('popup--active');
        page.classList.remove('page--overlay');
      }
    });

    popup.addEventListener('click', function (evt) {
      evt.preventDefault();
      var target = evt.target;

      if (target.className === 'popup popup--active') {
        popup.classList.remove('popup--active');
        page.classList.remove('page--overlay');
      }
    });

    if (popupCloseBtn) {
      popupCloseBtn.addEventListener('click', function (evt) {
        evt.preventDefault();
        popup.classList.remove('popup--active');
        page.classList.remove('page--overlay');
      });
    }
  }

  forms.forEach(function (form) {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      // валидируем форму;

      if (!inputName.value || (!inputPhone.value && !inputPhone.value.length < 16)) {
        evt.preventDefault();
        inputName.setCustomValidity('Нужно ввести имя');
        inputPhone.setCustomValidity('Введите номер телефона полностью');
      } else {
        if (isStorageSupport) {
          localStorage.setItem('inputName', inputName.value);
          localStorage.setItem('inputPhone', inputPhone.value);
        }
      }

      // показываем попап;
      poupOpen(popupApplication);
      popupClose(popupApplication);

      // отправляем данные на сервер;
      // form.submit();
      return false; // предотвращаем отправку формы и перезагрузку страницы
    });
  });




})();
