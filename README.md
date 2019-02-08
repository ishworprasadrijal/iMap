# iMap
iMap is a simple application of google map through which finding location with the help of autocomplete and reverse back address on clicking on map is possible.

# Adding multiple markers
    function addMarker(location, map, marker) {
          var marker = new google.maps.Marker({ map: map, draggable : true, position: location, label: 'iMark' });
          marker.setPosition(location);
          marker.addListener('dragend', handleEvent);
        }
