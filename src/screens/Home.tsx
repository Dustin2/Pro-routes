//core
import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, FlatList} from 'react-native';

//rn-paper
import {List, Searchbar} from 'react-native-paper';

//components
import CButton from '../../componets/Button/CButton';
import {useNavigation} from '@react-navigation/native';
//tempo
import {format} from '@formkit/tempo';

//firebase
import {doc, updateDoc} from 'firebase/firestore';
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

  // const handlePress = () => setExpanded(!expanded);

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

  const renderItem = ({item}: {item: Store}) => {
    // Convertir el timestamp de Firebase a un objeto Date
    const visitBeforeOfDate = new Date(item.visitBeforeOf.seconds * 1000);

    // Formatear la fecha
    const formattedDate = format(visitBeforeOfDate, {time: 'short'});
    const visitDays = getDaysOfWeek(item.daysOfWeek);
    return (
      <List.Section focusable style={{margin: -2}}>
        <List.Accordion
          title={'tienda: ' + item.storeName}
          left={props => <List.Icon {...props} icon="store" />}>
          <List.Item title={'Nombre clave: ' + item.codeName} />
          <List.Item title={'Tamaño de congelador: ' + item.freezerSize} />
          <List.Item
            title={'Numero de congeladorores: ' + item.FrezzerAmount}
          />
          <List.Item title="Bolsas requeridas: " />
          <List.Item title={'1 kg:  ' + item.bag1kg} />
          <List.Item title={'3 kg:  ' + item.bag3kg} />
          <List.Item title={'5 kg:  ' + item.bag5kg} />
          <List.Item title={'15 kg:  ' + item.bag15kg} />
          <List.Item title={'Visitar antes de las:  ' + formattedDate} />
          <List.Item
            title={'Congeladores disponibles:  ' + item.FrezzerAmount}
          />
          <List.Item title={'Dias de visita:  ' + visitDays} />
          {/* <List.Item title={'15 kg:  ' + item.} /> */}
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

  //filter store to serch anyone
  const filteredStores = stores.filter(store =>
    store.storeName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Buscar tienda"
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
        style={styles.searchbar}
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
