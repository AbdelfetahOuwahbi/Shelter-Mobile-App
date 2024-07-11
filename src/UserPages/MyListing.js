import React, {useEffect, useState, useRef} from 'react';
import { Text, View, StyleSheet, Animated, Dimensions, TouchableOpacity, TextInput, Image, ScrollView, ActivityIndicator, Alert, } from 'react-native';
import { Server } from '../ServerIP';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { isLoading, useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default function MyListing({route, navigation}) {

  const {user_id, jwtToken} = route.params;
 // console.log("Were are in ProviderListing , this is the user id -->", user_id);

  const [housepictures1, setHousePictures1] = useState([]);
  const [housepictures2, setHousePictures2] = useState([]);
  const [housepictures3, setHousePictures3] = useState([]);
  const [housepictures4, setHousePictures4] = useState([]);
  const [houseCity, setHouseCity] = useState([]);
  const [houseAddress, setHouseAddresses] = useState([]);
  const [houseDescription, setHouseDescriptions] = useState([]);
  const [housePrice, setHousePrices] = useState([]);
  const [house_id, setHouse_ids] = useState([]);
  const [house_type, setHouse_types] = useState([]);


  const [IsLoading, setISLoading] = useState(false);
  const [IsLoadingForDelete, setISLoadingForDelete] = useState(false);
  const [IsText, setIsText] = useState(false);

  //Card Options for Image Changing

  const [showCard, setShowCard] = useState(false);
  const [currentimage, setCurrentImage] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current; // OPACITY ANIMATION FOR THE CARD

  // Image Changing Placeholders
  const [newpicture1, setNewPicture1] = useState(null);
  const [newpicture2, setNewPicture2] = useState(null);
  const [newpicture3, setNewPicture3] = useState(null);
  const [newpicture4, setNewPicture4] = useState(null);

  const [houseID, setHouseID] = useState('');
  const [picIndex, setPicIndex] = useState('');



  const ServerIP = Server;


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', GetProfilePicture);

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

  //Getting The Current User's Listing (Houses Informations)

  useEffect(() =>{

  const GetProviderListing = async() =>{

    setISLoading(true);
    try {
      const response = await fetch("http://"+ServerIP+":3000/GetMyListing", {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({'user_id' : user_id}),
      });

      const data = await response.json();

      if (data.message === "Houses Informations Got Successfuly For My listing..") {
        console.log(data.message);
        setISLoading(false);
        setHouse_ids(data.houses_ids);
       // console.log("from Backend", data.houses_ids);
        setHouseCity(data.cities);
       // console.log("from Backend", data.cities);
        setHouseAddresses(data.addresses);
       // console.log("from Backend", data.addresses);
        setHousePrices(data.prices);
       // console.log("from Backend", data.prices);
       setHouse_types(data.house_types);
       console.log("from Backend", data.house_types);
        setHouseDescriptions(data.descriptions);
       // console.log("from Backend", data.descriptions);
       setHouseAddresses(data.addresses);
       // console.log("from Backend", data.addresses);
        setHousePictures1(data.pictures_1);
       // console.log("from Backend", data.pictures_1);
        setHousePictures2(data.pictures_2);
       // console.log("from Backend", data.pictures_2);
        setHousePictures3(data.pictures_3);
       // console.log("from Backend", data.pictures_3);
        setHousePictures4(data.pictures_4);
       // console.log("from Backend", data.pictures_4); 
      } else {
        console.log(data.message);
        setISLoading(false);
        setIsText(true);
       // Alert.alert("No Houses Found !!", data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };
  GetProviderListing();

}, []);

//Conferming the House delete

const ConfirmedOrNot = async(house_id) =>{
    
Alert.alert(
    'Confirmation',
    'Are you sure you want to delete this item?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log(`Delete Canceled for ${house_id}..`),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => DeleteHouse(house_id) },
    ],
    { cancelable: false }
  );
};


//Handling The Removal of an House

const DeleteHouse = async(house_id) =>{

    setISLoadingForDelete(true);
     try {
         const response = await fetch("http://"+ServerIP+":3000/DeleteHouse", {
             method: 'POST',
             headers: ({'Content-Type' : 'application/json'}),
             body: JSON.stringify({'user_id' : user_id, 'house_id' : house_id}),
         }); 

         const data = await response.json();

         if (data.message === "House Deleted Successfully...") {            
             console.log(data.message);
             setISLoadingForDelete(false);
             Alert.alert("Removed..", data.message);
             navigation.navigate('Home', {user_id : user_id, jwtToken : jwtToken});
         } else {
            console.log(data.message);
            setISLoadingForDelete(false);
            Alert.alert("OOps..", data.message);
         }
     } catch (error) {
         console.log(error);
     }
};

//Card Animation Part
useEffect(() => {
    if (showCard) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [showCard, fadeAnim]);

      // Change The First House Image

      const ChangeHouseImage1 = async() => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          if (!result.canceled) {
           // setNewPicture1(result.assets[0].uri);
           // console.log(result.assets);
            const uri = result.assets[0].uri;
            const fileExtension = uri.split('.').pop();

            const formData = new FormData();
            const timestamp = Date.now();

            formData.append('picture_1', {
              uri,
              type: `image/${fileExtension}`,
              name: `image_${timestamp}.${fileExtension}`,
            });

            formData.append('house_id', houseID);

            try {
                const response = await fetch("http://"+ServerIP+":3000/ChangeHouseImage",{
                    method: 'POST',
                    header: 'multipart/from-data',
                    body: formData,
                });

                const data = await response.json();

                if (data.message === "Item Picture Updated Successfuly..") {
                    console.log(data.message);
                   // Alert.alert("Success", data.message);
                    navigation.replace('MyListing', {user_id : user_id, jwtToken : jwtToken});
                } else {
                    console.log(data.message);
                    Alert.alert("Oops !!", data.message);
                }
            } catch (error) {
                console.log(error);
            }

          } else {
            console.log("Image4 Was Not Selected !!");
          }
        } catch (error) {
          console.log(error);
        }
      };

            // Change The First House Image

            const ChangeHouseImage2 = async() => {
                try {
                  let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                  });
              
                  if (!result.canceled) {
                   // setNewPicture2(result.assets[0].uri);
                   // console.log(result.assets);
                    const uri = result.assets[0].uri;
                    const fileExtension = uri.split('.').pop();
        
                    const formData = new FormData();
                    const timestamp = Date.now();

                    formData.append('picture_2', {
                      uri,
                      type: `image/${fileExtension}`,
                      name: `image_${timestamp}.${fileExtension}`,
                    });

                    formData.append('house_id', houseID);
        
                    try {
                        const response = await fetch("http://"+ServerIP+":3000/ChangeHouseImage",{
                            method: 'POST',
                            header: 'multipart/from-data',
                            body: formData,
                        });
        
                        const data = await response.json();
        
                        if (data.message === "Item Picture Updated Successfuly..") {
                            console.log(data.message);
                            // Alert.alert("Success", data.message);
                            navigation.replace('MyListing', {user_id : user_id, jwtToken : jwtToken});
                        } else {
                            console.log(data.message);
                            Alert.alert("Oops !!", data.message);
                        }
                    } catch (error) {
                        console.log(error);
                    }
        
                  } else {
                    console.log("Image2 Was Not Selected !!");
                  }
                } catch (error) {
                  console.log(error);
                }
              };

                    // Change The First House Image

      const ChangeHouseImage3 = async() => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          if (!result.canceled) {
           // setNewPicture3(result.assets[0].uri);
           // console.log(result.assets);
            const uri = result.assets[0].uri;
            const fileExtension = uri.split('.').pop();

            const formData = new FormData();
            const timestamp = Date.now();

            formData.append('picture_3', {
              uri,
              type: `image/${fileExtension}`,
              name: `image_${timestamp}.${fileExtension}`,
            });
            formData.append('house_id', houseID);

            try {
                const response = await fetch("http://"+ServerIP+":3000/ChangeHouseImage",{
                    method: 'POST',
                    header: 'multipart/from-data',
                    body: formData,
                });

                const data = await response.json();

                if (data.message === "Item Picture Updated Successfuly..") {
                    console.log(data.message);
                    // Alert.alert("Success", data.message);
                    navigation.replace('MyListing', {user_id : user_id, jwtToken : jwtToken});
                } else {
                    console.log(data.message);
                    Alert.alert("Oops !!", data.message);
                }
            } catch (error) {
                console.log(error);
            }

          } else {
            console.log("Image4 Was Not Selected !!");
          }
        } catch (error) {
          console.log(error);
        }
      };

            // Change The First House Image

            const ChangeHouseImage4 = async() => {
                try {
                  let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                  });
              
                  if (!result.canceled) {
                   // setNewPicture4(result.assets[0].uri);
                   // console.log(result.assets);
                    const uri = result.assets[0].uri;
                    const fileExtension = uri.split('.').pop();
        
                    const formData = new FormData();
                    const timestamp = Date.now();
          
                    formData.append('picture_4', {
                      uri,
                      type: `image/${fileExtension}`,
                      name: `image_${timestamp}.${fileExtension}`,
                    });

                    formData.append('house_id', houseID);
        
                    try {
                        const response = await fetch("http://"+ServerIP+":3000/ChangeHouseImage",{
                            method: 'POST',
                            header: 'multipart/from-data',
                            body: formData,
                        });
        
                        const data = await response.json();

                        if (data.message === "Item Picture Updated Successfuly..") {
                            console.log(data.message);
                            // Alert.alert("Success", data.message);
                            navigation.replace('MyListing', {user_id : user_id, jwtToken : jwtToken});
                        } else {
                            console.log(data.message);
                            Alert.alert("Oops !!", data.message);
                        }
                    } catch (error) {
                        console.log(error);
                    }
        
                  } else {
                    console.log("Image4 Was Not Selected !!");
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
      <View style={{ flex: 1, width: screenWidth, height: screenHeight }}>
          <View style={{ width: screenWidth, height: 0.8 * screenHeight / 7 }}>
          </View>

          <View style={{ width: screenWidth, height: 1.2 * screenHeight / 7 }}>
              <View style={{ marginTop: screenHeight / 60, marginLeft: screenWidth / 20, flexDirection: 'column' }}>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: screenWidth / 15, fontFamily: 'Black', color: '#C48F49' }}>My Houses</Text>
                {IsLoading && <ActivityIndicator style={{ right: screenWidth / 10 }} size="large" color="#C48F49" />}
                {IsLoadingForDelete && <ActivityIndicator style={{ right: screenWidth / 10 }} size="large" color="#C48F49" />}
            </View>

            </View>

          </View>
          <View style={{ width: screenWidth, height: 4.4 * screenHeight / 7, flex: 1 }}>

              {housepictures1.length > 0 &&
                  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: screenHeight / 80 }}>
                      {housepictures1.map((picture, pictureIndex) => (
                          <View key={pictureIndex} style={{ height: screenHeight / 2.5, width: screenWidth / 1.06, marginLeft: screenWidth / 30, borderRadius: screenWidth / 20, borderBottomColor: '#C48F49', borderBottomWidth: screenWidth / 150, borderTopColor: '#C48F49', borderTopWidth: screenWidth / 150, backgroundColor: 'white', marginTop: screenHeight / 80 }}>
                              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: screenWidth / 100 }}>
                                  <TouchableOpacity onPress={() => { setShowCard(true); setCurrentImage("Image1"); setHouseID(house_id[pictureIndex]);}}>
                                      <Image
                                          source={{uri: "http://" + ServerIP + ":3000/" + picture}}
                                          style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                                          resizeMode='contain'
                                      />
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => { setShowCard(true); setCurrentImage("Image2"); setHouseID(house_id[pictureIndex]);}}>
                                      <Image
                                          source={{ uri: "http://" + ServerIP + ":3000/" + housepictures2[pictureIndex] }}
                                          style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                                          resizeMode='contain'
                                      />
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => { setShowCard(true); setCurrentImage("Image3"); setHouseID(house_id[pictureIndex]);}}>
                                      <Image
                                          source={{ uri: "http://" + ServerIP + ":3000/" + housepictures3[pictureIndex] }}
                                          style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                                          resizeMode='contain'
                                      />
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => { setShowCard(true); setCurrentImage("Image4"); setHouseID(house_id[pictureIndex]);}}>
                                      <Image
                                          source={{ uri: "http://" + ServerIP + ":3000/" + housepictures4[pictureIndex] }}
                                          style={{ width: screenWidth / 1.08, height: screenHeight / 4, marginLeft: screenWidth / 120, marginTop: screenHeight / 100, borderRadius: screenWidth / 20 }}
                                          resizeMode='contain'
                                      />
                                  </TouchableOpacity>
                              </ScrollView>

                              <View style={{ flexDirection: 'column' }}>
                                  <View style={{ marginBottom: screenHeight / 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                                      <View style={{ marginLeft: screenWidth / 30, flexDirection: 'row' }}>
                                          <View>
                                              {house_type[pictureIndex] === "room" ?
                                                  (<Ionicons name="md-bed" size={screenWidth / 12} color="#C48F49" />) :
                                                  house_type[pictureIndex] === "see side" ? (<Icon name='water' size={screenWidth / 12} color="#C48F49" />) :
                                                      house_type[pictureIndex] === "pool" ? (<MaterialCommunityIcons name="pool" size={screenWidth / 12} color="#C48F49" />) :
                                                          house_type[pictureIndex] === "riad" ? (<MaterialCommunityIcons name="greenhouse" size={screenWidth / 12} color="#C48F49" />) :
                                                              house_type[pictureIndex] === "cabane" ? (<MaterialCommunityIcons name="hoop-house" size={screenWidth / 12} color="#C48F49" />) :
                                                                  (<MaterialCommunityIcons name="home-assistant" size={screenWidth / 12} color="#C48F49" />
                                                                  )}
                                          </View>
                                          <View style={{ marginTop: screenHeight / 120 }}>
                                              <Text style={{ fontSize: screenWidth / 22, fontFamily: 'Bold' }}>  {house_type[pictureIndex]}</Text>
                                          </View>
                                      </View>

                                      <View style={{ marginTop: screenHeight / 150, marginRight: screenWidth / 30, flexDirection: 'row' }}>
                                          <View style={{ marginTop: screenHeight / 250 }}>
                                              <Text>4.0k </Text>
                                          </View>
                                          <View style={{}}>
                                              <AntDesign name="star" size={screenWidth / 18} color="#C48F49" />
                                          </View>
                                      </View>
                                  </View>


                                  <View style={{ bottom: screenHeight / 50, alignItems: 'center' }}>
                                      <View style={{ width: screenWidth / 1.2, height: screenHeight / 500, backgroundColor: 'lightgrey' }}></View>
                                  </View>

                                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                          <View style={{ flexDirection: 'column', bottom: screenHeight / 150 }}>
                                              <View style={{ flexDirection: 'row', marginLeft: screenWidth / 40, }}>
                                                  <Ionicons name="ios-location-outline" size={screenWidth / 15} style={{ bottom: screenHeight / 150 }} color="#C48F49" />
                                                  <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Medium' }}>{houseCity[pictureIndex]}</Text>
                                              </View>
                                              <Text style={{ marginLeft: screenWidth / 20, fontSize: screenWidth / 35, fontFamily: 'Regular' }}>← Scroll Pictures</Text>
                                          </View>
                                      </View>
                                      <View style={{ flexDirection: 'row' }}>
                                      <TouchableOpacity onPress={() => {navigation.navigate('MyItemDetails', {user_id: user_id, jwtToken: jwtToken, house_id : house_id[pictureIndex], city: houseCity[pictureIndex], address: houseAddress[pictureIndex], description: houseDescription[pictureIndex], price: housePrice[pictureIndex], picture_1: picture, picture_2: housepictures2[pictureIndex], picture_3: housepictures3[pictureIndex], picture_4: housepictures4[pictureIndex]})}} style={{bottom: screenHeight/100, alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: '#C48F49', marginRight: screenWidth/100, borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 5.4 }}>
                                              <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>View Item</Text>
                                          </TouchableOpacity>
                                          <TouchableOpacity onPress={() => { ConfirmedOrNot(house_id[pictureIndex]) }} style={{bottom: screenHeight/100, alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: 'rgb(255, 78, 47)', marginRight: screenWidth/100, borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 5.2 }}>
                                              <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>Delete Item</Text>
                                          </TouchableOpacity>
                                          <TouchableOpacity onPress={() => { navigation.navigate('EditItem', { ComingFrom: "ProviderListing", user_id: user_id, jwtToken: jwtToken, houseId: house_id[pictureIndex], houseCity: houseCity[pictureIndex], houseAddress: houseAddress[pictureIndex], houseDescription: houseDescription[pictureIndex], housePrice: housePrice[pictureIndex], houseType: house_type[pictureIndex], housePicture1: picture, housePicture2: housepictures2[pictureIndex], housePicture3: housepictures3[pictureIndex], housePicture4: housepictures4[pictureIndex] }) }} style={{bottom: screenHeight/100, marginRight: screenWidth / 100, alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: 'rgb(118, 200, 47)', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 5.6 }}>
                                              <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>Edit Item</Text>
                                          </TouchableOpacity>
                                      </View>

                                  </View>

                              </View>
                          </View>
                      ))}

                  </ScrollView>
              }

              {IsText && <Text style={{ marginTop: screenHeight / 3.5, textAlign: 'center', fontSize: screenWidth / 20, fontFamily: 'Medium' }}>You List Is Empty ..</Text>}

          </View>

          {/* Footer Section */}


          <View style={{ height: 0.6 * screenHeight / 7, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ position: 'absolute', backgroundColor: '#C48F49', borderRadius: screenWidth, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: screenWidth / 1.030, height: screenHeight / 15 }}>
                  <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('Home', { user_id: user_id, jwtToken: jwtToken }) }}>
                      <Ionicons name="home" size={screenWidth / 20} />
                      <Text style={{ fontSize: screenWidth / 38, fontFamily: 'ExtraBold', }}>Home</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('DiscoverHouses', { ComingFrom: "MyListing", user_id: user_id, jwtToken: jwtToken }) }}>
                      <MaterialCommunityIcons name="offer" size={screenWidth / 20} color="black" />
                      <Text style={{ fontSize: screenWidth / 38, fontFamily: 'ExtraBold', }}>Offers</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('Favourite', { ComingFrom: "MyListing", user_id: user_id, jwtToken: jwtToken }) }}>
                      <Ionicons name="heart" size={screenWidth / 20} color="black" />
                      <Text style={{ fontSize: screenWidth / 38, fontFamily: 'ExtraBold', }}>Favourite</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }}>
                      <Icon name="list-ol" size={screenWidth / 20} color="white" />
                      <Text style={{ fontSize: screenWidth / 38, color: "white", fontFamily: 'ExtraBold', }}>My Items</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('MyOrders', { ComingFrom: "MyListing", user_id: user_id, jwtToken : jwtToken}) }}>
                  <FontAwesome5 name="house-user" size={screenWidth / 20} color="black" />
                    <Text style={{ fontSize: screenWidth / 38, fontFamily: 'ExtraBold', }}>My Orders</Text>
                  </TouchableOpacity>
              </View>
          </View>

          {showCard && currentimage == "Image1" && (
          <TouchableOpacity
            onPress={() => setShowCard(false)}
            style={{ position: 'absolute', height: screenHeight, width: screenWidth }}
          >
            <Animated.View style={[{width:screenWidth, height: screenHeight / 8, backgroundColor: '#C48F49', flexDirection: 'row', marginTop: screenHeight / 1.11, marginRight: screenWidth / 10, alignItems: 'center', justifyContent: 'center', borderRadius: screenWidth / 30 }, { opacity: fadeAnim }]}>

              <TouchableOpacity style={{ marginRight: screenWidth / 6 }} onPress={{}}>
                <Icon name="image" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 25 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'Black' }}>View Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ left: screenWidth / 20 }} onPress={ChangeHouseImage1}>
                <Icon name="images" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 18 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'Black' }}>Pick new House Picture</Text>
              </TouchableOpacity>

            </Animated.View>
          </TouchableOpacity>
        )}

