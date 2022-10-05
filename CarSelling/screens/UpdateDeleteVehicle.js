import React, { useState } from 'react'
import { useEffect } from 'react';
import { NativeBaseProvider, Text, Input, VStack, Button, View } from 'native-base'
import { Alert,Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const options ={
    title: 'Select Image',
    type: 'library',
    options: {
        maxHeight:200,
        maxWidth:200,
        selectionLimit: 0,
        mediaType: 'photo',
        includeBase64: false,
    
    },
}


export default function UpdateDeleteVehicle({route,navigation}) {
  const [posts, setPosts] = useState([]);
    const [vehiclename, setvehiclename] = useState('');
    const [vehicleimg, setvehicleimg] = useState('');
    const [price, setprice] = useState('');
    const [code, setCode] = useState('');
    const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
      setPosts(route.params.obj)
    
      
      if(posts != null && posts.code != undefined){
        console.log("posts "+posts.code)
        console.log("posts "+posts.uri)
        setCode(posts.code)
        setvehiclename(posts.vehiclename)
        setvehicleimg(posts.vehicleimg)
        setprice(posts.price)
        setSelectedImage(posts.uri)
        console.log("IMG "+selectedImage)
        route.params.obj=null
      }
      if(selectedImage == undefined){
        const exampleImage = require('../assests/cloud-upload-vector-flat-icon-98690946.jpg')
        setSelectedImage(exampleImage)
      }
      if(selectedImage == null){
        const exampleImage = require('../assests/cloud-upload-vector-flat-icon-98690946.jpg')
        setSelectedImage(exampleImage)
      }
      

      
  })

  

  const updateData = () => {
    
    fetch('http://192.168.8.182:4000/vehicle/', {
        method: 'PUT',
        body: JSON.stringify({
            code: code,
            vehiclename: vehiclename,
            vehicleimg: vehicleimg,
            price: price,
            uri:selectedImage
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => {Alert.alert("vehicle Update Successfully !")})
        .catch((err)=>{Alert.alert("Error occured !")})
}

const deleteData = () => {
    
  fetch('http://192.168.8.182:4000/vehicle/', {
      method: 'DELETE',
      body: JSON.stringify({
          code: code
      }),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
  })
      .then((response) => {Alert.alert("vehicle Delete Successfully !");navigation.navigate("Car Selling - LoadData")})
      .catch((err)=>{Alert.alert("Error occured !")})
}

const openGallery=async()=>{
    
  const images = await launchImageLibrary(options);

  setSelectedImage(images.assets[0].uri)

  const formdata = new FormData()
  formdata.append('file',{
      uri:images.assets[0].uri,
      type:images.assets[0].type,
      name:images.assets[0].fileName
  })

  let res = await fetch('http://192.168.8.182:4000/vehicle/imageUpdate',{
      method:'post',
      body:formdata,
      headers:{
          'Content-type': 'multipart/form-data',
      },
  });
  let responsejson =await res.json();
}

  return (
    <NativeBaseProvider>
      <View style={{ backgroundColor:"#dedede",height:"100%"}}>
    <Text fontSize="3xl" bold mt="10%" ml="15%">Update And Delete Vehicle</Text>
    <VStack space={4} alignItems="center" mt="15%">

    <Image style={{width:200,height:200,borderRadius:25}} source={{uri:selectedImage}}/>            

        <Button size="md" w="80%" variant="subtle" colorScheme="green" onPress={openGallery} >
            upload
        </Button>
        
        <Input style={{backgroundColor:"white",borderRadius:25}} mx="3" value={vehiclename} onChangeText={(e) => { setvehiclename(e) }} placeholder="vehicle name" w="80%" />
        <Input style={{backgroundColor:"white",borderRadius:25}}  mx="3" value={price} onChangeText={(e) => { setprice(e) }} placeholder="Price" w="80%" />
        
        <Button size="md" w="80%" variant="subtle" colorScheme="lime" onPress={updateData} >
            update Car
        </Button>
        <Button size="md" w="80%" variant="subtle" colorScheme="danger" onPress={deleteData} >
            delete Car
        </Button>
        
    </VStack>
    </View>
</NativeBaseProvider>
  )
}