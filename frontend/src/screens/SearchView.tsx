import Reac, { memo } from 'react';
import { View, Text } from 'react-native';

const SearchView: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Search View</Text>
    </View>
  );
};

export default memo(SearchView);
