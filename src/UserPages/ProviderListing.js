import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Animated, Dimensions, TouchableOpacity, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Server } from '../ServerIP';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default function ProviderListing({route, navigation}) {

  const {user_id, jwtToken, provider_id, first_name, last_name, email, phone, profile_picture} = route.params;

 // console.log("Were are in ProviderListing , this is the user id -->", user_id);
 // console.log("Were are in ProviderListing , this is the provider id -->", provider_id);


 const [housePicture1, setHousePictures1] = useState([]);
 const [housePicture2, setHousePictures2] = useState([]);
 const [housePicture3, setHousePictures3] = useState([]);
 const [housePicture4, setHousePictures4] = useState([]);
 const [houseCity, setHouseCity] = useState([]);
 const [houseAddress, setHouseAddresses] = useState([]);
 const [houseDescription, setHouseDescriptions] = useState([]);
 const [housePrice, setHousePrices] = useState([]);
 const [house_id, setHouse_ids] = useState([]);
 const [house_type, setHouse_types] = useState([]);

   // Check If The House Is Already Liked When Searched
   const [isFavourite, setIsFavourite] = useState([]);

   const [isLoading, setIsLoading] = useState(false);
   const [isText, setIsText] = useState(false);

  const ServerIP = Server;

  //Getting The Provider's Listing (Houses Informations)

  useEffect(() =>{

  const GetProviderListing = async() =>{

    setIsLoading(true);

    try {
      const response = await fetch("http://"+ServerIP+":3000/GetProviderListing", {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({'provider_id' : provider_id, 'user_id' : user_id}),
      });

      const data = await response.json();

    //  console.log(data);

    if (data.message === "Provider's Houses Informations Got Successfuly ..") {
      console.log(data.message);
      setIsLoading(false);

      setHouse_ids(data.houses_ids);
      console.log("from Backend For ProviderListing", data.houses_ids);
      setHouseCity(data.cities);
      console.log("from Backend For ProviderListing", data.cities);
      setHouseAddresses(data.addresses);
      console.log("from Backend For ProviderListing", data.addresses);
      setHousePrices(data.prices);
      console.log("from Backend For ProviderListing", data.prices);
      setHouse_types(data.house_types);
      console.log("from Backend For ProviderListing", data.house_types);
      setHouseDescriptions(data.descriptions);
      console.log("from Backend For ProviderListing", data.descriptions);
      setHousePictures1(data.pictures_1);
      console.log("from Backend For ProviderListing", data.pictures_1);
      setHousePictures2(data.pictures_2);
      console.log("from Backend For ProviderListing", data.pictures_2);
      setHousePictures3(data.pictures_3);
      console.log("from Backend For ProviderListing", data.pictures_3);
      setHousePictures4(data.pictures_4);
      console.log("from Backend For ProviderListing", data.pictures_4);      
      setIsFavourite(data.is_liked);
      console.log("from Backend For ProviderListing", data.is_liked);
    } else {
      console.log(data.message);
      setIsLoading(false);
      setIsText(true);
    }

    } catch (error) {
      console.log(error);
    }
  };
  GetProviderListing();

}, []);

  // Adding A Favourite House to User's Favourite Panel

  const AddToFavourite = async (house_id) => {

    try {
      const response = await fetch("http://" + ServerIP + ":3000/AddToFavourite", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'house_id': house_id, 'user_id': user_id }),
      });

      const data = await response.json();

      console.log(data);

    } catch (error) {
      console.log(error);
    }
  };

