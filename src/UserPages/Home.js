import React, { useRef, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Animated, Dimensions, TouchableOpacity, TextInput, Image, ScrollView, Keyboard, KeyboardAvoidingView, Alert, BackHandler, ActivityIndicator } from 'react-native';
import { Server } from '../ServerIP';
import jwt_decode from 'jwt-decode';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import useFocusEffect from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Home({ route, navigation }) {

  const { user_id, jwtToken } = route.params;

  //  console.log("Were are in Home , this is the user id -->", user_id);
  //  console.log("Were are in Home , this is the user JWT -->",jwtToken);

  const decodedJWT = jwt_decode(jwtToken);

  const first_name = decodedJWT.first_name;
  const role = decodedJWT.role;

  // console.log(role)

  // OnSearch House Informations
  const [search, setSearch] = useState("");
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

  const [Isloading, setIsLoading] = useState(false);

  const [nbNotifications, setNbNotifications] = useState(0);

  // Onlaunch House Informations

  const [lnchhousePicture1, setLnchHousePictures1] = useState([]);
  const [lnchhousePicture2, setLnchHousePictures2] = useState([]);
  const [lnchhousePicture3, setLnchHousePictures3] = useState([]);
  const [lnchhousePicture4, setLnchHousePictures4] = useState([]);
  const [lnchhouseCity, setLnchHouseCity] = useState([]);
  const [lnchhouseAddress, setLnchHouseAddresses] = useState([]);
  const [lnchhouseDescription, setLnchHouseDescriptions] = useState([]);
  const [lnchhousePrice, setLnchHousePrices] = useState([]);
  const [lnchhouse_id, setLnchHouse_ids] = useState([]);
  const [lnchhouse_type, setLnchHouse_types] = useState([]);

    // Check If The House Is Already Liked When Page is First Launched
    const [lnchisFavourite, setLnchIsFavourite] = useState([]);

  const ServerIP = Server;


  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus',() =>{GetNbNotifications(), GetProfilePicture()});

    return () => {
      unsubscribe();
    };
  }, [navigation]);


 const [Profile_Picture, setProfile_Picture] = useState(null);

   
  const GetProfilePicture = async() => {

   try {
     const response = await fetch("http://" + ServerIP + ":3000/GetProfilePictureForUser", {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({'user_id': user_id }),
     });

     const data = await response.json();
        // console.log(data);
          if (data.message === "Image Got Successfuly") {
            console.log(data.message);
            setProfile_Picture(data.Profile_Picture);
          } else {
            console.log(data.message);
          }
      
   } catch (error) {
     console.log(error);
   }       
  };


 // Hidding Footer navigation bar When Keyboard Is Up

 const [isKeyboardVisible, setKeyboardVisible] = useState(false);

 useEffect(() => {
   const keyboardDidShowListener = Keyboard.addListener(
     'keyboardDidShow',
     () => {
       setKeyboardVisible(true);
     }
   );

   const keyboardDidHideListener = Keyboard.addListener(
     'keyboardDidHide',
     () => {
       setKeyboardVisible(false);
     }
   );

   return () => {
     keyboardDidShowListener.remove();
     keyboardDidHideListener.remove();
   };
 }, []);



  //Count All Notifications 

    const GetNbNotifications = async() =>{

      try {
        
        const response = await fetch("http://"+ServerIP+":3000/CountAllNotifications", {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({'user_id' : user_id}),
        });

        const data = await response.json();

        if (data.nbNotifications > 0) {
          setNbNotifications(data.nbNotifications);
        } else {
          setNbNotifications(0);
        }
      } catch (error) {
        console.log(error);
      };
      }

  //Getting The Existed Houses On Page Lauch 

  useEffect(() => {
    const GetHousesOnLaunch = async () => {
      try {
        const response = await fetch("http://" + ServerIP + ":3000/GetHousesOnLaunch", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 'SearchedHouse': "casablanca", 'user_id' : user_id }),
        });

        const data = await response.json();

        if (data.message === "House Informations Got Successfuly..") {
          // console.log("from Backend", data.message);
          setLnchHouse_ids(data.houses_ids);
          //console.log("from Backend", data.houses_ids);
          setLnchHouseCity(data.cities);
          //console.log("from Backend", data.cities);
          setLnchHouseAddresses(data.addresses);
          //console.log("from Backend", data.addresses);
          setLnchHousePrices(data.prices);
          //console.log("from Backend", data.prices);
          setLnchHouse_types(data.house_types);
          //console.log("from Backend", data.house_types);
          setLnchHouseDescriptions(data.descriptions);
          //console.log("from Backend", data.descriptions);
          setLnchHousePictures1(data.pictures_1);
          //console.log("from Backend", data.pictures_1);
          setLnchHousePictures2(data.pictures_2);
          //console.log("from Backend", data.pictures_2);
          setLnchHousePictures3(data.pictures_3);
          //console.log("from Backend", data.pictures_3);
          setLnchHousePictures4(data.pictures_4);
          //console.log("from Backend", data.pictures_4);           
          setLnchIsFavourite(data.is_liked);
          //console.log("from Backend", data.is_liked);
          
        } else {
          console.log(data.message);
          Alert.alert("Ooops, No Data Found", "Try Searching Other Cities..");
        }

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    GetHousesOnLaunch();
  }, []);

  //Getting The Existed Houses By User Search 

  const GetHousesBySearch = async () => {

    setIsLoading(true);

    try {
      const response = await fetch("http://" + ServerIP + ":3000/GetHousesBySearch", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'searchedHouse': search.toLowerCase(), 'user_id' : user_id }),
      });

      const data = await response.json();

      if (data.message === "House Informations Got Successfuly..") {
        // console.log("from Backend", data.message);
        setIsLoading(false);
        setHouse_ids(data.houses_ids);
      //  console.log("from Backend", data.houses_ids);
        setHouseCity(data.cities);
      //  console.log("from Backend", data.cities);
        setHouseAddresses(data.addresses);
      //  console.log("from Backend", data.addresses);
        setHousePrices(data.prices);
      //  console.log("from Backend", data.prices);
        setHouse_types(data.house_types);
      //  console.log("from Backend", data.house_types);
        setHouseDescriptions(data.descriptions);
      //  console.log("from Backend", data.descriptions);
        setHousePictures1(data.pictures_1);
      //  console.log("from Backend", data.pictures_1);
        setHousePictures2(data.pictures_2);
      //  console.log("from Backend", data.pictures_2);
        setHousePictures3(data.pictures_3);
      //  console.log("from Backend", data.pictures_3);
        setHousePictures4(data.pictures_4);
      //  console.log("from Backend", data.pictures_4);      
        setIsFavourite(data.is_liked);
      //  console.log("from Backend", data.is_liked);
        
      } else {
        setIsLoading(false);
        console.log(data.message);
        Alert.alert("Ooops, No Data Found", data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };


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



    // Handle back button press event after the login
    useEffect(() => {
      const handleBackPress = () => {
        if (navigation.isFocused()) {
          BackHandler.exitApp();
          return true;
        }
        return false;
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress
      );
  
      return () => backHandler.remove();
    }, [navigation]);



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

  // console.log("http://"+ServerIP+":3000/"+profile_picture_path)


  return (
    <View style={{ flex: 1, width: screenWidth, height: screenHeight }}>
      <View style={{ width: screenWidth, height: screenHeight / 7 }}>

        <View style={{ flexDirection: 'row', marginTop: screenHeight / 20, marginLeft: screenWidth / 14, justifyContent: 'space-evenly' }}>
          {Profile_Picture !== null ? (
            <TouchableOpacity style={{ marginTop: screenHeight / 100, marginRight: screenWidth / 6 }} onPress={() => { navigation.navigate('Profile', { user_id: user_id, jwtToken: jwtToken }) }}>
              <Image
                source={{uri : "http://" +ServerIP+ ":3000/" + Profile_Picture}}
                style={{ width: screenWidth / 8, height: screenHeight / 17, borderRadius: screenWidth / 5 }}
              />
            </TouchableOpacity>
          ) : (

            <TouchableOpacity style={{ marginTop: screenHeight / 100, marginRight: screenWidth / 6 }} onPress={() => { navigation.navigate('Profile', { user_id: user_id, jwtToken: jwtToken }) }}>
              <Image
                source={require('./UsrPgsImg/userGrey.png')}
                style={{ width: screenWidth / 8, height: screenHeight / 17, borderRadius: screenWidth / 5 }}
              />
            </TouchableOpacity>
          )}



          <View style={{ width: screenWidth / 2, marginTop: screenHeight / 150 }}>
            <Text style={{ fontFamily: 'ExtraBold', fontSize: screenWidth / 25 }}>
              Welcome Again,
            </Text>

            <Text style={{ fontFamily: 'Black', fontSize: screenWidth / 20, color: '#C48F49' }}>
              {first_name}
            </Text>
          </View>

          <TouchableOpacity style={{flexDirection: 'row', marginTop: screenHeight / 60, marginRight: screenWidth / 16 }} onPress={() => navigation.navigate('Notification', {user_id : user_id , jwtToken : jwtToken})}>
            <AntDesign name="bells" size={screenWidth / 14} color="#C48F49" />
            {nbNotifications > 0 &&            
            <View style={{right:screenWidth/25, bottom:screenHeight/150, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(255, 80, 36)', width:screenWidth/18, height:screenHeight/40, borderRadius:screenWidth/10}}>
              <Text style={{fontFamily:'Black', color: '#fff'}}>{nbNotifications}</Text>
            </View>
            }
          </TouchableOpacity>

        </View>

      </View>

      <View style={{ width: screenWidth, height: 0.6 * screenHeight / 7}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderWidth: screenWidth / 300, borderColor: '#fff', marginRight: screenWidth / 22, marginLeft: screenWidth / 25, marginTop: screenHeight / 70, height: screenHeight / 17, borderRadius: screenWidth, backgroundColor: '#fff' }}>

          <View>
            <Icon name='search-location' size={screenWidth / 18} color={'#C48F49'} />
          </View>
          <View style={{ width: screenWidth / 2 }}>
            <TextInput
              style={{ fontSize: screenWidth / 27, fontFamily: 'SemiBold' }}
              placeholder='Search Cities Ex: Rabat ...'
              value={search}
              onChangeText={text => setSearch(text)}
            />
          </View>
          {Isloading ? (
              <ActivityIndicator size="large" color="#C48F49" />
          ) : (
          <TouchableOpacity onPress={GetHousesBySearch}>
            <FontAwesome name="angle-double-right" size={screenWidth / 10} color="#C48F49" />
          </TouchableOpacity>
          )}
        </View>
      </View>

      {/* start scrolling */}

      <View style={{flex:1, height: 4.8 * screenHeight / 7, width: screenWidth, flexDirection: 'column' }}>

        {housePicture1.length > 0 ? (

          <ScrollView showsVerticalScrollIndicator={false} >
            {housePicture1.map((picture, pictureIndex) => (
              <View key={pictureIndex} style={{ height: screenHeight / 2.5, width: screenWidth / 1.06, marginLeft: screenWidth / 30, borderRadius: screenWidth / 20, borderBottomColor: '#C48F49', borderBottomWidth: screenWidth / 150, borderTopColor: '#C48F49', borderTopWidth: screenWidth / 150, backgroundColor: 'white', marginTop: screenHeight / 80 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: screenWidth / 100 }}>
                  <TouchableOpacity>
                    <Image
                      source={{ uri: "http://" + ServerIP + ":3000/" + picture }}
                      style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                      resizeMode='cover'
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={{ uri: "http://" + ServerIP + ":3000/" + housePicture2[pictureIndex] }}
                      style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                      resizeMode='cover'
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={{ uri: "http://" + ServerIP + ":3000/" + housePicture3[pictureIndex] }}
                      style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                      resizeMode='cover'
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={{ uri: "http://" + ServerIP + ":3000/" + housePicture4[pictureIndex] }}
                      style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                      resizeMode='cover'
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
                      <Text style={{fontSize: screenWidth/26, fontFamily:'Medium'}}>4.0k </Text>
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
                  <TouchableOpacity onPress={() => { navigation.navigate('ReservationCard', { ComingFrom: "Home", user_id: user_id, jwtToken: jwtToken, house_id: house_id[pictureIndex], isFavourite : isFavourite[pictureIndex], city: houseCity[pictureIndex], address: houseAddress[pictureIndex], description: houseDescription[pictureIndex], price: housePrice[pictureIndex], house_type : house_type, picture_1: "http://" + ServerIP + ":3000/" + picture, picture_2: "http://" + ServerIP + ":3000/" + housePicture2[pictureIndex], picture_3: "http://" + ServerIP + ":3000/" + housePicture3[pictureIndex], picture_4: "http://" + ServerIP + ":3000/" + housePicture4[pictureIndex] }) }} style={{ marginRight: screenWidth / 30, alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: '#C48F49', borderRadius: screenWidth / 20, height: screenHeight / 24, width: screenWidth / 3 }}>
                    <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>Check it Out</Text>
                  </TouchableOpacity>
                </View>

                </View>

              </View>
            ))}
          </ScrollView>
        ) : lnchhousePicture1.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false} >
            {lnchhousePicture1.map((picture, pictureIndex) => (
              <View key={pictureIndex} style={{ height: screenHeight / 2.5, width: screenWidth / 1.06, marginLeft: screenWidth / 30, borderRadius: screenWidth / 20, borderBottomColor: '#C48F49', borderBottomWidth: screenWidth / 150, borderTopColor: '#C48F49', borderTopWidth: screenWidth / 150, backgroundColor: 'white', marginTop: screenHeight / 80 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: screenWidth / 100 }}>
                  <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "House", pictureToSee : picture});}}>
                    <Image
                      source={{ uri: "http://" + ServerIP + ":3000/" + picture }}
                      style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                      resizeMode='cover'
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "House", pictureToSee : lnchhousePicture2[pictureIndex] });}}>
                    <Image
                      source={{ uri: "http://" + ServerIP + ":3000/" + lnchhousePicture2[pictureIndex] }}
                      style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                      resizeMode='cover'
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "House", pictureToSee : lnchhousePicture3[pictureIndex]});}}>
                    <Image
                      source={{ uri: "http://" + ServerIP + ":3000/" + lnchhousePicture3[pictureIndex] }}
                      style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                      resizeMode='cover'
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "House", pictureToSee : lnchhousePicture4[pictureIndex]});}}>
                    <Image
                      source={{ uri: "http://" + ServerIP + ":3000/" + lnchhousePicture4[pictureIndex] }}
                      style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                      resizeMode='cover'
                    />
                  </TouchableOpacity>
                </ScrollView>

                <View style={{flexDirection: 'column'}}>
                  <View style={{marginBottom:screenHeight/40, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{marginLeft:screenWidth/30, flexDirection : 'row'}}>
                    <View>
                    {lnchhouse_type[pictureIndex] === "room" ? 
                    (<Ionicons name="md-bed" size={screenWidth / 12} color="#C48F49" />):
                    lnchhouse_type[pictureIndex] === "see side" ? (<Icon name='water' size={screenWidth / 12} color="#C48F49" />):
                    lnchhouse_type[pictureIndex] === "pool" ? (<MaterialCommunityIcons name="pool" size={screenWidth / 12} color="#C48F49" />):
                    lnchhouse_type[pictureIndex] === "riad" ? (<MaterialCommunityIcons name="greenhouse" size={screenWidth / 12} color="#C48F49" />):
                    lnchhouse_type[pictureIndex] === "cabane" ? (<MaterialCommunityIcons name="hoop-house" size={screenWidth / 12} color="#C48F49" />):
                    (<MaterialCommunityIcons name="home-assistant" size={screenWidth / 12} color="#C48F49" />
                    )}
                    </View>
                    <View style={{marginTop:screenHeight/120}}>
                      <Text style={{fontSize:screenWidth/22, fontFamily:'Bold'}}>  {lnchhouse_type[pictureIndex]}</Text>
                    </View>
                    </View>

                    <View style={{marginTop:screenHeight/150, marginRight:screenWidth/30, flexDirection: 'row'}}>
                    <View style={{marginTop: screenHeight/250}}>
                      <Text style={{fontSize: screenWidth/26, fontFamily:'Medium'}}>4.0k </Text>
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
                      if (lnchisFavourite[pictureIndex] === false) {
                        AddToFavourite(lnchhouse_id[pictureIndex]);
                      } else {
                        DeleteFromFavourite(lnchhouse_id[pictureIndex]);
                      }
                      setLnchIsFavourite([...lnchisFavourite.slice(0, pictureIndex), !lnchisFavourite[pictureIndex], ...lnchisFavourite.slice(pictureIndex + 1)]);
                    }} style={{ bottom: screenHeight / 100, marginRight: screenWidth / 50 }}>
                      <AntDesign name="heart" size={screenWidth / 15} color={lnchisFavourite[pictureIndex] ? "#C48F49" : "lightgrey"} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'column', bottom: screenHeight / 150, marginLeft: screenWidth / 120 }}>
                      <View style={{ flexDirection: 'row', marginLeft: screenWidth / 40, }}>
                        <Ionicons name="ios-location-outline" size={screenWidth / 15} style={{ bottom: screenHeight / 150 }} color="#C48F49" />
                        <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Medium' }}>{lnchhouseCity[pictureIndex]}</Text>
                      </View>
                      <Text style={{ marginLeft: screenWidth / 20, fontSize: screenWidth / 35, fontFamily: 'Regular' }}>← Scroll Pictures</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => { navigation.navigate('ReservationCard', { ComingFrom: "Home", user_id: user_id, jwtToken: jwtToken, house_id: lnchhouse_id[pictureIndex], isFavourite : lnchisFavourite[pictureIndex], city: lnchhouseCity[pictureIndex], address: lnchhouseAddress[pictureIndex], description: lnchhouseDescription[pictureIndex], price: lnchhousePrice[pictureIndex], house_type : lnchhouse_type, picture_1: "http://" + ServerIP + ":3000/" + picture, picture_2: "http://" + ServerIP + ":3000/" + lnchhousePicture2[pictureIndex], picture_3: "http://" + ServerIP + ":3000/" + lnchhousePicture3[pictureIndex], picture_4: "http://" + ServerIP + ":3000/" + lnchhousePicture4[pictureIndex] }) }} style={{ marginRight: screenWidth / 30, alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: '#C48F49', borderRadius: screenWidth / 20, height: screenHeight / 24, width: screenWidth / 3 }}>
                    <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>Reserve Now</Text>
                  </TouchableOpacity>
                </View>

                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <ScrollView>
            <ActivityIndicator style={{ marginTop: screenHeight / 4 }} size="large" color="#C48F49" />
          </ScrollView>
        )}
      </View>


      {/* Footer Section */}

      {!isKeyboardVisible && (
      <View style={{height: 0.6 * screenHeight / 7, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ position: 'absolute', backgroundColor: '#C48F49', borderRadius: screenWidth, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: screenWidth / 1.030, height: screenHeight / 15 }}>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('Home', {user_id: user_id, jwtToken : jwtToken})}}>
            <Ionicons name="home" size={screenWidth / 20} color="white" />
            <Text style={{ fontSize: screenWidth / 38, color: "white", fontFamily: 'ExtraBold', }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('DiscoverHouses', { ComingFrom: "Home", user_id: user_id, jwtToken : jwtToken}) }}>
            <MaterialCommunityIcons name="offer" size={screenWidth / 20} color="black" />
            <Text style={{ fontSize: screenWidth / 38, fontFamily: 'ExtraBold', }}>Offers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('Favourite', { ComingFrom: "Home" , user_id: user_id, jwtToken : jwtToken}) }}>
            <Ionicons name="heart" size={screenWidth / 20} color="black" />
            <Text style={{ fontSize: screenWidth / 38, fontFamily: 'ExtraBold', }}>Favourite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('MyListing', {user_id: user_id, jwtToken : jwtToken}) }}>
            <Icon name="list-ol" size={screenWidth / 20} color="black" />
            <Text style={{ fontSize: screenWidth / 38, fontFamily: 'ExtraBold', }}>My Items</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('MyOrders', { ComingFrom: "Home", user_id: user_id, jwtToken : jwtToken}) }}>
          <FontAwesome5 name="house-user" size={screenWidth / 20} color="black" />
            <Text style={{ fontSize: screenWidth / 38, fontFamily: 'ExtraBold', }}>My Orders</Text>
          </TouchableOpacity>
        </View>
      </View>
      )}



    </View>


  );
}