{showCard && currentimage == "Image2" && (
          <TouchableOpacity
            onPress={() => setShowCard(false)}
            style={{ position: 'absolute', height: screenHeight, width: screenWidth }}
          >
            <Animated.View style={[{width:screenWidth, height: screenHeight / 8, backgroundColor: '#C48F49', flexDirection: 'row', marginTop: screenHeight / 1.11, marginRight: screenWidth / 10, alignItems: 'center', justifyContent: 'center', borderRadius: screenWidth / 30 }, { opacity: fadeAnim }]}>

              <TouchableOpacity style={{ marginRight: screenWidth / 6 }} onPress={{}}>
                <Icon name="image" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 25 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'Black' }}>View Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ left: screenWidth / 20 }} onPress={ChangeHouseImage2}>
                <Icon name="images" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 18 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'Black' }}>Pick new House Picture</Text>
              </TouchableOpacity>

            </Animated.View>
          </TouchableOpacity>
        )}

{showCard && currentimage == "Image3" && (
          <TouchableOpacity
            onPress={() => setShowCard(false)}
            style={{ position: 'absolute', height: screenHeight, width: screenWidth }}
          >
            <Animated.View style={[{width:screenWidth, height: screenHeight / 8, backgroundColor: '#C48F49', flexDirection: 'row', marginTop: screenHeight / 1.11, marginRight: screenWidth / 10, alignItems: 'center', justifyContent: 'center', borderRadius: screenWidth / 30 }, { opacity: fadeAnim }]}>

              <TouchableOpacity style={{ marginRight: screenWidth / 6 }} onPress={{}}>
                <Icon name="image" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 25 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'Black' }}>View Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ left: screenWidth / 20 }} onPress={ChangeHouseImage3}>
                <Icon name="images" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 18 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'Black' }}>Pick new House Picture</Text>
              </TouchableOpacity>

            </Animated.View>
          </TouchableOpacity>
        )}

{showCard && currentimage == "Image4" && (
          <TouchableOpacity
            onPress={() => setShowCard(false)}
            style={{ position: 'absolute', height: screenHeight, width: screenWidth }}
          >
            <Animated.View style={[{width:screenWidth, height: screenHeight / 8, backgroundColor: '#C48F49', flexDirection: 'row', marginTop: screenHeight / 1.11, marginRight: screenWidth / 10, alignItems: 'center', justifyContent: 'center', borderRadius: screenWidth / 30 }, { opacity: fadeAnim }]}>

              <TouchableOpacity style={{ marginRight: screenWidth / 6 }} onPress={{}}>
                <Icon name="image" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 25 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'Black' }}>View Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ left: screenWidth / 20 }} onPress={ChangeHouseImage4}>
                <Icon name="images" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 18 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'Black' }}>Pick new House Picture</Text>
              </TouchableOpacity>

            </Animated.View>
          </TouchableOpacity>
        )}



      </View>
  );
}

