import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, TextInput, Alert, ScrollView, TouchableWithoutFeedback  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Feather, Foundation, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Server } from '../ServerIP';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function MyItemDetails({route, navigation}) {

    const {user_id, jwtToken, house_id, city, address, description, price, picture_1, picture_2, picture_3, picture_4} = route.params;

  //  console.log(picture_1);
  //  console.log(picture_2);
  //  console.log(picture_3);
  //  console.log(picture_4);

    
   // Provider's Informations Fillable Variables
   const [prov_first_name, setProv_First_name] = useState('');
   const [prov_profile_picture, setProv_ProfilePicture] = useState(null);

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

      //Add Reply Variables

      const [myReply, setMyReply] = useState('');

      // Edit Reply Variables

      const [toEdit, setToEdit] = useState([]);
      const [myNewReply, setMyNewReply] = useState('');

    const ServerIP = Server;


    // Getting The Feedbacks and Replies's Informations
useEffect(() =>{

  const GetCustomersFeedbacks = async() =>{

    const FormattedFeedbackDate = [];
    const FormattedReplyDate = [];
    //to specify the reply to edit
    const toEditBooleanArray = [];

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

        for (let i = 0; i < data.replyFound.length; i++) {
            toEditBooleanArray.push(false);
        }
        setToEdit(toEditBooleanArray);
      } else {
        console.log(data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

  GetCustomersFeedbacks();

}, []);


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
           // console.log(data.message); 
            setProv_First_name(data.first_name);
            setProv_ProfilePicture(data.profile_picture);
          } else {
            console.log(data.message);        
          }
    
        } catch (error) {
          console.log(error);
        }
      };
    
      GetOwnerInfo();
}, []);


