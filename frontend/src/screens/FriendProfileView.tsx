import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { User } from '../store/types';
import InfoList from '../components/InfoList';
import { phoneFormatter } from '../utils/dataUtils';

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
  shareInfoWithPublic: false,
};

const userBasicInfo = [
  { info: 'Name', data: `${user.firstname} ${user.lastname}` },
  { info: 'Email', data: user.email },
];

const userContactInfo = [
  { info: 'Phone', data: phoneFormatter(user.phone) },
  { info: 'Location', data: user.UF },
];

const userFriendshipInfo = [
  { info: 'Number of friends', data: user.friendIds.length.toString() },
];

const FriendProfileView: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <InfoList items={userBasicInfo} />
        <InfoList items={userContactInfo} />
        <InfoList items={userFriendshipInfo} />
      </View>
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
});

export default memo(FriendProfileView);
