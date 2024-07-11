import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, MaterialCommunityIcons, FontAwesome5,} from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Server } from '../ServerIP';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function ReservationCard({route, navigation}) {

    const {ComingFrom, user_id, jwtToken, house_id, isFavourite, city, address, description, price, picture_1, picture_2, picture_3, picture_4} = route.params;
  //  console.log('coming from :',ComingFrom);
  //  console.log(isFavourite);

    const [isHouseFavourite, setIsHouseFavourite] = useState(route.params.isFavourite);

  //  console.log(picture_1);
  //  console.log(picture_2);
  //  console.log(picture_3);
  //  console.log(picture_4);

  
      // Costumer's Informations Fillable Variables
      const [cost_first_name, setCost_First_name] = useState([]);
      const [cost_profile_picture, setCost_ProfilePicture] = useState([]);
  
      //Feedback Variables
      const [feedback_id, setFeedback_id] = useState([]);
      const [feedback_content, setFeedbackContent] = useState([]);
      const [feedbackCreationDate, setFeedbackCreationDate] = useState([]);

      //Reply Variables 
      const [IsReplyFound, setIsReplyFound] = useState([]);
      const [reply_id, setReply_id] = useState([]);
      const [replyContent, setReplyContent] = useState([]);
      const [replyCreationDate, setReplyCreationDate] = useState([]);

    
   // Provider's Informations Fillable Variables
   const [provider_id, setProvider_id] = useState([]);
   const [first_name, setFirst_name] = useState([]);
   const [last_name, setLast_name] = useState([]);
   const [email, setEmail] = useState([]);
   const [phone, setPhone] = useState([]);
   const [profile_picture, setProfilePicture] = useState([]);

    const ServerIP = Server;


        // Getting The Feedbacks and Replies's Informations
useEffect(() =>{

  const GetCustomersFeedbacks = async() =>{

    const FormattedFeedbackDate = [];
    const FormattedReplyDate = [];


    try {
      
      const response = await fetch("http://"+ServerIP+":3000/GetCostumersFeedbacks", {

      method: 'POST',
      headers : {'Content-Type' : 'application/json'},
      body: JSON.stringify({'house_id' : house_id}),
      });

      const data = await response.json();

      if (data.message === "Got the Feedbacks for this house..") {
        // console.log(data);
        setCost_First_name(data.first_names);
        setCost_ProfilePicture(data.profile_pictures);
        setFeedback_id(data.feedback_id);
        setFeedbackContent(data.feedback_contents);
        for (let i = 0; i < data.date_feedback_created.length; i++) {            
            const date1 = new Date(data.date_feedback_created[i]);
    
                const day1 = date1.getDate();
                const month1 = date1.toLocaleString('default', { month: 'long' });
                const year1 = date1.getFullYear();
    
                FormattedFeedbackDate.push(`${day1} ${month1} ${year1}`);
        }
        setFeedbackCreationDate(FormattedFeedbackDate);

        setIsReplyFound(data.replyFound);
        setReply_id(data.reply_id);
        setReplyContent(data.reply_content);

        for (let i = 0; i < data.date_reply_created.length; i++) {
            const date2 = new Date(data.date_reply_created[i]);
    
                const day2 = date2.getDate();
                const month2 = date2.toLocaleString('default', { month: 'long' });
                const year2 = date2.getFullYear();
    
                FormattedReplyDate.push(`${day2} ${month2} ${year2}`);
        }
        setReplyCreationDate(FormattedReplyDate);
      } else {
        console.log(data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

  GetCustomersFeedbacks();

}, []);


    // Getting The House Owner's Informations
useEffect(() =>{

  const GetOwnerInfo = async() =>{

    try {
      
      const response = await fetch("http://"+ServerIP+":3000/GetHouseOwner", {

      method: 'POST',
      headers : {'Content-Type' : 'application/json'},
      body: JSON.stringify({'house_id' : house_id}),
      });

      const data = await response.json();

      
      if (data.message === "Owner's Informations Got Successfuly..") {
        console.log(data.message); 
        setProvider_id(data.provider_id);
        setFirst_name(data.first_name);
        setLast_name(data.last_name);
        setEmail(data.email);
        setPhone(data.phone);
        setProfilePicture(data.profile_picture);
      } else {
        console.log(data.message);        
      }

    } catch (error) {
      console.log(error);
    }
  };

  GetOwnerInfo();

}, []);

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

      {/* Bac And Heart Section */}
      <View style={{ width: screenWidth, height: 0.9 * screenHeight / 7 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ marginTop: screenHeight / 15, marginLeft: screenWidth / 10 }} onPress={() => { navigation.navigate(ComingFrom === "Home" ? "Home" : ComingFrom === "Favourite" ? "Favourite" : ComingFrom === "ReservarionCard" ? "ReservarionCard" : "Home", { ComingFrom: "ReservationCard", user_id: user_id, jwtToken: jwtToken }) }}>

            <Icon name='arrow-left' size={screenWidth / 14} color={'#C48F49'} />
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: screenHeight / 15, marginRight: screenWidth / 10 }} onPress={() => {
            if (isHouseFavourite === false) {
              AddToFavourite(house_id);
              setIsHouseFavourite(true);
            } else {
              DeleteFromFavourite(house_id);
              setIsHouseFavourite(false);
            }
          }}>
            <AntDesign name="heart" size={screenWidth / 14} color={isHouseFavourite ? ("#C48F49") : ("lightgrey")} />
          </TouchableOpacity>

        </View>
      </View>

      {/* House Pictures Section */}

      <View style={{ width: screenWidth, height: 2.6 * screenHeight / 7 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: screenWidth / 80 }}>
          <TouchableOpacity >

            <Image
              source={{ uri: picture_1 }}
              style={{ width: screenWidth / 1.02, height: screenHeight / 2.7, borderRadius: screenWidth / 20, marginLeft: screenWidth / 100 }}

            />
          </TouchableOpacity>

          <TouchableOpacity >

            <Image
              source={{ uri: picture_2 }}
              style={{ width: screenWidth / 1.02, height: screenHeight / 2.7, borderRadius: screenWidth / 20, marginLeft: screenWidth / 100 }}

            />
          </TouchableOpacity>

          <TouchableOpacity >

            <Image
              source={{ uri: picture_3 }}
              style={{ width: screenWidth / 1.02, height: screenHeight / 2.7, borderRadius: screenWidth / 20, marginLeft: screenWidth / 100 }}

            />
          </TouchableOpacity>

          <TouchableOpacity >

            <Image
              source={{ uri: picture_4 }}
              style={{ width: screenWidth / 1.02, height: screenHeight / 2.7, borderRadius: screenWidth / 20, marginLeft: screenWidth / 100 }}

            />
          </TouchableOpacity>


        </ScrollView>
      </View>

      {/* Owned By Section */}

      <View style={{ width: screenWidth, height: 0.5 * screenHeight / 7 }}>
        <View style={{ flexDirection: 'row', marginLeft: screenWidth / 30, marginTop: screenHeight / 40 }}>
          <Text style={{ fontSize: screenWidth / 25, fontFamily: 'Bold', }}>Owned By :</Text>
          <Text style={{ fontSize: screenWidth / 20, fontFamily: 'ExtraBold' }}>  {first_name}</Text>
        </View>

        <TouchableOpacity onPress={() => { navigation.navigate('Provider', { user_id: user_id, jwtToken: jwtToken, provider_id: provider_id, first_name: first_name, last_name: last_name, email: email, phone: phone, profile_picture: profile_picture }) }} style={{ marginLeft: screenWidth / 1.5, bottom: screenHeight / 20 }}>
          <Image
            source={profile_picture !== null ? { uri: "http://" + ServerIP + ":3000/" + profile_picture } : require('./UsrPgsImg/userGrey.png')}
            style={{ width: screenWidth / 8, height: screenHeight / 17, borderRadius: screenWidth / 5 }}
          />
        </TouchableOpacity>

      </View>


      {/* Scroll More Infos Section */}

      <View style={{ width: screenWidth, height: 2.6 * screenHeight / 7 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            {/* Location Section */}

            <View style={{ borderRadius: screenWidth / 30, marginLeft: screenWidth / 50, width: screenWidth / 1.5, height: screenHeight / 10, backgroundColor: 'lightgrey' }}>

              <View style={{ marginTop: screenHeight / 150, flexDirection: 'row' }}>

                <View style={{ marginLeft: screenWidth / 60 }}>
                  <Ionicons name="ios-location-outline" size={screenWidth / 15} color="#C48F49" />
                </View>

                <View style={{ marginTop: screenHeight / 150 }}>
                  <Text style={{ fontSize: screenWidth / 35, fontFamily: 'Bold' }}> {city}</Text>
                </View>

              </View>

              <View style={{ marginLeft: screenWidth / 12, bottom: screenHeight / 250, width: screenWidth / 2 }}>
                <Text style={{ fontSize: screenWidth / 40, fontFamily: 'Regular' }}>{address}</Text>
              </View>

            </View>

            <TouchableOpacity onPress={() => { navigation.navigate('MapScreen', { address: address, price: price }) }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: screenWidth / 30, marginLeft: screenWidth / 50, width: screenWidth / 3.5, height: screenHeight / 10, backgroundColor: '#C48F49' }}>


              <View style={{ width: screenWidth / 5 }}>
                <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Regular', color: '#fff' }}>Locate</Text>
              </View>

              <View>
                <Ionicons name="location" size={screenWidth / 18} color="brown" />
              </View>

            </TouchableOpacity>
          </View>

          {/* Description Section */}

          <View style={{ marginTop: screenHeight / 60, borderBottomColor: 'lightgrey', borderBottomWidth: screenWidth / 400, paddingBottom: screenHeight / 60, width: screenWidth }}>

            <View style={{ marginLeft: screenWidth / 40 }}>
              <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Bold', textDecorationLine: 'underline', textDecorationColor: '#C48F49' }}>Description</Text>
            </View>

            <View style={{ marginLeft: screenWidth / 40 }}>
              <Text style={{ fontSize: screenWidth / 32, fontFamily: 'Medium', }}>{description}</Text>
            </View>

          </View>

          {/* Rating Section */}

          <View style={{ borderBottomColor: 'lightgrey', borderBottomWidth: screenWidth / 400, paddingBottom: screenHeight / 60, marginTop: screenHeight / 60, width: screenWidth, height: 0.5 * screenHeight / 7 }}>

            <View style={{ marginLeft: screenWidth / 18, marginTop: screenHeight / 50, flexDirection: 'row', width: screenWidth / 2 }}>
              <Text style={{ color: '#C48F49', fontSize: screenWidth / 20, fontFamily: 'Medium' }}> 4.0 </Text>
              <AntDesign name="star" size={screenWidth / 20} color="#C48F49" />
              <Text style={{ color: '#C48F49', fontSize: screenWidth / 24, fontFamily: 'Medium' }}> (40 reviews) </Text>

            </View>
          </View>

          {/* Reviews Section */}

            {feedback_id.length > 0 &&

          <View style={{ borderBottomColor: 'lightgrey', borderBottomWidth: screenWidth / 400, paddingBottom: screenHeight / 60, marginTop: screenHeight / 60, width: screenWidth }}>

            <View style={{ marginLeft: screenWidth / 40 }}>
              <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Bold', textDecorationLine: 'underline', textDecorationColor: '#C48F49' }}>House Reviews</Text>
            </View>

            {/* Feedback Section */}

              {feedback_id.map((feedbackID, feedback_index) =>(
            <View key={feedback_index} style={{ borderBottomColor: 'grey', borderBottomWidth: screenWidth / 400, marginRight: screenWidth / 5, paddingBottom: screenHeight / 20, flexDirection: 'column', justifyContent: 'space-around' }}>

              <View style={{ paddingTop: screenHeight / 40, flexDirection: 'column' }}>
                <View style={{ bottom: screenHeight / 140, marginLeft: screenWidth / 80, flexDirection: 'row' }}>
                  <Text style={{ fontSize: screenWidth / 25, fontFamily: 'Black' }}> {cost_first_name[feedback_index]} </Text>
                  <MaterialCommunityIcons name="arrow-down-right" size={screenWidth / 15} color="grey" style={{ marginLeft: screenWidth / 50 }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={
                      cost_profile_picture[feedback_index] === null
                        ? require('./UsrPgsImg/userGrey.png')
                        : { uri: "http://" + ServerIP + ":3000/" + cost_profile_picture[feedback_index] }
                    }
                    style={{ width: screenWidth / 8, height: screenHeight / 17, borderRadius: screenWidth / 5 }}
                  />
                  <Text style={{ width: screenWidth / 1.3, marginLeft: screenWidth / 40, fontSize: screenWidth / 26, fontFamily: 'Medium' }}> {feedback_content[feedback_index]} </Text>
                  <Text style={{ width: screenWidth / 1.3, bottom: screenHeight / 30, right: screenWidth / 5, fontSize: screenWidth / 26, color: 'grey', fontFamily: 'Medium', textDecorationLine: 'underline', textDecorationColor: 'black' }}> {feedbackCreationDate[feedback_index]} </Text>
                </View>
              </View>

              {/* Replies Section */}

              {IsReplyFound[feedback_index] !== "notFound" ? (

              <View style={{ marginTop: screenHeight / 40, marginLeft: screenWidth / 10, flexDirection: 'row' }}>
                <Image
                    source={
                      profile_picture === null
                        ? require('./UsrPgsImg/userGrey.png')
                        : { uri: "http://" + ServerIP + ":3000/" + profile_picture}
                    }                     
                    style={{ width: screenWidth / 8, height: screenHeight / 17, borderRadius: screenWidth / 5 }}
                />
                <Text style={{ width: screenWidth / 1.89, marginLeft: screenWidth / 40, fontSize: screenWidth / 26, fontFamily: 'Medium' }}> {replyContent[feedback_index]} </Text>

                <Text style={{ width: screenWidth / 1.3, top: screenHeight / 16, right: screenWidth / 20, fontSize: screenWidth / 26, fontFamily: 'Medium', color: 'grey', textDecorationLine: 'underline', textDecorationColor: 'black' }}> {replyCreationDate[feedback_index]} </Text>
              </View>
              ) : null}

            </View>
               ))}
          </View>

        }
          {/* Price Section */}

          <View style={{ borderBottomColor: 'lightgrey', borderBottomWidth: screenWidth / 400, paddingBottom: screenHeight / 60, marginTop: screenHeight / 60, width: screenWidth }}>

            <View style={{ marginLeft: screenWidth / 40 }}>
              <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Bold', textDecorationLine: 'underline', textDecorationColor: '#C48F49' }}>Price :</Text>
            </View>


            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: screenHeight / 60, width: screenWidth, height: screenHeight / 12 }}>

              <Text style={{ fontSize: screenWidth / 18, fontFamily: 'Black', color: '#C48F49' }}>{price} MAD /per Night</Text>

            </View>
          </View>

        </ScrollView>
      </View>


      {/* Reserve Section */}

      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, width: screenWidth, height: 0.4 * screenHeight / 7 }}>
        <TouchableOpacity onPress={() => { navigation.navigate('VerifyAvailability', { user_id: user_id, provider_id: provider_id, jwtToken: jwtToken, house_id: house_id }) }} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 1.02, height: screenHeight / 18, backgroundColor: '#C48F49', borderRadius: screenWidth / 20 }}>
          <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Verify Availability</Text>
        </TouchableOpacity>
      </View>



    </View>
  );
};


