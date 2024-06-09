import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {mapsConfig} from '../../maps/mapsConfig';
import {useGetData} from '../hooks/useGetData';

const MapsStores = () => {
  const {stores, loading, error} = useGetData();

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

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
        {stores.map(store => (
          <Marker
            key={store.id}
            coordinate={{
              latitude: Number(store.latitude),
              longitude: Number(store.longitude),
            }}
            title={store.storeName}
          />
        ))}
      </MapView>
      {/* <View style={styles.buttonsContainer}>
        <Button title="Monday" onPress={() => setSelectedDay('monday')} />
        <Button title="Tuesday" onPress={() => setSelectedDay('tuesday')} />
      </View> */}
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
