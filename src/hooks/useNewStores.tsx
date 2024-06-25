// useNewStore.js
import {useState} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import {database} from '../../firebase/Config';
import {useLocation} from '../hooks/useLocation';
import {daysOfWeek} from '../data/daysOfWeek'; // Importa los datos necesarios
import {freezers} from '../data/freezers';

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

export const useNewStore = props => {
  const {getLocation, latitude, longitude, setLatitude, setLongitude} =
    useLocation();
  const [route, setRoute] = useState(initialstate);
  const [selectedDays, setSelectedDays] = useState([]);
  const [freezerSize, setFreezerSize] = useState('5 fts');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = selectedDate => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleChangeText = (name, value) => {
    setRoute({...route, [name]: value});
  };

  const toggleDay = dayId => {
    setSelectedDays(prevSelectedDays =>
      prevSelectedDays.includes(dayId)
        ? prevSelectedDays.filter(id => id !== dayId)
        : [...prevSelectedDays, dayId],
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
      daysOfWeek: selectedDays,
      visitBeforeOf: date,
      createdDoc: serverTimestamp(),
    });
    setRoute(initialstate);
    setLatitude('');
    setLongitude('');
    setFreezerSize('5 fts');
    setSelectedDays([]);
    ToastAndroid.show('Tienda registrada con exito!', ToastAndroid.SHORT);
    props.navigation.navigate('home');
  };

  const handlesaveRoute = () => {
    if (
      route.codeName === '' ||
      route.phoneNumber === '' ||
      route.storeName === ''
    ) {
      Alert.alert(
        'Error Campos invalidos',
        'Por favor completa todos los campos',
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
          onPress: sendData,
          style: 'default',
        },
      ]);
    }
  };

  return {
    route,
    latitude,
    longitude,
    date,
    isDatePickerVisible,
    selectedDays,
    freezerSize,
    setRoute,
    setLatitude,
    setLongitude,
    setDate,
    setDatePickerVisibility,
    setSelectedDays,
    setFreezerSize,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    handleChangeText,
    toggleDay,
    handlesaveRoute,
    getLocation,
    freezers,
    daysOfWeek
  };
};
