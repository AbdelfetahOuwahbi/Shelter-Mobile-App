import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback  } from 'react-native';
import { Server } from '../ServerIP';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, FontAwesome5,} from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CostumerViewOnOrderResponse = ({route, navigation}) => {

    const {user_id, jwtToken, providerFirstName, providerLastName, providerProfilePicture, reservation_id, status, start_date, end_date} = route.params;

  //  console.log("we are in provider's response u_id--->", providerFirstName);
  //  console.log("we are in provider's response u_id--->", providerLastName);
  //  console.log("we are in provider's response u_id--->", providerProfilePicture);

      //Provider Rest Of Infos
      const [email, setEmail] = useState("");
      const [phone, setPhone] = useState("");
      const [id, setId] = useState();
   
      //House Rest Of Infos
      const [address, setAddress] = useState("");
      const [price, setPrice] = useState("");
      const [type, setType] = useState("");
      const [picture, setPicture] = useState(null);

    const ServerIP = Server;


    //Get The Rest Of Provider's infos 

useEffect(() =>{

  const GetProviderInfos = async() =>{

    try {
      
      const response = await fetch("http://"+ServerIP+":3000/GetProviderRestOfInfos", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({reservation_id : reservation_id}),
      });

      const data = await response.json();

      if (data.message === "Rest of infos Gotten Successfuly..") {
        setId(data.id);
        setEmail(data.email);
        setPhone(data.phone);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  GetProviderInfos();
});


//Get The Rest Of Costumer's infos 

useEffect(() =>{

  const GetHouseInfos = async() =>{

    try {
      
      const response = await fetch("http://"+ServerIP+":3000/GetHouseRestOfInfos", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({reservation_id : reservation_id}),
      });

      const data = await response.json();

      if (data.message === "Rest of infos Gotten Successfuly..") {
        setAddress(data.address);
        setPrice(data.price);
        setType(data.type);
        setPicture(data.picture);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  GetHouseInfos();
});

   
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
      <View style={{flex: 1, width:screenWidth, height : screenHeight}}>
        <View style={{width: screenWidth, height:screenHeight/7, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{marginTop: screenHeight/15}}>
            </View>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center', width:screenWidth, height: 5*screenHeight/7}}>
        <View style={{width: screenWidth/1.1, height: screenHeight/1.5, backgroundColor: 'white', borderRadius: screenWidth/30, elevation: screenWidth/40}}>

          
        <View style={{ flex: 0.2 }}>

<View style={{ flexDirection: 'row' }}>
  <TouchableOpacity onPress={() => {navigation.navigate('Provider', {user_id : user_id, jwtToken : jwtToken, provider_id : id, first_name : providerFirstName, last_name : providerLastName, email : email, phone : phone, profile_picture : providerProfilePicture})}} style={{ marginTop: screenHeight / 80, marginLeft: screenWidth / 30, }}>
    <Image
      source={providerProfilePicture !== null ? { uri: "http://" + ServerIP + ":3000/" + providerProfilePicture } : require('./UsrPgsImg/userGrey.png')}
      style={{ height: screenHeight / 12, width: screenWidth / 5.8, borderRadius: screenWidth / 10 }}
    />
  </TouchableOpacity>
  <View style={{ marginTop: screenHeight / 35, marginLeft: screenWidth / 30, width: screenWidth / 1.5 }}>
    {status === "accepted" ? (
      <Text style={{ fontSize: screenWidth / 24, fontFamily: 'Black', color: 'green'}}>{providerFirstName} {providerLastName} Has {status} Your Order</Text>
    ) : status === "refused" ? (
      <Text style={{ fontSize: screenWidth / 24, fontFamily: 'Black', color: 'red' }}>{providerFirstName} {providerLastName} Has {status} Your Order</Text>
    ) : (
      <Text style={{ fontSize: screenWidth / 24, fontFamily: 'Black', color: 'green' }}> This Order Made For {providerFirstName} {providerLastName}'s House Is {status} </Text>
    )}
  </View>
</View>

</View>

<View style={{ flex: 0.8}}>

<View style={{ flex: 0.2, backgroundColor: 'lightgrey' }}>

  <View style={{marginLeft:screenWidth/10, alignItems: 'center', marginTop: screenHeight / 80, width:screenWidth/1.5 }}>
    <Text style={{ fontSize: screenWidth / 25, fontFamily: 'Medium' }}>The Order That You Made Was On This House : </Text>
  </View>

</View>

<View style={{ flex: 1, marginLeft: screenWidth / 20, marginTop: screenHeight / 30, flexDirection: 'column' }}>

  <View style={{ flexDirection: 'row', width: screenWidth/2.2 }}>
    <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Bold'}}>House's address: </Text>
    <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Black', color:'green'}}> {address}</Text>
  </View>

  <View style={{ marginTop: screenHeight / 30, flexDirection: 'row'}}>
    <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Bold' }}>House's type : </Text>
    <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Black', color:'green' }}> {type}</Text>
  </View>

  <View style={{ marginTop: screenHeight / 20, flexDirection: 'row' }}>
    <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Bold' }}>House's price : </Text>
    <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Black', color:'green' }}> {price} DH/ per Night</Text>
  </View>

  <View style={{ marginTop: screenHeight / 20, flexDirection: 'row' }}>
    <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Bold' }}>Rent Duration : </Text>
    <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Black', color:'green' }}>{moment(start_date).format('YYYY-MM-DD')} to {moment(end_date).format('YYYY-MM-DD')}</Text>
  </View>

  <View style={{ marginTop: screenHeight / 20, flexDirection: 'row' }}>
    <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Bold' }}>House's picture : </Text>
    <View style={{marginLeft:screenWidth/20}}>
    <Image
      source={{ uri: "http://" + ServerIP + ":3000/" + picture }}
      style={{ height: screenHeight / 12, width: screenWidth / 2.5, borderRadius: screenWidth / 10 }}
    />
    </View>
  </View>

</View>


</View>

            </View>
      </View>

      {status === "accepted" ? (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1,}}>
        <TouchableOpacity onPress={() => {navigation.navigate('Payment', {user_id : user_id, jwtToken : jwtToken})}} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 1.2, height: screenHeight / 18, backgroundColor: 'rgb(21, 184, 36)', borderRadius: screenWidth / 20 }}>
          <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Pass To Payment</Text>
        </TouchableOpacity>
      </View>
    ) : status === "refused" ? (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1,}}>
      <TouchableOpacity onPress={() => {navigation.navigate('Home', {user_id : user_id, jwtToken : jwtToken})}} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 1.2, height: screenHeight / 18, backgroundColor: '#C48F49', borderRadius: screenWidth / 20 }}>
        <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Find Another House</Text>
      </TouchableOpacity>
    </View>    
    ) : (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1,}}>
      <TouchableOpacity onPress={() => {navigation.navigate('Home', {user_id : user_id, jwtToken : jwtToken})}} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 1.2, height: screenHeight / 18, backgroundColor: '#C48F49', borderRadius: screenWidth / 20 }}>
        <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Go Back Home</Text>
      </TouchableOpacity>
    </View>    
    )}
       

    </View>
  );
};

export default CostumerViewOnOrderResponse;
