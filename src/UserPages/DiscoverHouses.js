import React, { useRef, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Animated, Dimensions, TouchableOpacity, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Server } from '../ServerIP';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function DiscoverHouses({ route, navigation }) {

  const{ComingFrom, user_id, jwtToken} = route.params;
 // console.log(ComingFrom);

  // console.log("Were are in Discovery , this is the user id -->", user_id);
  // console.log("Were are in Discovery , this is the user JWT -->",jwtToken);


  // House's Informations Fillable Variables
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

   const [IsLoadingHouse, setIsLoadingHouse] = useState(false);

   // Provider's Informations Fillable Variables
   const [userid, setUserid] = useState([]);
   const [first_name, setFirst_name] = useState([]);
   const [last_name, setLast_name] = useState([]);
   const [email, setEmail] = useState([]);
   const [phone, setPhone] = useState([]);
   const [profile_picture, setProfilePicture] = useState([]);

   const [IsLoadingProvider, setIsLoadingProvider] = useState(false);

   const [IsTextHouse, setIsTextHouse] = useState(false);
   const [IsTextProvider, setIsTextProvider] = useState(false);


   /////////////////////  desired house type    ///////////////////////
   const houseType = "riad";

   const ServerIP = Server;

   //GETTING THE Desired Type Of House 
   useEffect(() =>{

    const GetBestHouseOffers = async() =>{

      setIsLoadingHouse(true);
      try {
        const response = await fetch("http://"+ServerIP+":3000/GetBestHouseOffers", {
          method : 'POST',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({'houseType' : houseType}),
        });

        const data = await response.json();

        if (data.message === `${houseType} Houses Informations Got Successfuly ..`) {
        //  console.log(data.message);
          setIsLoadingHouse(false);
          setHouse_ids(data.houses_ids);
          console.log("from Backend for houses -->", data.houses_ids);
          setHouseCity(data.cities);
          console.log("from Backend for houses -->", data.cities);
          setHouseAddresses(data.addresses);
          console.log("from Backend for houses -->", data.addresses);
          setHousePrices(data.prices);
          console.log("from Backend for houses -->", data.prices);
          setHouse_types(data.house_types);
          console.log("from Backend for houses -->", data.house_types);
          setHouseDescriptions(data.descriptions);
          console.log("from Backend for houses -->", data.descriptions);
          setHousePictures1(data.pictures_1);
          console.log("from Backend for houses -->", data.pictures_1);
          setHousePictures2(data.pictures_2);
          console.log("from Backend for houses -->", data.pictures_2);
          setHousePictures3(data.pictures_3);
          console.log("from Backend for houses -->", data.pictures_3);
          setHousePictures4(data.pictures_4);
          console.log("from Backend for houses -->", data.pictures_4);   

        } else {
          console.log(data.message);
          setIsLoadingHouse(false);
          setIsTextHouse(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    GetBestHouseOffers();
   }, []);


      //GETTING THE Poviders Of This Type Of Houses 
      useEffect(() =>{

        setIsLoadingProvider(true);

        const GetBestHouseOffersProviders = async() =>{
    
          try {
            const response = await fetch("http://"+ServerIP+":3000/GetBestHouseOffersProviders", {
              method : 'POST',
              headers : {'Content-Type' : 'application/json'},
              body : JSON.stringify({'houseType' : houseType}),
            });
    
            const data = await response.json();
    
            if (data.message === `Users informations for ${houseType} got successfuly..`) {
            //  console.log(data.message);
              setIsLoadingProvider(false);

              setUserid(data.user_ids);
              console.log("From Backend for provider -->" ,data.user_ids);
              setFirst_name(data.first_names);
              console.log("From Backend for provider -->" ,data.first_names);
              setLast_name(data.last_names);
              console.log("From Backend for provider -->" ,data.last_names);
              setEmail(data.emails);
              console.log("From Backend for provider -->" ,data.emails);
              setPhone(data.phones);
              console.log("From Backend for provider -->" ,data.phones);
              setProfilePicture(data.profile_pictures);
              console.log("From Backend for provider -->" ,data.profile_pictures);

            } else {
              console.log(data.message);
              setIsLoadingProvider(false);
              setIsTextProvider(true);
            }
          } catch (error) {
            console.log(error);
          }
        }
    
        GetBestHouseOffersProviders();
       }, []);


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

      <View style={{ width: screenWidth, height: 1.2 * screenHeight / 7 }}>

        <View style={{ flexDirection: 'row', marginTop: screenHeight / 20, marginLeft: screenWidth / 14, justifyContent: 'space-evenly' }}>
          <TouchableOpacity style={{ marginTop: screenHeight / 60, marginRight: screenWidth / 6 }} onPress={() => { navigation.navigate(ComingFrom === "Favourite" ? "Home" : "Home", {user_id: user_id, jwtToken : jwtToken})}}>

            <Icon name='arrow-left' size={screenWidth/14} color={'#C48F49'} />
          </TouchableOpacity>

          <View style={{ width: screenWidth / 2, marginTop: screenHeight / 150 }}>
            <Text style={{ fontFamily: 'ExtraBold', fontSize: screenWidth/25 }}>
              Discovery Time,
            </Text>

            <Text style={{ fontFamily: 'Black', fontSize: screenWidth/20, width: screenWidth / 2.7 }}>
              Check Out These Riads
            </Text>
          </View>

          <View style={{marginTop:screenHeight/50, right:screenWidth/15}}>
            {IsLoadingHouse ? (<ActivityIndicator size="large" color="#C48F49" />) : IsLoadingProvider ? (<ActivityIndicator size="large" color="#C48F49" />) : null}
          </View>

        </View>

      </View>

            {/* Discover & See more Section  */}

      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', width: screenWidth, height: 0.3 * screenHeight / 7, backgroundColor:'lightgrey'}}>

        <View style={{marginLeft:screenWidth/30}}>
          <Text style={{ fontFamily: 'Black', fontSize:screenWidth/26}}>Best Riad House Offers</Text>
        </View>

        <View style={{marginRight:screenWidth/30}}>
          <TouchableOpacity onPress={() => {navigation.navigate('OfferHouses', {house_type : houseType, user_id : user_id, jwtToken : jwtToken})}}>
            <Text style={{ fontFamily: 'SemiBold', textDecorationLine: 'underline', textDecorationColor: 'black', fontSize:screenWidth/28}}>See More</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Discover Houses Section */}

      <View style={{ height: 2.6 * screenHeight / 7, width: screenWidth, flexDirection: 'row'}}>
{housePicture1.length > 0 ? (

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: screenWidth / 80 }}>
              {housePicture1.map((picture, pictureIndex) =>(
          <View key={pictureIndex} style={{ height: screenHeight / 2.9, width: screenWidth / 1.06, marginLeft: screenWidth / 50, borderRadius: screenWidth / 20, backgroundColor: 'white', marginTop: screenHeight / 80, borderBottomColor: '#C48F49', borderBottomWidth: screenWidth / 150, borderTopColor: '#C48F49', borderTopWidth: screenWidth / 150, }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "House", pictureToSee : picture});}}>
              <Image
                source={{ uri: "http://" + ServerIP + ":3000/" + picture }}
                style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                resizeMode='cover'
              />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "House", pictureToSee : housePicture2[pictureIndex]});}}>
              <Image
                source={{ uri: "http://" + ServerIP + ":3000/" + housePicture2[pictureIndex] }}
                style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                resizeMode='cover'
              />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "House", pictureToSee : housePicture3[pictureIndex]});}}>
              <Image
                source={{ uri: "http://" + ServerIP + ":3000/" + housePicture3[pictureIndex] }}
                style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                resizeMode='cover'
              />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "House", pictureToSee : housePicture4[pictureIndex]});}}>
              <Image
                source={{ uri: "http://" + ServerIP + ":3000/" + housePicture4[pictureIndex] }}
                style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                resizeMode='cover'
              />
              </TouchableOpacity>
            </ScrollView>


            <View style={{paddingTop:screenHeight/50, flexDirection: 'row', justifyContent: 'space-between' }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: screenWidth / 25 }}>


            <View style={{flexDirection: 'row'}}>
                    <View style={{marginTop: screenHeight/250}}>
                      <Text>4.0k </Text>
                    </View>
                    <View style={{}}>
                    <AntDesign name="star" size={screenWidth/18} color="#C48F49" />
                    </View>
                    </View>

                    <View style={{ flexDirection: 'column', bottom: screenHeight / 150, marginLeft: screenWidth / 120 }}>
                      <View style={{ flexDirection: 'row', marginLeft: screenWidth / 40, }}>
                        <Ionicons name="ios-location-outline" size={screenWidth / 15} style={{ bottom: screenHeight / 150 }} color="#C48F49" />
                        <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Medium' }}>{houseCity[pictureIndex]}</Text>
                      </View>
                      <Text style={{ marginLeft: screenWidth / 20, fontSize: screenWidth / 35, fontFamily: 'Regular' }}>← Scroll Pictures</Text>
                    </View>
                  
                  </View>
                  <TouchableOpacity onPress={() => { navigation.navigate('ReservationCard', { ComingFrom: "Home", user_id: user_id, jwtToken: jwtToken, house_id: house_id[pictureIndex], city: houseCity[pictureIndex], address: houseAddress[pictureIndex], description: houseDescription[pictureIndex], price: housePrice[pictureIndex], picture_1: "http://" + ServerIP + ":3000/" + picture, picture_2: "http://" + ServerIP + ":3000/" + housePicture2[pictureIndex], picture_3: "http://" + ServerIP + ":3000/" + housePicture3[pictureIndex], picture_4: "http://" + ServerIP + ":3000/" + housePicture4[pictureIndex] }) }} style={{ marginRight: screenWidth / 30, alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: '#C48F49', borderRadius: screenWidth / 20, height: screenHeight / 24, width: screenWidth / 3 }}>
                    <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>Check it Out</Text>
                  </TouchableOpacity>
                </View>
          </View>
))}
        </ScrollView>
) : IsTextHouse ? (
<View style={{marginLeft:screenWidth/7, marginTop:screenHeight/6}}>
  <Text style={{fontSize: screenWidth / 20, fontFamily: 'Medium', textAlign:'center'}}>No House Results For {houseType}</Text>
  </View>
) : null}

      </View>

            {/* Discover & See more Section  */}

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', width: screenWidth, height: 0.3 * screenHeight / 7, backgroundColor:'lightgrey'}}>

