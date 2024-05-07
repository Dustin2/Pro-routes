import React from 'react';
import {StyleSheet, View} from 'react-native';
// dependencies to navigate
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//screens
import {Home} from '../src/screens/Home';
import {NewRoutes} from '../src/screens/NewRoutes';
import MapsStores from '../src/screens/MapsStores';
import {SplashScreen} from '../src/screens/SplashScreen';
import {CustomDrawer} from './CustomDrawer';
import {Colors} from '../src/Colors';
import {Header} from 'react-native/Libraries/NewAppScreen';
// const Tab = createMaterialTopTabNavigator();

export const Navigation = () => {
  // const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="splash"
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.info,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          //change color to active and inactive
          drawerActiveBackgroundColor: '#6685A4',
          drawerActiveTintColor: '#333',
          drawerInactiveTintColor: '#fff',
        }}>
        <Drawer.Screen
          name="splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen name="home" component={Home} />
        <Drawer.Screen name="new route" component={NewRoutes} />
        <Drawer.Screen name="map" component={MapsStores} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
