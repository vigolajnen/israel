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

  var arrTabs = [
    {
      id: 1,
      title: 'Общие',
      text: '<p> Провести семестр или год за рубежом, знакомясь с различными культурами и идеями, традициями и стилем жизни — вот что такое учеба за границей! Израиль — это не только центр религиозного мира, это также академический центр, живая лаборатория идей и творческого исследования.</p><p> Может быть, Вы заинтересованы в изучении социологии, мира, юриспруденции, биологии, сравнительной религии, законодательного и делового администрирования или искусства? Здесь, в Израиле, Вы сможете изучить все это в удивительной университетской среде.</p>',
    },
    {
      id: 2,
      title: 'Академические',
      text: '<p> Провести семестр или год за рубежом, знакомясь с различными культурами и идеями, традициями и стилем жизни — вот что такое учеба за границей! Израиль — это не только центр религиозного мира, это также академический центр, живая лаборатория идей и творческого исследования.</p><p> Может быть, Вы заинтересованы в изучении социологии, мира, юриспруденции, биологии, сравнительной религии, законодательного и делового администрирования или искусства? Здесь, в Израиле, Вы сможете изучить все это в удивительной университетской среде.</p>',
    },
    {
      id: 3,
      title: 'Стажировки',
      text: '<p> Провести семестр или год за рубежом, знакомясь с различными культурами и идеями, традициями и стилем жизни — вот что такое учеба за границей! Израиль — это не только центр религиозного мира, это также академический центр, живая лаборатория идей и творческого исследования.</p><p> Может быть, Вы заинтересованы в изучении социологии, мира, юриспруденции, биологии, сравнительной религии, законодательного и делового администрирования или искусства? Здесь, в Израиле, Вы сможете изучить все это в удивительной университетской среде.</p>',
    },
    {
      id: 4,
      title: 'Волонтёрство',
      text: '<p> Провести семестр или год за рубежом, знакомясь с различными культурами и идеями, традициями и стилем жизни — вот что такое учеба за границей! Израиль — это не только центр религиозного мира, это также академический центр, живая лаборатория идей и творческого исследования.</p><p> Может быть, Вы заинтересованы в изучении социологии, мира, юриспруденции, биологии, сравнительной религии, законодательного и делового администрирования или искусства? Здесь, в Израиле, Вы сможете изучить все это в удивительной университетской среде.</p>',
    },
    {
      id: 5,
      title: 'Религиозные',
      text: '<p> Провести семестр или год за рубежом, знакомясь с различными культурами и идеями, традициями и стилем жизни — вот что такое учеба за границей! Израиль — это не только центр религиозного мира, это также академический центр, живая лаборатория идей и творческого исследования.</p><p> Может быть, Вы заинтересованы в изучении социологии, мира, юриспруденции, биологии, сравнительной религии, законодательного и делового администрирования или искусства? Здесь, в Израиле, Вы сможете изучить все это в удивительной университетской среде.</p>',
    }
  ];

  if (itemTabs) {
    itemTabs.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        document.querySelector('.tabs__content h3').innerText = evt.currentTarget.innerText;

        for (var i = 0; i < arrTabs.length; i++) {
          if (evt.currentTarget.innerText === arrTabs[i].title) {
            var content = document.querySelector('.tabs__content');
            content.innerHTML = '';

            var title = document.createElement('h3');
            var text = document.createElement('div');
            text.innerHTML = arrTabs[i].text;

            title.innerText = arrTabs[i].title;

            content.appendChild(title);

            content.append(text);

          }
        }

        var activeItem = document.querySelector('.tabs__item.tabs__item--active');
        activeItem.classList.remove('tabs__item--active');
        item.classList.add('tabs__item--active');
      });
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

  var phones = document.querySelectorAll('input[onkeyup]');
  phones.forEach(function (phone) {
    phone.addEventListener('input', function () {
      phone.parentElement.classList.add('input-phone');
      // console.log(phone.value.length);
      if (phone.value.length < 17) {
        phone.setCustomValidity('Введите номер телефона полностью');

      } else {
        phone.setCustomValidity('');
      }
    });

  });

  if (popupOpenBtn) {
    popupOpenBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      poupOpen(popupForm);

      if (storageName) {
        inputName.value = storageName;
      } else if (storagePhone) {
        inputPhone.value = storagePhone;
        inputName.focus();
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

  function popupClose(popup, form) {
    document.addEventListener('keydown', function (evt) {
      evt.preventDefault();
      if (evt.keyCode === 27) {
        popup.classList.remove('popup--active');
        page.classList.remove('page--overlay');
        form.submit();
        // form.reset();
      }
    });

    popup.addEventListener('click', function (evt) {
      evt.preventDefault();
      var target = evt.target;

      if ((target.className === 'popup popup--active') || (target.tagName === 'BUTTON')) {
        popup.classList.remove('popup--active');
        page.classList.remove('page--overlay');

        form.submit();
        // form.reset();
      }
    });
  }

  forms.forEach(function (form) {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      // валидируем форму;

      if (!inputName.value) {
        evt.preventDefault();
        inputName.setCustomValidity('Нужно ввести имя');
        inputName.classList.add('invalid');

      } else if (!inputPhone.value && inputPhone.value.length < 17) {
        inputPhone.setCustomValidity('Введите номер телефона полностью');
        inputPhone.classList.add('invalid');
        inputName.classList.remove('invalid');
      } else {
        inputPhone.classList.remove('invalid');
        if (isStorageSupport) {
          localStorage.setItem('inputName', inputName.value);
          localStorage.setItem('inputPhone', inputPhone.value);
        }
      }

      // показываем попап;
      poupOpen(popupApplication);

      if (popupApplication.classList.contains('popup--active') && popupForm.classList.contains('popup--active')) {
        popupForm.classList.remove('popup--active');
        popupApplication.classList.add('popup--application');
      }

      popupClose(popupApplication, form);
      popupApplication.classList.remove('popup--application');

      return false; // предотвращаем отправку формы и перезагрузку страницы
    });
  });
})();
