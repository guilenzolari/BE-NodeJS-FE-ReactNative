import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface DividerProps {
  color?: string;
  thickness?: number;
  verticalMargin?: number;
  style?: ViewStyle;
}

const Divider: React.FC<DividerProps> = ({
  color = '#E0E0E0',
  thickness = 1,
  style,
}) => (
  <View
    style={[
      {
        height: thickness,
        backgroundColor: color,
        width: '100%',
      },
      style,
    ]}
  />
);

export default Divider;
