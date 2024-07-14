export const getUserLocation = () => {
  // Check if the Geolocation API is supported
  if (navigator.geolocation) {
    // Request the user's location
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Get the user's latitude and longitude
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Use a reverse geocoding service to get the user's location details
        // (e.g., city, town, country)
        // You'll need to use a third-party API or service for this, such as Google Maps Geocoding API
        // or OpenStreetMap's Nominatim API
        reverseGeocode(latitude, longitude, function (locationDetails: any) {
          // Display the user's location details
          console.log(
            "User is in " +
              locationDetails.town +
              ", " +
              locationDetails.country
          );
        });
      },
      function (error) {
        // Handle any errors that occurred
        console.error("Error getting location: ", error);
      }
    );
  } else {
    // Geolocation is not supported by the browser
    console.error("Geolocation is not supported by this browser.");
  }
};

function reverseGeocode(latitude: any, longitude: any, callback: any) {
  // Use a third-party API or service to get the location details
  // Here's an example using the Google Maps Geocoding API:
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      latitude +
      "," +
      longitude +
      "&key=AIzaSyCmg0PIbh58cGLp7hwMQoZt8FcxqZDbMgs"
  );
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.status === "OK") {
        var locationDetails = {
          town: response.results[0].address_components.find(
            function (component: { types: string | string[] }) {
              return component.types.includes("locality");
            }
          ).long_name,
          country: response.results[0].address_components.find(
            function (component: { types: string | string[] }) {
              return component.types.includes("country");
            }
          ).long_name,
        };
        callback(locationDetails);
      } else {
        console.error("Reverse geocoding failed: ", response.status);
      }
    } else {
      console.error("Error making reverse geocoding request: ", xhr.status);
    }
  };
  xhr.send();
}


