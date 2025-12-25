import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User } from '../store/types';

const user: User = {
  id: 1,
  firstname: 'John',
  lastname: 'Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  phone: '1234567890',
  age: 30,
  UF: 'SP',
  friendIds: [2, 3],
  shareInfoWithFriends: true,
  shareInfoWithPublic: false,
};

const ProfileView: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>
          {user.firstname} {user.lastname}
        </Text>
        <Text>{user.email}</Text>
        <Text>{user.phone}</Text>
        <Text>{user.age} years old</Text>
        <Text>{user.UF}</Text>
        <Text>Number of friends: {user.friendIds.length}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default memo(ProfileView);
