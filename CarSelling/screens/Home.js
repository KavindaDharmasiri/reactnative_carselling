import { View, Text } from 'react-native'
import React from 'react'
import { NativeBaseProvider, Box, Button, Switch, VStack, StyleSheet } from "native-base";

export default function Home({ navigation }) {
  return (
    <NativeBaseProvider>
      <VStack style={
        {
          bac:"#dedede",
          height:"100%"

        }
      } space={4} alignItems="center">
        <Box style={{
          marginTop:"30%",
        }}>Welcome to Car Selling Application</Box>
        <Button style={
          {width:'60%',
          padding:5,
          backgroundColor:"#F10000",
          height:50,
          alignItems:'center',
          justifyContent:'center',
          marginTop:'30%',
          borderRadius:100,
          color:"white"
          }
        } mt={'40%'} size="md"   width={'80%'} onPress={()=>{navigation.navigate("Car Selling - Register")}}>
          Click To Register
        </Button>

        <Text style={{color:"black"}}>OR</Text>
        <Button style={
          {width:'60%',
          padding:5,
          backgroundColor:"#238ACC",
          height:50,
          alignItems:'center',
          justifyContent:'center',
          marginTop:'3%',
          borderRadius:100,
          color:"white"
          }
        } size="md" width={'80%'} onPress={()=>{navigation.navigate("Car Selling - Login")}}>
          Click To Login
        </Button>
      </VStack>
    </NativeBaseProvider>
  )
}

