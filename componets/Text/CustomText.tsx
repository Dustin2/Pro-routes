import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface CTextProps {
  color: 'black' | 'white';
  text: string;
}
export const CText = ({color, text}): CtextProps => {
  return (
    <View>
      <Text
        style={{
          color: color,
          margin: 5,
          padding: 5,
          marginBottom: 0,
          marginLeft: 13,
        }}>
        {text}
      </Text>
    </View>
  );
};

// const styles = StyleSheet.create({
//  text:{
//    color:
//  }
// })
