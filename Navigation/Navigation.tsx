import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Screens
import {Home} from '../src/screens/Home';
import MapsStores from '../src/screens/MapsStores';
import {SplashScreen} from '../src/screens/SplashScreen';
import {CustomDrawer} from './CustomDrawer';
import {Colors} from '../src/Colors';
import {Events} from '../src/screens/Events';
import EditStore from '../src/screens/EditStore';
import { NewStore } from '../src/screens/NewStores';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.info,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveBackgroundColor: '#6685A4',
        drawerActiveTintColor: '#333',
        drawerInactiveTintColor: '#fff',
      }}>
      <Drawer.Screen
        name="home"
        component={Home}
        options={{
          title: ' Tiendas registradas',
        }}
      />
      <Drawer.Screen
        name="new route"
        component={NewStore}
        options={{
          title: ' Agregar nueva ruta',
        }}
      />
      <Drawer.Screen
        name="map"
        component={MapsStores}
        options={{
          title: 'Rutas',
        }}
      />
      <Drawer.Screen
        name="events"
        component={Events}
        options={{title: 'Eventos'}}
      />
    </Drawer.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="main"
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="editStore"
          component={EditStore}
          options={{title: 'Editar tienda'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

