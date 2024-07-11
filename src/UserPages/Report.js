import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import {RadioButton} from 'react-native-paper';
import { Server } from '../ServerIP';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Report = ({route, navigation}) => {

  const {user_id, jwtToken, provider_id, profile_picture} = route.params;

  //REPORT VARIABLES
  const [cause, setCause] = useState("");
  const [reason, setReason] = useState("");

  const ServerIP = Server;

  // useEffect(() => {
  //   console.log('cause:', cause);
  // }, [cause]);


  //Report The Provider For A violation Reason

  const ReportProvider = async() =>{

    try {
      
      const response = await fetch("http://"+ServerIP+":3000/ReportProvider", {

      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({'user_id' : user_id, 'provider_id' : provider_id, 'cause' : cause, 'reason' : reason}),
      });

      const data = await response.json();

      if (data.message === "Your Report Was Sent Successfuly ..") {
        console.log(data.message);
        Alert.alert("Success", data.message);
        navigation.navigate('Home', {user_id : user_id, jwtToken : jwtToken});
      } else {
        console.log(data.message);
        Alert.alert("Oops !!", data.message);
      }

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

      {/* Page Title Section */}
      <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: screenWidth, height: 1.5 * screenHeight / 7}}>
        <Text style={{marginTop:screenHeight/20, fontSize: screenWidth / 18, fontFamily: 'Bold' }}>Report This Provider</Text>
        <Image
                source={profile_picture !== null ? {uri : "http://" + ServerIP + ":3000/" + profile_picture} : require('./UsrPgsImg/userGrey.png') }
                style={{ width: screenWidth / 5.7, height: screenHeight / 12, borderRadius: screenWidth / 5, borderWidth: screenWidth / 250, borderColor: '#C48F49' }}
          />
      </View>

      {/* Report Reason Section */}

      <View style={{ borderBottomWidth: screenWidth / 300, borderBottomColor: '#C48F49', borderTopColor: '#C48F49', borderTopWidth: screenWidth / 300, borderTopLeftRadius: screenWidth / 30, borderTopRightRadius: screenWidth / 30, borderBottomLeftRadius: screenWidth / 30, borderBottomRightRadius: screenWidth / 30, width: screenWidth, height: 2.6 * screenHeight / 7 }}>


        <View style={{ marginTop: screenHeight / 30, alignItems: 'center' }}>
          <Text style={{ fontSize: screenWidth / 26, fontFamily: 'SemiBold' }}>Why Are You Reporting This Provider ?</Text>
        </View>

        <View style={{ marginTop: screenHeight / 40, marginLeft: screenWidth / 18, flexDirection: 'row' }}>
          <RadioButton
            value="provider did not respect the agreement"
            status={cause === 'provider did not respect the agreement' ? 'checked' : 'unchecked'}
            onPress={() => setCause("provider did not respect the agreement")}
          />
          <Text style={{ marginTop: screenHeight / 100, fontFamily: 'Regular', fontSize: screenWidth / 28 }}>Provider did not respect the agreement</Text>
        </View>

        <View style={{ marginTop: screenHeight / 40, marginLeft: screenWidth / 18, flexDirection: 'row' }}>
          <RadioButton
            value="Provider stoped contacting after agreement"
            status={cause === 'Provider stoped contacting after agreement' ? 'checked' : 'unchecked'}
            onPress={() => setCause("Provider stoped contacting after agreement")}
          />
          <Text style={{ marginTop: screenHeight / 100, fontFamily: 'Regular', fontSize: screenWidth / 28, width: screenWidth / 1.2 }}>Provider stoped contacting after agreement</Text>
        </View>

        <View style={{ marginTop: screenHeight / 40, marginLeft: screenWidth / 18, flexDirection: 'row' }}>
          <RadioButton
            value="Provider missleaded the Costumer"
            status={cause === 'Provider missleaded the Costumer' ? 'checked' : 'unchecked'}
            onPress={() => setCause("Provider missleaded the Costumer")}
          />
          <Text style={{ marginTop: screenHeight / 100, fontFamily: 'Regular', fontSize: screenWidth / 28 }}>Provider missleaded the Costumer</Text>
        </View>

        <View style={{ marginTop: screenHeight / 40, marginLeft: screenWidth / 18, flexDirection: 'row' }}>
          <RadioButton
            value="Other"
            status={cause === 'Other' ? 'checked' : 'unchecked'}
            onPress={() => setCause("Other")}
          />
          <Text style={{ marginTop: screenHeight / 100, fontFamily: 'Regular', fontSize: screenWidth / 28 }}>Other</Text>
        </View>



      </View>

      <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', width: screenWidth, height: screenHeight / 3 }}>
        <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 30 }}>Specify the reason you are reporting this provider</Text>
        <View style={{ width: screenWidth / 1.05, height: screenHeight / 4, backgroundColor: 'lightgrey', borderRadius: screenWidth / 20 }}>

          <TextInput style={{ flex: 1, marginTop: screenHeight / 40, marginLeft: screenWidth / 20, fontFamily: 'Medium', fontSize: screenWidth / 25, textAlignVertical: 'top' }}
            placeholder='Put Your Reason here.....'
            onChangeText={text => setReason(text)}
            value={reason}
            multiline={true}
          />

        </View>
      </View>

      <View style={{ alignItems: 'center', flex: 1 }}>
        <TouchableOpacity onPress={ReportProvider} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 1.02, height: screenHeight / 18, backgroundColor: '#C48F49', borderRadius: screenWidth / 20 }}>
          <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Submit Report</Text>
        </TouchableOpacity>
      </View>



    </View>
  );
};

export default Report;
