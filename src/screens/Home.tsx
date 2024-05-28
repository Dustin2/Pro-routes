import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {List, Avatar} from 'react-native-paper';
import CButton from '../../componets/Button/CButton';
import { useNavigation } from '@react-navigation/native';


//custom hooks
import {useGetData} from '../hooks/useGetData';

//interfaces

export const Home = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(true);
  const {stores, error} = useGetData();

  const handlePress = () => setExpanded(!expanded);

  const handleEdit = store => {
    navigation.navigate('editStore', {store});
  };

  const handleDisable = async store => {
    try {
      const storeRef = doc(db, 'stores', store.id);
      await updateDoc(storeRef, {
        disabled: !store.disabled,
      });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  const renderItem = ({item}: {item: Store}) => (
    <List.Section focusable style={{margin: -2}}>
      <List.Accordion
        title={'tienda: ' + item.storeName}
        left={props => <List.Icon {...props} icon="store" />}>
        <List.Item title={'Nombre clave: ' + item.codeName} />
        <List.Item title={'Tamaño de congelador: ' + item.freezerSize} />
        <List.Item title={'Numero de congeladorores: ' + item.FrezzerAmount} />
        <List.Item title="Bolsas requeridas: " />
        <List.Item title={'1 kg:  ' + item.bag1kg} />
        <List.Item title={'3 kg:  ' + item.bag3kg} />
        <List.Item title={'5 kg:  ' + item.bag5kg} />
        <List.Item title={'15 kg:  ' + item.bag15kg} />
        <View style={styles.buttonContainer}>
          <CButton
            mode="contained"
            onPress={() => handleEdit(item)}
            text="Editar"
          />
          <CButton
            mode="contained"
            onPress={() => handleDisable(item)}
            style={styles.disableButton}
            text={item.disabled ? 'Habilitar' : 'Inhabilitar'}
          />
        </View>
      </List.Accordion>
    </List.Section>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={stores}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  disableButton: {
    backgroundColor: 'red',
  },
});
