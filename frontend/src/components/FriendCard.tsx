import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { FriendDisplayData } from '../store/types';
import Icon from 'react-native-vector-icons/Ionicons';
import { useGetCurrentUserQuery } from '../store/apiSlice';
import { useTranslation } from 'react-i18next';
import { useAddFriendMutation } from '../store/apiSlice';

interface FriendCardProps {
  friend: FriendDisplayData;
  onPress?: () => void;
  containerStyle?: object;
}

const FriendCard: React.FC<FriendCardProps> = ({
  friend,
  onPress,
  containerStyle,
}) => {
  const { data: userData } = useGetCurrentUserQuery();
  const isCurrentUser = userData?._id === friend._id;
  const { t } = useTranslation();
  const [addFriendTrigger, { isLoading, isSuccess }] = useAddFriendMutation();
  const userFriends = useMemo(
    () => userData?.friends || [],
    [userData?.friends],
  );

  //TODO: otimizar essa verificação pois está sendo feita toda vez que o componente renderiza
  const isAlreadyFriend = useMemo(
    () => userFriends.includes(friend._id) || isSuccess,
    [userFriends, friend._id, isSuccess],
  );

  const handleAddFriend = useCallback(async () => {
    if (userData && !isCurrentUser) {
      try {
        await addFriendTrigger({
          userId: userData._id,
          friendId: friend._id,
        }).unwrap();
      } catch (error) {
        console.error('Error adding friend:', error);
      }
    }
  }, [userData, isCurrentUser, addFriendTrigger, friend._id]);

  const addFriendIcon = useMemo(() => {
    if (isCurrentUser || isAlreadyFriend) {
      return null;
    }

    if (isLoading) {
      return <ActivityIndicator size="small" />;
    }

    return (
      <TouchableOpacity
        onPress={handleAddFriend}
        style={styles.addFriendButton}
      >
        <Icon name="person-add" size={24} />
      </TouchableOpacity>
    );
  }, [handleAddFriend, isCurrentUser, isAlreadyFriend, isLoading]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        containerStyle,
        isCurrentUser && styles.isUserBackground,
      ]}
      onPress={onPress}
      disabled={isCurrentUser}
    >
      <View style={styles.textCenter}>
        <Text style={styles.name}>{`${friend.firstName} ${friend.lastName}${
          isCurrentUser ? ` (${t('friendCard.you')})` : ''
        }`}</Text>
        <Text style={styles.username}>@{friend.username}</Text>
        <Text style={styles.email}>{friend.email}</Text>
      </View>
      {addFriendIcon}
      {!isCurrentUser && (
        <Icon name="chevron-forward" size={20} style={styles.icon} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  textCenter: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: '#666',
  },
  email: {
    fontSize: 14,
  },
  icon: {
    color: '#666',
    marginRight: 6,
  },
  isUserBackground: {
    backgroundColor: '#b2ffab',
  },
  footerSpacing: {
    marginBottom: 30,
  },
  addFriendButton: {
    marginRight: 10,
    backgroundColor: '#e8e8e8',
    padding: 8,
    paddingHorizontal: 20,
    borderRadius: 200,
  },
});

export default FriendCard;
