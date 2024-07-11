import React, { useState } from 'react';
import { Text, View, StyleSheet, Animated, Dimensions, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { Server } from '../ServerIP';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, Entypo } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default function EditAdminInfos({route, navigation}) {

  const {user_id, jwtToken, Fname, Lname, Email, Phone, Address} = route.params;

  // console.log("---",Fname,"---->", Lname,"---->", Email,"---->", Phone,"---->", Address,"---->", user_id,"---");
  // console.log("the user's token -->", jwtToken);

  const decodedJWT = jwt_decode(jwtToken);

  const first_name = decodedJWT.first_name;
  const role = decodedJWT.role;

    //NEW Informations
    const [newFname, setNewFName] = useState(route.params.Fname);
    const [newLname, setNewLName] = useState(route.params.Lname);
    const [newEmail, setNewEmail] = useState(route.params.Email);
    const [newPhone, setNewPhone] = useState(route.params.Phone);
    const [newAddress, setNewAddress] = useState(route.params.Address);

    //Loading While Getting The Data

    const [isLoading, setIsLoading] = useState(false);

    const ServerIP = Server;


//Change My Personal Informations

const EditPersonalInfos = async() =>{

  setIsLoading(true);

  try {
    
    const response = await fetch("http://"+ServerIP+":3000/EditPersonalInfos", {

    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({'role' : role, 'user_id' : user_id, 'first_name' : newFname, 'last_name' : newLname, 'email' : newEmail, 'phone' : newPhone, 'address' : newAddress}),
    });

    const data = await response.json();

    if (data.message === "Your Personal Informations Were Changed Successfuly..") {

      setIsLoading(false);
      console.log(data.message);
      navigation.navigate('AdminProfile', {user_id : user_id, jwtToken : jwtToken});

    } else {
      setIsLoading(false);
      console.log(data.message);
      Alert.alert("Oops!!", data.message);
    }

  } catch (error) {
    console.log(error);
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

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ width: screenWidth, height: screenHeight, flex: 1 }}>
      <View style={{ width: screenWidth, height: screenHeight / 7 }}>
        <View style={{ marginTop: screenHeight / 10, marginLeft: screenWidth / 20 }}>
          <Text style={{ fontSize: screenWidth / 16, fontFamily: 'Black', color: '#C48F49' }}> Edit Your Informations :</Text>
        </View>
      </View>

      <View style={{ justifyContent: 'center', width: screenWidth, height: 5.3 * screenHeight / 7 }}>

        <View style={{ marginBottom: screenHeight / 10, marginLeft: screenWidth / 20, flexDirection: 'column' }}>
          <View style={{ justifyContent: 'center', width: screenWidth / 1.1, height: screenHeight / 14, marginTop: screenHeight / 30, borderWidth: screenWidth / 250, borderRadius: screenWidth / 20, borderColor: '#C48F49' }}>

            <TextInput
              onChangeText={text => setNewFName(text)}
              value={newFname}
              style={{ marginLeft: screenWidth / 30, fontSize: screenWidth / 28, fontFamily: 'Medium' }}
            />
          </View>

          <View style={{ justifyContent: 'center', width: screenWidth / 1.1, height: screenHeight / 14, marginTop: screenHeight / 50, borderWidth: screenWidth / 250, borderRadius: screenWidth / 20, borderColor: '#C48F49' }}>

            <TextInput
              onChangeText={text => setNewLName(text)}
              value={newLname}
              style={{ marginLeft: screenWidth / 30, fontSize: screenWidth / 28, fontFamily: 'Medium' }}
            />
          </View>

          <View style={{ justifyContent: 'center', width: screenWidth / 1.1, height: screenHeight / 14, marginTop: screenHeight / 50, borderWidth: screenWidth / 250, borderRadius: screenWidth / 20, borderColor: '#C48F49' }}>

            <TextInput
              onChangeText={text => setNewEmail(text)}
              value={newEmail}
              style={{ marginLeft: screenWidth / 30, fontSize: screenWidth / 28, fontFamily: 'Medium' }}
            />
          </View>

          <View style={{ justifyContent: 'center', width: screenWidth / 1.1, height: screenHeight / 14, marginTop: screenHeight / 50, borderWidth: screenWidth / 250, borderRadius: screenWidth / 20, borderColor: '#C48F49' }}>

            <TextInput
              onChangeText={text => setNewPhone(text)}
              value={newPhone}
              style={{ marginLeft: screenWidth / 30, fontSize: screenWidth / 28, fontFamily: 'Medium' }}
            />
          </View>

          <View style={{ justifyContent: 'center', width: screenWidth / 1.1, height: screenHeight / 14, marginTop: screenHeight / 50, borderWidth: screenWidth / 250, borderRadius: screenWidth / 20, borderColor: '#C48F49' }}>

            <TextInput
              onChangeText={text => setNewAddress(text)}
              value={newAddress}
              style={{ marginLeft: screenWidth / 30, fontSize: screenWidth / 28, fontFamily: 'Medium' }}
            />
          </View>

        </View>

      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <TouchableOpacity onPress={EditPersonalInfos} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 1.02, height: screenHeight / 18, backgroundColor: '#C48F49', borderRadius: screenWidth / 20 }}>
          {isLoading ? (
            <ActivityIndicator size={'large'} color='#fff' />
          ) : (
          <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Submit Changes</Text>
          )}
        </TouchableOpacity>
      </View>

    </View>
  );
}
