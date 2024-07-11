import React, { useState } from 'react';
import { Text, View, StyleSheet, Animated, Dimensions, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { Server } from '../ServerIP';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default function EditItem({route, navigation}) {


    const {user_id, jwtToken, houseId, houseCity, houseAddress, houseDescription, housePrice, houseType} = route.params;

  //  console.log(user_id, jwtToken, houseId, houseCity, houseAddress, houseDescription, housePrice, houseType, housePicture1, housePicture2, housePicture3, housePicture4);

//    console.log("this is the new Price -->", housePrice);
    const ServerIP = Server;

    //NEW Informations
    const [newcity, setNewCity] = useState(houseCity);
    const [newaddress, setNewAddress] = useState(houseAddress);
    const [newdescription, setNewDescription] = useState(houseDescription);
    const [newprice, setNewPrice] = useState(`${housePrice}`);
    const [newtype, setNewType] = useState(houseType);

    const [isLoading, setIsLoading] = useState(false);

//Sending The Changes To the Backend

    async function SubmitChanges() {

        if (newcity === houseCity && newaddress === houseAddress && newdescription === houseDescription &&
            newprice === `${housePrice}` && newtype === houseType) {
            Alert.alert("Nothing Was changed!", "To Submit You need To Make Changes..");
        } else {
            setIsLoading(true);
            try {
                const response = await fetch("http://" + ServerIP + ":3000/EditItemInfos", {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({'user_id': user_id, 'house_id' : houseId, 'newCity' : newcity, 'newAddress' : newaddress, 'newDescription' : newdescription, 'newPrice' : newprice, 'newType' : newtype}),
                });

                const data = await response.json();

                 if (data.message === "Item Updated Successfuly..") {
                     console.log(data.message);
                     setIsLoading(false);
                     Alert.alert("Congrats..", data.message);
                     navigation.navigate("Home", { user_id: user_id, jwtToken: jwtToken });
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

  if (!fontsLoaded) {
    return null;
  }
  return (
      <View style={{ width: screenWidth, height: screenHeight, flex: 1 }}>
          <View style={{ width: screenWidth, height: screenHeight / 7 }}>
              <View style={{ marginTop: screenHeight / 10, marginLeft: screenWidth / 20 }}>
                  <Text style={{ fontSize: screenWidth / 16, fontFamily: 'Black', color: '#C48F49' }}> Edit This Item :</Text>
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

                  <View style={{ marginTop: screenHeight / 50, marginLeft: screenWidth / 30, flexDirection: 'column' }}>
                      <Text style={{ fontSize: screenWidth / 26, fontFamily: 'SemiBold' }}>Enter The New Description Here </Text>

                      <Text style={{ fontSize: screenWidth / 30, fontFamily: 'Regular' }}>(Talk about the house, the location, the price....) </Text>
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

              <View style={{ marginTop: screenHeight / 40, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: screenWidth / 26, fontFamily: 'Medium' }}>select the type of house you'd like to add</Text>
            <View style={{ paddingBottom: screenHeight / 80, marginTop: screenHeight / 70, flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { setNewType("room") }} style={{ alignItems: 'center', width: screenWidth / 3.5, height: screenHeight / 17, backgroundColor: newtype === "room" ? "#C48F49" : "#fff", borderColor: '#C48F49', borderWidth: screenWidth / 200, borderRadius: screenWidth / 10 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: screenWidth / 30, color: newtype === "room" ? "#fff" : "#C48F49" }}>room</Text>
                  <Ionicons name="md-bed" size={screenWidth / 15} color={newtype === "room" ? "#fff" : "#C48F49"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setNewType("see side") }} style={{ alignItems: 'center', marginLeft: screenWidth / 40, width: screenWidth / 3.5, height: screenHeight / 17, backgroundColor: newtype === "see side" ? "#C48F49" : "#fff", borderColor: '#C48F49', borderWidth: screenWidth / 200, borderRadius: screenWidth / 10 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: screenWidth / 30, color: newtype === "see side" ? "#fff" : "#C48F49" }}>sea side</Text>
                  <Icon name='water' size={screenWidth / 15} color={newtype === "see side" ? "#fff" : "#C48F49"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setNewType("pool") }} style={{ alignItems: 'center', marginLeft: screenWidth / 40, width: screenWidth / 3.5, height: screenHeight / 17, backgroundColor: newtype === "pool" ? "#C48F49" : "#fff", borderColor: '#C48F49', borderWidth: screenWidth / 200, borderRadius: screenWidth / 10 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: screenWidth / 30, color: newtype === "pool" ? "#fff" : "#C48F49" }}>pool</Text>
                  <MaterialCommunityIcons name="pool" size={screenWidth / 15} color={newtype === "pool" ? "#fff" : "#C48F49"} />
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: screenHeight / 40, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { setNewType("riad") }} style={{ alignItems: 'center', width: screenWidth / 3.5, height: screenHeight / 17, backgroundColor: newtype === "riad" ? "#C48F49" : "#fff", borderColor: '#C48F49', borderWidth: screenWidth / 200, borderRadius: screenWidth / 10 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: screenWidth / 30, color: newtype === "riad" ? "#fff" : "#C48F49" }}>Riad</Text>
                  <MaterialCommunityIcons name="greenhouse" size={screenWidth / 15} color={newtype === "riad" ? "#fff" : "#C48F49"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setNewType("cabane") }} style={{ alignItems: 'center', marginLeft: screenWidth / 40, width: screenWidth / 3.5, height: screenHeight / 17, backgroundColor: newtype === "cabane" ? "#C48F49" : "#fff", borderColor: '#C48F49', borderWidth: screenWidth / 200, borderRadius: screenWidth / 10 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: screenWidth / 30, color: newtype === "cabane" ? "#fff" : "#C48F49" }}>cabane</Text>
                  <MaterialCommunityIcons name="hoop-house" size={screenWidth / 15} color={newtype === "cabane" ? "#fff" : "#C48F49"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setNewType("farm") }} style={{ alignItems: 'center', marginLeft: screenWidth / 40, width: screenWidth / 3.5, height: screenHeight / 17, backgroundColor: newtype === "farm" ? "#C48F49" : "#fff", borderColor: '#C48F49', borderWidth: screenWidth / 200, borderRadius: screenWidth / 10 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: screenWidth / 30, color: newtype === "farm" ? "#fff" : "#C48F49" }}>farm</Text>
                  <MaterialCommunityIcons name="home-assistant" size={screenWidth / 15} color={newtype === "farm" ? "#fff" : "#C48F49"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
         
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <TouchableOpacity onPress={SubmitChanges} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 1.02, height: screenHeight / 18, backgroundColor: '#C48F49', borderRadius: screenWidth / 20 }}>
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
