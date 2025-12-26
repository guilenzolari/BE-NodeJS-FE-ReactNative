import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder || 'Search friends...'}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        clearButtonMode="while-editing" // iOS only
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 10,
    height: 45,
  },
  icon: {
    marginRight: 8,
    color: '#888',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;
