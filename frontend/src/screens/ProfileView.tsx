import React, { memo, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InfoList from '../components/InfoList';
import ToggleCell from '../components/ToggleCell';
import { phoneFormatter } from '../utils/dataUtils';
import { useSelector } from 'react-redux';
import { toggleShareInfo as toggleShare } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { RootState } from '../store/index';

const ProfileView: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.currentUser);

  const infoSections = useMemo(
    () => ({
      basic: [
        {
          info: 'Name',
          data: `${userData?.firstName || ''} ${userData?.lastName || ''}`,
        },
        { info: 'Email', data: userData?.email || '' },
      ],
      contact: [
        { info: 'Phone', data: phoneFormatter(userData?.phone) || '' },
        { info: 'Location', data: userData?.UF || '' },
      ],
      friendship: [
        {
          info: 'Number of friends',
          data: userData?.friendIds.length.toString() || '0',
        },
      ],
    }),
    [userData],
  );

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  const toggleShareInfo = () => {
    dispatch(toggleShare());
  };

  const logout = () => {
    console.log('Logout pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <InfoList items={infoSections.basic} />
        <InfoList items={infoSections.contact} />
        <InfoList items={infoSections.friendship} />

        <ToggleCell
          label="Share info with public"
          isEnabled={userData.shareInfoWithPublic}
          onToggle={toggleShareInfo}
        />
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
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

export default memo(ProfileView);
