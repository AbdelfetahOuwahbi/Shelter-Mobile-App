import React, { useRef, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Animated, Dimensions, TouchableOpacity, TextInput, Image, ScrollView, KeyboardAvoidingView, Alert, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import {RadioButton} from 'react-native-paper';
import { Server } from '../ServerIP';
import { Picker } from '@react-native-picker/picker';
import jwt_decode from 'jwt-decode';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AddPayoutMethod = ({route, navigation }) => {

    const {user_id, jwtToken} = route.params

  const [paymentType, setPayemntType] = useState('');

  //Credit acrd Variables
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  
  //Expiration day and year
  const [expirationMounth, setExpirationMounth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');

  //Expiration date
  const [expirationDate, setExpirationDate] = useState(``);
  const [cvc, setCVC] = useState('');
  
  // Paypal Variables
  const [paypalEmail, setPaypalEmail] = useState('');

  const [isPaypal, setIsPaypal] = useState(false);
  const [isCreditCard, setIsCreditCard] = useState(false);

  const ServerIP = Server;

  const handleSave = async() => {
    // Perform your logic to save the payment method in the backend
if (paymentType === "Paypal") {
    console.log("Payment method:", paymentType);
    console.log("Paypal Account's Email Address:", paypalEmail);

    try {
        
        const response = await fetch("http://"+ServerIP+":3000/AddPayoutMethod", {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({'payout_type' : paymentType, 'paypal_email' : paypalEmail, 'user_id' :user_id}),
        });

        const data = await response.json();

        if (data.message === "Paypal Payout method Set Successfuly..") {
            console.log(data.message);
            Alert.alert("Set ..", data.message);
            navigation.navigate('Home', {user_id : user_id, jwtToken : jwtToken});
        } else {
            console.log(data.message);
            Alert.alert("Not Set ..", data.message);
        }
    } catch (error) {
        console.log(error);
    }

} else {
    console.log("Payment method:", paymentType);
    console.log("account infos:", {
        cardHolder,
        cardNumber,
        expirationDate,
        cvc
    });

    const cardDetails = {
        cardNumber,
        expirationDate,
        cvc
    };

    try {
        
        const response = await fetch("http://"+ServerIP+":3000/AddPayoutMethod", {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({'payout_type' : paymentType, 'cardDetails' : cardDetails, 'user_id' :user_id}),
        });

        const data = await response.json();

        // console.log(data);
    } catch (error) {
        console.log(error);
    }

}
  };

  //Updating The Expiration date 

   useEffect(() =>{

     setExpirationDate(`${expirationMounth}/${expirationYear}`);

   },[expirationMounth, expirationYear])

  return (
      <View style={{ flex: 1, width: screenWidth, height: screenHeight }}>
          <View style={{ width: screenWidth, height: screenHeight / 7 }}>
              <View style={{ alignItems: 'center', marginTop: screenHeight / 15 }}>
                  <Text style={{ fontSize: screenWidth / 15, fontFamily: 'Black', marginBottom: 16 }}>
                      Add Payout Method
                  </Text>
              </View>
          </View>
          <View style={{ borderBottomColor: 'lightgrey', borderBottomWidth: screenWidth / 300, borderTopColor: 'lightgrey', borderTopWidth: screenWidth / 300, width: screenWidth, height: 1.1 * screenHeight / 7 }}>
              <View style={{ marginTop: screenHeight / 40, marginLeft: screenWidth / 18, flexDirection: 'row' }}>
                  <RadioButton
                      value="Paypal"
                      status={paymentType === 'Paypal' ? 'checked' : 'unchecked'}
                      onPress={() => { setPayemntType("Paypal"); setIsPaypal(!isPaypal); setIsCreditCard(false); }}
                  />
                  <Text style={{ marginTop: screenHeight / 100, fontFamily: 'Bold', fontSize: screenWidth / 24 }}>Paypal</Text>
                  <Icon name='paypal' color={'rgb(65, 112, 200)'} size={screenWidth / 20} style={{ marginLeft: screenWidth / 30, marginTop: screenHeight / 120 }} />
              </View>

              <View style={{ marginTop: screenHeight / 40, marginLeft: screenWidth / 18, flexDirection: 'row' }}>
                  <RadioButton
                      value="Credit Card"
                      status={paymentType === 'Credit Card' ? 'checked' : 'unchecked'}
                      onPress={() => { setPayemntType("Credit Card"); setIsCreditCard(!isCreditCard); setIsPaypal(false); }}
                  />
                  <Text style={{ marginTop: screenHeight / 100, fontFamily: 'Bold', fontSize: screenWidth / 24 }}>Credit Card</Text>
                  <Icon name='credit-card' color={'rgb(65, 112, 200)'} size={screenWidth / 20} style={{ marginLeft: screenWidth / 30, marginTop: screenHeight / 120 }} />
              </View>
          </View>

          <View style={{ justifyContent: 'center', width: screenWidth, height: 4.2 * screenHeight / 7}}>

              {isCreditCard ? (
                  <View style={{flexDirection:'column', margin: screenWidth / 20 }}>
                      <View style={{marginBottom: screenHeight/10}}>
                          <Icon name='credit-card' color={'rgb(65, 112, 200)'} size={screenWidth / 10} style={{ marginLeft: screenWidth / 30, marginTop: screenHeight / 120 }} />
                      </View>

                      <View style={{bottom: screenHeight/15}}>
                          <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 25, color: 'black' }}>Card Holder</Text>
                          <TextInput
                              onChangeText={setCardHolder}
                              value={cardHolder}
                              placeholder="Enter card Holder name"
                              style={{ fontFamily: 'Medium', borderColor: '#ccc', borderRadius: screenWidth / 30, borderWidth: screenWidth / 400, padding: screenWidth / 40, marginTop: screenHeight / 80 }}
                          />
                      </View>

                      <View style={{bottom: screenHeight/25}}>
                          <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 25, color: 'black' }}>Card Number</Text>
                          <TextInput
                              onChangeText={setCardNumber}
                              keyboardType='numeric'
                              value={cardNumber}
                              placeholder="Enter card number"
                              style={{ fontFamily: 'Medium', borderColor: '#ccc', borderRadius: screenWidth / 30, borderWidth: screenWidth / 400, padding: screenWidth / 40, marginTop: screenHeight / 80 }}
                          />
                      </View>

                      <View style={{bottom: screenHeight/45}}>
                          <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 25, color: 'black' }}>Expiration Date (Month - Year)</Text>
                          <View style={{ marginTop: screenHeight / 80, flexDirection: 'row', justifyContent: 'space-around', }}>
                              <Picker
                                  style={{ height: screenHeight / 220, width: screenWidth / 3.5, backgroundColor: 'rgb(65, 112, 200)', color: '#fff' }}
                                  selectedValue={expirationMounth}
                                  onValueChange={(itemValue) => setExpirationMounth(itemValue)}
                              >
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="1" value="01" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="2" value="02" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="3" value="03" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="4" value="04" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="5" value="05" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="6" value="06" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="7" value="07" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="8" value="08" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="9" value="09" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="10" value="10" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="11" value="11" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="12" value="12" />
                              </Picker>

                              <Picker
                                  style={{ height: screenHeight / 120, width: screenWidth / 3.5, backgroundColor: 'rgb(65, 112, 200)', color: '#fff' }}
                                  selectedValue={expirationYear}
                                  onValueChange={(itemValue) => setExpirationYear(itemValue)}
                              >
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="23" value="23" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="24" value="24" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="25" value="25" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="26" value="26" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="27" value="27" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="28" value="28" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="29" value="29" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="30" value="30" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="31" value="31" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="32" value="32" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="33" value="33" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="34" value="34" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="35" value="35" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="36" value="36" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="37" value="37" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="38" value="38" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="39" value="39" />
                                  <Picker.Item style={{ fontSize: screenWidth / 20 }} label="40" value="40" />
                              </Picker>
                          </View>

                      </View>

                      <View style={{bottom: screenHeight/80}}>
                          <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 25, color: 'black' }}>CVV</Text>
                          <TextInput
                              onChangeText={setCVC}
                              keyboardType='numeric'
                              value={cvc}
                              placeholder="Enter CVC"
                              style={{ fontFamily: 'Medium', borderColor: '#ccc', borderRadius: screenWidth / 30, borderWidth: screenWidth / 400, padding: screenWidth / 40, marginTop: screenHeight / 80 }}
                          />
                      </View>
                  </View>
              ) : isPaypal ? (
                  <View style={{ margin: screenWidth / 20 }}>
                      <View style={{ bottom: screenHeight / 20 }}>
                          <Icon name='paypal' color={'rgb(65, 112, 200)'} size={screenWidth / 10} style={{ marginLeft: screenWidth / 30, marginTop: screenHeight / 120 }} />
                      </View>
                      <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 25, color: 'black' }}>Paypal Account's Email Address</Text>
                      <TextInput
                          onChangeText={setPaypalEmail}
                          value={paypalEmail}
                          placeholder="Enter card number"
                          style={{ fontFamily: 'Medium', borderColor: '#ccc', borderRadius: screenWidth / 30, borderWidth: screenWidth / 400, padding: screenWidth / 40, marginTop: screenHeight / 80 }}
                      />
                  </View>
              ) : null}

          </View>
          <View style={{ alignItems: 'center', width: screenWidth, height: 0.7 * screenHeight / 7 }}>
              {isPaypal ? (
                  <TouchableOpacity onPress={handleSave} style={{ alignItems: 'center', marginTop: screenHeight / 50, justifyContent: 'center', borderColor: '#fff', backgroundColor: 'rgb(65, 112, 200)', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 1.2 }}>
                      <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Save</Text>
                  </TouchableOpacity>
              ) : isCreditCard ? (
                  <TouchableOpacity onPress={handleSave} style={{ alignItems: 'center', marginTop: screenHeight / 50, justifyContent: 'center', borderColor: '#fff', backgroundColor: 'rgb(65, 112, 200)', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 1.2 }}>
                      <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Save</Text>
                  </TouchableOpacity>
              ) : null}
          </View>

      </View>
  );
};

export default AddPayoutMethod;
