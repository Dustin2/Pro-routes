import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { format } from '@formkit/tempo';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CButton from '../../componets/Button/CButton';
import { TextInputcus } from '../../componets/INPUT/TextInput';
import { CText } from '../../componets/Text/CustomText';
import { GlobalStyles } from '../GlobalStyles';
import { Colors } from '../Colors';
import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../../firebase/Config';
import { daysOfWeek } from '../data/daysOfWeek';
import { freezers } from '../data/freezers';

const EditStore = ({ route, navigation }) => {
  const { store } = route.params;

  const [storeName, setStoreName] = useState(store.storeName || '');
  const [codeName, setCodeName] = useState(store.codeName || '');
  const [phoneNumber, setPhoneNumber] = useState(store.phoneNumber || '');
  const [latitude, setLatitude] = useState(store.latitude || '');
  const [longitude, setLongitude] = useState(store.longitude || '');
  const [freezerSize, setFreezerSize] = useState(store.freezerSize || '');
  const [bag1kg, setBag1kg] = useState(store.bag1kg.toString() || '0');
  const [bag3kg, setBag3kg] = useState(store.bag3kg.toString() || '0');
  const [bag5kg, setBag5kg] = useState(store.bag5kg.toString() || '0');
  const [bag15kg, setBag15kg] = useState(store.bag15kg.toString() || '0');
  const [FrezzerAmount, setFrezzerAmount] = useState(store.FrezzerAmount || '');
  const [selectedDays, setSelectedDays] = useState(store.daysOfWeek || []);
  const [date, setDate] = useState(new Date(store.visitBeforeOf.seconds * 1000));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    // Cargar los datos del store cuando el componente se monta
    setStoreName(store.storeName);
    setCodeName(store.codeName);
    setPhoneNumber(store.phoneNumber);
    setLatitude(store.latitude);
    setLongitude(store.longitude);
    setFreezerSize(store.freezerSize);
    setBag1kg(store.bag1kg.toString());
    setBag3kg(store.bag3kg.toString());
    setBag5kg(store.bag5kg.toString());
    setBag15kg(store.bag15kg.toString());
    setFrezzerAmount(store.FrezzerAmount);
    setSelectedDays(store.daysOfWeek || []);
    setDate(new Date(store.visitBeforeOf.seconds * 1000));
  }, [store]);

  const handleSave = async () => {
    try {
      const storeRef = doc(database, 'info-stores', store.id);
      await updateDoc(storeRef, {
        storeName,
        codeName,
        phoneNumber,
        latitude,
        longitude,
        freezerSize,
        bag1kg: parseInt(bag1kg),
        bag3kg: parseInt(bag3kg),
        bag5kg: parseInt(bag5kg),
        bag15kg: parseInt(bag15kg),
        FrezzerAmount,
        daysOfWeek: selectedDays,
        visitBeforeOf: date,
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar el documento: ', error);
    }
  };

  const handleChangeText = (field, value) => {
    switch (field) {
      case 'storeName':
        setStoreName(value);
        break;
      case 'codeName':
        setCodeName(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'latitude':
        setLatitude(value);
        break;
      case 'longitude':
        setLongitude(value);
        break;
      case 'freezerSize':
        setFreezerSize(value);
        break;
      case 'bag1kg':
        setBag1kg(value);
        break;
      case 'bag3kg':
        setBag3kg(value);
        break;
      case 'bag5kg':
        setBag5kg(value);
        break;
      case 'bag15kg':
        setBag15kg(value);
        break;
      case 'FrezzerAmount':
        setFrezzerAmount(value);
        break;
      default:
        break;
    }
  };

  const toggleDay = (dayId) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(dayId)) {
        return prevSelectedDays.filter((day) => day !== dayId);
      } else {
        return [...prevSelectedDays, dayId];
      }
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  return (
    <ScrollView style={GlobalStyles.container}>
      <CText color="black" text="Nombre del negocio" />
      <TextInputcus
        mode="outlined"
        value={storeName}
        onChangeText={(value) => handleChangeText('storeName', value)}
      />
      <CText color="black" text="Nombre clave" />
      <TextInputcus
        mode="outlined"
        value={codeName}
        onChangeText={(value) => handleChangeText('codeName', value)}
      />
      <CText color="black" text="Número de teléfono" />
      <TextInputcus
        mode="outlined"
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={(value) => handleChangeText('phoneNumber', value)}
      />
      <CText color="black" text="Ubicación" />
      <TextInputcus
        mode="outlined"
        value={'Latitud: ' + latitude}
        editable={false}
      />
      <TextInputcus
        mode="outlined"
        value={'Longitud: ' + longitude}
        editable={false}
      />
      <CText color="black" text="Tamaño del congelador" />
      <View style={styles.containerPicker}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={freezerSize}
            onValueChange={(itemValue) => handleChangeText('freezerSize', itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {freezers.map((size, index) => (
              <Picker.Item key={index} label={size} value={size} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <CText color="black" text="Bolsa 1 kg" style={styles.smallInput} />
        <CText color="black" text="Bolsa 3 kg" style={styles.smallInput} />
        <CText color="black" text="Bolsa 5 kg" style={styles.smallInput} />
        <CText color="black" text="Bolsa 15 kg" style={styles.smallInput} />
      </View>
      <View style={styles.inputContainer}>
        <TextInputcus
          style={styles.smallInput}
          mode="outlined"
          keyboardType="numeric"
          value={bag1kg}
          onChangeText={(value) => handleChangeText('bag1kg', value)}
        />
        <TextInputcus
          style={styles.smallInput}
          mode="outlined"
          keyboardType="numeric"
          value={bag3kg}
          onChangeText={(value) => handleChangeText('bag3kg', value)}
        />
        <TextInputcus
          style={styles.smallInput}
          mode="outlined"
          keyboardType="numeric"
          value={bag5kg}
          onChangeText={(value) => handleChangeText('bag5kg', value)}
        />
        <TextInputcus
          style={styles.smallInput}
          mode="outlined"
          keyboardType="numeric"
          value={bag15kg}
          onChangeText={(value) => handleChangeText('bag15kg', value)}
        />
      </View>
      <CText color="black" text="Cantidad de congeladores" />
      <TextInputcus
        mode="outlined"
        value={FrezzerAmount}
        keyboardType="numeric"
        onChangeText={(value) => handleChangeText('FrezzerAmount', value)}
      />
      <View style={styles.containerChips}>
        <CText color={'black'} text={'Seleccione los días para la visita:'} />
        <View style={styles.chipContainer}>
          {daysOfWeek.map((day) => (
            <Chip
              key={day.id}
              selected={selectedDays.includes(day.id)}
              onPress={() => toggleDay(day.id)}
              style={styles.chip}
            >
              {day.label}
            </Chip>
          ))}
        </View>
      </View>
      <View>
        {isDatePickerVisible && (
          <DateTimePicker
            value={date}
            mode="time"
            onChange={(event, selectedDate) =>
              handleConfirm(selectedDate || date)
            }
            display="default"
          />
        )}
        <TextInputcus
          label={'Visitar antes de las: ' + format(date, { time: 'short' })}
          editable={false}
          mode="outlined"
        />
        <View style={{ padding: 10 }}>
          <CButton
            text="Selecciona el horario de visita"
            onPress={showDatePicker}
            buttonColor={Colors.secondary}
            textColor="white"
          />
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <CButton
          mode="outlined"
          textColor="white"
          text="Guardar"
          dark={false}
          onPress={handleSave}
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
    width: '20%',
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
    color: 'black',
  },
  pickerItem: {
    color: 'black',
  },
  chip: {
    margin: 4,
  },
  containerChips: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default EditStore;
