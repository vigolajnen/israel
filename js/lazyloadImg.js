window.onload = function () {
  document.addEventListener('scroll', function () {
    document.body.style.backgroundPosition = 'center ' + window.pageYOffset * 0.5 + 'px ';
  });

  var images = document.querySelectorAll('[data-src]');

  for (var i = 0; i < images.length; i++) {
    lazyLoad(images[i]);
    
  }
};

function lazyLoad(img) {
  
  checkImg();

  document.addEventListener('scroll', checkImg)

  function checkImg() {
    if ((window.innerHeight + window.pageYOffset) > getCoords(img)) {

      var dataSrc = img.getAttribute('data-src');

      if ((dataSrc != img.getAttribute('src'))) {
        img.setAttribute('src', dataSrc);
      }
      
    }
  }
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  var topElem = box.top + pageYOffset;

  return topElem;
}