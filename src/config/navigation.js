import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import SignUp from '../components/SignUp';
import Home from '../components/Home';
import SignIn from '../components/SignIn';
import Dashboard from '../components/Dashboard';
import {useSelector} from 'react-redux';
import DrawerContent from '../components/DrawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  const isSignedIn = useSelector(state => state.email);
  console.log(isSignedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isSignedIn ? (
          <>
            {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
            <Stack.Screen name="userDrawer" component={userDrawer} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

function userDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} >
      <Drawer.Screen name="Dashboard" component={Dashboard} options={{headerTitleStyle:{color:"#122e6e"},headerTintColor:"#122e6e"}} />
 
    </Drawer.Navigator>
  );
}
