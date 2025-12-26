import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';

const SearchView = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.screen}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
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
