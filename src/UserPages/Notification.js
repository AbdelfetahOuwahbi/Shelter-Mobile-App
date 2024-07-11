import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Server } from '../ServerIP';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Notification({route, navigation}) {

    const {user_id, jwtToken} = route.params;

  //  console.log("Were are in Notifs , this is the user id -->", user_id);
  //  console.log("Were are in Notifs , this is the user jwt -->", jwtToken);



  const [clickedReceivedNotifs, setClickedReceivedNotifs] = useState(false);
  const [clickedSentNotifs, setClickedSentNotifs] = useState(false);

  //The Number Of Counted Notifications

  const [nbProviderNotifs, setNbProviderNotifs] = useState();
  const [nbCostumerNotifs, setNbCostumerNotifs] = useState();

  //Provider Notification Variables
  const [costumerFirstName, setCostumerFirstName] = useState([]);
  const [costumerLastName, setCostumerLastName] = useState([]);
  const [costumerProfilePicture, setCostumerProfilePicture] = useState([]);
  const [costumerStatus, setCostumerStatus] = useState([]);
  const [costumerStartDate, setCostumerStartDate] = useState([]);
  const [costumerEndDate, setCostumerEndDate] = useState([]);
  const [costumerNbTravelers, setCostumerNbTravelers] = useState([]);
  const [costumerreservationId, setCostumerReservationId] = useState([]);
  const [createdAt, setCreatedAt] = useState([]);
  const [costisLoading, setCostIsLoading] = useState(false);
  const [isNotifClickedByProvider, setIsNotifClickedByProvider] = useState([]);

  //Costumer Notification Variables
  const [providerFirstName, setProviderFirstName] = useState([]);
  const [providerLastName, setProviderLastName] = useState([]);
  const [providerProfilePicture, setProviderProfilePicture] = useState([]);
  const [providerStatus, setProviderStatus] = useState([]);
  const [providerStartDate, setProviderStartDate] = useState([]);
  const [providerEndDate, setProviderEndDate] = useState([]);
  const [providerNbTravelers, setProviderNbTravelers] = useState([]);
  const [providerreservationId, setProviderReservationId] = useState([]);
  const [answeredAt, setAnsweredAt] = useState([]);
  const [provisLoading, setProvIsLoading] = useState(false);
  const [isNotifClickedByCostumer, setIsNotifClickedByCostumer] = useState([]);

  const ServerIP = Server;


  //Counting the provider's notifs

    const CounPNotifs = async() =>{
        try {
            const response = await fetch("http://"+ServerIP+":3000/CountProviderNotifications", {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({'user_id' : user_id}),
            });
    
            const data = await response.json();
    
            if (data.nbNotifications > 0) {
                setNbProviderNotifs(data.nbNotifications);
            } else {
                setNbProviderNotifs(0);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //Counting notifs whenever the page is focused
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', CounPNotifs);

        return () => {
          unsubscribe();
        };
      }, [navigation]);

 


    //Counting the costumer's notifs

        const CounCNotifs = async() =>{
            try {
                const response = await fetch("http://"+ServerIP+":3000/CountCostumerNotifications", {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({'user_id' : user_id}),
                });
        
                const data = await response.json();
        
                if (data.nbNotifications > 0) {
                    setNbCostumerNotifs(data.nbNotifications);
                } else {
                    setNbCostumerNotifs(0);
                }
            } catch (error) {
                console.log(error);
            }
        };
    
//Counting notifs whenever the page is focused
            
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', CounCNotifs);
        
        return () => {
          unsubscribe();
        };
      }, [navigation]);

  //Getting The Provider's Notification

    const GetProviderNotifications = async() =>{

        setProvIsLoading(true);

        setProviderFirstName([]);

        // array to store the dismantling datesCreated
        const Dismantling = [];

        try {
            const response = await fetch("http://"+ServerIP+":3000/GetProviderNotifications", {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({'user_id' : user_id}),
            });

            const data = await response.json();

            if (data.ForProvidermessage === "Some provider notifications were found for this user") {
                console.log(data.ForProvidermessage);

                setProvIsLoading(false);

                setCostumerFirstName(data.costumerFirstNames);
                setCostumerLastName(data.costumerLastNames);
                setCostumerProfilePicture(data.costumerProfilePictures);
                setCostumerStatus(data.costumerStatus);
                setIsNotifClickedByProvider(data.costumerClickedByProvider);
                setCostumerStartDate(data.costumerStartDates);
                setCostumerEndDate(data.costumerEndDates);
                setCostumerNbTravelers(data.costumerNbTravelers);
                setCostumerReservationId(data.costumerReservationsIDS);
                for (let i = 0; i < data.datesCreated.length; i++) {
                    const date = data.datesCreated[i].split("T")[0]
                    const hour = data.datesCreated[i].split("T")[1].split(".")[0]
                    Dismantling.push(`${date} at ${hour}`);
                }
                setCreatedAt(Dismantling);
                
            } else {
                console.log(data.ForProvidermessage);
                setProvIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

        
    //Getting The Costumer's Notification

        const GetCostumerNotifications = async() =>{

            setCostIsLoading(true);

            setCostumerFirstName([]);
    
            // array to store the dismantling datesCreated
            const Dismantling = [];
    
            try {
                const response = await fetch("http://"+ServerIP+":3000/GetCostumerNotifications", {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({'user_id' : user_id}),
                });
    
                const data = await response.json();
    
                if (data.ForCostumermessage === "Some costumer notifications were found for this user") {
                    console.log(data.ForCostumermessage);

                    setCostIsLoading(false);

                    setProviderFirstName(data.providerFirstNames);
                    setProviderLastName(data.providerLastNames);
                    setProviderProfilePicture(data.providerProfilePictures);
                    setProviderStatus(data.providerStatus);
                    setIsNotifClickedByCostumer(data.providerClickedByCostumer);
                    setProviderStartDate(data.providerStartDates);
                    setProviderEndDate(data.providerEndDates);
                    setProviderNbTravelers(data.providerNbTravelers);
                    setProviderReservationId(data.providerReservationsIDS);
                    for (let i = 0; i < data.datesAnswered.length; i++) {
                        const date = data.datesAnswered[i].split("T")[0]
                        const hour = data.datesAnswered[i].split("T")[1].split(".")[0]
                        Dismantling.push(`${date} at ${hour}`);
                    }
                    setAnsweredAt(Dismantling);
                    
                } else {
                    console.log(data.ForCostumermessage);

                    setCostIsLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        };

//Update the click on a notif

const UpdateClickedNotif = async(user, reservationId) =>{

    try {
        const response = await fetch("http://"+ServerIP+":3000/UpdateClickedNotif", {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({'user_id' : user_id, 'user_type' : user, 'reservation_id'  : reservationId}),
        });

        const data = await response.json();

        console.log(data.message);
    } catch (error) {
        console.log(error);
    }
};

// useEffect(() =>{
//     console.log("is costumer notifications clicked ? -->", isNotifClickedByCostumer);
//     console.log("is provider notifications clicked ? -->", isNotifClickedByProvider);


// },[isNotifClickedByProvider, isNotifClickedByCostumer])

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

          {/* Title Notifs Section */}

          <View style={{ width: screenWidth, height: 2 * screenHeight / 7}}>
              <View style={{flexDirection: 'row', marginTop: screenHeight / 9}}>
                <View style={{marginLeft:screenWidth/20}}>
                  <Text style={{ fontSize: screenWidth / 12, fontFamily: 'Black' }}>Notifications</Text>
                  <Text style={{ fontFamily: 'Regular', fontSize: screenWidth / 30, textDecorationLine: 'underline', }}>See Updates</Text>
                </View>
                {provisLoading ? (
                      <View style={{marginLeft:screenWidth/8}}>
                          <ActivityIndicator size="large" color="#C48F49" />
                      </View>
                  ) : costisLoading ? (
                      <View style={{marginLeft:screenWidth/8}}>
                          <ActivityIndicator size="large" color="#C48F49" />
                      </View>
                  ) : null}
              </View>

              <View style={{marginTop:screenHeight/30, flexDirection: 'row', justifyContent:'space-around'}}>
                <TouchableOpacity onPress={() => {GetProviderNotifications(); setClickedReceivedNotifs(true); setClickedSentNotifs(false);}} style={{flexDirection: 'row', alignItems:'center', justifyContent:'center', width:screenWidth/2.3, height:screenHeight/20, borderRadius:screenWidth/50, borderWidth:screenWidth/250, borderColor:'#C48F49', backgroundColor:(clickedReceivedNotifs ? ("#C48F49") : null)}}>
                  { nbProviderNotifs > 0 && <Text style={{fontSize:screenWidth/30, fontFamily:'Bold', color: 'green'}}>({nbProviderNotifs}) </Text>}
                    <Text style={{fontSize:screenWidth/30, fontFamily:'Bold'}}>Received Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {GetCostumerNotifications(); setClickedSentNotifs(true); setClickedReceivedNotifs(false);}} style={{flexDirection: 'row', alignItems:'center', justifyContent:'center', width:screenWidth/2.3, height:screenHeight/20, borderRadius:screenWidth/50, borderWidth:screenWidth/250, borderColor:'#C48F49', backgroundColor:(clickedSentNotifs ? ("#C48F49") : null)}}>
                { nbCostumerNotifs > 0 && <Text style={{fontSize:screenWidth/30, fontFamily:'Bold', color: 'green'}}>({nbCostumerNotifs}) </Text>}
                    <Text style={{fontSize:screenWidth/30, fontFamily:'Bold'}}>Sent Orders</Text>
                </TouchableOpacity>
              </View>

          </View>

          {/* Notifs Section */}
          <View style={{ flex: 1, width: screenWidth, height: 5 * screenHeight / 7 }}>
{costumerFirstName.length > 0 &&
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingBottom: screenHeight / 50 }}>
                    {costumerFirstName.map((first_name, costumerIndex) =>(
                  <TouchableOpacity onPress={() => {navigation.navigate('ProviderResponseOnOrder', {user_id : user_id, jwtToken : jwtToken, costumerFirstName : first_name, costumerLastName : costumerLastName[costumerIndex], costumerProfilePicture : costumerProfilePicture[costumerIndex], reservation_id : costumerreservationId[costumerIndex], status : costumerStatus[costumerIndex], start_date : costumerStartDate[costumerIndex], end_date : costumerEndDate[costumerIndex], nbTravelers : costumerNbTravelers[costumerIndex]});  UpdateClickedNotif("provider", costumerreservationId[costumerIndex]);}} key={costumerIndex} style={{ backgroundColor: (isNotifClickedByProvider[costumerIndex] === 1 ? ("rgba(196, 143, 73, 0.1)") : ('#C48F49')), width: screenWidth / 1.025, height: screenHeight / 6, borderRadius: screenWidth / 50, marginTop: screenHeight / 80 }}>
                        
                      <View style={{ flex: 0.30}}>
                      <View style={{ flexDirection: 'row', justifyContent : 'space-around'}}>
                        <View style={{right:screenWidth/20, flexDirection: 'row' }}>
                          <Image
                source={costumerProfilePicture[costumerIndex] !== null ? {uri : "http://" + ServerIP + ":3000/" + costumerProfilePicture[costumerIndex]} : require('./UsrPgsImg/userGrey.png') }
                style={{ marginTop: screenHeight / 150, marginLeft: screenWidth / 40, height: screenHeight / 20, width: screenWidth / 10, borderRadius: screenWidth / 20 }}
                          />
                          <View style={{ flexDirection: 'row', marginLeft: screenWidth / 30, marginTop: screenHeight / 60 }}>
                              <Text style={{ fontSize: screenWidth / 25, fontFamily: 'Bold' }}> From </Text>
                              <Text style={{ fontSize: screenWidth / 25, fontFamily: 'Black', color: 'black' }}>{first_name}</Text>
                          </View>
                        </View>

                          <View style={{marginLeft: screenWidth/5.5, marginTop:screenHeight/60}}>
                            <Text style={{fontSize:screenWidth/28, fontFamily:'SemiBold', color:(costumerStatus[costumerIndex] === "pending" ? '#fff' : costumerStatus[costumerIndex] === "accepted" ? "green" : costumerStatus[costumerIndex] === "completed" ? "green": "red")}}>● {costumerStatus[costumerIndex]}</Text>
                          </View>
                      </View>
                      </View>
                      <View style={{ flex: 0.50}}>
                      <View style={{ width: screenWidth / 1.18, marginLeft: screenWidth/10, marginTop:screenHeight/100}}>
                          <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Medium' }}>{first_name} {costumerLastName[costumerIndex]} Has made a new order for your house, tap here to see more details...</Text>
                      </View>
                      </View>
                      <View style={{ flex: 0.20}}>
                      <View style={{marginLeft:screenHeight/4.4, marginTop: screenHeight/150}}>
                          <Text style={{ fontSize: screenWidth / 29, fontFamily: 'Regular', color:'black'}}>made : {createdAt[costumerIndex]} </Text>
                      </View>
                      </View>
                        
                  </TouchableOpacity>
                    ))}

              </ScrollView>
                  }

{providerFirstName.length > 0 &&
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingBottom: screenHeight / 50 }}>
                    {providerFirstName.map((first_name, providerIndex) =>(
                  <TouchableOpacity onPress={() => {navigation.navigate('CostumerViewOnOrderResponse', {user_id : user_id, jwtToken : jwtToken,  providerFirstName : first_name, providerLastName : providerLastName[providerIndex], providerProfilePicture : providerProfilePicture[providerIndex], reservation_id : providerreservationId[providerIndex], status : providerStatus[providerIndex], start_date : providerStartDate[providerIndex], end_date : providerEndDate[providerIndex]}); UpdateClickedNotif("costumer", providerreservationId[providerIndex]); }} key={providerIndex} style={{ backgroundColor: (isNotifClickedByCostumer[providerIndex] === 1 ? ("rgba(196, 143, 73, 0.1)") : ('#C48F49')), width: screenWidth / 1.025, height: screenHeight / 6, borderRadius: screenWidth / 50, marginTop: screenHeight / 80 }}>
                        
                      <View style={{ flex: 0.30}}>
                      <View style={{ flexDirection: 'row' }}>
                          <Image
                source={providerProfilePicture[providerIndex] !== null ? {uri : "http://" + ServerIP + ":3000/" + providerProfilePicture[providerIndex]} : require('./UsrPgsImg/userGrey.png') }
                style={{ marginTop: screenHeight / 150, marginLeft: screenWidth / 40, height: screenHeight / 20, width: screenWidth / 10, borderRadius: screenWidth / 20 }}
                          />
                          <View style={{ flexDirection: 'row', marginLeft: screenWidth / 30, marginTop: screenHeight / 60 }}>
                              <Text style={{ fontSize: screenWidth / 25, fontFamily: 'Bold' }}> From </Text>
                              <Text style={{ fontSize: screenWidth / 25, fontFamily: 'Black', color: 'black' }}>{first_name}</Text>
                          </View>

                      </View>
                      </View>
                      <View style={{ flex: 0.50}}>
                      <View style={{ width: screenWidth / 1.18, marginLeft: screenWidth/10, marginTop:screenHeight/100}}>
                      {providerStatus === "refused" || providerStatus === "accepted" ? (
                        <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Medium' }}> {first_name} {providerLastName[providerIndex]} Has {providerStatus[providerIndex]} Your Order, tap here to see more details...  </Text>
                      ) : (
                        <Text style={{ fontSize: screenWidth / 28, fontFamily: 'Medium' }}> The Order That You Made On {first_name} {providerLastName[providerIndex]}'s House Is {providerStatus[providerIndex]}</Text>
                      )}
                      </View>
                      </View>
                      <View style={{ flex: 0.20}}>
                      <View style={{marginLeft:screenHeight/4.8, marginTop: screenHeight/150}}>
                          <Text style={{ fontSize: screenWidth / 29, fontFamily: 'Regular', color:'black'}}>replied : {answeredAt[providerIndex]} </Text>
                      </View>
                      </View>
                        
                  </TouchableOpacity>
                    ))}

              </ScrollView>
                  }
          </View>


      </View>
  );
}
