import { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SearchView: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Search View</Text>
    </View>
  );
};

export default memo(SearchView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
