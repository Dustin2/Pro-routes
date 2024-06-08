import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {mapsConfig} from '../../maps/mapsConfig';
import {database} from '../../firebase/Config';
import {collection, onSnapshot, query, orderBy} from 'firebase/firestore';
import {Store} from '../interfaces/Store';
import {useGetData} from '../hooks/useGetData';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAzCvN9qNThT_IoVEZGiuSO6MTlwHdvG_U';

const MapsStores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [dailyRoutes, setDailyRoutes] = useState([]);
  const [selectedDay, setSelectedDay] = useState(''); // Could be a date or a string representing the day

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
      generateDailyRoutes(storesList); // Generate routes whenever the stores list is updated
    });

    return () => unsubscribe();
  }, [database]);

  const generateDailyRoutes = stores => {
    // Example: create a route for each day of the week
    const routes = {
      monday: [stores[0], stores[1], stores[2]], // Example stores for Monday
      tuesday: [stores[3], stores[4]], // Example stores for Tuesday
      // Add other days...
    };
    setDailyRoutes(routes);
  };

  const renderDirections = stores => {
    const origin = stores[0];
    const destination = stores[stores.length - 1];
    const waypoints = stores.slice(1, -1).map(store => ({
      latitude: store.latitude,
      longitude: store.longitude,
    }));

    return (
      <MapViewDirections
        origin={{latitude: origin.latitude, longitude: origin.longitude}}
        destination={{
          latitude: destination.latitude,
          longitude: destination.longitude,
        }}
        waypoints={waypoints}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="hotpink"
      />
    );
  };

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
        {selectedDay &&
          dailyRoutes[selectedDay] &&
          renderDirections(dailyRoutes[selectedDay])}
        {stores.map((store, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
            }}
            title={store.storeName}
          />
        ))}
      </MapView>
      <View style={styles.buttonsContainer}>
        <Button title="Monday" onPress={() => setSelectedDay('monday')} />
        <Button title="Tuesday" onPress={() => setSelectedDay('tuesday')} />
        {/* Add buttons for other days */}
      </View>
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
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default MapsStores;
