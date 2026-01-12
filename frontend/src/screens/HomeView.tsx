import React, { memo, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import FriendCard from '../components/FriendCard';
import { FriendDisplayData } from '../store/types';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useGetUsersByBatchQuery } from '../store/apiSlice';

const HomeView: React.FC = () => {
  const navigation = useNavigation<any>();
  const friendsIds = useSelector(
    (state: any) => state.user.currentUser.friendIds,
  );

  const {
    data: friends,
    isLoading,
    isError,
  } = useGetUsersByBatchQuery(friendsIds, {
    skip: !friendsIds || friendsIds.length === 0,
  });
  console.log('friends data:', friends);
  console.log('isLoading:', isLoading);
  console.log('isError:', isError);

  const navigateToFriendProfile = useCallback(() => {
    navigation.navigate('FriendProfileView');
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: FriendDisplayData }) => (
      <FriendCard friend={item} onPress={() => navigateToFriendProfile()} />
    ),
    [navigateToFriendProfile],
  );

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loadingContainer} />;
  }

  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>Error loading friends</Text>
      </View>
    );
  }

  if (!friends || friends.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>No friends found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.itemsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
  itemsContainer: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 12,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(HomeView);

// TODO: Implement pull-to-refresh functionality
// TODO: Add error handling and retry mechanism
// TODO: implement pagination for large friend lists