const AddReply = async(feedback_ID) =>{

    if (!myReply) {

      Alert.alert("Reply Is Empty!!", "Please add a reply and try again")
      
    } else {

      try {
  
        const response = await fetch("http://"+ServerIP+":3000/AddReply", {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({'feedback_id' : feedback_ID, 'user_id' : user_id, 'reply_content' : myReply}),
        });
  
        const data = await response.json();
  
        if (data.message === "Your Reply Was Inserted Successfuly..") {
          console.log(data.message);
          navigation.replace('MyItemDetails', {user_id : user_id, jwtToken : jwtToken, house_id: house_id, city: city,
          address: address, description: description, price: price, picture_1: picture_1, picture_2: picture_2, picture_3: picture_3, picture_4: picture_4});
        } else {
          console.log(data.message);
          Alert.alert("Oops!!", "There Was An Error Sending Your Reply, please try again");
        }
      } catch (error) {
        console.log(error);
      }
    };

  };


  const EditReply = async(ReplyID, replyCntnt) =>{

    try {

      const response = await fetch("http://"+ServerIP+":3000/EditReply", {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({'reply_id' : ReplyID, 'reply_content' : replyCntnt}),
      });

      const data = await response.json();

      if (data.message === "Your Reply Was Updated Successfuly..") {
        console.log(data.message);
        navigation.replace('MyItemDetails', {user_id : user_id, jwtToken : jwtToken, house_id: house_id, city: city,
        address: address, description: description, price: price, picture_1: picture_1, picture_2: picture_2, picture_3: picture_3, picture_4: picture_4});
      } else {
        console.log(data.message);
        Alert.alert("Oops!!", "There Was An Error Updating Your Reply, please try again");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const DeleteReply = async(ReplyID) =>{

    try {

      const response = await fetch("http://"+ServerIP+":3000/DeleteReply", {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({'reply_id' : ReplyID}),
      });

      const data = await response.json();

      if (data.message === "Reply Deleted Successfuly..") {
        console.log(data.message);
        navigation.replace('MyItemDetails', {user_id : user_id, jwtToken : jwtToken, house_id: house_id, city: city,
            address: address, description: description, price: price, picture_1: picture_1, picture_2: picture_2, picture_3: picture_3, picture_4: picture_4});
      } else {
        console.log(data.message);
        Alert.alert("Oops!!", "There Was An Error Deleting Your Reply, please try again");
      }
    } catch (error) {
      console.log(error);
    
  };

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
                  <TouchableOpacity style={{ marginTop: screenHeight / 15, marginLeft: screenWidth / 10 }} onPress={() => { navigation.navigate('MyListing', { user_id: user_id, jwtToken: jwtToken }) }}>

                      <Icon name='arrow-left' size={screenWidth / 14} color={'#C48F49'} />
                  </TouchableOpacity>

              </View>
          </View>

          {/* House Pictures Section */}

          <View style={{ width: screenWidth, height: 2.6 * screenHeight / 7 }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: screenWidth / 80 }}>
                  <TouchableOpacity >

                      <Image
                          source={{ uri: "http://" + ServerIP + ":3000/" + picture_1 }}
                          style={{ width: screenWidth / 1.02, height: screenHeight / 2.7, borderRadius: screenWidth / 20, marginLeft: screenWidth / 100 }}

                      />
                  </TouchableOpacity>

                  <TouchableOpacity >

                      <Image
                          source={{ uri: "http://" + ServerIP + ":3000/" + picture_2 }}
                          style={{ width: screenWidth / 1.02, height: screenHeight / 2.7, borderRadius: screenWidth / 20, marginLeft: screenWidth / 100 }}

                      />
                  </TouchableOpacity>

                  <TouchableOpacity >

                      <Image
                          source={{ uri: "http://" + ServerIP + ":3000/" + picture_3 }}
                          style={{ width: screenWidth / 1.02, height: screenHeight / 2.7, borderRadius: screenWidth / 20, marginLeft: screenWidth / 100 }}

                      />
                  </TouchableOpacity>

                  <TouchableOpacity >

                      <Image
                          source={{ uri: "http://" + ServerIP + ":3000/" + picture_4 }}
                          style={{ width: screenWidth / 1.02, height: screenHeight / 2.7, borderRadius: screenWidth / 20, marginLeft: screenWidth / 100 }}

                      />
                  </TouchableOpacity>


              </ScrollView>
          </View>

          {/* Scroll More Infos Section */}

          <View style={{ flex: 1 }}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: screenHeight / 100, paddingBottom: screenHeight / 20 }}>
                  <View style={{ borderBottomColor: 'lightgrey', borderBottomWidth: screenWidth / 400, paddingBottom: screenHeight / 60, flexDirection: 'row', alignItems: 'center' }}>

                      {/* Location Section */}

                      <View style={{ borderRadius: screenWidth / 30, marginLeft: screenWidth / 50, width: screenWidth / 1.5, height: screenHeight / 10, backgroundColor: 'lightgrey' }}>

                          <View style={{ marginTop: screenHeight / 100, flexDirection: 'row' }}>

                              <View style={{ marginLeft: screenWidth / 60 }}>
                                  <Ionicons name="ios-location-outline" size={screenWidth / 15} color="#C48F49" />
                              </View>

                              <View style={{ marginTop: screenHeight / 150 }}>
                                  <Text style={{ fontSize: screenWidth / 30, fontFamily: 'Bold' }}> {city}</Text>
                              </View>

                          </View>

                          <View style={{ marginLeft: screenWidth / 12, bottom: screenHeight / 250, width: screenWidth / 2 }}>
                              <Text style={{ fontSize: screenWidth / 35, fontFamily: 'Regular' }}>{address}</Text>
                          </View>

                      </View>

                  </View>

                  {/* Description Section */}

                  <View style={{ borderBottomColor: 'lightgrey', borderBottomWidth: screenWidth / 400, paddingBottom: screenHeight / 60, marginTop: screenHeight / 60, width: screenWidth }}>

                      <View style={{ marginLeft: screenWidth / 40 }}>
                          <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Bold', textDecorationLine: 'underline', textDecorationColor: '#C48F49' }}>Description</Text>
                      </View>

                      <View style={{ marginLeft: screenWidth / 40 }}>
                          <Text style={{ fontSize: screenWidth / 32, fontFamily: 'Medium', }}>{description}</Text>
                      </View>

                  </View>

                  {/* Rating Section */}

                  <View style={{ borderBottomColor: 'lightgrey', borderBottomWidth: screenWidth / 400, paddingBottom: screenHeight / 60, marginTop: screenHeight / 60, width: screenWidth }}>

                      <View style={{ marginLeft: screenWidth / 40 }}>
                          <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Bold', textDecorationLine: 'underline', textDecorationColor: '#C48F49' }}>House Rate</Text>
                      </View>

                      <View style={{ marginLeft: screenWidth / 18, marginTop: screenHeight / 50, flexDirection: 'row', width: screenWidth / 2 }}>
                          <Text style={{ color: '#C48F49', fontSize: screenWidth / 20, fontFamily: 'Medium' }}> 4.0 </Text>
                          <AntDesign name="star" size={screenWidth / 20} color="#C48F49" />
                          <Text style={{ color: '#C48F49', fontSize: screenWidth / 24, fontFamily: 'Medium' }}> (70 reviews) </Text>
                      </View>

                  </View>

                  {/* Price Section */}

                  <View style={{ borderBottomColor: 'lightgrey', borderBottomWidth: screenWidth / 400, paddingBottom: screenHeight / 60, marginTop: screenHeight / 60, width: screenWidth }}>

                      <View style={{ marginLeft: screenWidth / 40 }}>
                          <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Bold', textDecorationLine: 'underline', textDecorationColor: '#C48F49' }}>House Price</Text>
                      </View>

                      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: screenHeight / 60, width: screenWidth, height: screenHeight / 12 }}>

                          <Text style={{ fontSize: screenWidth / 18, fontFamily: 'Black', color: '#C48F49' }}>{price} MAD /per Night</Text>

                      </View>

                  </View>

                  {/* Reviews Section */}

          {feedback_id.length > 0 &&
              <View style={{ borderBottomColor: 'lightgrey', borderBottomWidth: screenWidth / 400, paddingBottom: screenHeight / 60, marginTop: screenHeight / 60, width: screenWidth }}>
                  <View style={{ marginLeft: screenWidth / 40 }}>
                      <Text style={{ fontSize: screenWidth / 20, fontFamily: 'Bold', textDecorationLine: 'underline', textDecorationColor: '#C48F49' }}>House Reviews</Text>
                  </View>

          {feedback_id.map((feedbackID, feedback_index) => (

              <View key={feedback_index} style={{ marginTop: screenHeight / 40 }}>

                  {/* Feedback */}

                  <View style={{ borderBottomColor: 'grey', borderBottomWidth: screenWidth / 400, marginRight: screenWidth / 5, paddingBottom: screenHeight / 20, flexDirection: 'column', justifyContent: 'space-around' }}>

                      <View style={{ paddingTop: screenHeight / 40, flexDirection: 'column' }}>
                          <View style={{ bottom: screenHeight / 140, marginLeft: screenWidth / 80, flexDirection: 'row' }}>
                              <Text style={{ fontSize: screenWidth / 25, fontFamily: 'Black' }}> {cost_first_name[feedback_index]} </Text>
                              <MaterialCommunityIcons name="arrow-down-right" size={screenWidth / 15} color="grey" style={{ marginLeft: screenWidth / 50 }} />
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                              <Image
                                  source={{ uri: "http://" + ServerIP + ":3000/" + cost_profile_picture[feedback_index] }}
                                  style={{ width: screenWidth / 8, height: screenHeight / 17, borderRadius: screenWidth / 5 }}
                              />
                              <Text style={{ width: screenWidth / 1.3, marginLeft: screenWidth / 40, fontSize: screenWidth / 26, fontFamily: 'Medium' }}> {feedback_content[feedback_index]} </Text>
                              <Text style={{ width: screenWidth / 1.3, bottom: screenHeight / 30, right: screenWidth / 5, fontSize: screenWidth / 26, color: 'grey', fontFamily: 'Medium', textDecorationLine: 'underline', textDecorationColor: 'black' }}> {feedbackCreationDate[feedback_index]} </Text>
                          </View>
                      </View>

                      {/* Reply */}

                      {IsReplyFound[feedback_index] !== "notFound" && toEdit[feedback_index] === false ? (

                          <View style={{ marginTop: screenHeight / 40, marginLeft: screenWidth / 10, flexDirection: 'row' }}>
                              <Image
                                  source={{ uri: "http://" + ServerIP + ":3000/" + prov_profile_picture }}
                                  style={{ width: screenWidth / 8, height: screenHeight / 17, borderRadius: screenWidth / 5 }}
                              />
                              <Text style={{ width: screenWidth / 1.89, marginLeft: screenWidth / 40, fontSize: screenWidth / 26, fontFamily: 'Medium' }}> {replyContent[feedback_index]} </Text>

                              <View style={{ flexDirection: 'row' }}>
                                  <TouchableOpacity onPress={() => { DeleteReply(reply_id[feedback_index]) }}>
                                      <AntDesign name="delete" size={screenWidth / 18} color="grey" style={{ left: screenWidth/80 }} />
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => { setToEdit([...toEdit.slice(0, feedback_index), true, ...toEdit.slice(feedback_index + 1)]); }}>
                                      <Feather name="edit-3" size={screenWidth / 18} color="grey" style={{ left: screenWidth/20 }}/>
                                  </TouchableOpacity>
                              </View>
                              <Text style={{ width: screenWidth / 1.3, top: screenHeight / 16, right: screenWidth / 6, fontSize: screenWidth / 26, fontFamily: 'Medium', color: 'grey', textDecorationLine: 'underline', textDecorationColor: 'black' }}> {replyCreationDate[feedback_index]} </Text>
                          </View>
                      ) : IsReplyFound[feedback_index] !== "notFound" && toEdit[feedback_index] === true ? (
                          <View style={{ marginLeft: screenWidth / 6, marginTop: screenHeight / 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                              <TextInput
                                  style={{ width: screenWidth / 1.45, fontSize: screenWidth / 27, fontFamily: 'SemiBold' }}
                                  placeholder='Edit Your Reply ...'
                                  value={replyContent[feedback_index]}
                                  onChangeText={text => setReplyContent([...replyContent.slice(0, feedback_index), (text), ...replyContent.slice(feedback_index + 1)])}
                                  multiline={true}
                              />
                              <TouchableOpacity onPress={() => { EditReply(reply_id[feedback_index], replyContent[feedback_index]) }}>
                                  <Ionicons name="send" size={screenWidth / 15} color="black" style={{ left: screenWidth / 20 }} />
                              </TouchableOpacity>
                          </View>
                      ) : (
                          <View style={{ marginLeft: screenWidth / 6, marginTop: screenHeight / 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                              <TextInput
                                  style={{ width: screenWidth / 1.45, fontSize: screenWidth / 27, fontFamily: 'SemiBold' }}
                                  placeholder='Reply To This Comment ...'
                                  value={myReply}
                                  onChangeText={text => setMyReply(text)}
                                  multiline={true}
                              />
                              <TouchableOpacity onPress={() => { AddReply(feedback_id[feedback_index]) }}>
                                  <Ionicons name="send" size={screenWidth / 15} color="black" style={{ left: screenWidth / 20 }} />
                              </TouchableOpacity>
                          </View>
                      )}
                  </View>



              </View>

          ))}
      </View>
  }


      </ScrollView>
  </View>



      </View>
  );
};


