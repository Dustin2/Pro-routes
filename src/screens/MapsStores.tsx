import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

//maps
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {mapsConfig} from '../../maps/mapsConfig';

//firebase
import {database} from '../../firebase/Config';
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';

//interfaces
import {Store} from '../interfaces/Store';
const MapsStores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  useEffect(() => {
    const q = query(
      collection(database, 'info-stores'),
      orderBy('storeName', 'desc'),
    );
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const storesList: Store[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        storeName: doc.data().storeName,
        codeName: doc.data().codeName,
        latitude: parseFloat(doc.data().latitude),
        longitude: parseFloat(doc.data().longitude),
        phoneNumber: doc.data().phoneNumber,
        bag1kg: doc.data().bag1kg,
        bag3kg: doc.data().bag3kg,
        bag5kg: doc.data().bag5kg,
        bag15kg: doc.data().bag15kg,
        freezerSize: doc.data().freezerSize,
        createdDoc: doc.data().createdDoc,
      }));

      setStores(storesList);
      console.log(stores);
    });

    return () => unsubscribe();
  }, [database]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 19.24997,
          longitude: -103.72714,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={mapsConfig}>
        {stores ? (
          stores.map((store, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude,
              }}
              title={store.storeName}
            />
          ))
        ) : (
          <Marker
            coordinate={{latitude: 19.24997, longitude: -103.72714}} // Coordenada de respaldo
            title="No hay tiendas disponibles"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapsStores;
