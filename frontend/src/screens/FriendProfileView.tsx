import React, { memo, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import InfoList from '../components/InfoList';
import { phoneFormatter } from '../utils/dataUtils';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useGetUserQuery, useGetUsersByBatchQuery } from '../store/apiSlice';
import ErrorRetryView from './ErrorRetryView';
import { useTranslation } from 'react-i18next';
import { FriendDisplayData } from '../store/types';
import FriendCard from '../components/FriendCard';
import { useNavigation } from '@react-navigation/native';

const FriendProfileView: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { friendID: string } }>>();
  const { friendID } = route.params;
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const {
    data: currentfriendData,
    isLoading: isLoadingCurrentFriend,
    error: errorCurrentFriend,
    refetch: refetchCurrentUser,
  } = useGetUserQuery(friendID);

  const {
    data: friends,
    isLoading: isLoadingFriends,
    isFetching: isFetchingFriends,
    refetch: refetchFriends,
  } = useGetUsersByBatchQuery(currentfriendData?.friends || [], {
    skip: !currentfriendData?.friends || currentfriendData.friends.length === 0,
  }); // TODO: fetch friends just using the userId not passing all friend IDs

  const onRefresh = useCallback(async () => {
    await refetchCurrentUser();
    const ids = currentfriendData?.friends;
    if (ids && ids.length > 0) {
      await refetchFriends();
    }
  }, [refetchCurrentUser, refetchFriends, currentfriendData]);

  const navigateToFriendProfile = useCallback(
    (selectedFriendID: string) => {
      navigation.push('FriendProfileView', { friendID: selectedFriendID });
    },
    [navigation],
  );

  const countFriends = friends ? friends.length - 1 : undefined;

  const renderItem = useCallback(
    ({ item, index }: { item: FriendDisplayData; index: number }) => (
      <FriendCard
        friend={item}
        onPress={() => navigateToFriendProfile(item._id)}
        containerStyle={[
          styles.friendCardContainer,
          index === countFriends ? styles.footerSpacing : undefined,
        ]}
      />
    ),
    [navigateToFriendProfile],
  );

  const memoizeHeader = useCallback(() => {
    const userUsername = currentfriendData.username
      ? [
          {
            info: t('friendsProfileView.username'),
            data: currentfriendData?.username,
          },
        ]
      : [];

    const userBasicInfo = currentfriendData
      ? [
          {
            info: t('friendsProfileView.name'),
            data: `${currentfriendData.firstName || ''} ${
              currentfriendData.lastName || ''
            }`,
          },
          {
            info: t('friendsProfileView.email'),
            data: currentfriendData.email || '',
          },
        ]
      : [];

    const userContactInfo = currentfriendData
      ? [
          {
            info: t('friendsProfileView.phone'),
            data: phoneFormatter(currentfriendData.phone || ''),
          },
          {
            info: t('friendsProfileView.location'),
            data: currentfriendData.UF || '',
          },
        ]
      : [];

    const userFriendshipInfo = [
      {
        info: t('friendsProfileView.numberOfFriends'),
        data: (currentfriendData.friends?.length || 0).toString(),
      },
    ];

    return (
      <>
        <InfoList items={userUsername} />
        <InfoList items={userBasicInfo} />
        <InfoList items={userContactInfo} />
        <InfoList items={userFriendshipInfo} />
      </>
    );
  }, [currentfriendData, t]);

  if (isLoadingCurrentFriend || !currentfriendData) {
    return <ActivityIndicator size="large" style={styles.loadingContainer} />;
  }

  if (errorCurrentFriend) {
    return (
      <ErrorRetryView
        errorMessage={`${t('errors.fetchFriends')} ${errorCurrentFriend}`}
        onRetry={onRefresh}
      />
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
        refreshing={
          isFetchingFriends || isLoadingCurrentFriend || isLoadingFriends
        }
        ListHeaderComponent={memoizeHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 12,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    padding: 16,
    width: '100%',
    marginTop: 20,
    backgroundColor: '#ffffffff',
  },
  buttonText: {
    color: '#ff0000ff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
  },
  itemsContainer: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 12,
  },
  friendCardContainer: {
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
  },
  footerSpacing: {
    marginBottom: 30,
  },
});

export default memo(FriendProfileView);
