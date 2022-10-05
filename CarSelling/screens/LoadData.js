import { View, Text, FlatList,TouchableOpacity,Image } from 'react-native'
import { NativeBaseProvider, Input, VStack, Button, Avatar } from 'native-base'
import React, { useEffect, useState } from 'react'

export default function LoadData({navigation}) {

    const [posts, setPosts] = useState([]);
    const [selectedImage, setselectedImage] = useState();

    useEffect(() => {
        setselectedImage('file:///data/user/0/com.carselling/cache/rn_image_picker_lib_temp_7c28a977-c125-470c-b288-a82171515a31.jpg')
        getCars()

    })

    const getCars = () => {

        fetch('http://192.168.8.182:4000/vehicle/')
        .then((response) => response.json())
        .then((json) => setPosts(json));

    }

    return (
        <NativeBaseProvider >
            <Button style={{marginTop:"10%"}} size="md" variant="subtle" colorScheme="green" onPress={()=>{navigation.navigate("Car Selling - AddData")}}>
                Add New Vehicle
            </Button>
        <View style={{padding:20 , backgroundColor:"#dedede"}}>
            
            
            <FlatList
                data={posts}
                renderItem={({ item }) =>
                    <TouchableOpacity style={{borderWidth:0, marginBottom:'15%', padding:2,backgroundColor:"white",height:500,borderRadius:25,}} onPress={()=>{navigation.navigate("UpdateDeleteVehicle",{obj:item})}}>
                        
                        <Image style={{width:"100%",height:"85%",borderRadius:25}} source={{uri: item.uri}} />

                        <Text style={{marginBottom:10,color:"black",fontSize:25,}} >   * Vehicle Name :- {item.vehiclename}</Text>
                        <Text style={{marginBottom:10,color:"red", fontSize:15}} >      *   Price :- {item.price}</Text>
                    </TouchableOpacity>
                }
            />
        </View>
        </NativeBaseProvider>
    )
}