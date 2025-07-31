import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
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
  });

  const handleSelectPlace = async (place) => {
    Keyboard.dismiss();

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
    setTerm('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={term}
          onChangeText={setTerm}
          placeholder="Search for a place"
          style={styles.input}
          placeholderTextColor="#888"
        />
        {term.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              clearSearch();
              setTerm('');
              Keyboard.dismiss();
            }}
            style={styles.clearButton}
          >
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {term.length > 0 && (
        <View style={styles.dropdown}>
          {isSearching && <Text style={styles.loading}>Searching...</Text>}
          <FlatList
            data={locationResults.slice(0, 5)}
            keyExtractor={(item) => item.place_id}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectPlace(item)}
                style={styles.item}
              >
                <Text style={styles.name}>
                  {item.structured_formatting.main_text}
                </Text>
                <Text style={styles.secondary}>
                  {item.structured_formatting.secondary_text}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    paddingLeft: 10,
  },
  clearText: {
    fontSize: 18,
    color: '#888',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 6,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 220,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontWeight: '600',
    fontSize: 15,
  },
  secondary: {
    fontSize: 12,
    color: '#666',
  },
  loading: {
    marginLeft: 10,
    fontStyle: 'italic',
    color: 'gray',
    marginBottom: 6,
  },
});

export default SearchBar;