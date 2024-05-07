import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {mapsConfig} from '../../maps/mapsConfig';

const MapsStores = () => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={{
          latitude: 19.24997,
          longitude: -103.72714,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={mapsConfig}>
        {/* Arboledas */}
        <Marker
          coordinate={{ latitude: 19.2247316, longitude: -103.6574649 }}
          title="Arboledas tienda de manuel"
        />
        {/* Bosques del Sur */}
        <Marker
          coordinate={{latitude: 19.2177692, longitude: -103.7398218}}
          title="Bosques del Sur tienda de pancha"
        />
        {/* Benito Juárez */}
        <Marker
          coordinate={{latitude: 19.2342131, longitude: -103.7434456}}
          title="Benito Juárez "
        />
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
