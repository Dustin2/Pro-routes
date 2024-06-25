import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
export function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('login');
      // navigation.navigate('main');
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0097B2',
      }}>
 
      <Animatable.Text
        animation="bounceIn"
        duration={2000}
        style={{
          textAlign: 'center',
          color: '#004AAD',
          fontFamily: 'bold',
          fontSize: 70,
        }}>
        Pro{' '}
        <Animatable.Text
          animation="bounceIn"
          duration={2000}
          style={{
            textAlign: 'center',
            color: '#ffff',
            fontFamily: 'bold',
            fontSize: 70,
          }}>
          Hielo
        </Animatable.Text>
      </Animatable.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bb8557',
  },
});

export default SplashScreen;
