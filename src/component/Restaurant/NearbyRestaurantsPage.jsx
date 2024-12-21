import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const NearbyRestaurantsPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: "Pasta Palace", lat: 37.7749, lng: -122.4194 },
    { id: 2, name: "Burger Haven", lat: 37.7755, lng: -122.4183 },
    { id: 3, name: "Sushi World", lat: 37.7767, lng: -122.4172 }
  ]);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  return (
    <div className="py-12 px-6">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">Nearby Restaurants</h2>

      {/* Google Map */}
      {userLocation ? (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation}
            zoom={14}
          >
            {/* Add user marker */}
            <Marker position={userLocation} label="You are here" />
            
            {/* Add restaurant markers */}
            {restaurants.map((restaurant) => (
              <Marker
                key={restaurant.id}
                position={{ lat: restaurant.lat, lng: restaurant.lng }}
                label={restaurant.name}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      ) : (
        <p>Loading map...</p>
      )}

      {/* Display list of restaurants nearby */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-900">Restaurants Near You:</h3>
        <ul className="list-none mt-4">
          {restaurants.map((restaurant) => (
            <li key={restaurant.id} className="text-lg">{restaurant.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NearbyRestaurantsPage;
