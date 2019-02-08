# iMap
iMap is a simple application of google map through which finding location with the help of autocomplete and reverse back address on clicking on map is possible.

# Adding multiple markers
    function addMarker(location, map, marker) {
          var marker = new google.maps.Marker({ map: map, draggable : true, position: location, label: 'iMark' });
          marker.setPosition(location);
          marker.addListener('dragend', handleEvent);
        }
# What can be done with iMap.js
    1) Autoselect address list from input.
    2) Mark selected address in the map.
    3) Click on map and add marker.
    4) Retrive back address, lat, lng, street, city, state, country from the new marker to autoselect input textbox.

# For any comments:
        [Ishwor Prasad Rijal](https://www.linkedin.com/in/ishworprasadrijal)
    
