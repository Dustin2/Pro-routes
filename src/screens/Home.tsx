//core
import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, FlatList} from 'react-native';

//rn-paper
import {List, Searchbar} from 'react-native-paper';
//tempo
import { format } from '@formkit/tempo';
//navigation
import {useNavigation} from '@react-navigation/native';

//components
import {CButton} from '../../componets/Button/CButton';

//firebase
import {doc, updateDoc} from '@react-native-firebase/firestore';
import {auth} from '../../firebase/Config'
import {signOut} from 'firebase/auth';
//custom hooks
import {useGetData} from '../hooks/useGetData';

//interfaces
import {Store} from '../interfaces/Store';

//functions
import {getDaysOfWeek} from '../functions/getDaysOfWeek';


export const Home = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const {stores} = useGetData();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('login');
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = (store: Store) => {
    navigation.navigate('editStore', {store});
  };

  const handleDisable = async (store: Store) => {
    try {
      const storeRef = doc(db, 'stores', store.id);
      await updateDoc(storeRef, {
        disabled: !store.disabled,
      });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const renderItem = ({item}: {item: Store}) => {
    const visitBeforeOfDate = new Date(item.visitBeforeOf.seconds * 1000);
    const formattedDate = format(visitBeforeOfDate, {time: 'short'});
    const visitDays = getDaysOfWeek(item.daysOfWeek);

    return (
      <List.Section focusable style={{margin: -2}}>
        <List.Accordion
          title={'Tienda: ' + item.storeName}
          left={props => <List.Icon {...props} icon="store" />}
        >
          <List.Item title={'Nombre clave: ' + item.codeName} />
          <List.Item title={'Tamaño de congelador: ' + item.freezerSize} />
          <List.Item title={'Número de congeladores: ' + item.FrezzerAmount} />
          <List.Item title="Bolsas requeridas: " />
          <List.Item title={'1 kg: ' + item.bag1kg} />
          <List.Item title={'3 kg: ' + item.bag3kg} />
          <List.Item title={'5 kg: ' + item.bag5kg} />
          <List.Item title={'15 kg: ' + item.bag15kg} />
          <List.Item title={'Visitar antes de las: ' + formattedDate} />
          <List.Item title={'Congeladores disponibles: ' + item.FrezzerAmount} />
          <List.Item title={'Días de visita: ' + visitDays} />
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
  };

  const filteredStores = stores.filter(store =>
    store.storeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Buscar tienda"
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
        style={styles.searchbar}
      />
      <CButton
        text="Logout"
        mode="contained"
        onPress={handleLogout}
      />
      <FlatList
        data={filteredStores}
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
  searchbar: {
    margin: 10,
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
