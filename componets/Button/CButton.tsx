import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';

interface CButtonProps {
  buttonColor: string;
  text: string;
  mode: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  enable?: boolean;
  dark?: boolean;
  textColor: 'black' | 'white';
  rippleColor?: string;
  icon?: string;
  onPress?: () => void;
}
export const CButton = ({
  text,
  buttonColor,
  mode,
  enable,
  dark,
  textColor,
  rippleColor,
  icon,
  onPress,
}: CButtonProps) => {
  return (
    <View>
      <Button
        mode={mode}
        icon={icon}
        dark={dark}
        textColor={textColor}
        buttonColor={buttonColor}
        rippleColor={rippleColor}
        onPress={onPress}>
        {text}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});

