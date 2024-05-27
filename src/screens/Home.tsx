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

//custom hooks
import {useGetData} from '../hooks/useGetData';

//interfaces

export const Home = () => {
  const [expanded, setExpanded] = useState(true);
  const {stores, error} = useGetData();

  const handlePress = () => setExpanded(!expanded);

  const renderItem = ({item}: {item: Store}) => (
    <List.Section>
      <List.Accordion
        title={'tienda: ' + item.storeName}
        left={props => <List.Icon {...props} icon="store" />}>
        <List.Item title={'Nombre clave: ' + item.codeName} />

        <List.Item title={'Tamaño de congelador: ' + item.freezerSize} />
        <List.Item title="Bolsas requeridas: " />
        <List.Item title={'1 kg:  ' + item.bag1kg} />
        <List.Item title={'3 kg:  ' + item.bag3kg} />
        <List.Item title={'5 kg:  ' + item.bag5kg} />
        <List.Item title={'15 kg:  ' + item.bag15kg} />
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
    // justifyContent: 'center',
    // padding: 16,
  },
  item: {
    // backgroundColor: '',
    // padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
