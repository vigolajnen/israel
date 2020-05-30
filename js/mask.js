function mask (inputName, mask, evt) {
  try {
    var text = document.getElementById(inputName);
    var value = text.value;
    

    // If user pressed DEL or BACK SPACE, clean the value
    try {
      var e = (evt.which) ? evt.which : event.keyCode;
      if ( e == 46 || e == 8 ) {
        text.value = "";
        return;
      }
    } catch (e1) {}

    var literalPattern=/[0\*]/;
    var numberPattern=/[0-9]/;
    var newValue = "";

    for (var vId = 0, mId = 0 ; mId < mask.length ; ) {
      
      if (mId >= value.length)
        break;

      // Number expected but got a different value, store only the valid portion
      if (mask[mId] == '0' && value[vId].match(numberPattern) == null) {
        break;
      }

      // Found a literal
      while (mask[mId].match(literalPattern) == null) {
        if (value[vId] === mask[mId])
          break;

        newValue += mask[mId++];
      }

      newValue += value[vId++];
      mId++;

    }

    text.value = newValue;
    
  } catch(e) {}
}


  var phoneInputs = document.querySelectorAll('input[name$="phone"]');
  phoneInputs.forEach(function (phoneInput) {
    phoneInput.addEventListener('keydown', function (event) {
      if (!(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key == 'Tab')) { event.preventDefault() }
      var mask = '+7 (111) 111-11-11'; // Задаем маску
    
      if (/[0-9\+\ \-\(\)]/.test(event.key)) {
        // Здесь начинаем сравнивать this.value и mask
        // к примеру опять же
        var currentString = this.value;
        var currentLength = currentString.length;
        if (/[0-9]/.test(event.key)) {
          if (mask[currentLength] == '1') {
            this.value = currentString + event.key;
          } else {
            for (var i = currentLength; i < mask.length; i++) {
              if (mask[i] == '1') {
                this.value = currentString + event.key;
                break;
              }
              currentString += mask[i];
            }
          }
        }
      }
    });
  });