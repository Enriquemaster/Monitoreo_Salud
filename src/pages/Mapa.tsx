import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

type LatLng = {
    lat: number;
    lng: number;
  };
  
  type GoogleMapComponentProps = {
    initialCenter: LatLng; // Aquí definimos correctamente el tipo de initialCenter
    markers: LatLng[]; // Lista de marcadores
    path: LatLng[]; // Ruta a seguir
    onMapClick?: (event: google.maps.MapMouseEvent) => void; // Map click handler opcional
  };
  

const Mapa: React.FC<GoogleMapComponentProps> = ({ onMapClick, markers, initialCenter, path }) => {
  const mapContainerStyle = {
    height: '400px',
    width: '100%',
  };
  const [nearbyPlaceImage, setNearbyPlaceImage] = useState<string | null>(null);

  
  return (
    <LoadScript googleMapsApiKey="AIzaSyA4cPEyP6494N4TwKwJ6HKzl55iecYIsVw">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={initialCenter}
        zoom={15}
        onClick={onMapClick}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
        
        {/* Polyline para mostrar la ruta */}
        <Polyline
        path={path}
        options={{
          strokeColor: '#0000FF', // Azul
          strokeOpacity: 1.0,
          strokeWeight: 6, // Grosor de la línea aumentado
          }}
        />
      </GoogleMap>

    </LoadScript>
  );
};

export default Mapa;
