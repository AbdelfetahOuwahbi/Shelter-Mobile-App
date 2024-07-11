import React, { useState } from 'react';
import { Text, View, StyleSheet, Animated, Dimensions, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { Server } from '../ServerIP';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default function EditHouse({route, navigation}) {

    const {user_id, jwtToken, houseId, houseCity, houseAddress, houseDescription, housePrice} = route.params;

    //NEW Informations
    const [newcity, setNewCity] = useState(houseCity);
    const [newaddress, setNewAddress] = useState(houseAddress);
    const [newdescription, setNewDescription] = useState(houseDescription);
    const [newprice, setNewPrice] = useState(`${housePrice}`);
    
    const [isLoading, setIsLoading] = useState(false);
    
    const ServerIP = Server;


    //Sending The Changes To the Backend

    async function SubmitChanges() {

        if (newcity === houseCity && newaddress === houseAddress && newdescription === houseDescription &&
            newprice === `${housePrice}`) {
            Alert.alert("Nothing Was changed!", "To Submit You need To Make Changes..");
        } else {
            setIsLoading(true);
            try {
                const response = await fetch("http://" + ServerIP + ":3000/EditHouseInfos", {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({'house_id' : houseId, 'newCity' : newcity, 'newAddress' : newaddress, 'newDescription' : newdescription, 'newPrice' : newprice}),
                });

                const data = await response.json();

                 if (data.message === "House Updated Successfuly..") {
                     console.log(data.message);
                     setIsLoading(false);
                     Alert.alert("Congrats..", data.message);
                     navigation.navigate("Dashboard", {user_id : user_id, jwtToken : jwtToken});
                 } else {
                     setIsLoading(false);
                     Alert.alert("Ooh Sorry..", data.message);
                 }

            } catch (error) {
                console.log(error);
            }
        }
    };

      //FONTS LOADED  
  const [fontsLoaded] = useFonts({
    'Black': require('../../assets/fonts/Cinzel-Black.ttf'),
    'Bold': require('../../assets/fonts/Cinzel-Bold.ttf'),
    'ExtraBold': require('../../assets/fonts/Cinzel-ExtraBold.ttf'),
    'SemiBold': require('../../assets/fonts/Cinzel-SemiBold.ttf'),
    'Medium': require('../../assets/fonts/Cinzel-Medium.ttf'),
    'Regular': require('../../assets/fonts/Cinzel-Regular.ttf'),
  });

    return(
        <View style={{ width: screenWidth, height: screenHeight, flex: 1 }}>
        <View style={{ width: screenWidth, height: screenHeight / 7 }}>
            <View style={{ marginTop: screenHeight / 10, marginLeft: screenWidth / 20 }}>
                <Text style={{ fontSize: screenWidth / 16, fontFamily: 'Black', color: '#C48F49' }}> Edit This House :</Text>
            </View>
        </View>

        <View style={{ width: screenWidth, height: 5.3 * screenHeight / 7 }}>

            <View style={{ marginLeft: screenWidth / 20, flexDirection: 'column' }}>
                <View style={{ justifyContent: 'center', width: screenWidth / 1.1, height: screenHeight / 14, marginTop: screenHeight / 30, borderWidth: screenWidth / 250, borderRadius: screenWidth / 20, borderColor: '#C48F49' }}>

                    <TextInput
                        onChangeText={text => setNewCity(text)}
                        value={newcity}
                        style={{ marginLeft: screenWidth / 30, fontSize: screenWidth / 28, fontFamily: 'Medium' }}
                    />
                </View>

                <View style={{ justifyContent: 'center', width: screenWidth / 1.1, height: screenHeight / 14, marginTop: screenHeight / 50, borderWidth: screenWidth / 250, borderRadius: screenWidth / 20, borderColor: '#C48F49' }}>

                    <TextInput
                        onChangeText={text => setNewAddress(text)}
                        value={newaddress}
                        style={{ marginLeft: screenWidth / 30, fontSize: screenWidth / 28, fontFamily: 'Medium' }}
                    />
                </View>


                <View style={{ justifyContent: 'center', width: screenWidth / 1.1, height: screenHeight / 6, marginTop: screenHeight / 100, borderWidth: screenWidth / 250, borderRadius: screenWidth / 20, borderColor: '#C48F49' }}>

                    <TextInput
                        onChangeText={text => setNewDescription(text)}
                        value={newdescription}
                        style={{ marginLeft: screenWidth / 30, fontSize: screenWidth / 28, fontFamily: 'Medium', width: screenWidth / 1.2, height: screenHeight / 6.5, textAlignVertical: 'top' }}
                        multiline={true}
                        maxLength={450}
                    />
                </View>

                <View style={{ justifyContent: 'center', width: screenWidth / 1.1, height: screenHeight / 14, marginTop: screenHeight / 50, borderWidth: screenWidth / 250, borderRadius: screenWidth / 20, borderColor: '#C48F49' }}>

                    <TextInput
                        onChangeText={text => setNewPrice(text)}
                        value={newprice}
                        style={{ marginLeft: screenWidth / 30, fontSize: screenWidth / 28, fontFamily: 'Medium' }}
                    />
                </View>
            </View>
       
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <TouchableOpacity onPress={() => {SubmitChanges()}} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 1.02, height: screenHeight / 18, backgroundColor: '#C48F49', borderRadius: screenWidth / 20 }}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#C48F49" />
                ) : (
                  <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Submit Changes</Text>
                    )} 

            </TouchableOpacity>
        </View>

    </View>
    );
}