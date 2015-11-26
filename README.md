<h1>Project 5: Neighborhood Map</h1>

The neighborhood I chose to implement was inspired by Food Network's <i>Diners, Drive-Ins and Dives</i> and contain an assortment of restaurant locations that were visited by Guy Fieri during the show.

<h2>The Key Locations "List View"</h2>

The key locations list view is automatically populated based on an object containing preset 'Venue Name' and 'Address' key-value pairs.  Clicking on a location in the list view will highlight it with a yellow color.  The corresponding map marker will also be notified of the click.  The key locations can be sorted via the 'Search' input bar.  The hamburger icon toggles the menu on and off screen.

<h2>Search Bar</h2>

The search bar actively checks each keypress or text input against the names listed in the 'Key Locations' list view.  Any match in string or sub-string will result in the key location remaining.  Any key location that does not match the search string in any manner will be hidden from view.  The corresponding map markers respond in the same manner as the key locations in the 'list view.'  If a location is hidden from the 'list view' then it will also be hidden on the map.  In this way, the search bar actively sorts both the key locations and map markers in tandem.

<h2>Google Map</h2>

The Google map API is used to display a map centered on a default latitude and longitude.  Map markers are generated with only the venue's name and address.  Each name/address pair is sent through Google's geocode API where the latitude and longitude of the location is determined.  A map marker and infoWindow pair are created and then set on the map.  The infoWindow that is intially created contains default information that is displayed.  This default information is overwritten upon the successful callback of the FourSquare API.  The FourSquare AJAX call returns the venue's phone number and website.  This data is then compiled together, and appended to the corresponding infoWindow.  If the FourSquare API fails in any manner, the infoWindow's default content will remain and alert the user to that error. <br>

Clicking on the map marker will open the infoWindow, animate the marker, and highlight the corresponding venue name in the key locations 'list view.'  Clicking again will remove the infoWindow and un-highlight the corresponding venue name.