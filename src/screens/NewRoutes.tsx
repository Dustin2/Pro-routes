import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Alert,
  ToastAndroid,
} from 'react-native';

//componets
import {TextInputcus} from '../../componets/INPUT/TextInput';
import {CText} from '../../componets/Text/CustomText';
import {CDialog} from '../../componets/Dialog/CDialog';

//styles
import {GlobalStyles} from '../GlobalStyles';
import CButton from '../../componets/Button/CButton';

const initialstate = {
  storeName: '',
  codeName: '',
  // location: '',
  phoneNumber: '',
};

export const NewRoutes = () => {
  const [ruta, setRuta] = useState(initialstate);

  const handleGuardarRuta = () => {
  
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
            onPress: () =>
              // sendData(),
              ToastAndroid.show(
                'Ruta registrada con exito!',
                ToastAndroid.SHORT,
              ),
            style: 'success',
          },
        ]);
      }
    };
  

  const [route, setRoute] = useState(initialstate);

  const handleChangeText = (name: string, value: string) => {
    setRoute({...route, [name]: value});
    console.log(route);
  };

  return (
    <ScrollView style={GlobalStyles.container}>
      <CText color="black" text="nombre del negocio" />
      <TextInputcus
        mode="outlined"
        label="nombre del negocio"
        onChange={value => {
          handleChangeText('storeName', value);
        }}
      />
      <CText color="black" text="nombre clave" />
      <TextInputcus
        mode="outlined"
        onChange={value => {
          handleChangeText('codeName', value);
        }}
      />
      {/* <CText color="black" text="ubicacion" />
      <TextInputcus
        mode="outlined"
        disable
        onChange={value => {
          handleChangeText('location', value);
        }}
      /> */}
      <CText color="black" text="numero de telefono" />
      <TextInputcus
        mode="outlined"
        keyboardType="numeric"
        onChange={value => {
          handleChangeText('phoneNumber', value);
        }}
      />
      {/* <CDialog
        title="Guardar los datos"
        body=" Esta seguro de querer guardar los datos?"
        // icon="alert"
        visible={visible}
        onDismiss={hideDialog}
      /> */}
      <View style={{padding: 10}}>
        <CButton
          mode="outlined"
          textColor="white"
          text="Guardar"
          dark={false}
          onPress={() => {
            handleGuardarRuta();
          }}
          buttonColor="#006d77"
          rippleColor={'#6a994e'}
        />
      </View>
    </ScrollView>
  );
};
