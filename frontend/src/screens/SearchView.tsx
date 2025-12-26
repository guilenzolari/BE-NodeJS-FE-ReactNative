import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';

const SearchView = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.screen}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      //TODO: Implement search results list with FlatList
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
});

export default SearchView;
