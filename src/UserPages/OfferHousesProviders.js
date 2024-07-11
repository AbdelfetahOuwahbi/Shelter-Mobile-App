import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Server } from '../ServerIP';
import jwt_decode from 'jwt-decode';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function OfferHousesProviders({route, navigation}) {

    const {house_type, user_id, jwtToken} = route.params;

    
   // Provider's Informations Fillable Variables
   const [userid, setUserid] = useState([]);
   const [first_name, setFirst_name] = useState([]);
   const [last_name, setLast_name] = useState([]);
   const [email, setEmail] = useState([]);
   const [phone, setPhone] = useState([]);
   const [profile_picture, setProfilePicture] = useState([]);

   const ServerIP = Server;

    const [IsLoading, setIsLoading] = useState(false);
    const [IsText, setIsText] = useState(false);

         //GETTING THE Poviders Of This Type Of Houses 
         useEffect(() =>{

          setIsLoading(true);
  
          const GetBestHouseOffersProviders = async() =>{
      
            try {
              const response = await fetch("http://"+ServerIP+":3000/GetAllHouseOffersProviders", {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({'houseType' : house_type}),
              });
      
              const data = await response.json();
      
              if (data.message === `Users informations for ${house_type} got successfuly..`) {
                console.log(data.message);
                setIsLoading(false);
  
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
                setIsLoading(false);
                setIsText(true);
              }
            } catch (error) {
              console.log(error);
            }
          }
      
          GetBestHouseOffersProviders();
         }, []);

  return (
    <View style={{flex:1, width: screenWidth, height: screenHeight}}>
        <View style={{alignItems:'center', justifyContent: 'center', width:screenWidth, height: screenHeight/6}}>
          <View style={{marginTop:screenHeight/30}}>
            <Text style={{fontSize:screenWidth/15, fontFamily: 'Black', color: '#C48F49'}}>Best {house_type} Providers</Text>
          </View>
        </View>
        <View style={{alignItems: 'center', flex : 1}}>
           {first_name.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: screenHeight/60}}>

              {first_name.map((First_name, userIndex) =>(

            <TouchableOpacity key={userIndex} onPress={() => {navigation.navigate('Provider', {user_id : user_id, jwtToken : jwtToken, provider_id : userid[userIndex], first_name : First_name, last_name : last_name[userIndex], email : email[userIndex], phone : phone[userIndex], profile_picture : profile_picture[userIndex]})}}>
            <View style={{alignItems:'center', height: screenHeight / 3.2, width: screenWidth / 1.5, marginTop: screenHeight / 70, borderRadius: screenWidth / 20, backgroundColor: '#fff', borderBottomColor: '#C48F49', borderBottomWidth: screenWidth / 150, borderTopColor: '#C48F49', borderTopWidth: screenWidth / 150, }}>
              <Image
                source={profile_picture[userIndex] !== null ? {uri : "http://" + ServerIP + ":3000/" + profile_picture[userIndex]} : require('./UsrPgsImg/userGrey.png') }
                style={{ width: screenWidth / 2.8, height: screenHeight / 5.8, marginTop: screenHeight / 120, borderRadius: screenWidth }}
              />
              <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Black', marginTop: screenHeight / 50, color: 'black' }}>{First_name} {last_name[userIndex]}</Text>
              <View style={{alignItems:'center', marginTop:screenHeight/120, flexDirection:'row'}}>
              <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Bold', marginTop: screenHeight / 100, color: '#C48F49' }}>5.0 </Text>
              <AntDesign name="star" size={screenWidth/18} color="#C48F49" />
              <Text style={{ fontSize: screenWidth / 32, fontFamily: 'Medium', marginTop: screenHeight / 100, color: 'grey' }}> (Top rated for {house_type} house)</Text>
              </View>
            </View>
          </TouchableOpacity>
              ))}
            </ScrollView>
           ) : IsText ? (
<View style={{marginLeft:screenWidth/50, marginTop:screenHeight/3}}>
  <Text style={{fontSize: screenWidth / 20, fontFamily: 'Medium', textAlign:'center'}}>No Provider Results For {house_type}</Text>
  </View>
           ) : IsLoading ? (
            <ActivityIndicator style={{marginLeft:screenWidth/50, marginTop:screenHeight/3}} size="large" color="#C48F49" />
           ) : null}

        </View>
    </View>
  );
}
