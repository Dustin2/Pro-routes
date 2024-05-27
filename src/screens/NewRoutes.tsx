import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Alert,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
//componets
import {TextInputcus} from '../../componets/INPUT/TextInput';
import {CText} from '../../componets/Text/CustomText';
import {CDialog} from '../../componets/Dialog/CDialog';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

//styles
import {GlobalStyles} from '../GlobalStyles';
import CButton from '../../componets/Button/CButton';

//firebase
import {database} from '../../firebase/Config';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';

const initialstate = {
  storeName: '',
  codeName: '',
  bag1kg: 0,
  bag3kg: 0,
  bag5kg: 0,
  bag15kg: 0,
  phoneNumber: '',
};

export const NewRoutes = props => {
  const [route, setRoute] = useState(initialstate);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [freezerSize, setFreezerSize] = useState('5 fts');
  const handlesaveRoute = () => {
    if (
      route.codeName === '' ||
      route.phoneNumber === '' ||
      route.storeName === ''
    ) {
      Alert.alert(
        'Error Campos invalidos',
        'Porfavor completa todos los campos',
      );
    } else {
      Alert.alert('Confirmar', 'Desea guardar los cambios actuales?', [
        {
          text: 'Cancelar',
          onPress: () => ToastAndroid.show('cancelado!', ToastAndroid.SHORT),
          style: 'cancel',
        },
        {
          text: 'Guardar',
          onPress: () => (
            sendData(),
            setRoute(initialstate),
            setLatitude(''),
            setLongitude(''),
            setFreezerSize(''),
            ToastAndroid.show('Acta registrada con exito!', ToastAndroid.SHORT)
          ),
          style: 'default',
        },
      ]);
    }
  };
  //get permission to use gps
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getLocation();
    }
  }, []);

  // change values of Tinputs
  const handleChangeText = (name: string, value: string) => {
    setRoute({...route, [name]: value});
    console.log(route);
  };

  //get current location of user
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission Granted
        getLocation();
      } else {
        alert('Permission Denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(position.coords.latitude);
        setLatitude(latitude.toString());
        setLongitude(longitude.toString());
        console.log('Position:', position);
      },
      error => {
        console.error('Error:', error);
        alert('Error getting location');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  const sendData = async () => {
    await addDoc(collection(database, 'info-stores'), {
      storeName: route.storeName,
      codeName: route.codeName,
      latitude: latitude,
      longitude: longitude,
      phoneNumber: route.phoneNumber,
      freezerSize: freezerSize,
      bag1kg: route.bag1kg,
      bag3kg: route.bag3kg,
      bag5kg: route.bag5kg,
      bag15kg: route.bag15kg,
      createdDoc: new Date(),
    });
    setRoute(initialstate);
    setLatitude('');
    setLongitude('');
    setFreezerSize('');
    props.navigation.navigate('home');
  };

  const frezers = [
    ' Casa',
    '5 fts',
    '6 fts',
    '9 fts',
    '11 fts',
    '13 fts',
    '15 fts',
    '25 fts',
  ];

  return (
    <ScrollView style={GlobalStyles.container}>
      <CText color="black" text="Nombre del negocio" />
      <TextInputcus
        mode="outlined"
        // label="nombre del negocio"
        onChange={value => {
          handleChangeText('storeName', value);
        }}
      />
      <CText color="black" text="Nombre clave" />
      <TextInputcus
        mode="outlined"
        onChange={value => {
          handleChangeText('codeName', value);
        }}
      />
      <CText color="black" text="Numero de telefono" />
      <TextInputcus
        mode="outlined"
        keyboardType="numeric"
        onChange={value => {
          handleChangeText('phoneNumber', value);
        }}
      />
      <View style={{padding: 10}}>
        <CButton
          mode="outlined"
          text="obtener ubicacion actual"
          onPress={() => {
            // getLocation();
          }}
        />
      </View>
      <CText color="black" text="Ubicacion" />
      <TextInputcus
        mode="outlined"
        label={'Latitude: ' + latitude}
        disable
        onChange={value => {
          handleChangeText('latitude', value);
        }}
      />

      <TextInputcus
        mode="outlined"
        label={'Longitude: ' + longitude}
        disable
        onChange={value => {
          handleChangeText('longitude', value);
        }}
      />
      <CText color="black" text="Tamaño de congelador" />
      <Picker
        selectedValue={freezerSize}
        onValueChange={(itemValue, itemIndex) => setFreezerSize(itemValue)}>
        {frezers.map((frezerSize, i) => {
          return (
            <Picker.Item
              key={i}
              label={frezerSize}
              value={frezerSize}
              color="black"
            />
          );
        })}
      </Picker>

      <View style={styles.inputContainer}>
        <CText color="black" text="bolsa 1 kg" tyle={styles.smallInput} />
        <CText color="black" text="bolsa 3 kg" tyle={styles.smallInput} />
        <CText color="black" text="bolsa 5 kg" tyle={styles.smallInput} />
        <CText color="black" text="bolsa 15 kg" tyle={styles.smallInput} />
      </View>
      <View style={styles.inputContainer}>
        <TextInputcus
          style={styles.smallInput}
          mode="outlined"
          keyboardType="numeric"
          onChange={value => {
            handleChangeText('bag1kg', value);
          }}
        />
        <TextInputcus
          style={styles.smallInput}
          mode="outlined"
          keyboardType="numeric"
          onChange={value => {
            handleChangeText('bag3kg', value);
          }}
        />
        <TextInputcus
          style={styles.smallInput}
          mode="outlined"
          keyboardType="numeric"
          onChange={value => {
            handleChangeText('bag5kg', value);
          }}
        />
        <TextInputcus
          style={styles.smallInput}
          mode="outlined"
          keyboardType="numeric"
          onChange={value => {
            handleChangeText('bag15kg', value);
          }}
        />
      </View>
      <View style={{padding: 10}}>
        <CButton
          mode="outlined"
          textColor="white"
          text="Guardar"
          dark={false}
          onPress={() => {
            handlesaveRoute();
          }}
          buttonColor="#006d77"
          rippleColor={'#6a994e'}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  smallInput: {
    height: 60,
    width: '40%', // Ajusta este valor según tus necesidades
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 6,
  },
});
