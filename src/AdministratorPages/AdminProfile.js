import React, { useEffect, useRef, useState} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ScrollView, Animated, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { Server } from '../ServerIP';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function AdminProfile({route, navigation}) {

    const {user_id, jwtToken} = route.params;

   // console.log("Were are in Profile , this is the user id -->", user_id);
   // console.log("Were are in Profile , this is the user JWT -->",jwtToken);

   const decoded = jwt_decode(jwtToken);

   const role = decoded.role;
    // console.log(role);

    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [coverPicture, setCoverPicture] = useState(null);


    const [currentimage, setCurrentImage] = useState(""); // FILTER BY THE CURRENT CLICKED IMAGE
  const [showCard, setShowCard] = useState(false); // CARD THAT ALLOWS THE USER TO UPLOAD OR VIEW A PICTURE
  const fadeAnim = useRef(new Animated.Value(0)).current; // OPACITY ANIMATION FOR THE CARD

    const ServerIP = Server;

    // On Page Launch Getting The User's Profile Content

    useEffect(() => {

        async function GetProfileContent() {
            const response = await fetch("http://" + ServerIP + ":3000/GetProfile", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'role' : role, 'user_id': user_id })
            });

            const data = await response.json();

            // console.log(data);

            if (data.message === "Here Are The User's Informations -->") {
                setFirstname(data.first_name);
                setLastname(data.last_name);
                setEmail(data.email);
                setPhone(data.phone);
                setAddress(data.address);
                if (data.Profile_Picture_Path === null) {
                    setProfilePicture(null);
                } else if (data.Profile_Picture_Path.trim().length > 0) {
                    setProfilePicture("http://" + ServerIP + ":3000/" + data.Profile_Picture_Path);
                }

                if (data.Cover_Picture_Path === null) {
                    setCoverPicture(null);
                } else if (data.Cover_Picture_Path.trim().length > 0) {
                    setCoverPicture("http://" + ServerIP + ":3000/" + data.Cover_Picture_Path);
                }

            } else {
                console.log(data.message);
            }

        }
        GetProfileContent();

          const interval = setInterval(GetProfileContent, 1000);

          return () => clearInterval(interval);

    }, []);


    // Selecting The Profile Picture

    const PickProfilePicture = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                // setChosePicture1(result.assets[0].uri);
                const uri = result.assets[0].uri;
                const fileExtension = uri.split('.').pop();

                // Append new image data to existing FormData object in state
                const ProfileformData = new FormData();
                const timestamp = Date.now();
                ProfileformData.append('ProfileImage', {
                    uri,
                    type: `image/${fileExtension}`,
                    name: `image_${timestamp}.${fileExtension}`,
                });

                ProfileformData.append('user_id', user_id);
                ProfileformData.append('role' , role);

                console.log("initial formData -->", ProfileformData);

                // Inserting The Profile Picture

                const response = await fetch("http://" + ServerIP + ":3000/InsertImages", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: ProfileformData,
                });

                const data = await response.json();
                console.log(data);

            } else {
                console.log("user changed his mind, No Profile Was Selected !!");
            }
        } catch (error) {
            console.log(error);
        }
    };


    // Selecting The Profile Picture

    const PickCoverPicture = async () => {
        console.log("entered");
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                // setChosePicture1(result.assets[0].uri);
                const uri = result.assets[0].uri;
                const fileExtension = uri.split('.').pop();

                // Append new image data to existing FormData object in state
                const CoverformData = new FormData();
                const timestamp = Date.now();
                CoverformData.append('CoverImage', {
                    uri,
                    type: `image/${fileExtension}`,
                    name: `image_${timestamp}.${fileExtension}`,
                });

                CoverformData.append('user_id', user_id);
                CoverformData.append('role' , role);

                console.log("initial formData -->", CoverformData);

                // Inserting The Profile Picture

                const response = await fetch("http://" + ServerIP + ":3000/InsertImages", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: CoverformData,
                });

                const data = await response.json();
                console.log(data);

            } else {
                console.log("user changed his mind, No Cover Was Selected !!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    //handling the logout for user  //LOG OUT SECTION 

    var HandleLogout = async () => {
        try {
            await AsyncStorage.removeItem('jwtToken');
            navigation.navigate('LoginForm'); // or navigate to the home screen
        } catch (error) {
            console.log(error);
        }
    };

      //Card that allows to change or view the photo

  useEffect(() => {
    if (showCard) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [showCard, fadeAnim]);


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
        <View style={{ flex: 1, height: screenHeight, width: screenWidth }}>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ height: screenHeight / 7.5, width: screenWidth }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ marginTop: screenHeight / 18, marginLeft: screenWidth / 10 }} onPress={() => { navigation.navigate('Dashboard', { user_id: user_id, jwtToken: jwtToken }) }}>

                            <Icon name='arrow-left' size={screenWidth / 14} color={'#C48F49'} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginTop: screenHeight / 18, marginRight: screenWidth / 10 }} onPress={() => { navigation.navigate('EditAdminInfos', { user_id: user_id, jwtToken: jwtToken, Fname : first_name, Lname : last_name, Email : email, Phone : phone, Address : address}) }}>

                            <Icon name='pen' size={screenWidth / 17} color={'#C48F49'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={() => { setShowCard(true); setCurrentImage("CoverPic");}}>
                    <ImageBackground
                        source={coverPicture !== null ? { uri: coverPicture } : require('../UserPages/UsrPgsImg/userGrey.png')}
                        style={{ flex: 0.4, height: screenHeight / 3.5, backgroundColor: 'lightgrey' }}
                        resizeMode={'cover'}
                    >

                        <View style={{ top: screenHeight / 6, left: screenWidth / 1.2 }}></View>

                        <View style={{ flex: 0.4, height: screenHeight / 4 }}></View>
                    </ImageBackground>

                </TouchableOpacity>


                <View style={{ top: screenHeight / 90, alignItems: 'center', justifyContent: 'center', }}>

                    <TouchableOpacity onPress={() => { setShowCard(true); setCurrentImage("ProfilePic"); }} style={{ marginRight: screenWidth / 2 }}>
                        <Image
                            source={profilePicture !== null ? { uri: profilePicture } : require('../UserPages/UsrPgsImg/userGrey.png')}
                            style={{ width: screenWidth / 2.4, height: screenHeight / 5, bottom: screenHeight / 8, borderRadius: screenWidth / 5, borderWidth: 3, borderColor: '#C48F49' }}
                        />

                        <View style={{ bottom: screenHeight / 5, right: screenWidth / 16 }}></View>
                    </TouchableOpacity>



                </View>

                <View style={{ marginRight: screenWidth / 2, bottom: screenHeight / 10 }}>
                    <Text style={{ fontFamily: 'Bold', fontSize: screenWidth / 20, textAlign: 'center' }}>
                        {first_name} {last_name}
                    </Text>
                </View>


                <View style={{ height: screenHeight / 2, flex: 1, width: screenWidth }}>

                    <View style={{ marginLeft: screenWidth / 9 }}>

                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="envelope" size={screenWidth / 18} color={'#C48F49'} />
                                <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Black' }}>  Email :</Text>

                            </View>

                            <View style={{ marginTop: screenHeight / 30 }}>
                                <Text style={{ fontFamily: 'Bold', color: 'grey', fontSize: screenWidth / 28 }}>• {email}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: screenHeight / 20, flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="phone" style={{ transform: [{ rotate: '90deg' }] }} size={screenWidth / 18} color={'#C48F49'} />
                                <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Black' }}>  Phone :</Text>


                            </View>
                            <View style={{ marginTop: screenHeight / 30 }}>
                                <Text style={{ fontFamily: 'Bold', color: 'grey', fontSize: screenWidth / 28 }}>• {phone}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: screenHeight / 20, flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="map-pin" size={screenWidth / 18} color={'#C48F49'} />
                                <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Black' }}>  Address :</Text>


                            </View>

                            <View style={{ marginTop: screenHeight / 30 }}>
                                <Text style={{ fontFamily: 'Bold', color: 'grey', fontSize: screenWidth / 28 }}>• {address}</Text>
                            </View>
                        </View>
                    </View>

                </View>

                <TouchableOpacity onPress={HandleLogout} style={{alignItems:'center', paddingBottom: screenHeight/60}}>
                    <View style={{flexDirection:'row'}}>
                <AntDesign name="logout" size={screenWidth/18} color="black" style={{marginRight:screenWidth/30}} />
                    <Text style={{fontSize:screenWidth/22, fontFamily: 'Bold', textDecorationLine:'underline', textDecorationColor:'black'}}>Log Out</Text>
                    </View>
                </TouchableOpacity>


            </ScrollView>

            {showCard && currentimage == "CoverPic" && (
          <TouchableOpacity
            onPress={() => setShowCard(false)}
            style={{ position: 'absolute', height: screenHeight, width: screenWidth }}
          >
            <Animated.View style={[{ height: screenHeight / 8, backgroundColor: '#C48F49', flexDirection: 'row', marginTop: screenHeight / 1.11, marginRight: screenWidth / 10, alignItems: 'center', justifyContent: 'center', left: screenWidth / 21, borderRadius: screenWidth / 30 }, { opacity: fadeAnim }]}>

              <TouchableOpacity style={{ marginRight: screenWidth / 6 }} onPress={() => {navigation.navigate('ViewPicture', {PictureType : "Cover", pictureToSee : coverPicture});}}>
                <Icon name="image" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 25 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'Bold' }}>View Cover Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ left: screenWidth / 20 }} onPress={PickCoverPicture}>
                <Icon name="images" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 18 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'Bold' }}>Upload new Cover Picture</Text>
              </TouchableOpacity>

            </Animated.View>
          </TouchableOpacity>
        )}

        {showCard && currentimage == "ProfilePic" && (
          <TouchableOpacity
            onPress={() => setShowCard(false)}
            style={{ position: 'absolute', height: screenHeight, width: screenWidth }}
          >
            <Animated.View style={[{ height: screenHeight / 8, backgroundColor: '#C48F49', flexDirection: 'row', marginTop: screenHeight / 1.11, marginRight: screenWidth / 10, alignItems: 'center', justifyContent: 'center', left: screenWidth / 21, borderRadius: screenWidth / 30 }, { opacity: fadeAnim }]}>

              <TouchableOpacity style={{ marginRight: screenWidth / 6 }} onPress={() => {navigation.navigate('ViewPicture', {PictureType : "Profile", pictureToSee : profilePicture});}}>
                <Icon name="image" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 25 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'Bold' }}>View Profile Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ left: screenWidth / 20 }} onPress={PickProfilePicture}>
                <Icon name="images" size={24} color="black" style={{ marginBottom: screenHeight / 200, left: screenWidth / 18 }} />
                <Text style={{ width: screenWidth / 4, fontFamily: 'Bold' }}>Upload new Profile Picture</Text>
              </TouchableOpacity>

            </Animated.View>
          </TouchableOpacity>
        )}
        </View>
  );
}
