import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';
import {doc, updateDoc} from 'firebase/firestore';
import {database} from '../../firebase/Config';
import {TextInputcus} from '../../componets/INPUT/TextInput';
import {CText} from '../../componets/Text/CustomText';

const EditStore = ({route, navigation}) => {
  const {store} = route.params;
  const [storeName, setStoreName] = useState(store.storeName);
  const [codeName, setCodeName] = useState(store.codeName);
  const [freezerSize, setFreezerSize] = useState(store.freezerSize);
  const [bag1kg, setBag1kg] = useState(store.bag1kg);
  const [bag3kg, setBag3kg] = useState(store.bag3kg);
  const [bag5kg, setBag5kg] = useState(store.bag5kg);
  const [bag15kg, setBag15kg] = useState(store.bag15kg);

  const handleSave = async () => {
    try {
      const storeRef = doc(db, 'stores', store.id);
      await updateDoc(storeRef, {
        storeName,
        codeName,
        freezerSize,
        bag1kg,
        bag3kg,
        bag5kg,
        bag15kg,
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar el documento: ', error);
    }
  };
  return (
    <View style={styles.container}>
      <CText color="black" text="Nombre de la Tienda" />
      <TextInputcus
        value={storeName}
        onChangeText={setStoreName}
        mode="outlined"
      />
      <CText color="black" text="Nombre Clave" />
      <TextInputcus
        value={codeName}
        onChangeText={setCodeName}
        mode="outlined"
      />
      <CText color="black" text="Tamaño de Congelador" />
      <TextInputcus
        value={freezerSize}
        onChangeText={setFreezerSize}
        mode="outlined"
      />
      <CText color="black" text="Bolsas de 1 kg" />
      <TextInputcus value={bag1kg} onChangeText={setBag1kg} mode="outlined" />
      <CText color="black" text="Bolsas de 3 kg" />
      <TextInputcus value={bag3kg} onChangeText={setBag3kg} mode="outlined" />
      <CText color="black" text="Bolsas de 5 kg" />
      <TextInputcus value={bag5kg} onChangeText={setBag5kg} mode="outlined" />
      <CText color="black" text="Bolsas de 15 kg" />
      <TextInputcus
        value={bag15kg}
        onChangeText={setBag15kg}
        placeholder="Bolsas de 15 kg"
      />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    // marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default EditStore;
