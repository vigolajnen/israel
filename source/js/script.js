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
  var priceItems = document.querySelectorAll('.season-ticket__price');
  var priceItemsArr = [5000, 1700, 2700];

  function priceItem(result) {
    for (var i = 0; i < priceItems.length; i++) {
      for (var j = 0; j < result.length; j++) {
        if (i === j) {
          priceItems[i].innerHTML = result[j] + '<svg width="30" height="42"><use xlink:href="img/sprite_auto.svg#icon-rub"></use></svg>';
          priceItems[i].setAttribute('data-price', result[j]);
        }
      }
    }
  }

  if (itemTabs) {
    itemTabs.forEach(function (item) {
      item.addEventListener('click', function () {
        var count = item.getAttribute('data-count');
        var activeItem = document.querySelector('.tabs__item.tabs__item--active');
        activeItem.classList.remove('tabs__item--active');
        item.classList.add('tabs__item--active');

        var result = priceItemsArr.map(function (priceActive) {
          return priceActive * count;
        });

        priceItem(result);
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

  var hoursDB = ['08:00', '12:00', '18:00', '20:00'];

  var scheduleDB = [
    {
      id: 1,
      day: 'Понедельник',
      lessons: [
        {
          id: 1,
          hours: hoursDB[0],
          name: 'Crossfit'
        },
        {
          id: 2,
          hours: hoursDB[1],
          name: 'Body Sculpt'
        },
        {
          id: 3,
          hours: hoursDB[2],
          name: 'Functional'
        },
        {
          id: 4,
          hours: hoursDB[3],
          name: 'Stretching'
        }
      ]
    },
    {
      id: 2,
      day: 'Вторник',
      lessons: [
        {
          id: 1,
          hours: hoursDB[0],
          name: 'Aerostretching'
        },
        {
          id: 2,
          hours: hoursDB[1],
          name: 'CrossFit'
        },
        {
          id: 3,
          hours: hoursDB[2],
          name: 'Body Sculpt'
        },
        {
          id: 4,
          hours: hoursDB[3],
          name: 'Functional'
        }
      ]
    },
    {
      id: 3,
      day: 'Среда',
      lessons: [
        {
          id: 1,
          hours: hoursDB[0],
          name: 'Hot Iron'
        },
        {
          id: 2,
          hours: hoursDB[1],
          name: 'Aerostretching'
        },
        {
          id: 3,
          hours: hoursDB[2],
          name: 'CrossFit'
        },
        {
          id: 4,
          hours: hoursDB[3],
          name: 'Body Sculpt'
        }
      ]
    },
    {
      id: 4,
      day: 'Четверг',
      lessons: [
        {
          id: 1,
          hours: hoursDB[0],
          name: 'Pilates'
        },
        {
          id: 2,
          hours: hoursDB[1],
          name: 'Hot Iron'
        },
        {
          id: 3,
          hours: hoursDB[2],
          name: 'Aerostretching'
        },
        {
          id: 4,
          hours: hoursDB[3],
          name: 'CrossFit'
        }
      ]
    },
    {
      id: 5,
      day: 'Пятница',
      lessons: [
        {
          id: 1,
          hours: hoursDB[0],
          name: 'Stretching'
        },
        {
          id: 2,
          hours: hoursDB[1],
          name: 'Pilates'
        },
        {
          id: 3,
          hours: hoursDB[2],
          name: 'Hot Iron'
        },
        {
          id: 4,
          hours: hoursDB[3],
          name: 'Aerostretching'
        }
      ]
    },
    {
      id: 6,
      day: 'Суббота',
      lessons: [
        {
          id: 1,
          hours: hoursDB[0],
          name: 'Functional'
        },
        {
          id: 2,
          hours: hoursDB[1],
          name: 'Stretching'
        },
        {
          id: 3,
          hours: hoursDB[2],
          name: 'Pilates'
        },
        {
          id: 4,
          hours: hoursDB[3],
          name: 'Hot Iron'
        }
      ]
    },
    {
      id: 7,
      day: 'Воскресенье',
      lessons: [
        {
          id: 1,
          hours: hoursDB[0],
          name: 'Body Sculpt'
        },
        {
          id: 2,
          hours: hoursDB[1],
          name: 'Functional'
        },
        {
          id: 3,
          hours: hoursDB[2],
          name: 'Stretching'
        },
        {
          id: 4,
          hours: hoursDB[3],
          name: 'Pilates'
        }
      ]
    }
  ];

  function createschedule() {
    var daysListElement = document.querySelector('.schedule__days');
    var weekDaysListElement = document.querySelector('.schedule__week-days');
    var hoursListElement = document.querySelector('.schedule__hours');
    var mobNavElement = document.querySelector('.schedule__mob-nav');

    var scheduleFragment = document.createDocumentFragment();
    var hoursFragment = document.createDocumentFragment();
    var weekDaysFragment = document.createDocumentFragment();
    var activeDayFragment = document.createDocumentFragment();
    var btnFragment = document.createDocumentFragment();

    var activeDay = document.createElement('div');
    activeDay.classList = 'schedule__item-active';
    activeDay.innerText = 'Понедельник';

    var buttonWeekDay = document.createElement('button');
    buttonWeekDay.className = 'schedule__button';
    buttonWeekDay.setAttribute('type', 'button');
    buttonWeekDay.setAttribute('aria-label', 'Выбор дня недели');

    btnFragment.appendChild(buttonWeekDay);
    activeDayFragment.appendChild(activeDay);

    for (var i = 0; i < scheduleDB.length; i++) {

      var weekDayDiv = document.createElement('div');
      weekDayDiv.className = 'week-days__item';
      weekDayDiv.innerText = scheduleDB[i].day;

      if (weekDaysListElement) {
        weekDaysListElement.appendChild(weekDayDiv);
      }

      var divParent = document.createElement('div');
      divParent.className = 'days';
      divParent.setAttribute('data-weekDay', scheduleDB[i].day);

      for (var j = 0; j < scheduleDB[i].lessons.length; j++) {

        // занятия
        var div = document.createElement('div');
        div.className = 'days__item';
        div.innerText = scheduleDB[i].lessons[j].name;
        div.setAttribute('data-hour', scheduleDB[i].lessons[j].hours);
        divParent.appendChild(div);

      }
      scheduleFragment.appendChild(divParent);
      weekDaysFragment.appendChild(weekDayDiv);
    }

    // часы
    for (var y = 0; y < hoursDB.length; y++) {
      var hoursDiv = document.createElement('div');
      hoursDiv.className = 'hours__item';
      hoursDiv.innerText = hoursDB[y];
      hoursFragment.appendChild(hoursDiv);
    }

    if (daysListElement) {
      daysListElement.innerHTML = '';
      daysListElement.appendChild(scheduleFragment);
    }

    if (hoursListElement) {
      hoursListElement.innerHTML = '';
      hoursListElement.appendChild(hoursFragment);
    }

    if (weekDaysListElement) {
      weekDaysListElement.innerHTML = '';
      weekDaysListElement.appendChild(weekDaysFragment);
    }

    if (mobNavElement) {
      mobNavElement.innerHTML = '';
      mobNavElement.appendChild(activeDayFragment);

      mobNavElement.append(btnFragment);
    }
  }

  createschedule();

  var weekDays = document.querySelector('.week-days');
  var scheduleDays = document.querySelector('.schedule__days');
  var scheduleBtn = document.querySelector('.schedule__button');
  var hours = document.querySelector('.hours');
  var hoursItems = document.querySelectorAll('.hours__item');
  var weekDaysItems = document.querySelectorAll('.week-days__item');
  var activeDay = document.querySelector('.schedule__item-active');

  function onMenuClose() {
    scheduleBtn.classList.remove('schedule__button--open');
    weekDays.classList.remove('week-days--open');
    scheduleDays.classList.remove('schedule__days--close');
    hours.classList.remove('hours--opacity');
  }

  function activeHoursItem(hourText) {
    hoursItems.forEach(function (item) {
      if (item.innerText === hourText) {
        item.classList.add('hours__item--active');
      }
    });
  }

  function activeWeekDay(weekDayText) {
    weekDaysItems.forEach(function (item) {
      if (item.innerText === weekDayText) {
        item.classList.add('week-days__item--active');
        activeDay.classList.add('schedule__item-active--active');
      }
    });
  }

  function noActiveHoursItem(hourText) {
    hoursItems.forEach(function (item) {
      if (item.innerText === hourText) {
        item.classList.remove('hours__item--active');
      }
    });
  }

  function noActiveWeekDay(weekDayText) {
    weekDaysItems.forEach(function (item) {
      if (item.innerText === weekDayText) {
        item.classList.remove('week-days__item--active');
        activeDay.classList.remove('schedule__item-active--active');
      }
    });
  }

  function mobMenuToogle() {
    scheduleBtn.classList.toggle('schedule__button--open');
    weekDays.classList.toggle('week-days--open');
    scheduleDays.classList.toggle('schedule__days--close');
    hours.classList.toggle('hours--opacity');
  }

  function mobActiveDay(day) {
    var days = document.querySelectorAll('.days');
    days.forEach(function (item) {
      item.classList.add('days--hidden');

      if (item.getAttribute('data-weekDay') === day) {
        item.classList.remove('days--hidden');
      }
    });
  }

  function mobWeekDays() {
    weekDaysItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var day = item.innerText;
        activeDay.innerText = '';
        activeDay.innerText = day;

        mobActiveDay(day);

        onMenuClose();
      });
    });
  }

  var daysItems = document.querySelectorAll('.days__item');

  daysItems.forEach(function (item) {
    item.addEventListener('mouseover', function () {
      var hourText = item.getAttribute('data-hour');
      var weekDayText = item.parentElement.getAttribute('data-weekDay');

      activeHoursItem(hourText);

      activeWeekDay(weekDayText);

      item.classList.add('days__item--active');
    });

    item.addEventListener('mouseout', function () {
      var hourText = item.getAttribute('data-hour');
      var weekDayText = item.parentElement.getAttribute('data-weekDay');

      noActiveHoursItem(hourText);

      noActiveWeekDay(weekDayText);

      item.classList.remove('days__item--active');
    });
  });


  if (scheduleBtn) {
    scheduleBtn.addEventListener('click', function (evt) {
      evt.preventDefault();

      mobMenuToogle();

      if (weekDays.classList.contains('week-days--open')) {
        mobWeekDays();
      }
    });
  }

})();
