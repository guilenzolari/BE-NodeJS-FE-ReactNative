import React, { memo, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import InfoList from '../components/InfoList';
import ToggleCell from '../components/ToggleCell';
import { phoneFormatter } from '../utils/dataUtils';
import { useGetCurrentUserQuery } from '../store/apiSlice';
import { useTranslation } from 'react-i18next';

const ProfileView: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { data: userData, isFetching } = useGetCurrentUserQuery();

  const infoSections = useMemo(
    () => ({
      username: [
        { info: t('profile.username'), data: userData?.username || '' },
      ],
      basic: [
        {
          info: t('profile.name'),
          data: `${userData?.firstName || ''} ${userData?.lastName || ''}`,
        },
        { info: t('profile.email'), data: userData?.email || '' },
      ],
      contact: [
        {
          info: t('profile.phone'),
          data: phoneFormatter(userData?.phone) || '',
        },
        { info: t('profile.location'), data: userData?.UF || '' },
      ],
      friendship: [
        {
          info: t('profile.numberOfFriends'),
          data: userData?.friends.length.toString() || '0',
        },
      ],
    }),
    [userData, t],
  );

  const handleToggleLanguage = useCallback(() => {
    const nextLang = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(nextLang);
  }, [i18n]);

  if (!userData) return <ActivityIndicator size="large" />;

  const logout = () => {
    console.log('Logout pressed');
  };

  return (
    <View style={styles.container}>
      {isFetching && <ActivityIndicator size="small" />}
      <View style={styles.container}>
        <InfoList items={infoSections.username} />
        <InfoList items={infoSections.basic} />
        <InfoList items={infoSections.contact} />
        <InfoList items={infoSections.friendship} />
        <ToggleCell
          label={t('profile.language')}
          isEnabled={i18n.language === 'en'}
          onToggle={handleToggleLanguage}
        />
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>{t('profile.logout')}</Text>
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
