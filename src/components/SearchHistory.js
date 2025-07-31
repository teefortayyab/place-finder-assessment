import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const SearchHistory = ({ history, onSelect }) => {
  const memoizedHistory = useMemo(() => history, [history]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search History</Text>
      <FlatList
        data={memoizedHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item)} style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.address}>{item.address}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
  },
  item: {
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
  },
  name: {
    fontWeight: '600',
  },
  address: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  }
});

export default SearchHistory;