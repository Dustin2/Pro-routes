import Geolocation from '@react-native-community/geolocation';
import React, {useState, useEffect} from 'react';
import {Platform, PermissionsAndroid, Alert} from 'react-native';

export const useLocation = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  //launch resq location
  useEffect(() => {
    requestLocationPermission();
    getLocation();
  }, []);
  // get current location by gps devices
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLatitude(latitude.toString());
        setLongitude(longitude.toString());
      },
      error => {
        console.error('Error:', error);
        Alert.alert('Error getting location');
      },
      {
        enableHighAccuracy: true,
        timeout: 20000, // Aumenta el timeout a 20 segundos
        maximumAge: 10000,
      },
    );
  };
  //show if resq is grantes/negative or not
  async function requestLocationPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permiso de ubicación',
            message: 'Esta aplicación necesita acceso a tu ubicación',
            buttonNeutral: 'Preguntar luego',
            buttonNegative: 'Cancelar',
            buttonPositive: 'Aceptar',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Tienes acceso a la ubicación');
        } else {
          console.log('Permiso de ubicación denegado');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

  return {
    latitude,
    longitude,
    getLocation,
  };
};

export default useLocation;
