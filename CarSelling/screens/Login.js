import React, { useState } from 'react'
import { NativeBaseProvider, Text, Input, VStack, Button } from 'native-base'
import { Alert } from 'react-native';
import { useEffect } from 'react';
import { SearchBar } from 'react-native-screens';

export default function Login({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState([]);


  useEffect(() => {
        validateData()

  })
const validateData = async() => {
    fetch('http://192.168.8.182:4000/users/')
        .then((response) => response.json())
        .then((json) => setPosts(json));
}

const search = () =>{
    var b =true;
    for(var i=0;i<posts.length;i++){
        if(name === posts[i].name){
            if(password === posts[i].password){
                b=false;
                setPassword('')
                setName('')
                Alert.alert("login succses");
                navigation.navigate("Car Selling - LoadData")
            }
        }
    }

    if(b){
        Alert.alert("Failed Please Check Again");
    }
}

  return (
    <NativeBaseProvider>
        <Text fontSize="3xl" bold mt="10%" ml="30%">User Login</Text>
        <VStack space={4} alignItems="center" mt="15%">
            <Input mx="3" value={name} onChangeText={(e) => { setName(e) }} placeholder="Name" w="80%" />
            <Input mx="3" value={password} onChangeText={(e) => { setPassword(e) }} placeholder="Password" w="80%" />
      
            <Button size="lg" w="80%" variant="subtle" colorScheme="secondary" onPress={search}>
                Log
            </Button>
            
        </VStack>
    </NativeBaseProvider>
)
}
