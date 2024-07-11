import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Server } from '../ServerIP';
import jwt_decode from 'jwt-decode';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function MyOrders({route, navigation}) {

     const { user_id, jwtToken} = route.params;

    const [isLoading, setIsLoading] = useState(false);
    const [isText, setIsText] = useState(false);

    //Order Variables
    const [reservation_id, setReservation_id] = useState([]);
    const [nb_persons, setNb_persons] = useState([]);
    const [created_at, setCreatedAt] = useState([]);
    const [start_date, setStart_date] = useState([]);
    const [end_date, setEnd_date] = useState([]);
    const [status, setStatus] = useState([]);
    const [is_payed, setIs_payed] = useState([]);

    //House Variables
    const [house_id, setHouse_id] = useState([]);
    const [house_address, setHouse_address] = useState([]);
    const [house_price, setHouse_price] = useState([]);
    const [house_picture1, setHouse_picture1] = useState([]);
    const [house_picture2, setHouse_picture2] = useState([]);
    const [house_picture3, setHouse_picture3] = useState([]);
    const [house_picture4, setHouse_picture4] = useState([]);

    //Provider Variables
    const [house_owner_first_name, setHouse_Owner_First_Name] = useState([]);
    const [house_owner_picture, setHouse_Owner_Picture] = useState([]);

    const ServerIP = Server;

    useEffect(() =>{
        
        const GetMyOrders = async() =>{

          const FormattedCreationDate = [];
          const FormatedStartDate = [];
          const FormatedEndDate = [];

            try {

                setIsLoading(true);
                
                const response = await fetch("http://"+ServerIP+":3000/GetMyOrders", {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({'user_id' : user_id}),
                });

                const data = await response.json();

                if (data.message === "My Orders Got Successfuly") {
                    console.log(data.message);
                    setIsLoading(false);
                    setReservation_id(data.reservation_id);
                    setNb_persons(data.nb_persons);

                    for (let i = 0; i < data.created_at.length; i++) {
                      const date = new Date(data.created_at[i]);
                      const day = date.getDate();
                      const month = date.toLocaleString('default', { month: 'long' });
                      const year = date.getFullYear();
                      const FrmtCreationDate = `${day} ${month} ${year}`;
                      FormattedCreationDate.push(FrmtCreationDate);
                    }
                    setCreatedAt(FormattedCreationDate);

                    for (let i = 0; i < data.start_date.length; i++) {
                      const date = new Date(data.start_date[i]);
                      const day = date.getDate();
                      const month = date.toLocaleString('default', { month: 'long' });
                      const year = date.getFullYear();
                      const FrmtSratDate = `${day} ${month} ${year}`;
                      FormatedStartDate.push(FrmtSratDate);
                    }
                    setStart_date(FormatedStartDate);

                    for (let i = 0; i < data.end_date.length; i++) {
                      const date = new Date(data.end_date[i]);
                      const day = date.getDate();
                      const month = date.toLocaleString('default', { month: 'long' });
                      const year = date.getFullYear();
                      const FrmtEndDate = `${day} ${month} ${year}`;
                      FormatedEndDate.push(FrmtEndDate);
                    }
                    //  console.log(FormatedEndDate);
                    setEnd_date(FormatedEndDate);
                    setStatus(data.status);
                    setIs_payed(data.is_payed);
                    setHouse_id(data.house_id);
                    setHouse_address(data.house_address);
                    setHouse_price(data.house_price);
                    setHouse_picture1(data.house_picture1);
                    setHouse_picture2(data.house_picture2);
                    setHouse_picture3(data.house_picture3);
                    setHouse_picture4(data.house_picture4);
                    setHouse_Owner_First_Name(data.provider_name);
                    setHouse_Owner_Picture(data.provider_picture);
                    
                } else {

                    console.log(data.message);
                    setIsText(true);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
    
        };

        GetMyOrders();
    },[]);


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
    <View style={{flex:1, height:screenHeight, width:screenWidth}}>

          <View style={{ width: screenWidth, height: 1.6 * screenHeight / 7 }}>
              <View style={{ flexDirection: 'row', marginTop: screenHeight / 9 }}>
                  <View style={{ marginLeft: screenWidth / 20 }}>
                      <Text style={{ fontSize: screenWidth / 12, fontFamily: 'Black' }}>My Orders</Text>
                      <Text style={{ fontFamily: 'Regular', fontSize: screenWidth / 30, textDecorationLine: 'underline', }}>Check Latest</Text>
                  </View>
                  {isLoading ? (
                      <View style={{ marginLeft: screenWidth / 3.5, marginTop: screenHeight/100 }}>
                          <ActivityIndicator size="large" color="#C48F49" />
                      </View>
                  ) : null}
              </View>
          </View>

          <View style={{flex:1, width: screenWidth, height: 4.8 * screenHeight/7}}>

            {reservation_id.length > 0 &&
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: screenHeight/50}}>

                {reservation_id.map((reservationID, reservationIndex) =>(

                <View key={reservationIndex} style={{width: screenWidth, height: screenHeight/4.5, borderWidth: screenWidth/300, borderColor:'#C48F49', borderRadius: screenWidth/40, marginTop: screenHeight/120}}>

                    <View style={{flexDirection: 'row'}}>

                        <View style={{flexDirection:'row', width: screenWidth/2, height: screenHeight/5}}>
                            <View style={{alignItems: 'center', justifyContent: 'center', width: screenWidth/16, height: screenHeight/5}}>
                                
                            <Entypo name="select-arrows" size={screenWidth/12} color="#C48F49" style={{right: screenWidth/90}} />
                                
                            </View>

                            <View style={{alignItems: 'center', justifyContent: 'center', width: screenWidth/2.28, height: screenHeight/5}}>
                                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: screenHeight/200}}>
                                  <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "House", pictureToSee : house_picture1[reservationIndex]});}}>
                                <Image 
                                source={{uri : "http://"+ServerIP+":3000/" + house_picture1[reservationIndex]}}
                                style={{width: screenWidth/2.3, height: screenHeight/5.2, marginTop: screenHeight/250, borderRadius: screenWidth/50}}
                                />
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "House", pictureToSee : house_picture2[reservationIndex]});}}>
                                <Image 
                                source={{uri : "http://"+ServerIP+":3000/" + house_picture2[reservationIndex]}}
                                style={{width: screenWidth/2.3, height: screenHeight/5.2, marginTop: screenHeight/250, borderRadius: screenWidth/50}}
                                />
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "House", pictureToSee : house_picture3[reservationIndex]});}}>
                                <Image 
                                source={{uri : "http://"+ServerIP+":3000/" + house_picture3[reservationIndex]}}
                                style={{width: screenWidth/2.3, height: screenHeight/5.2, marginTop: screenHeight/250, borderRadius: screenWidth/50}}
                                />
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "House", pictureToSee : house_picture4[reservationIndex]});}}>
                                <Image 
                                source={{uri : "http://"+ServerIP+":3000/" + house_picture4[reservationIndex]}}
                                style={{width: screenWidth/2.3, height: screenHeight/5.2, marginTop: screenHeight/250, borderRadius: screenWidth/50}}
                                />
                                  </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </View>
                        <View style={{flexDirection:'column', width: screenWidth/2, height: screenHeight/5}}> 

                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: screenWidth/2, height: screenHeight/20}}>

                            <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>House Id : </Text>
                            <Text style={{fontSize: screenWidth/25, fontFamily:'Black'}}>{house_id[reservationIndex]} </Text>
                        </View>

                        <View style={{flexDirection: 'row', width: screenWidth/2, height: screenHeight/13}}>

                            <View style={{alignItems:'center', justifyContent: 'center', width: screenWidth/3, height: screenHeight/13}}>

                                <Text style={{fontSize: screenWidth/22, fontFamily:'Bold'}}>Owned By :</Text>

                            </View>

                            <View style={{alignItems:'center', justifyContent: 'center', width: screenWidth/6, height: screenHeight/13}}>

                            <Image
                            source={{uri : "http://"+ServerIP+":3000/" + house_owner_picture[reservationIndex]}}
                            style={{ width: screenWidth / 8, height: screenHeight / 17, borderRadius: screenWidth / 5 }}
                            />

                            </View>

                        </View>

                        <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>

                            <TouchableOpacity onPress={() =>{navigation.navigate('MyOrderDetails', {user_id : user_id, jwtToken : jwtToken,
                               house_id: house_id[reservationIndex], house_price: house_price, house_address : house_address[reservationIndex],
                                house_picture1: house_picture1[reservationIndex], house_picture2: house_picture2[reservationIndex],
                                 house_picture3: house_picture3[reservationIndex], house_picture4: house_picture4[reservationIndex],
                                  status: status[reservationIndex], PFirst_name: house_owner_first_name[reservationIndex],
                                  PPicture: house_owner_picture[reservationIndex], created_at: created_at[reservationIndex],
                                  start_date: start_date[reservationIndex], end_date: end_date[reservationIndex],
                                  nb_persons: nb_persons[reservationIndex]})}} style={{alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: '#C48F49', borderRadius: screenWidth / 20, height: screenHeight / 20, width: screenWidth / 2.2}}>
                                <Text style={{fontSize: screenWidth/25, fontFamily:'SemiBold'}}>More Details</Text>
                            </TouchableOpacity>

                        </View>
                        </View>
                    </View>

                </View>
                                    
            ))}
            </ScrollView>

}

          </View>



        

        {/* Footer Section */}

      <View style={{height:0.6*screenHeight/7, alignItems:'center', justifyContent:'center'}}>
        <View style={{position:'absolute', backgroundColor: '#C48F49', borderRadius: screenWidth, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width:screenWidth/1.030, height:screenHeight/15}}>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('Home', {user_id : user_id, jwtToken : jwtToken}) }}>
          <Ionicons name="home" size={screenWidth/20} />
          <Text style={{fontSize: screenWidth/38, fontFamily:'ExtraBold',}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('DiscoverHouses', {ComingFrom : "MyOrders", user_id : user_id, jwtToken : jwtToken}) }}>
        <MaterialCommunityIcons name="offer" size={screenWidth/20} color="black" />
          <Text style={{fontSize: screenWidth/38, fontFamily:'ExtraBold',}}>Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('Favourite', { ComingFrom: "MyOrders", user_id: user_id, jwtToken: jwtToken })}}>
          <Ionicons name="heart" size={screenWidth/20} color="black" />
          <Text style={{fontSize: screenWidth/38, color:'black', fontFamily:'ExtraBold',}}>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => {navigation.navigate('MyListing', {ComingFrom : "MyOrders", user_id : user_id, jwtToken : jwtToken})}}>
          <Icon name="list-ol" size={screenWidth/20} color="black" />
          <Text style={{fontSize: screenWidth/38, fontFamily:'ExtraBold',}}>My Items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} >
          <FontAwesome5 name="house-user" size={screenWidth / 20} color="white" />
            <Text style={{ fontSize: screenWidth / 38, fontFamily: 'ExtraBold', color:"white"}}>My Orders</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    
  );
}
