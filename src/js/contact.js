$(document).ready(function(){
    $('input').on('blur', function(){
        requiredFormValidation(this);
    });
 
    function requiredFormValidation(field){
      let inputvalue = field.value;
      let inputType = field.type;
      let regExpEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; 
      let regExpName =  /^[a-zA-Z ]{2,}$/;
      let regExpPhone =  /\d{9,12}$/;

      if (inputType === 'text'){
        if (regExpName.test(inputvalue) == false) {
            $(field).siblings(".invalid-msg").removeClass("not-error").addClass("error-show");
            $("<span></span>").insertAfter(field);
          } else if (regExpName.test(inputvalue) == true) { 
            $(field).siblings(".invalid-msg").removeClass("error-show").addClass("not-error");
            $("<span></span>").insertAfter(field);
          }

      }
      if (inputType === 'email'){
        if (regExpEmail.test(inputvalue) == false) {
            $(field).siblings(".invalid-msg").removeClass("not-error").addClass("error-show");
            $("<span></span>").insertAfter(field);
          } else if (regExpEmail.test(inputvalue) == true) { 
            $(field).siblings(".invalid-msg").removeClass("error-show").addClass("not-error");
            $("<span></span>").insertAfter(field);
          }
          
      }
      if (inputType === 'tel'){
        if (regExpPhone.test(inputvalue) == false) {
            $(field).siblings(".invalid-msg").removeClass("not-error").addClass("error-show");
            $("<span></span>").insertAfter(field);
          } else if (regExpPhone.test(inputvalue) == true) { 
            $(field).siblings(".invalid-msg").removeClass("error-show").addClass("not-error");
            $("<span></span>").insertAfter(field);
          }
      
      }
    }  

    const inputSelector = ':input[required]:visible';

  function checkForm() {
    var isValidForm = true;
    $(this.form).find(inputSelector).each(function() {
      if (!this.value.trim()) {
        isValidForm = false;
      }
      if ((this.type === 'tel') && (this.value.length < 9)){
        isValidForm = false;
      }
      if ((this.type === 'text') && (this.value.length < 2)){
        isValidForm = false;
      }
    });
    $(this.form).find('.btn-submit').prop('disabled', !isValidForm);
    return isValidForm;
  }

  $('.btn-submit').closest('form')
  .submit(function() {
    return checkForm.apply($(this).find(':input')[0]);
  })
  .find(inputSelector).keyup(checkForm).keyup();
  });

  

window.onload = function mapbox() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmhhcmdhdnBhbmR5YSIsImEiOiJjazc4ODgzYncwZnZtM2RvZzN4cjVsbGRvIn0.AONFwDyXNKyCsxCbDHdCIg';
    var dusttodazzle = [173.1984404, -41.3350745];
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: dusttodazzle,
        zoom: 14.5
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    // disable map zoom when using scroll
    map.scrollZoom.disable();

    // create the popup
    var popup = new mapboxgl.Popup().setHTML(
        '<h6>Dust to Dazzle Cleaning Services</h6><p><a href="tel:+64 027 2303226" style="color: #1B9CE3;">+64 027 2303226</a></p><p><a href="mailto:dust2dazzle1@gmail.com" style="color: #1B9CE3;">dust2dazzle1@gmail.com</a></p>'
    );

    // create DOM element for the marker
    var el = document.createElement('div');
    el.id = 'marker';
    // el.appendChild('<i class="fas fa-map-marker-alt"></i>');
    let width = 1;
    let height = 1;
    //Setting up defult popup on Map load
    new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(dusttodazzle)
        .setHTML('<h6>Dust to Dazzle Cleaning Services</h6><p><a href="tel:+64 027 2303226" style="color: #1B9CE3;">+64 027 2303226</a></p><p><a href="mailto:dust2dazzle1@gmail.com" style="color: #1B9CE3;">dust2dazzle1@gmail.com</a></p>')
        .addTo(map);

    //Setting up Marker position with popup
   new mapboxgl.Marker(el, {offset: [-width / 2, -height]})
        .setLngLat(dusttodazzle)
        .setPopup(popup) // sets a popup on this marker
        .addTo(map);

}

