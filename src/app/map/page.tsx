'use client'
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix the default icon issue with Leaflet in React
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const UserLocationMarker = () => {
  const map = useMap();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [userCity, setUserCity] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setUserLocation(location);
          map.setView(location, 13);

          // Reverse geocoding to get city name
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`)
            .then((response) => response.json())
            .then((data) => {
              console.log(data.address)
              console.log(data.address.village)
              console.log(data.address.city)
              console.log(data.address.county)
              console.log(data.address.state)
              console.log(data.address.county)
              setUserCity(data.display_name);
            })
            .catch((error) => {
              console.error('Error fetching city name:', error);
            });
        },
        (error) => {
          console.error('Error getting the location', error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, [map]);

  return (
    <>
      {userLocation && (
        <Marker position={userLocation}>
          <Popup>Your location: {userCity}</Popup>
        </Marker>
      )}
    </>
  );
};

const MapComponent: React.FC = () => {
  return (
   <div className='my-[1rem]'>
     <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '800px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <UserLocationMarker />
    </MapContainer>
   </div>
  );
};

export default MapComponent;
