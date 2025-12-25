import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Divider from './Divider';

interface InfoListProps {
  info: string;
  data: string;
}

const InfoList: React.FC<{ items: InfoListProps[] }> = ({ items }) => {
  const length = items.length - 1;
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index}>
          <View style={styles.cell}>
            <Text style={styles.info}>{item.info}</Text>
            <Text style={styles.data}>{item.data}</Text>
          </View>
          {index < length && <Divider />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  cell: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  data: {
    color: '#333',
  },
  info: {
    color: '#666',
  },
});

export default InfoList;
