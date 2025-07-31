import React, { useRef, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

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
        1000
      );
    }
  }, [place]);

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: 3.1491296484790565,
        longitude: 101.69419647669443,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
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