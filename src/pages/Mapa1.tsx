import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

type LatLng = {
  lat: number;
  lng: number;
};

const Mapa1: React.FC<{ initialCenter: LatLng }> = ({ initialCenter }) => {
  const [nearbyPlaceImage, setNearbyPlaceImage] = useState<string | null>(null);
  const [nearestPlace, setNearestPlace] = useState<LatLng | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Solo ejecuta fetchNearbyPlaces si la API de Google Maps está cargada
    if (mapLoaded && google && google.maps && google.maps.places) {
      const fetchNearbyPlaces = async () => {
        const service = new google.maps.places.PlacesService(
          document.createElement('div') // Crear un contenedor para el servicio de PlacesService
        );
        const request = {
          location: new google.maps.LatLng(initialCenter.lat, initialCenter.lng),
          radius: 5000, // radio de búsqueda en metros (5km)
          type: 'restaurant', // Filtra solo restaurantes
        };

        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const place = results[0]; // Tomar el primer resultado (el más cercano)
            if (place.geometry && place.geometry.location) {
              const placeLocation = place.geometry.location;
              setNearestPlace({
                lat: placeLocation.lat(),
                lng: placeLocation.lng(),
              });

              // Si tiene fotos, mostrar la primera
              if (place.photos && place.photos.length > 0) {
                const photoUrl = place.photos[0].getUrl({
                  maxWidth: 400,
                  maxHeight: 400,
                });
                setNearbyPlaceImage(photoUrl);
              }
            }
          }
        });
      };
      fetchNearbyPlaces();
    }
  }, [mapLoaded, initialCenter]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyA4cPEyP6494N4TwKwJ6HKzl55iecYIsVw"
      onLoad={() => setMapLoaded(true)} // Marca que la API de Google Maps se cargó
    >
      <div className="col-span-1 md:col-span-7 bg-card p-4 rounded-lg shadow-md bg-[#d5d153]">
        <h3 className="text-xl font-bold">Visualización de lugares cercanos</h3>

        {/* Mostrar el mapa solo si hay una ubicación cercana */}
        {nearestPlace && (
          <GoogleMap
            mapContainerStyle={{
              height: '300px',
              width: '100%',
            }}
            center={nearestPlace}
            zoom={15}
          >
            {/* Mostrar un marcador en la ubicación del restaurante cercano */}
            <Marker position={nearestPlace} />
          </GoogleMap>
        )}

        {/* Mostrar la primera imagen del restaurante más cercano */}
        {nearbyPlaceImage ? (
          <img
            src={nearbyPlaceImage}
            alt="Lugar cercano"
            className="w-full h-auto rounded-lg mb-4"
          />
        ) : (
          <p>Cargando imagen del lugar más cercano...</p>
        )}
      </div>
    </LoadScript>
  );
};

export default Mapa1;
