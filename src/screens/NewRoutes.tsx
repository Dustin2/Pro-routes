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
import {Picker} from '@react-native-picker/picker';

//styles
import {GlobalStyles} from '../GlobalStyles';
import CButton from '../../componets/Button/CButton';

//firebase
import {database} from '../../firebase/Config';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import {CChip} from '../../componets/Chip/CChip';
import {DaysOfWeekChips} from '../../componets/Chip/DayOfWeek';

const initialstate = {
  storeName: '',
  codeName: '',
  FrezzerAmount: '',
  bag1kg: 0,
  bag3kg: 0,
  bag5kg: 0,
  bag15kg: 0,
  phoneNumber: '',
};
const daysOfWeek = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
  'Domingo',
];

export const NewRoutes = props => {
  const [route, setRoute] = useState(initialstate);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [freezerSize, setFreezerSize] = useState('5 fts');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

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
          onPress: () => ToastAndroid.show('Cancelado!', ToastAndroid.SHORT),
          style: 'cancel',
        },
        {
          text: 'Guardar',
          onPress: () => {
            sendData();
          },
          style: 'default',
        },
      ]);
    }
  };

  const handleSelect = (label: string) => {
    setSelectedDays(prevSelectedDays => {
      if (prevSelectedDays.includes(label)) {
        return prevSelectedDays.filter(day => day !== label);
      } else {
        return [...prevSelectedDays, label];
      }
    });
  };
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

  useEffect(() => {
    requestLocationPermission();
    getLocation();
  }, []);

  const handleChangeText = (name, value) => {
    setRoute({...route, [name]: value});
  };

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

  const sendData = async () => {
    await addDoc(collection(database, 'info-stores'), {
      storeName: route.storeName,
      codeName: route.codeName,
      latitude: latitude,
      longitude: longitude,
      phoneNumber: route.phoneNumber,
      freezerSize: freezerSize,
      FrezzerAmount: route.FrezzerAmount,
      bag1kg: route.bag1kg,
      bag3kg: route.bag3kg,
      bag5kg: route.bag5kg,
      bag15kg: route.bag15kg,
      createdDoc: serverTimestamp(),
    });
    setRoute(initialstate);
    setLatitude('');
    setLongitude('');
    setFreezerSize('5 fts');
    ToastAndroid.show('Ruta registrada con exito!', ToastAndroid.SHORT);
    props.navigation.navigate('home');
  };

  const freezers = [
    'Casa',
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
        value={route.storeName}
        onChange={value => handleChangeText('storeName', value)}
      />
      <CText color="black" text="Nombre clave" />
      <TextInputcus
        mode="outlined"
        value={route.codeName}
        onChange={value => handleChangeText('codeName', value)}
      />
      <CText color="black" text="Numero de telefono" />
      <TextInputcus
        mode="outlined"
        keyboardType="numeric"
        value={route.phoneNumber}
        onChange={value => handleChangeText('phoneNumber', value)}
      />
      <View style={{padding: 10}}>
        <CButton
          mode="outlined"
          text="Obtener ubicacion actual"
          onPress={getLocation}
        />
      </View>
      <CText color="black" text="Ubicacion" />
      <TextInputcus
        mode="outlined"
        value={'Latitude: ' + latitude}
        // editable={false}
        disable
      />
      <TextInputcus
        mode="outlined"
        value={'Longitude: ' + longitude}
        // editable={false}
        disable
      />
      <CText color="black" text="Tamaño de congelador" />
      {/* / picker */}
      <View style={styles.containerPicker}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={freezerSize}
            onValueChange={itemValue => setFreezerSize(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}>
            {freezers.map((size, index) => (
              <Picker.Item key={index} label={size} value={size} />
            ))}
          </Picker>
        </View>
      </View>

      {/* mini-inputs */}
      <View style={styles.inputContainer}>
        <CText color="black" text="bolsa 1 kg" style={styles.smallInput} />
        <CText color="black" text="bolsa 3 kg" style={styles.smallInput} />
        <CText color="black" text="bolsa 5 kg" style={styles.smallInput} />
        <CText color="black" text="bolsa 15 kg" style={styles.smallInput} />
      </View>
      {/* mini-inputs */}
      <View style={styles.inputContainer}>
        <TextInputcus
          style={styles.smallInput}
          mode="outlined"
          keyboardType="numeric"
          value={route.bag1kg.toString()}
          onChange={value => handleChangeText('bag1kg', value)}
        />
        <TextInputcus
          style={styles.smallInput}
          mode="outlined"
          keyboardType="numeric"
          value={route.bag3kg.toString()}
          onChange={value => handleChangeText('bag3kg', value)}
        />
        <TextInputcus
          style={styles.smallInput}
          mode="outlined"
          keyboardType="numeric"
          value={route.bag5kg.toString()}
          onChange={value => handleChangeText('bag5kg', value)}
        />
        <TextInputcus
          style={styles.smallInput}
          mode="outlined"
          keyboardType="numeric"
          value={route.bag15kg.toString()}
          onChange={value => handleChangeText('bag15kg', value)}
        />
      </View>
      <CText color="black" text="Cantidad de congeladores" />
      <TextInputcus
        mode="outlined"
        value={route.FrezzerAmount}
        keyboardType="numeric"
        // editable={false}
        // disable
      />
      <View style={styles.chip}>
        {daysOfWeek.map(day => (
          <CChip
            key={day}
            text={day}
            isSelected={selectedDays.includes(day)}
            onSelect={handleSelect}
          />
        ))}
      </View>
      <View style={{padding: 10}}>
        <CButton
          mode="outlined"
          textColor="white"
          text="Guardar"
          dark={false}
          onPress={handlesaveRoute}
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
    width: '20%', // Ajusta este valor según tus necesidades
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 6,
  },
  containerPicker: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
    width: 385,
    color: 'black', // Color del texto seleccionado (funciona en iOS)
  },
  pickerItem: {
    color: 'black', // Color del texto de los ítems (funciona en Android)
  },
  chip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
});
