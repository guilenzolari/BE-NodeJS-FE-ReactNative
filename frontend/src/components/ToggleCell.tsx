import { View, Text, StyleSheet, Switch } from 'react-native';

interface ToggleCellProps {
  label: string;
  isEnabled: boolean;
  onToggle: () => void;
}
const ToggleCell: React.FC<ToggleCellProps> = ({
  label,
  isEnabled,
  onToggle,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={isEnabled} onValueChange={onToggle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    color: '#666',
  },
});

export default ToggleCell;
