/*
  iMap
  Feb 2019
  Ishwor
  ishorprasadrijal@gmail.com
*/

  function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), { center: {lat: 27.65229033034389, lng: 85.41223651325504}, zoom: 17 });

        var input = document.getElementById('full_address');

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        autocomplete.setFields( ['address_components', 'geometry', 'icon', 'name']);

        var marker = new google.maps.Marker({ map: map, anchorPoint: new google.maps.Point(27.65229033034389, 85.41223651325504), zoom:17, draggable:true });
        
        /* on place change, show tooltip and marker .... */
        autocomplete.addListener('place_changed', function() {
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }
        });

        google.maps.event.addDomListener(window, 'load', initMap);


        google.maps.event.addListener(map, 'click', function(event) {
          addMarker(event.latLng, map, marker);                                 /* if you need multiple markers on click ..... */
          getLatLongDetail(event.latLng);
        });


        function addMarker(location, map, marker) {
          //var marker = new google.maps.Marker({ map: map, draggable : true, position: location, label: 'iMark' }); /* need multiple markers ??*/
          marker.setPosition(location);
          marker.addListener('dragend', handleEvent);
        }


        function handleEvent(event) {
          getLatLongDetail(event.latLng);
        }
  }

  function getLatLongDetail(myLatlng) {
        var geocoder = new google.maps.Geocoder(); 
        geocoder.geocode({ 'latLng': myLatlng },
          function (results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                  if (results[0]) {
                      var address = "", city = "", state = "", zip = "", country = "", full_address = "";
                      var lat;
                      var lng;
                      for (var i = 0; i < results[0].address_components.length; i++) {
                          var addr = results[0].address_components[i];
                          if (addr.types[0] == 'country')                             country = addr.long_name;
                          else if (addr.types[0] == 'street_address')                 address = address + addr.long_name;
                          else if (addr.types[0] == 'establishment')                  address = address + addr.long_name;
                          else if (addr.types[0] == 'route')                          address = address + addr.long_name;
                          else if (addr.types[0] == 'postal_code')                    zip = addr.short_name;
                          else if (addr.types[0] == ['administrative_area_level_1'])  state = addr.long_name;
                          else if (addr.types[0] == ['locality'])                     city = addr.long_name;
                      }
                      if (results[0].formatted_address != null) {
                          full_address = results[0].formatted_address;
                      }
                      var location = results[0].geometry.location;
                      lat = location.lat;
                      lng = location.lng;
                      current_address = '['+location.lat()+', '+location.lng()+'], '+full_address;
                      writeBackAddress(current_address);
                  }
              }
          });
    }

    function writeBackAddress(full_address){
      document.getElementById('full_address').value=full_address;
    }



