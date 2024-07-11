import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator, TouchableWithoutFeedback  } from 'react-native';
import { Server } from '../ServerIP';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, FontAwesome5,} from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProviderResponseOnOrder = ({route, navigation}) => {

  const {user_id, jwtToken, costumerFirstName, costumerLastName, costumerProfilePicture, reservation_id, status, start_date, end_date, nbTravelers} = route.params;

  //  console.log("we are in provider's response u_id--->", costumerFirstName);
  //  console.log("we are in provider's response u_id--->", costumerLastName);
  //  console.log("we are in provider's response u_id--->", costumerProfilePicture);

    //Costumer Rest Of Infos
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");

   //House Rest Of Infos
   const [address, setAddress] = useState("");
   const [price, setPrice] = useState("");
   const [type, setType] = useState("");
   const [picture, setPicture] = useState(null);

   const [isAcceptedLoading, setIsAcceptedLoading] = useState(false);
   const [isRefusedLoading, setIsRefusedLoading] = useState(false);

   const ServerIP = Server;

   // Cofirm The Provider's Refusal 
   
   
   const CorfirmRefusal = async() =>{
       
     Alert.alert(
         'Are you sure you want to Refuse This Order?',
         'This Response Will Be Permanent and Cannot be Changed !',
         [
           {
             text: 'Cancel',
             onPress: () => console.log(`Refusal Canceled for This Order..`),
             style: 'cancel',
           },
           { text: 'OK', onPress: () => HandleUpdate("refused") },
         ],
         { cancelable: false }
       );
     };

//update provider response on the database 

const HandleUpdate = async(value) =>{

  value === "accepted" ? setIsAcceptedLoading(true) : setIsRefusedLoading(true);

  try {

      const response = await fetch("http://"+ServerIP+":3000/UpdateProviderResponseOnOrder",{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ProviderResponse : value, reservation_id : reservation_id}),
        });
  
       const data = await response.json();

       if (data.message === "Provider's Response updated successfuly..") {

        value === "accepted" ? setIsAcceptedLoading(false) : setIsRefusedLoading(false);

        console.log(data.message);
        Alert.alert("Success", "Your response Was Sent Successfuly..");
        navigation.navigate('Notification', {user_id : user_id, jwtToken : jwtToken});
       } else {

        value === "accepted" ? setIsAcceptedLoading(false) : setIsRefusedLoading(false);

        console.log(data.message);
        Alert.alert("Oops !!", data.message);
       }

      }catch(error){
        console.log(error);
      }
    }



//Get The Rest Of Costumer's infos 

