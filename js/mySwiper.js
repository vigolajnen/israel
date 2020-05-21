(function () {
  var mySwiper = new Swiper('#trainers', {
    slidesPerView: 1,
    spaceBetween: 0,

    breakpoints: {
      767: {
        slidesPerView: 2,
        spaceBetween: 40,
        slidesPerGroup: 2,
        loop: true,
        loopFillGroupWithBlank: true,
      },
      1199: {
        slidesPerView: 4,
        spaceBetween: 40,
        slidesPerGroup: 4,
        loop: true,
        loopFillGroupWithBlank: true,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  var mySwiper = new Swiper('#reviews', {
    slidesPerView: 1,
    grabCursor: true,
    spaceBetween: 0,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

})();