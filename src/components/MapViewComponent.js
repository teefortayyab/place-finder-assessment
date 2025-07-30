import React, { useRef, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet, Dimensions } from 'react-native';

const MapViewComponent = ({ place }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (place && mapRef.current) {
      const { latitude, longitude } = place.location;
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000 // animation duration in ms
      );
    }
  }, [place]);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 37.78825, // fallback
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {place && (
        <Marker
          coordinate={{
            latitude: place.location.latitude,
            longitude: place.location.longitude,
          }}
          title={place.name}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: 300,
  },
});

export default MapViewComponent;