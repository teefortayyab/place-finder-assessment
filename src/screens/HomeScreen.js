import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import MapViewComponent from '../components/MapViewComponent';
import SearchHistory from '../components/SearchHistory';
import { getHistory } from '../utils/storage';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar onPlaceSelect={handlePlaceSelect} />
      </View>
      <MapViewComponent place={selectedPlace} />
      <View style={styles.historyContainer}>
        <SearchHistory history={history} onSelect={handleHistorySelect} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 8,
  },
  historyContainer: {
    flex: 1,
  },
});

export default HomeScreen;