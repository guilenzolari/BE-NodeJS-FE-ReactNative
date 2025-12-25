import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';

interface DividerProps {
  style?: ViewStyle;
}

const Divider: React.FC<DividerProps> = ({ style }) => (
  <View style={style || styles.divider} />
);

const styles = StyleSheet.create({
  divider: { width: '100%', backgroundColor: '#E0E0E0', height: 1 },
});

export default Divider;
