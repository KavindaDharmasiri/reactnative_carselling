import React, { useState } from 'react'
import { useEffect } from 'react';
import { NativeBaseProvider, Text, Input, VStack, Button, Avatar, View } from 'native-base'
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

export default function AddData({navigation}) {

    const [posts, setPosts] = useState([]);
    const [vehiclename, setvehiclename] = useState('');
    const [price, setprice] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedUri, setSelectedUri] = useState();

    var id = "C001"
    var t=0;

    useEffect(() => {
        
        if(selectedImage == null){
            const exampleImage = require('../assests/cloud-upload-vector-flat-icon-98690946.jpg')
            setSelectedImage(exampleImage)
        }
        getCars()
    })

    const getCars = () => {
        fetch('http://192.168.8.182:4000/vehicle/')
        .then((response) => response.json())
        .then((json) => setPosts(json));
    }

    const setId = () => {
      
        getCars()

        if(posts.length != 0){
            var id2=posts[posts.length-1].code; 

            let temp = parseInt(id2.slice(1))        
        
            if (temp < 1) {
                id = 'C001'
            } else if (temp < 9) {
                id = 'C00' + (temp + 1)
            } else if (temp < 99) {
                id = 'C0' + (temp + 1)
            } else if (temp < 999) {
                id = 'C' + (temp + 1)
            } else {
                id = 'C001'
            }
        }
    }

    const openGallery=async()=>{
    
        const images = await launchImageLibrary(options);

        setSelectedImage(images.assets[0])
        setSelectedUri(images.assets[0].uri)
    
        const formdata = new FormData()
        formdata.append('file',{
            uri:images.assets[0].uri,
            type:images.assets[0].type,
            name:images.assets[0].fileName
        })

        let res = await fetch('http://192.168.8.182:4000/vehicle/image',{
            method:'post',
            body:formdata,
            headers:{
                'Content-type': 'multipart/form-data',
            },
        });
        let responsejson =await res.json();
    }

    const saveData = () => {
        setId();
        
        fetch('http://192.168.8.182:4000/vehicle/', {
            method: 'POST',
            body: JSON.stringify({
                code: id,
                vehiclename: vehiclename,
                vehicleimg: selectedUri,
                price: price,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {Alert.alert("Save Saved Successfully !");clearFields()})
            .catch((err)=>{Alert.alert("Error occured !")})
    }
      
    const clearFields = () => {
        setvehiclename(""),
        setprice(""),
        
        setSelectedImage(require('../assests/cloud-upload-vector-flat-icon-98690946.jpg'))
        
    }

    return (
        <NativeBaseProvider>
            <View style={{ backgroundColor:"#dedede",height:"100%"}}>
            <Text fontSize="3xl" bold  mt="10%" ml="30%">     Save Car</Text>
            <VStack space={4} alignItems="center" mt="15%">

            <Image style={{width:200,height:200,borderRadius:25}} source={selectedImage}/>            

                <Button size="md" w="80%" variant="subtle" colorScheme="green" onPress={openGallery}>
                    upload
                </Button>
                
                <Input style={{backgroundColor:"white",borderRadius:25}} mx="3" value={vehiclename} onChangeText={(e) => { setvehiclename(e) }} placeholder="vehicle name" w="80%" />
                <Input style={{backgroundColor:"white",borderRadius:25}} mx="3" value={price} onChangeText={(e) => { setprice(e) }} placeholder="Price" w="80%" />
                
                <Button size="md" w="80%" variant="subtle" colorScheme="secondary" onPress={saveData}>
                    save Car
                </Button>
            </VStack>
            </View>
        </NativeBaseProvider>
    )
}