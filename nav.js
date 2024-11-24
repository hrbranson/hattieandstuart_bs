var activeSection = 'home';

addEventListener("DOMContentLoaded", (event) => {
  console.log("hello");
  elements = document.getElementsByClassName("section-switch")

  Array.from(elements).forEach(function(element) {
    element.addEventListener("click", switchSection);
  });
});

function switchSection(element) {
  el = document.getElementById(activeSection);
  el.style.display = 'none';

  activeSection = this.dataset.section;
  el = document.getElementById(activeSection);
  el.style.display = 'block';

  if (activeSection == 'hotels') {
    var map = L.map('map').setView([52.78, -1.18], 12);
                        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                        maxZoom: 15,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'}).addTo(map);
    var data_points = {
      "type": "FeatureCollection",
      "name": "Hotels",
      "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
      "features": [
        { "type": "Feature", "properties": { "name": "Caravelli" }, "geometry": { "type": "Point", "coordinates": [ -1.203, 52.774]}},
        { "type": "Feature", "properties": { "name": "Burleigh Court Hotel"}, "geometry": { "type": "Point", "coordinates": [ -1.240, 52.761]}},
        { "type": "Feature", "properties": { "name": "Holywell Guest House"}, "geometry": { "type": "Point", "coordinates": [ -1.201620, 52.768910]}},
        { "type": "Feature", "properties": { "name": "Hammer & Pincers"}, "geometry": { "type": "Point", "coordinates": [ -1.104760, 52.806190]}},
        { "type": "Feature", "properties": { "name": "Quorn Country Hotel"}, "geometry": { "type": "Point", "coordinates": [ -1.169710, 52.742850]}},
        { "type": "Feature", "properties": { "name": "Prestwold Hall"}, "geometry": { "type": "Point", "coordinates": [ -1.143480, 52.789539]}}
      ]};
    var pointLayer = L.geoJSON(null, {
      pointToLayer: function(feature,latlng){
        label = String(feature.properties.name) // Must convert to string, .bindTooltip can't use straight 'feature.properties.attribute'
        return new L.CircleMarker(latlng, {radius: 1, color: '#709fa3',
        }).bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip();
      }
    });
    pointLayer.addData(data_points);
    map.addLayer(pointLayer);
  }

  return false;
}


document.addEventListener('DOMContentLoaded', function () {
  const responseRadios = document.querySelectorAll('input[name="response"]');
  const additionalFields = document.getElementById('additional-fields');
  const rsvpForm = document.getElementById('rsvp-form');
  const successMessage = document.getElementById('success-message');

  responseRadios.forEach(radio => {
      radio.addEventListener('change', function () {
        successMessage.style.display = 'none';

        if (this.value === 'Accept') {
            additionalFields.style.display = 'block';
            additionalFields.querySelectorAll('input').forEach(input => input.required = true);
        } else if (this.value === 'Decline') {
            additionalFields.style.display = 'none';
            additionalFields.querySelectorAll('input').forEach(input => input.required = false);
        }
      });
  });

  // Initialize the visibility on page load
  if (document.querySelector('input[name="response"]:checked')?.value === 'Decline') {
      additionalFields.style.display = 'none';
  }

  rsvpForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(rsvpForm);

      fetch(rsvpForm.action, {
          method: 'POST',
          body: formData
      }).then(response => {
          rsvpForm.reset();
          successMessage.style.display = 'block';
          if (responseRadios[0].checked) {
              additionalFields.style.display = 'block';
              additionalFields.querySelectorAll('input').forEach(input => input.required = true);
          } else {
              additionalFields.style.display = 'none';
          }
      }).catch(error => {
          console.error('Error:', error);
      });
  });
});

