import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const HomeView: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default memo(HomeView);