<View style={{marginLeft:screenWidth/30}}>
  <Text style={{ fontFamily: 'Black', fontSize:screenWidth/26}}>Best Riad House Providers</Text>
</View>

<View style={{marginRight:screenWidth/30}}>
  <TouchableOpacity onPress={() => {navigation.navigate('OfferHousesProviders', {house_type : houseType, user_id : user_id, jwtToken : jwtToken})}}>
    <Text style={{ fontFamily: 'SemiBold', textDecorationLine: 'underline', textDecorationColor: 'black', fontSize:screenWidth/28}}>See More</Text>
  </TouchableOpacity>
</View>
</View>

      {/* Discover Providers Section */}

      <View style={{flex:1, height: 1.8 * screenHeight / 7, flexDirection: 'row' }}>
        {first_name.length > 0 ? (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingRight:screenWidth/30}}>
          {first_name.map((First_name, userIndex) => (
          <TouchableOpacity key={userIndex} onPress={() => {navigation.navigate('Provider', {user_id : user_id, jwtToken : jwtToken, provider_id : userid[userIndex], first_name : First_name, last_name : last_name[userIndex], email : email[userIndex], phone : phone[userIndex], profile_picture : profile_picture[userIndex]})}}>
            <View style={{alignItems:'center', height: screenHeight / 3.9, width: screenWidth / 2.3, marginLeft: screenWidth / 35, marginTop: screenHeight / 70, borderRadius: screenWidth / 20, backgroundColor: '#fff', borderBottomColor: '#C48F49', borderBottomWidth: screenWidth / 150, borderTopColor: '#C48F49', borderTopWidth: screenWidth / 150, }}>
              <Image
                source={profile_picture[userIndex] !== null ? {uri : "http://" + ServerIP + ":3000/" + profile_picture[userIndex]} : require('./UsrPgsImg/userGrey.png') }
                style={{ width: screenWidth / 3.2, height: screenHeight / 7, marginTop: screenHeight / 120, borderRadius: screenWidth }}
              />
              <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Black', marginTop: screenHeight / 100, color: 'black' }}>{First_name} {last_name[userIndex]}</Text>
              <View style={{alignItems:'center', marginTop:screenHeight/120, flexDirection:'row'}}>
              <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Bold', marginTop: screenHeight / 100, color: '#C48F49' }}>5.0 </Text>
              <AntDesign name="star" size={screenWidth/18} color="#C48F49" />
              </View>
            </View>
          </TouchableOpacity>
  ))}
        </ScrollView>
        ) : IsTextProvider ? (
<View style={{marginLeft:screenWidth/8, marginTop:screenHeight/6}}>
  <Text style={{fontSize: screenWidth / 20, fontFamily: 'Medium', textAlign:'center'}}>No Provider Results For {houseType}</Text>
  </View>
        ) : null}
      </View>

      <View style={{height: 0.6* screenHeight/7, alignItems:'center', justifyContent:'center'}}>
        <View style={{backgroundColor: '#C48F49', borderRadius: screenWidth, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width:screenWidth/1.030, height:screenHeight/15}}>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('Home', {user_id : user_id, jwtToken :jwtToken}) }}>
          <Ionicons name="home" size={screenWidth/20} color="black" />
          <Text style={{fontSize: screenWidth/38, fontFamily:'ExtraBold',}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} >
        <MaterialCommunityIcons name="offer" size={screenWidth/20} color="white" />
          <Text style={{fontSize: screenWidth/38, fontFamily:'ExtraBold', color:"white"}}>Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => {navigation.navigate('Favourite', {ComingFrom : "DiscoverHouses", user_id : user_id, jwtToken :jwtToken})}}>
          <Ionicons name="heart" size={screenWidth/20} color="black" />
          <Text style={{fontSize: screenWidth/38, fontFamily:'ExtraBold',}}>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => {navigation.navigate('MyListing', {user_id : user_id, jwtToken :jwtToken})}}>
          <Icon name="list-ol" size={screenWidth/20} color="black" />
          <Text style={{fontSize: screenWidth/38, fontFamily:'ExtraBold',}}>My Items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('MyOrders', { ComingFrom: "DiscoverHouses", user_id: user_id, jwtToken : jwtToken}) }}>
          <FontAwesome5 name="house-user" size={screenWidth / 20} color="black" />
            <Text style={{ fontSize: screenWidth / 38, fontFamily: 'ExtraBold', }}>My Orders</Text>
          </TouchableOpacity>
        </View>
      </View>


    </View>


  );
}
