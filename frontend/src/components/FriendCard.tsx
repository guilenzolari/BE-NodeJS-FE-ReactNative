import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FriendDisplayData } from '../store/types';
import Icon from 'react-native-vector-icons/Ionicons';
import { useGetCurrentUserQuery } from '../store/apiSlice';
import { useTranslation } from 'react-i18next';

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
          isCurrentUser ? ` ${t('frendCard.you')}` : ''
        }`}</Text>
        <Text style={styles.username}>@{friend.username}</Text>
        <Text style={styles.email}>{friend.email}</Text>
      </View>
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
});

export default FriendCard;
