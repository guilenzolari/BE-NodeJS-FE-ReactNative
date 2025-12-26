import React, { memo, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import FriendCard from '../components/FriendCard';
import { FriendDisplayData } from '../store/types';
import { useNavigation } from '@react-navigation/native';
import { selectMyFriends } from '../store/friendSlice';
import { useSelector } from 'react-redux';

const HomeView: React.FC = () => {
  const navigation = useNavigation<any>();
  const friendsData = useSelector(selectMyFriends);

  const navigateToFriendProfile = useCallback(() => {
    navigation.navigate('FriendProfileView');
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: FriendDisplayData }) => (
      <FriendCard friend={item} onPress={() => navigateToFriendProfile()} />
    ),
    [navigateToFriendProfile],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={friendsData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
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
  },
});

export default memo(HomeView);
