import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback, Alert  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, Feather, FontAwesome5,} from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Server } from '../ServerIP';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function MyOrderDetails({route, navigation}) {


    const {user_id, jwtToken, house_id, house_price, house_address, house_picture1, house_picture2, house_picture3, house_picture4, status, PFirst_name, PPicture, created_at, start_date, end_date, nb_persons} = route.params;

    console.log(user_id, jwtToken, house_id, house_price, house_address, house_picture1, house_picture2, house_picture3, house_picture4, status, PFirst_name, PPicture, created_at, start_date, end_date, nb_persons);

    //Add Feedback Variables
    const [feedback, setFeedback] = useState('');

    //Get My Feedback Variables
    const [myFeedbackID, setMyFeedbackID] = useState(0);
    const [myFeedback, setMyFeedback] = useState('');
    const [myPicture, setMyPicture] = useState('');
    const [dateFeedbackCreation, setDateFeedbackCreation] = useState('');

    const [toEdit, setToEdit] = useState(false);

    const ServerIP = Server;

    useEffect(() => {

      const GetMyFeedbacks = async() =>{

        try {
    
          const response = await fetch("http://"+ServerIP+":3000/GetMyFeedbacks", {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({'user_id' : user_id, 'house_id' : house_id}),
          });
    
          const data = await response.json();
    
          if (data.message === "Got the Feedbacks for this house..") {
            console.log("feedback is --->", data.feedback_content);

            setMyFeedbackID(data.feedback_id);
            setMyFeedback(data.feedback_content);
            setMyPicture(data.profile_picture);

            const date = new Date(data.date_created);

            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();

            const FromattedDate = `${day} ${month} ${year}`;
            setDateFeedbackCreation(FromattedDate);

          } else {
            console.log(data.message);
          }
        } catch (error) {
          console.log(error);
        }
      };

      GetMyFeedbacks();

    },[]);

  const AddFeedback = async() =>{

    if (!feedback) {

      Alert.alert("Feedback Is Empty!!", "Please add a feedback and try again")
      
    } else {

      try {
  
        const response = await fetch("http://"+ServerIP+":3000/AddFeedback", {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({'user_id' : user_id, 'house_id' : house_id, 'feedback_content' : feedback}),
        });
  
        const data = await response.json();
  
        if (data.message === "Your Feedback Was Inserted Successfuly..") {
          console.log(data.message);
          navigation.replace('MyOrderDetails', {user_id : user_id, jwtToken : jwtToken, house_id: house_id, house_price: house_price,
            house_address: house_address, house_picture1: house_picture1, house_picture2: house_picture2, house_picture3: house_picture3,
            house_picture4: house_picture4, status: status, PFirst_name: PFirst_name, PPicture: PPicture, created_at: created_at,
            start_date: start_date, end_date: end_date, nb_persons: nb_persons});
        } else {
          console.log(data.message);
          Alert.alert("Oops!!", "There Was An Error Sending Your Feedback, please try agin");
        }
      } catch (error) {
        console.log(error);
      }
    };

  };

  const EditFeedback = async() =>{

    try {

      const response = await fetch("http://"+ServerIP+":3000/EditFeedback", {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({'feedback_id' : myFeedbackID, 'feedback_content' : myFeedback}),
      });

      const data = await response.json();

      if (data.message === "Your Feedback Was Updated Successfuly..") {
        console.log(data.message);
        navigation.replace('MyOrderDetails', {user_id : user_id, jwtToken : jwtToken, house_id: house_id, house_price: house_price,
          house_address: house_address, house_picture1: house_picture1, house_picture2: house_picture2, house_picture3: house_picture3,
          house_picture4: house_picture4, status: status, PFirst_name: PFirst_name, PPicture: PPicture, created_at: created_at,
          start_date: start_date, end_date: end_date, nb_persons: nb_persons});
      } else {
        console.log(data.message);
        Alert.alert("Oops!!", "There Was An Error Updating Your Feedback, please try agin");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const DeleteFeedback = async() =>{

      try {
  
        const response = await fetch("http://"+ServerIP+":3000/DeleteFeedback", {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({'feedback_id' : myFeedbackID}),
        });
  
        const data = await response.json();
  
        if (data.message === "Feedback Deleted Successfuly..") {
          console.log(data.message);
          navigation.replace('MyOrderDetails', {user_id : user_id, jwtToken : jwtToken, house_id: house_id, house_price: house_price,
            house_address: house_address, house_picture1: house_picture1, house_picture2: house_picture2, house_picture3: house_picture3,
            house_picture4: house_picture4, status: status, PFirst_name: PFirst_name, PPicture: PPicture, created_at: created_at,
            start_date: start_date, end_date: end_date, nb_persons: nb_persons});
        } else {
          console.log(data.message);
          Alert.alert("Oops!!", "There Was An Error Deleting Your Feedback, please try agin");
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

        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenWidth, height: 0.8 * screenHeight / 7}}>
          <TouchableOpacity  style={{ marginTop: screenHeight / 15,  left: screenWidth/20 }} onPress={() => { navigation.navigate('MyOrders', {user_id: user_id, jwtToken : jwtToken}) }}>

            <Icon name='arrow-left' size={screenWidth / 14} color={'#C48F49'} />
          </TouchableOpacity>
          <View style={{ marginTop: screenHeight / 15, right: screenWidth/20 }}>
            <Text style={{fontSize: screenWidth/20, fontFamily:'Medium', color: (status === "expired" || status === "refused" ? ("red") : ("green"))}}> ● {status}</Text>
          </View>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center', width: screenWidth, height: 2.2 * screenHeight / 7}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingRight: screenWidth/70, paddingLeft: screenWidth/90}}>
            
            <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "House", pictureToSee : house_picture1});}}>
              <Image 
              source={{uri : "http://"+ServerIP+":3000/" + house_picture1}}
              style={{width: screenWidth/1.01, height: 2.2 * screenHeight/7, borderRadius: screenWidth/30}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "House", pictureToSee : house_picture2});}}>
              <Image 
              source={{uri : "http://"+ServerIP+":3000/" + house_picture2}}
              style={{width: screenWidth/1.01, height: 2.2 * screenHeight/7, borderRadius: screenWidth/30, marginLeft: screenWidth/80}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "House", pictureToSee : house_picture3});}}>
              <Image 
              source={{uri : "http://"+ServerIP+":3000/" + house_picture3}}
              style={{width: screenWidth/1.01, height: 2.2 * screenHeight/7, borderRadius: screenWidth/30, marginLeft: screenWidth/80}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "House", pictureToSee : house_picture4});}}>
              <Image 
              source={{uri : "http://"+ServerIP+":3000/" + house_picture4}}
              style={{width: screenWidth/1.01, height: 2.2 * screenHeight/7, borderRadius: screenWidth/30, marginLeft: screenWidth/80}}
              />
            </TouchableOpacity>
            
          </ScrollView>
        </View>

        <View style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: screenHeight/40}}>
            <View style={{borderBottomColor: 'lightgrey', borderBottomWidth:screenWidth/400, paddingBottom: screenHeight/60, marginTop: screenHeight/40, marginLeft: screenWidth/20, flexDirection: 'column'}}>
              <View style={{}}>
                <Text style={{fontSize: screenWidth/22, fontFamily: 'Bold'}}>Address :</Text>
              </View>
              <View style={{marginTop: screenHeight/40, flexDirection: 'row'}}>
              <Ionicons name="location" size={screenWidth / 15} color="black" />
              <Text style={{marginLeft: screenWidth/40, width: screenWidth/1.2, fontSize: screenWidth/26, fontFamily: 'Medium'}}> {house_address} </Text>
              </View>
            </View>

            <View style={{borderBottomColor: 'lightgrey', borderBottomWidth:screenWidth/400, paddingBottom: screenHeight/60, marginTop: screenHeight/40, marginLeft: screenWidth/20, flexDirection: 'column'}}>
              <View style={{}}>
                <Text style={{fontSize: screenWidth/22, fontFamily: 'Bold'}}>Owner :</Text>
              </View>
              <View style={{marginTop: screenHeight/40, flexDirection: 'row'}}>
              <Image
                source={{uri : "http://"+ServerIP+":3000/" + PPicture}}
                style={{ width: screenWidth / 8, height: screenHeight / 17, borderRadius: screenWidth / 5 }}
                />              
                <Text style={{marginLeft: screenWidth/40, width: screenWidth/1.2, fontSize: screenWidth/26, fontFamily: 'Medium'}}> {PFirst_name} </Text>
              </View>
            </View>

            <View style={{borderBottomColor: 'lightgrey', borderBottomWidth:screenWidth/400, paddingBottom: screenHeight/60, marginTop: screenHeight/40, marginLeft: screenWidth/20, flexDirection: 'column'}}>
              <View style={{}}>
                <Text style={{fontSize: screenWidth/22, fontFamily: 'Bold'}}>Rent Duration :</Text>
              </View>
              <View style={{marginTop: screenHeight/40, flexDirection: 'row'}}>            
                <Text style={{marginLeft: screenWidth/40, fontSize: screenWidth/26, fontFamily: 'Medium'}}>From {start_date}  To {end_date}</Text>
              </View>
            </View>

            <View style={{borderBottomColor: 'lightgrey', borderBottomWidth:screenWidth/400, paddingBottom: screenHeight/60, marginTop: screenHeight/40, marginLeft: screenWidth/20, flexDirection: 'column'}}>
              <View style={{}}>
                <Text style={{fontSize: screenWidth/22, fontFamily: 'Bold'}}>Number Of Travelers :</Text>
              </View>
              <View style={{marginTop: screenHeight/40, flexDirection: 'row'}}>            
                <Text style={{marginLeft: screenWidth/40, fontSize: screenWidth/26, fontFamily: 'Medium'}}>10 Travelers</Text>
              </View>
            </View>

            <View style={{borderBottomColor: 'lightgrey', borderBottomWidth:screenWidth/400, paddingBottom: screenHeight/60, marginTop: screenHeight/40, marginLeft: screenWidth/20, flexDirection: 'column'}}>
              <View style={{}}>
                <Text style={{fontSize: screenWidth/22, fontFamily: 'Bold'}}>Reservation's Creation date :</Text>
              </View>
              <View style={{marginTop: screenHeight/40, flexDirection: 'row'}}>            
                <Text style={{marginLeft: screenWidth/40, fontSize: screenWidth/26, fontFamily: 'Medium'}}> {created_at} </Text>
              </View>
            </View>

            {/* Executed Only When Status is Different Than Expired And Refused */}

            {status !== "expired" && status !== "refused" && status !== "pending" ? (
              <View>
            <View style={{borderBottomColor: 'lightgrey', borderBottomWidth:screenWidth/400, paddingBottom: screenHeight/60, marginTop: screenHeight/40, marginLeft: screenWidth/20, flexDirection: 'column'}}>
              <View style={{}}>
                <Text style={{fontSize: screenWidth/22, fontFamily: 'Bold'}}>Rate House ..</Text>
              </View>
              <View style={{marginTop: screenHeight/40, flexDirection: 'row'}}>            
                <Text style={{marginLeft: screenWidth/40}}>star star star star star</Text>
              </View>
            </View>

            {myFeedback !== '' && 

            <View style={{borderBottomColor: 'lightgrey', borderBottomWidth:screenWidth/400, paddingBottom: screenHeight/60, marginTop: screenHeight/40, marginLeft: screenWidth/20, flexDirection: 'column'}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                <Text style={{fontSize: screenWidth/22, fontFamily: 'Bold'}}>Your Feedback Was :</Text>
                </View>
                <View style={{right: screenWidth/20, flexDirection: 'row'}}>
                  <TouchableOpacity onPress={DeleteFeedback}>
                <AntDesign name="delete" size={screenWidth/18} color="grey" style={{right: screenWidth/40}} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {setToEdit(true);}}>
                <Feather name="edit-3" size={screenWidth/18} color="grey" />
                  </TouchableOpacity>
                </View>
              </View>

              {toEdit ? (
             <View style={{marginTop: screenHeight/40, flexDirection: 'row', justifyContent: 'space-between'}}>            
             <TextInput 
             style={{width: screenWidth/1.3, fontSize: screenWidth / 27, fontFamily: 'SemiBold' }}
             placeholder='Edit Your Feedback Here ...'
             value={myFeedback}
             onChangeText={text => setMyFeedback(text)}
             multiline={true}
             />
             <TouchableOpacity onPress={EditFeedback}>
             <Ionicons name="send" size={screenWidth/15} color="black" style={{right: screenWidth/20}} />
             </TouchableOpacity>
           </View>
              ) : (
                <View>
              <View style={{marginTop: screenHeight/40, flexDirection: 'row'}}>  
              <Image
                source={{uri : "http://"+ServerIP+":3000/" + myPicture}}
                style={{ width: screenWidth / 8, height: screenHeight / 17, borderRadius: screenWidth / 5 }}
                />             
                <Text style={{width: screenWidth/1.3, marginLeft: screenWidth/40, fontSize: screenWidth/26, fontFamily: 'Medium'}}> {myFeedback} </Text>
              </View>

              <View style={{marginTop: screenHeight/60, marginLeft: screenWidth/1.45}}>
                <Text style={{fontSize: screenWidth/28, fontFamily: 'Medium', textDecorationLine:'underline', textDecorationColor: 'black'}}> {dateFeedbackCreation} </Text>
              </View>
              </View>
              )}

            </View>

          }

          {myFeedback === '' ? (
            <View style={{borderBottomColor: 'lightgrey', borderBottomWidth:screenWidth/400, paddingBottom: screenHeight/60, marginTop: screenHeight/40, marginLeft: screenWidth/20, flexDirection: 'column'}}>
              <View style={{}}>
                <Text style={{fontSize: screenWidth/22, fontFamily: 'Bold'}}>Add A feedback For This Commodation ..</Text>
              </View>
              <View style={{marginTop: screenHeight/40, flexDirection: 'row', justifyContent: 'space-between'}}>            
                <TextInput 
                style={{width: screenWidth/1.3, fontSize: screenWidth / 27, fontFamily: 'SemiBold' }}
                placeholder='Add Your Feedback Here ...'
                value={feedback}
                onChangeText={text => setFeedback(text)}
                multiline={true}
                />
                <TouchableOpacity onPress={AddFeedback}>
                <Ionicons name="send" size={screenWidth/15} color="black" style={{right: screenWidth/20}} />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
            </View>
            ) : null}


          </ScrollView>
        </View>


    
        </View>
      );
    };