useEffect(() =>{

  const GetCostumerInfos = async() =>{

    try {
      
      const response = await fetch("http://"+ServerIP+":3000/GetCostumerRestOfInfos", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({reservation_id : reservation_id}),
      });

      const data = await response.json();

      if (data.message === "Rest of infos Gotten Successfuly..") {
        setEmail(data.email);
        setPhone(data.phone);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  GetCostumerInfos();
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
    <View style={{ flex: 1, width: screenWidth, height: screenHeight }}>
      <View style={{ width: screenWidth, height: screenHeight / 7, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ marginTop: screenHeight / 15 }}>
        </View>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', width: screenWidth, height: 5 * screenHeight / 7 }}>
        <View style={{marginBottom:screenHeight/20, width: screenWidth / 1.1, height: screenHeight / 1.2, backgroundColor: 'white', borderRadius: screenWidth / 30, elevation: screenWidth / 40, }}>

          <View style={{ flex: 0.12 }}>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginTop: screenHeight / 80, marginLeft: screenWidth / 30, }}>
                <Image
                  source={costumerProfilePicture !== null ? { uri: "http://" + ServerIP + ":3000/" + costumerProfilePicture } : require('./UsrPgsImg/userGrey.png')}
                  style={{ height: screenHeight / 12, width: screenWidth / 5.8, borderRadius: screenWidth / 10 }}
                />
              </View>
              <View style={{ marginTop: screenHeight / 25, marginLeft: screenWidth / 30, width: screenWidth / 1.5 }}>
                {status === "pending" ? (
                  <Text style={{ fontSize: screenWidth / 24, fontFamily: 'Black' }}>{costumerFirstName} Has Made An Order</Text>
                ) : status === "refused" ? (
                  <Text style={{ fontSize: screenWidth / 24, fontFamily: 'Black', color: 'red' }}>You Refused {costumerFirstName}'s Order</Text>
                ) : status === "accepted" ? (
                  <Text style={{ fontSize: screenWidth / 24, fontFamily: 'Black', color: 'green' }}>You Accepted {costumerFirstName}'s Order</Text>
                ) : status === "expired" ? (
                  <Text style={{ fontSize: screenWidth / 24, fontFamily: 'Black', color: 'red' }}>Late Response, {costumerFirstName}'s Order Is Exipred</Text>
                ) : (
                  <Text style={{ fontSize: screenWidth / 24, fontFamily: 'Black', color: 'green' }}>Finished, {costumerFirstName}'s Order Is Completed</Text>
                )}
              </View>
            </View>

          </View>

          <View style={{ flex: 0.30 }}>

            <View style={{ flex: 0.2, backgroundColor: 'lightgrey' }}>

              <View style={{ alignItems: 'center', marginTop: screenHeight / 80 }}>
                <Text style={{ fontSize: screenWidth / 25, fontFamily: 'Medium' }}>Costumer's Informations : </Text>
              </View>

            </View>

            <View style={{ flex: 1, marginLeft: screenWidth / 20, marginTop: screenHeight / 30, flexDirection: 'column' }}>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Bold' }}>Costumer's First name : </Text>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Black' }}> {costumerFirstName}</Text>
              </View>

              <View style={{ marginTop: screenHeight / 50, flexDirection: 'row' }}>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Bold' }}>Costumer's Last name : </Text>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Black' }}> {costumerLastName}</Text>
              </View>

              <View style={{ marginTop: screenHeight / 50, flexDirection: 'row' }}>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Bold' }}>Costumer's Email : </Text>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Black' }}> {email}</Text>
              </View>

              <View style={{ marginTop: screenHeight / 50, flexDirection: 'row' }}>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Bold' }}>Costumer's Phone : </Text>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Black' }}> {phone}</Text>
              </View>

            </View>


          </View>

          <View style={{ flex: 0.47 }}>

            <View style={{ flex: 0.2, backgroundColor: 'lightgrey' }}>

              <View style={{ alignItems: 'center', marginTop: screenHeight / 80 }}>
                <Text style={{ fontSize: screenWidth / 25, fontFamily: 'Medium' }}>Ordered House Informations : </Text>
              </View>

            </View>

            <View style={{ flex: 1, marginLeft: screenWidth / 20, marginTop: screenHeight / 30, flexDirection: 'column' }}>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Bold' }}>House's Address : </Text>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Black', width:screenWidth/2 }}> {address}</Text>
              </View>

              <View style={{ marginTop: screenHeight / 30, flexDirection: 'row' }}>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Bold' }}>House's Type: </Text>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Black', color:'green' }}> {type}</Text>
              </View>

              <View style={{ marginTop: screenHeight / 50, flexDirection: 'row' }}>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Bold' }}>House's Price : </Text>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Black', color:'green' }}> {price} DH/ per Night</Text>
              </View>

              <View style={{ marginTop: screenHeight / 50, flexDirection: 'row' }}>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Bold' }}>Rent Duration : </Text>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Black', color:'green' }}>{moment(start_date).format('YYYY-MM-DD')} to {moment(end_date).format('YYYY-MM-DD')}</Text>
              </View>

              <View style={{ marginTop: screenHeight / 50, flexDirection: 'row' }}>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Bold' }}>Number Of Travelers : </Text>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Black', color:'green' }}> {nbTravelers} </Text>
              </View>

              <View style={{ marginTop: screenHeight / 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Bold' }}>House's Picture : </Text>

                <TouchableOpacity onPress={() => { navigation.navigate('MyListing', { user_id: user_id, jwtToken: jwtToken }); }} style={{ bottom: screenHeight / 30, marginLeft: screenWidth / 20, }}>
                  <Image
                    source={{ uri: "http://" + ServerIP + ":3000/" + picture }}
                    style={{ height: screenHeight / 12, width: screenWidth / 2.5, borderRadius: screenWidth / 10 }}
                  />
                </TouchableOpacity>

              </View>


            </View>

          </View>

        </View>
      </View>


      {status === "pending" ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, }}>
          <TouchableOpacity onPress={() => { HandleUpdate("accepted") }} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 2.5, height: screenHeight / 18, backgroundColor: 'rgb(21, 184, 36)', borderRadius: screenWidth / 20 }}>
            {isAcceptedLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Accept</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={CorfirmRefusal} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 2.5, height: screenHeight / 18, backgroundColor: 'rgb(235, 49, 14)', borderRadius: screenWidth / 20, marginLeft: screenWidth / 10 }}>
            {isRefusedLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Refuse</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : status === "refused" ? (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
          <TouchableOpacity onPress={() => { navigation.navigate('Home', { user_id: user_id, jwtToken: jwtToken }) }} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 1.2, height: screenHeight / 18, backgroundColor: '#C48F49', borderRadius: screenWidth / 20 }}>
            <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Go Back Home</Text>
          </TouchableOpacity>
        </View>
      ) : status === "accepted" ? (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
          <TouchableOpacity onPress={CorfirmRefusal} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 1.2, height: screenHeight / 18, backgroundColor: 'rgb(235, 49, 14)', borderRadius: screenWidth / 20 }}>
            {isRefusedLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Refuse Order</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : status === "expired" ?(
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
          <TouchableOpacity onPress={() => { navigation.navigate('Home', { user_id: user_id, jwtToken: jwtToken }) }} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 1.2, height: screenHeight / 18, backgroundColor: '#C48F49', borderRadius: screenWidth / 20 }}>
            <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Go Back Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
        <TouchableOpacity onPress={() => { navigation.navigate('Home', { user_id: user_id, jwtToken: jwtToken }) }} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 1.2, height: screenHeight / 18, backgroundColor: '#C48F49', borderRadius: screenWidth / 20 }}>
          <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Lets Find The Next</Text>
        </TouchableOpacity>
      </View>
      )}


    </View>
  );
};

export default ProviderResponseOnOrder;
