import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Text as RNText,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useGoogleAutocomplete } from '@appandflow/react-native-google-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { storeHistory } from '../utils/storage';

const SearchBar = ({ onPlaceSelect }) => {
  const {
    term,
    setTerm,
    locationResults,
    searchDetails,
    isSearching,
    clearSearch,
  } = useGoogleAutocomplete(GOOGLE_MAPS_API_KEY, {
    language: 'en',
    debounce: 300,
    queryTypes: ["all"],
  });

  const handleSelectPlace = async (place) => {
    const details = await searchDetails(place.place_id);
    if (!details?.geometry?.location) return;

    const selectedPlace = {
      name: details.name,
      address: details.formatted_address,
      location: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      },
    };

    await storeHistory(selectedPlace);
    onPlaceSelect(selectedPlace);
    clearSearch();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputContainer}>
        <TextInput
          value={term}
          onChangeText={setTerm}
          placeholder="Search for a place"
          style={styles.input}
          placeholderTextColor="#888"
        />
        {term.length > 0 && (
          <TouchableOpacity onPress={()=> {
            clearSearch();
            setTerm("");
          }} style={styles.clearButton}>
            <RNText style={styles.clearText}>✕</RNText>
          </TouchableOpacity>
        )}
      </View>

      {isSearching && <RNText style={styles.loading}>Searching...</RNText>}

      {locationResults.length === 0 && term.length > 0 && !isSearching && (
        <RNText style={styles.noResults}>No results found</RNText>
      )}

      <FlatList
        data={locationResults.slice(0, 5)}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelectPlace(item)}
            style={styles.item}
            activeOpacity={0.7}
          >
            <RNText style={styles.name}>
              {item.structured_formatting.main_text}
            </RNText>
            <RNText style={styles.secondary}>
              {item.structured_formatting.secondary_text}
            </RNText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#fdfdfd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    paddingHorizontal: 12,
  },
  clearText: {
    fontSize: 18,
    color: '#888',
  },
  item: {
    marginHorizontal: 12,
    marginVertical: 2,
    padding: 14,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 15,
    color: '#222',
  },
  secondary: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  loading: {
    marginLeft: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  noResults: {
    marginLeft: 14,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 6,
  },
});

export default SearchBar;