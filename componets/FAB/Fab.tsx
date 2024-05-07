import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FAB} from 'react-native-paper';

interface FabProps {
  onPress?: () => void;
  icon?: 'plus' | 'minus';
  // background?: 'red'| 'blue';
  style?: () => void;
}

export const Fab = ({onPress, icon, style}: FabProps) => {
  return <FAB icon={icon} style={styles.fab} onPress={onPress} color='white' />;
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#006d77',
   
  },
});
