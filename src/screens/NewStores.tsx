// core
import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';

//tempo
import {format} from '@formkit/tempo';

//external componets
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
//componets
import CButton from '../../componets/Button/CButton';
import {TextInputcus} from '../../componets/INPUT/TextInput';
import {CText} from '../../componets/Text/CustomText';

//styles
import {GlobalStyles} from '../GlobalStyles';
import {Colors} from '../Colors';

//hooks
import {useNewStore} from '../hooks/useNewStores';

//data ararys
import {daysOfWeek} from '../data/daysOfWeek';
import {freezers} from '../data/freezers';
export const NewStore = props => {
  const {
    route,
    latitude,
    longitude,
    date,
    isDatePickerVisible,
    selectedDays,
    freezerSize,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    handleChangeText,
    toggleDay,
    handlesaveRoute,
    getLocation,
    // freezers,
    setFreezerSize
    // daysOfWeek,
  } = useNewStore(props);

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
      <TextInputcus mode="outlined" value={'Latitude: ' + latitude} disable />
      <TextInputcus mode="outlined" value={'Longitude: ' + longitude} disable />
      <CText color="black" text="Tamaño de congelador" />
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
      <View style={styles.inputContainer}>
        <CText color="black" text="bolsa 1 kg" style={styles.smallInput} />
        <CText color="black" text="bolsa 3 kg" style={styles.smallInput} />
        <CText color="black" text="bolsa 5 kg" style={styles.smallInput} />
        <CText color="black" text="bolsa 15 kg" style={styles.smallInput} />
      </View>
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
        onChange={value => handleChangeText('FrezzerAmount', value)}
      />
      <View style={styles.containerChips}>
        <CText color={'black'} text={'Seleccione los días para la visita:'} />
        <View style={styles.chipContainer}>
          {daysOfWeek.map(day => (
            <Chip
              key={day.id}
              selected={selectedDays.includes(day.id)}
              onPress={() => toggleDay(day.id)}
              style={styles.chip}>
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
          label={'visitar antes de las: ' + format(date, {time: 'short'})}
          disable
          mode="outlined"
        />
        <View style={{padding: 10}}>
          <CButton
            text="Selecciona el horario de visita"
            onPress={showDatePicker}
            buttonColor={Colors.secondary}
            textColor="white"
          />
        </View>
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
