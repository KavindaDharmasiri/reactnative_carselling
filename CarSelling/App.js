import { View, Text, Button } from 'react-native'
import React from 'react'
import Login from './screens/Login'
import Register from './screens/Register'
import AddData from './screens/AddData'
import LoadData from './screens/LoadData'
import { useEffect } from 'react';
import Home from './screens/Home'
import UpdateDeleteVehicle from './screens/UpdateDeleteVehicle'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen'

const Stack = createStackNavigator();


export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  })

  
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={Home} />      
        <Stack.Screen name="Car Selling - Register" component={Register} />  
        <Stack.Screen name="Car Selling - Login" component={Login} />
        <Stack.Screen name="Car Selling - AddData" component={AddData} />
        <Stack.Screen name="Car Selling - LoadData" component={LoadData}/>
        <Stack.Screen name="UpdateDeleteVehicle" component={UpdateDeleteVehicle} />      
      </Stack.Navigator>
    </NavigationContainer>

  )
}