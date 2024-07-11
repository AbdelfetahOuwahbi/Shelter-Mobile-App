import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Server } from '../ServerIP';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Provider = ({route, navigation}) => {

  const {user_id, jwtToken, provider_id, first_name, last_name, email, phone, profile_picture} = route.params;

  console.log(provider_id);

  const ServerIP = Server;
  
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
    <View style={{ flex: 1, width: screenWidth, height: screenHeight, backgroundColor: '#fff'}}>

      {/* Provider's Profile image */}

      <View style={{ width: screenWidth, height: 2.1 * screenHeight / 7 }}>
        <View style={{ marginTop: screenHeight / 5, borderColor: '#C48F49', borderWidth: screenWidth / 250 }}></View>
        <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "Profile", pictureToSee : "http://" + ServerIP + ":3000/" + profile_picture});}} style={{ bottom: screenHeight / 12, marginLeft: screenWidth / 7 }}>
          <Image
                source={profile_picture !== null ? {uri : "http://" + ServerIP + ":3000/" + profile_picture} : require('./UsrPgsImg/userGrey.png') }
                style={{ width: screenWidth / 3.5, height: screenHeight / 7, borderRadius: screenWidth / 5, borderWidth: screenWidth / 250, borderColor: '#C48F49' }}
          />
        </TouchableOpacity>
      </View>

      {/* Provider's Personal Inforamtions */}

      <View style={{ width: screenWidth, height: screenHeight / 1.8 }}>
        <View style={{ alignItems: 'center', flexDirection: 'column' }}>

          <View style={{ height: screenHeight / 15, width: screenWidth / 1.2, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#C48F49', borderTopColor: '#C48F49', borderBottomWidth: screenWidth / 300, borderTopWidth: screenWidth / 300, borderTopRightRadius: screenWidth / 30, borderTopLeftRadius: screenWidth / 30, borderBottomRightRadius: screenWidth / 30, borderBottomLeftRadius: screenWidth / 30, marginTop: screenHeight / 20, flexDirection: 'row' }}>
            <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Bold' }}>Name :</Text>
            <Text style={{ fontSize: screenWidth / 25, fontFamily: 'SemiBold', marginTop: screenHeight / 200 }}>  {first_name} {last_name}</Text>
          </View>
          <View style={{ height: screenHeight / 15, width: screenWidth / 1.2, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#C48F49', borderTopColor: '#C48F49', borderBottomWidth: screenWidth / 300, borderTopWidth: screenWidth / 300, borderTopRightRadius: screenWidth / 30, borderTopLeftRadius: screenWidth / 30, borderBottomRightRadius: screenWidth / 30, borderBottomLeftRadius: screenWidth / 30, marginTop: screenHeight / 15, flexDirection: 'row' }}>
            <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Bold' }}>Email :</Text>
            <Text style={{ fontSize: screenWidth / 25, fontFamily: 'SemiBold', marginTop: screenHeight / 200 }}>  {email}</Text>
          </View>
          <View style={{ height: screenHeight / 15, width: screenWidth / 1.2, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#C48F49', borderTopColor: '#C48F49', borderBottomWidth: screenWidth / 300, borderTopWidth: screenWidth / 300, borderTopRightRadius: screenWidth / 30, borderTopLeftRadius: screenWidth / 30, borderBottomRightRadius: screenWidth / 30, borderBottomLeftRadius: screenWidth / 30, marginTop: screenHeight / 15, flexDirection: 'row' }}>
            <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Bold' }}>Phone :</Text>
            <Text style={{ fontSize: screenWidth / 25, fontFamily: 'SemiBold', marginTop: screenHeight / 200 }}>  {phone}</Text>
          </View>
          <View style={{ height: screenHeight / 15, width: screenWidth / 1.2, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#C48F49', borderTopColor: '#C48F49', borderBottomWidth: screenWidth / 300, borderTopWidth: screenWidth / 300, borderTopRightRadius: screenWidth / 30, borderTopLeftRadius: screenWidth / 30, borderBottomRightRadius: screenWidth / 30, borderBottomLeftRadius: screenWidth / 30, marginTop: screenHeight / 15, flexDirection: 'row' }}>
            <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Bold' }}>Number Of Houses :</Text>
            <Text style={{ fontSize: screenWidth / 25, fontFamily: 'SemiBold', marginTop: screenHeight / 200 }}>  9</Text>
          </View>

        </View>

      </View>

      {/* Contact and See_Listing Buttons */}

      <View style={{ flex: 1 }}>

        <View style={{ marginTop: screenHeight / 30, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {navigation.navigate('Report', {user_id : user_id, jwtToken : jwtToken, provider_id : provider_id, profile_picture : profile_picture})}} style={{ alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: '#C48F49', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 2.2 }}>
            <Text style={{ fontSize: screenWidth / 25, fontFamily: 'ExtraBold', color: 'white' }}>Report Provider</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {navigation.navigate("ProviderListing", {user_id : user_id, jwtToken : jwtToken, provider_id : provider_id, first_name : first_name, last_name : last_name, email : email, phone : phone, profile_picture : profile_picture})}} style={{ alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: '#C48F49', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 2.2 }}>
            <Text style={{ fontSize: screenWidth / 25, fontFamily: 'ExtraBold', color: 'white' }}>Provider's Listing</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
};

export default Provider;
