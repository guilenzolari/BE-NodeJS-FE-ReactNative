import React, { memo, useCallback, useMemo } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import FriendCard from '../components/FriendCard';
import { FriendDisplayData } from '../store/types';
import { useNavigation } from '@react-navigation/native';
import {
  useGetCurrentUserQuery,
  useGetUsersByBatchQuery,
} from '../store/apiSlice';
import { useTranslation } from 'react-i18next';

const HomeView: React.FC = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const {
    data: userData,
    isFetching: isFetchingUser,
    refetch: refetchUser,
  } = useGetCurrentUserQuery();

  const friendsIds = useMemo(
    () => userData?.friends || [],
    [userData?.friends],
  );

  const {
    data: friends,
    isLoading: isLoadingFriends,
    isFetching: isFetchingFriends,
    isError,
    refetch: refetchFriends,
  } = useGetUsersByBatchQuery(friendsIds, {
    skip: !friendsIds || friendsIds.length === 0,
  }); // TODO: fetch friends just using the userId not passing all friend IDs

  const navigateToFriendProfile = useCallback(
    (friendID: string) => {
      navigation.navigate('FriendProfileView', { friendID });
    },
    [navigation],
  );

  const onRefresh = useCallback(async () => {
    await refetchUser();
    if (friendsIds && friendsIds.length > 0) {
      await refetchFriends();
    }
  }, [refetchUser, refetchFriends, friendsIds]);

  const countFriends = friends ? friends.length - 1 : undefined;

  const renderItem = useCallback(
    ({ item, index }: { item: FriendDisplayData; index: number }) => (
      <FriendCard
        friend={item}
        onPress={() => navigateToFriendProfile(item._id)}
        containerStyle={
          index === countFriends
            ? styles.footerSpacing
            : index === 0
            ? styles.headerSpacing
            : undefined
        }
      />
    ),
    [navigateToFriendProfile, countFriends],
  );

  if (isLoadingFriends && !friends) {
    return <ActivityIndicator size="large" style={styles.loadingContainer} />;
  }

  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>{t('errors.fetchFriends')}</Text>
      </View>
    );
  }

  if (!friends || friends.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>{t('errors.noFriendsFound')}</Text>
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
        onRefresh={onRefresh}
        refreshing={isFetchingFriends || isFetchingUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  footerSpacing: {
    marginBottom: 30,
  },
  headerSpacing: {
    marginTop: 16,
  },
});

export default memo(HomeView);
