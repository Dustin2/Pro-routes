import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
export function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('home');
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
      {/* this text is used in splash screen with props */}
      {/* <Animatable.Image
        style={{width: 400, height: 50}}
        //with use image from api
        // source={{
        //   uri: 'https://bwgateway.centralinformatica.com/Recursos/CentralInformatica/LogoCI_web.png',
        // }}
        //whit local image
        source={require('../img/splash.png')}
      /> */}
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
