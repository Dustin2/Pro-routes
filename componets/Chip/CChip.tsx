import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip, Icon} from 'react-native-paper';

interface ChipComponentProps {
  text: string;
  isSelected?: boolean;
  onSelect: (label: string) => void;
}

export const CChip = ({text, isSelected, onSelect}: ChipComponentProps) => {
  return (
    <Chip style={[styles.chip, isSelected && styles.selectedChip]}>{text}</Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    margin: 4,
  },
  selectedChip: {
    backgroundColor: 'blue',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
});
