import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './store/index';
import { useGetCurrentUserQuery } from './store/apiSlice';
import { Text, ActivityIndicator, View, StyleSheet } from 'react-native';

const AppContent = () => {
  const { error, isLoading, data } = useGetCurrentUserQuery();

  console.log('RTK Query Status:', {
    hasData: !!data,
    error: error,
    loading: isLoading,
  });

  console.log('Current User Data:', data);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    // TODO: improve error handling
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading user data</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
