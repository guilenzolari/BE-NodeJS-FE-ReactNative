import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FriendDisplayData } from '../store/types';
import Icon from 'react-native-vector-icons/Ionicons';

interface FriendCardProps {
  friend: FriendDisplayData;
  onPress?: () => void;
}

const FriendCard: React.FC<FriendCardProps> = ({ friend, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.textCenter}>
        <Text
          style={styles.name}
        >{`${friend.firstname} ${friend.lastname}`}</Text>
        <Text style={styles.username}>@{friend.username}</Text>
        <Text style={styles.email}>{friend.email}</Text>
      </View>
      <Icon name="chevron-forward" size={20} style={styles.icon} />
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
});

export default FriendCard;
