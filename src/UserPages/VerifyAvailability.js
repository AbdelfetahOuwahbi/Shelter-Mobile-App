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

const VerifyAvailability = ({route, navigation}) => {

    const {user_id, provider_id, jwtToken, house_id} = route.params;

   // console.log(house_id);

   // Check Avalability Variables
   const [isAvailable, setIsAvailable] = useState('');

   const [isLoading, setIsLoading] = useState(false);

   //Reservation Variables
   const [nbTravelers, setNbTravelers] = useState('1 Traveler');
   //The Chosen Dates By The User
   const [selectedStartDate, setSelectedStartDate] = useState('');
   const [selectedEndDate, setSelectedEndDate] = useState('');
   const [retreivedmessage, setRetreivedMessage] = useState('');
   //Showing The Date Picker
   const [isDatePicker1Visible, setDatePicker1Visibility] = useState(false);
   const [isDatePicker2Visible, setDatePicker2Visibility] = useState(false);
   //The Dates That Are Received From The Database 
   const [receivedStartDate, setReceivedStartDate] = useState('');
   const [receivedEndDate, setReceivedEndDate] = useState('');
   const [minimumDate, setMinimumDate] = useState(new Date());
   const [maximumDate, setMaximumDate] = useState(new Date());
   

   const ServerIP = Server;

   // Selecting The Start Date
   const showDatePicker1 = () => {
     setDatePicker1Visibility(true);
   };
 
   const hideDatePicker1 = () => {
     setDatePicker1Visibility(false);
   };
 
   const handleConfirm1 = (date) => {
    // const FormatedDate = date.substring(0, 10);
     setSelectedStartDate(date);
     hideDatePicker1();
    };

    // Selecting The End Date
   const showDatePicker2 = () => {
    setDatePicker2Visibility(true);
  };

  const hideDatePicker2 = () => {
    setDatePicker2Visibility(false);
  };

  const handleConfirm2 = (date) => {
   // const FormatedDate = date.substring(0, 10);
    setSelectedEndDate(date);
    hideDatePicker2();
  };

   

  //Checking From THe DB Whether the House Is Available Or Not

useEffect(() =>{

    const CheckAvailability = async() =>{

        try {
            const response = await fetch("http://"+ServerIP+":3000/VerifyAvailability", {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({'house_id' : house_id}),
            });

            const data = await response.json();

            if (data.message === "This House Is Available .." && data.start_date === "No Start Date" && data.end_date === "No End Date") {
                
                console.log(data.message);
                console.log("this is the start date from backend--->", data.start_date);
                console.log("this is the end date from backend--->", data.end_date);

                setRetreivedMessage(data.message);
                const minimumDate = new Date();
                // minimumDate.setDate(minimumDate.getDate() + 1);
                setMinimumDate(minimumDate);

              }else if(data.message === "This House Is Available .." && data.start_date !== "No Start Date" && data.end_date !== "No End Date"){
                
                console.log(data.message);
                console.log("this is the start date from backend--->", data.start_date);
                console.log("this is the end date from backend--->", data.end_date);
                
                setRetreivedMessage(data.message);
                setReceivedStartDate(data.start_date);
                setReceivedEndDate(data.end_date);
                const minimumDate = new Date();
                // minimumDate.setDate(minimumDate.getDate() + 1);
                setMinimumDate(minimumDate);

              }else if(data.message === "This House Is Not Available .."){
                
                console.log(data.message);
                console.log("this is the start date from backend--->", data.start_date);
                console.log("this is the end date from backend--->", data.end_date);
                setRetreivedMessage(data.message);
                setReceivedStartDate((data.start_date).slice(0,10));
                setReceivedEndDate((data.end_date).slice(0,10));
                const minimumDate = new Date(data.end_date);
                minimumDate.setDate(minimumDate.getDate() + 1);
                setMinimumDate(minimumDate);
              }

        } catch (error) {
            console.log(error);
        }
    };

    CheckAvailability();
}, []);

//setting the maximum date that the user can select based on the received last reservation's end date 
useEffect(() => {
    if (minimumDate) {
      const forMaximum1 = new Date(minimumDate);
      forMaximum1.setMonth(forMaximum1.getMonth() + 7); // The MinimumDate + 2 months
      setMaximumDate(forMaximum1);
    }
  }, [minimumDate]);

  //checking and changing the value of the received start and end dates

  useEffect(() =>{

    console.log("received start-->", receivedStartDate);
    console.log("received end-->", receivedEndDate);

  },[receivedStartDate, receivedEndDate],);

  //Making The Reservations

  const MakeReservation = async() =>{

    console.log("this is the selected start date --->", selectedStartDate);
    console.log("this is the selected end date --->", selectedEndDate);

    if (! selectedStartDate || !selectedEndDate) {
        console.log("Dates Were Not Entered");
        Alert.alert("Dates Were Not Entered", "Please Enter A start And End Dates");

    } else if(selectedEndDate < selectedStartDate) {  
      console.log("Start Date must be under End Date");
      Alert.alert("Violation", "Start Date must be under End Date");

    }else{

      setIsLoading(true);
      try {
          const response = await fetch("http://"+ServerIP+":3000/MakeReservation", {
              method: 'POST',
              headers: {'Content-Type' : 'application/json'},
              body: JSON.stringify({'user_id' : user_id, 'provider_id' : provider_id, 'house_id' : house_id, 'start_date' : selectedStartDate, 'end_date' : selectedEndDate, 'nb_travelers' : nbTravelers}),
          });

          const data = await response.json();

          if (data.message === "Reservation made with success..") {
              console.log(data.message);
              setIsLoading(false);
              Alert.alert("Success..", "a notification will be sent to you once the provider answers your order");
              navigation.navigate('Home', {user_id : user_id, jwtToken : jwtToken});
          } else {
              console.log(data.message);
              setIsLoading(false);
              Alert.alert("Oops!!", data.message);
          }
      } catch (error) {
          console.log(error);
      }

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
      <View style={{flex: 1, width:screenWidth, height : screenHeight}}>
        <View style={{width: screenWidth, height:screenHeight/7, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{marginTop: screenHeight/15}}>
            <Text style={{fontSize: screenWidth/14, fontFamily : 'Bold'}}>House ID : {house_id}</Text>
            </View>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center', width:screenWidth, height: 5*screenHeight/7}}>
      <View style={{width: screenWidth/1.1, height: screenHeight/1.5, backgroundColor: 'white', borderRadius: screenWidth/30, elevation: screenWidth/40, justifyContent: 'center', alignItems: 'center',}}>
            {retreivedmessage === "This House Is Not Available .." ? (

        <View style={{...(selectedStartDate ? ({ bottom: screenHeight/6.5 }) : ({bottom: screenHeight/5.9}) )}}>
            <Text style={{fontSize: screenWidth/21, fontFamily : 'Medium'}}>This House Is Reserved Currently</Text>
        </View>
            ) : (

                <View style={{...(selectedStartDate ? ({ bottom: screenHeight/6.5 }) : ({bottom: screenHeight/5.9}))}}>
                <Text style={{fontSize: screenWidth/21, fontFamily : 'Medium'}}>This House Is Available</Text>
            </View>
            )}

            {retreivedmessage === "This House Is Not Available .." && 
                        
        <View style={{...(selectedStartDate ? ({ bottom: screenHeight/8 }) : ({bottom: screenHeight/7}) ),flexDirection:'row'}}>
        <Text style={{fontSize: screenWidth/30, fontFamily : 'Bold'}}> Reserved from </Text>
        <Text style={{fontSize: screenWidth/28, fontFamily : 'Bold', color:'#C48F49'}}> {receivedStartDate} </Text>
        <Text style={{fontSize: screenWidth/30, fontFamily : 'Bold'}}> To </Text>
        <Text style={{fontSize: screenWidth/28, fontFamily : 'Bold', color:'#C48F49'}}> {receivedEndDate} </Text>
        </View>
            }

        <View style={{...(selectedStartDate ? ({ bottom: screenHeight/11 }) : ({bottom: screenHeight/10}) )}}>
        <Text style={{fontSize: screenWidth/25, fontFamily : 'Regular'}}>Pick a date ahead and reserve  </Text>
        </View>
        
        <View style={{...(selectedStartDate ? ({ bottom: screenHeight/20 }) : ({bottom: screenHeight/15}) )}}>
            <Text style={{fontSize: screenWidth/22, fontFamily : 'Regular'}}>Select The Dates :</Text>
        </View>

        <View style={{...(selectedStartDate ? ({ bottom: screenHeight/60 }) : ({bottom: screenHeight/60}) ), flexDirection : 'row'}}>
            <TouchableOpacity onPress={showDatePicker1} style={{alignItems: 'center', justifyContent: 'center', marginRight:screenWidth/15, width: screenWidth / 3, height: screenHeight / 16, backgroundColor: '#C48F49', borderRadius: screenWidth / 50}}>
                <Text style={{fontSize:screenWidth/24, fontFamily:'SemiBold'}}>Start Date</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={showDatePicker2} style={{alignItems: 'center', justifyContent: 'center', width: screenWidth / 3, height: screenHeight / 16, backgroundColor: '#C48F49', borderRadius: screenWidth / 50}}>
                <Text style={{fontSize:screenWidth/24, fontFamily:'SemiBold'}}>End Date</Text>
            </TouchableOpacity>
        </View>

            {selectedStartDate && 
            <View style={{marginRight:screenWidth/2.5}}>
                <Text style={{fontSize:screenWidth/28, fontFamily: 'SemiBold', color: 'green'}}>{moment(selectedStartDate).format('YYYY-MM-DD')}</Text>
            </View>
            } 
            {selectedEndDate && 
            <View style={{marginLeft:screenWidth/2.5, bottom:screenHeight/40}}>
                <Text style={{fontSize:screenWidth/28, fontFamily: 'SemiBold', color: 'green'}}>{moment(selectedEndDate).format('YYYY-MM-DD')}</Text>
            </View>
            } 


<DateTimePickerModal
        isVisible={isDatePicker1Visible}
        mode="date"
        onConfirm={handleConfirm1}
        onCancel={hideDatePicker1}
        minimumDate={minimumDate} // Set the minimum date to the current date
        maximumDate={maximumDate}
      />

<DateTimePickerModal
        isVisible={isDatePicker2Visible}
        mode="date"
        onConfirm={handleConfirm2}
        onCancel={hideDatePicker2}
        minimumDate={minimumDate} // Set the minimum date to the current date
        maximumDate={maximumDate}
      />
        

        <View style={{top: screenHeight/15}}>
            <Text style={{fontSize: screenWidth/22, fontFamily : 'Regular'}}>Select The Number Of Travelers :</Text>
        </View>
        
        <View style={{top:screenHeight/8}}>
        <Picker
            style={{height: screenHeight/50, width: screenWidth/2, backgroundColor: '#C48F49', color: '#fff'}}
            selectedValue={nbTravelers}
            onValueChange={(itemValue) => setNbTravelers(itemValue)}
          >
            <Picker.Item style={{fontSize:screenWidth/20}} label="1 Traveler" value="1 Traveler" />
            <Picker.Item style={{fontSize:screenWidth/20}} label="2 Travelers" value="2 Travelers" />
            <Picker.Item style={{fontSize:screenWidth/20}} label="3 Travelers" value="3 Travelers" />
            <Picker.Item style={{fontSize:screenWidth/20}} label="4 Travelers" value="4 Travelers" />
            <Picker.Item style={{fontSize:screenWidth/20}} label="5 Travelers" value="5 Travelers" />
            <Picker.Item style={{fontSize:screenWidth/20}} label="6 Travelers" value="6 Travelers" />
            <Picker.Item style={{fontSize:screenWidth/20}} label="7 Travelers" value="7 Travelers" />
            <Picker.Item style={{fontSize:screenWidth/20}} label="8 Travelers" value="8 Travelers" />
            <Picker.Item style={{fontSize:screenWidth/20}} label="9 Travelers" value="9 Travelers" />
            <Picker.Item style={{fontSize:screenWidth/20}} label="10 Travelers" value="10 Travelers" />
          </Picker>
        </View>

      </View>
        </View>

       
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1,}}>
        <TouchableOpacity onPress={MakeReservation} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 1.02, height: screenHeight / 18, backgroundColor: '#C48F49', borderRadius: screenWidth / 20 }}>
          {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
          ) : (
          <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Reserve Now</Text>
          )}
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default VerifyAvailability;
