import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import MapViewComponent from '../components/MapViewComponent';
import SearchHistory from '../components/SearchHistory';
import { getHistory } from '../utils/storage';

const HomeScreen = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [history, setHistory] = useState([]);

  const handlePlaceSelect = async (place) => {
    setSelectedPlace(place);
    const updated = await getHistory();
    setHistory(updated);
  };

  const handleHistorySelect = (place) => {
    setSelectedPlace(place);
  };

  useEffect(() => {
    getHistory().then(setHistory);
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar onPlaceSelect={handlePlaceSelect} />
      <MapViewComponent place={selectedPlace} />
      <SearchHistory history={history} onSelect={handleHistorySelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