//Deleting from favourites

  const DeleteFromFavourite = async(house_id) => {

     try {
       const response = await fetch("http://" + ServerIP + ":3000/DeleteFromFavourite", {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ 'house_id': house_id, 'user_id': user_id }),
       });

       const data = await response.json();

       console.log(data);

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
    <View style={{ flex: 1, width: screenWidth, height: screenHeight }}>
      <View style={{ width: screenWidth, height: 0.8 * screenHeight / 7 }}>
        
          <TouchableOpacity onPress={() => {navigation.navigate('Provider', {user_id : user_id, jwtToken : jwtToken, provider_id : provider_id, first_name : first_name, last_name : last_name, email : email, phone : phone, profile_picture : profile_picture})}} style={{ marginLeft: screenWidth / 12, marginTop: screenHeight / 20 }}>
            <Icon name='arrow-left' size={screenWidth / 14} color={'#C48F49'} />
          </TouchableOpacity>
        
      </View>

      <View style={{ width: screenWidth, height: 1.2 * screenHeight / 7 }}>
        <View style={{ marginTop: screenHeight / 60, marginLeft: screenWidth / 20, flexDirection: 'column' }}>
          <View style={{}}>
            <Image
                source={profile_picture !== null ? {uri : "http://" + ServerIP + ":3000/" + profile_picture} : require('./UsrPgsImg/userGrey.png') }
                style={{ width: screenWidth / 5, height: screenHeight / 10, borderRadius: screenWidth / 10 }}
            />
          </View>

          
          <View style={{flexDirection:'row'}}>
            <Text style={{ fontSize: screenWidth / 15, fontFamily: 'Black', color: '#C48F49' }}>{first_name}'s Houses</Text>
            {isLoading && <ActivityIndicator style={{marginLeft: screenWidth/20}} size="large" color="#C48F49" />}
          </View>
          
        </View>

      </View>
      <View style={{ width: screenWidth, height: 4.4 * screenHeight / 7, flex: 1 }}>
      {housePicture1.length > 0 ? (

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:screenHeight/40}}>
            {housePicture1.map((picture, pictureIndex) => (
              <View key={pictureIndex} style={{ height: screenHeight / 2.5, width: screenWidth / 1.06, marginLeft: screenWidth / 30, borderRadius: screenWidth / 20, borderBottomColor: '#C48F49', borderBottomWidth: screenWidth / 150, borderTopColor: '#C48F49', borderTopWidth: screenWidth / 150, backgroundColor: 'white', marginTop: screenHeight / 80 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: screenWidth / 100 }}>
                  <TouchableOpacity>
                    <Image
                      source={{ uri: "http://" + ServerIP + ":3000/" + picture }}
                      style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={{ uri: "http://" + ServerIP + ":3000/" + housePicture2[pictureIndex] }}
                      style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={{ uri: "http://" + ServerIP + ":3000/" + housePicture3[pictureIndex] }}
                      style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={{ uri: "http://" + ServerIP + ":3000/" + housePicture4[pictureIndex] }}
                      style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                </ScrollView>

                <View style={{flexDirection: 'column'}}>
                  <View style={{marginBottom:screenHeight/40, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{marginLeft:screenWidth/30, flexDirection : 'row'}}>
                    <View>
                    {house_type[pictureIndex] === "room" ? 
                    (<Ionicons name="md-bed" size={screenWidth / 12} color="#C48F49" />):
                    house_type[pictureIndex] === "see side" ? (<Icon name='water' size={screenWidth / 12} color="#C48F49" />):
                    house_type[pictureIndex] === "pool" ? (<MaterialCommunityIcons name="pool" size={screenWidth / 12} color="#C48F49" />):
                    house_type[pictureIndex] === "riad" ? (<MaterialCommunityIcons name="greenhouse" size={screenWidth / 12} color="#C48F49" />):
                    house_type[pictureIndex] === "cabane" ? (<MaterialCommunityIcons name="hoop-house" size={screenWidth / 12} color="#C48F49" />):
                    (<MaterialCommunityIcons name="home-assistant" size={screenWidth / 12} color="#C48F49" />
                    )}
                    </View>
                    <View style={{marginTop:screenHeight/120}}>
                      <Text style={{fontSize:screenWidth/22, fontFamily:'Bold'}}>  {house_type[pictureIndex]}</Text>
                    </View>
                    </View>

                    <View style={{marginTop:screenHeight/150, marginRight:screenWidth/30, flexDirection: 'row'}}>
                    <View style={{marginTop: screenHeight/250}}>
                      <Text>4.0k </Text>
                    </View>
                    <View style={{}}>
                    <AntDesign name="star" size={screenWidth/18} color="#C48F49" />
                    </View>
                    </View>
                  </View>

                  
                  <View style={{bottom:screenHeight/50, alignItems:'center'}}>
                    <View style={{width:screenWidth/1.2, height: screenHeight/500, backgroundColor:'lightgrey'}}></View>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: screenWidth / 25 }}>

                    <TouchableOpacity onPress={() => {
                      if (isFavourite[pictureIndex] === false) {
                        AddToFavourite(house_id[pictureIndex]);
                      } else {
                        DeleteFromFavourite(house_id[pictureIndex]);
                      }
                      setIsFavourite([...isFavourite.slice(0, pictureIndex), !isFavourite[pictureIndex], ...isFavourite.slice(pictureIndex + 1)]);
                    }} style={{ bottom: screenHeight / 100, marginRight: screenWidth / 50 }}>
                      <AntDesign name="heart" size={screenWidth / 15} color={isFavourite[pictureIndex] ? "#C48F49" : "lightgrey"} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'column', bottom: screenHeight / 150, marginLeft: screenWidth / 120 }}>
                      <View style={{ flexDirection: 'row', marginLeft: screenWidth / 40, }}>
                        <Ionicons name="ios-location-outline" size={screenWidth / 15} style={{ bottom: screenHeight / 150 }} color="#C48F49" />
                        <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Medium' }}>{houseCity[pictureIndex]}</Text>
                      </View>
                      <Text style={{ marginLeft: screenWidth / 20, fontSize: screenWidth / 35, fontFamily: 'Regular' }}>← Scroll Pictures</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => { navigation.navigate('ReservationCard', { ComingFrom: "Home", user_id: user_id, jwtToken: jwtToken, house_id: house_id[pictureIndex], city: houseCity[pictureIndex], address: houseAddress[pictureIndex], description: houseDescription[pictureIndex], price: housePrice[pictureIndex], house_type : house_type, picture_1: "http://" + ServerIP + ":3000/" + picture, picture_2: "http://" + ServerIP + ":3000/" + housePicture2[pictureIndex], picture_3: "http://" + ServerIP + ":3000/" + housePicture3[pictureIndex], picture_4: "http://" + ServerIP + ":3000/" + housePicture4[pictureIndex] }) }} style={{ marginRight: screenWidth / 30, alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: '#C48F49', borderRadius: screenWidth / 20, height: screenHeight / 24, width: screenWidth / 3 }}>
                    <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>Check it Out</Text>
                  </TouchableOpacity>
                </View>

                </View>

              </View>
            ))}
          </ScrollView>
      ) : isText ? (
<View style={{}}>
  <Text style={{fontSize: screenWidth / 20, fontFamily: 'Medium', textAlign:'center'}}>No Houses Listed / Houses Removed For {first_name}</Text>
  </View>
        ) : null}
      
          
      </View>


    </View>
  );
}

