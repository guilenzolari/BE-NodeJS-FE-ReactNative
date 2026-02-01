import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import { useSearchUsersQuery } from '../store/apiSlice';
import FriendCard from '../components/FriendCard';
import { FriendDisplayData } from '../store/types';
import { useNavigation } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';

const SearchView = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation();

  const { data, isFetching } = useSearchUsersQuery(searchQuery, {
    skip: searchQuery.trim().length < 2,
  });

  useEffect(() => {
    const delay = setTimeout(() => setSearchQuery(inputValue), 500);
    return () => clearTimeout(delay);
  }, [inputValue]);

  const navigateToFriendProfile = useCallback(
    (friendID: string) => {
      navigation.navigate('FriendProfileView', { friendID });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: FriendDisplayData }) => (
      <FriendCard
        friend={item}
        onPress={() => navigateToFriendProfile(item._id)}
        containerStyle={styles.cardContainerStyle}
      />
    ),
    [navigateToFriendProfile],
  );

  const verticalSeparator = useCallback(
    () => <View style={styles.verticalSeparator} />,
    [],
  );

  // Componente para quando a lista estiver vazia
  const ListEmptyComponent = useCallback(() => {
    if (isFetching) return null;
    if (searchQuery.length < 2)
      return (
        <Text style={styles.infoText}>{t('searchView.enterSearchTerm')}</Text>
      );
    return (
      <Text style={styles.infoText}>
        {`${t('searchView.noResults')} ${searchQuery}`}
      </Text>
    );
  }, [isFetching, searchQuery, t]);

  return (
    <View style={styles.screen}>
      <View style={styles.searchBarWrapper}>
        <SearchBar value={inputValue} onChangeText={setInputValue} />
      </View>

      {isFetching && !data && (
        <ActivityIndicator size="large" color="tomato" style={styles.loader} />
      )}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={verticalSeparator}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarWrapper: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  cardContainerStyle: {
    marginBottom: 12,
    backgroundColor: '#eeeeee',
  },
  infoText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  verticalSeparator: {
    height: 20,
  },
});

export default SearchView;
