import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, ImageBackground, BackHandler, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
import {Server} from './ServerIP';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LoginForm = ({route, navigation}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notifToken, setNotifToken] = useState('');
  const ServerIP = Server;


    //making the session pesistent ...


    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
        const token = await AsyncStorage.getItem('jwtToken');
          const decodedJWT = jwt_decode(token);
          if (decodedJWT.role === 'user') {
            navigation.navigate('Home', { user_id: decodedJWT.user_id, jwtToken: token });
          } else {
            navigation.navigate('Dashboard', { user_id: decodedJWT.admin_id, jwtToken: token });
          }
        } catch (error) {
          console.log('Token decoding error:', error);
          AsyncStorage.removeItem('jwtToken'); // Remove the invalid token from AsyncStorage

          navigation.navigate('LoginForm'); // Navigate back to the login screen
        }
      };
      checkLoginStatus();
    }, [navigation]);

  

  //Handling The Press of Sign In  Button

  const HandleSignIn = async() =>{
    if (!email && !password) {
      Alert.alert(
        'Violation !!',
        "Email And Password Fields Are Required ",
        [
          {
            text: 'OK',
          },
        ],
        {
          cancelable: false,
          style: { borderRadius: 10, backgroundColor: 'lightblue' },
        }
      );
    }else if (!password) {
      Alert.alert(
        'Password !!',
        "Password Field Is Required ",
        [
          {
            text: 'OK',
          },
        ],
        {
          cancelable: false,
          style: { borderRadius: 10, backgroundColor: 'lightblue' },
        }
      );
    }else if (!email) {
      Alert.alert(
        'Email !!',
        "Email Field Is Required ",
        [
          {
            text: 'OK',
          },
        ],
        {
          cancelable: false,
          style: { borderRadius: 10, backgroundColor: 'lightblue' },
        }
      );
    }else {
    
    try {
      const response = await fetch("http://" + ServerIP + ":3000/Login", {
        method:'POST',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify({ 'email': email, 'password': password }),
      });

      const data = await response.json();

      console.log(data.message);

      if (data.message === "User Logged In Successfully") {

        //Puting The Jwt In The Local Storage
        AsyncStorage.setItem('jwtToken', data.jwtToken);
        const decodedJWT = jwt_decode(data.jwtToken);
        console.log(decodedJWT);
        navigation.navigate("Home", {user_id : decodedJWT.user_id, jwtToken : data.jwtToken});
        setEmail('');
        setPassword('');
      }else if (data.message === "Admin Logged In Successfully") {
         //Puting The Jwt In The Local Storage
         AsyncStorage.setItem('jwtToken', data.jwtToken);
         const decodedJWT = jwt_decode(data.jwtToken);
         console.log(decodedJWT);
         navigation.navigate("Dashboard", {user_id : decodedJWT.admin_id, jwtToken : data.jwtToken});
         setEmail('');
         setPassword('');
      } else {
        Alert.alert(
          'Sign Up Now !!',
          data.message,
          [
            {
              text: 'OK',
            },
          ],
          {
            cancelable: false,
            style: { borderRadius: 10, backgroundColor: 'lightblue' },
          }
        );
      }

      
    } catch (error) {
      console.log("The Error That You're Facing Is As follows :");
      console.log(error);
    }
    }
  }


  //FONTS LOADED  
  const [fontsLoaded] = useFonts({
    'Black': require('../assets/fonts/Cinzel-Black.ttf'),
    'Bold': require('../assets/fonts/Cinzel-Bold.ttf'),
    'ExtraBold': require('../assets/fonts/Cinzel-ExtraBold.ttf'),
    'SemiBold': require('../assets/fonts/Cinzel-SemiBold.ttf'),
    'Medium': require('../assets/fonts/Cinzel-Medium.ttf'),
    'Regular': require('../assets/fonts/Cinzel-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

    return(
      <LinearGradient colors={['#5b3d08', '#3d1e08']} style={{width:screenWidth, height: screenHeight+30}}>  

        <View style={{ height: screenHeight, width: screenWidth }}>

        <View style={{ alignItems: 'center', height: screenHeight / 3, top: screenHeight / 20 }}>
          <ImageBackground
            source={require('./SrcImg/Entry2.png')}
            style={{ width: screenWidth / 1.5, height: screenHeight / 3 /*to be changed*/ }}
          >
          </ImageBackground>
        </View>
        <View>
        </View>
  
        <View style={{ borderColor: '#C48F49', borderWidth: screenWidth / 200, borderRadius: screenWidth / 50, marginTop: screenHeight / 20, width: screenWidth / 1.1, marginLeft: screenWidth / 20 }}>
          <View style={{ left: screenWidth / 5, flexDirection: 'column', top: screenHeight / 15 }}>
            <View style={{ justifyContent: 'center', borderColor: '#C48F49', borderWidth: screenWidth / 250, height: screenHeight / 15, width: screenWidth / 1.3, borderRadius: screenWidth / 40, right: screenWidth / 8 }}>
              <TextInput
                style={{fontSize:screenWidth/27, fontFamily:'Medium', left: screenWidth / 10, top: screenHeight / 100 }}
                placeholder="Enter your Email .."
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
             
              <Icon style={{ left: screenWidth / 35, bottom: screenHeight / 55, color: '#C48F49', marginRight: screenWidth / 1.4 }} size={screenWidth/25} name='user'></Icon>
            </View>
  
            <View style={{ borderColor: '#C48F49', borderWidth: screenWidth / 250, height: screenHeight / 15, width: screenWidth / 1.3, borderRadius: screenWidth / 40, right: screenWidth / 8, marginTop: screenHeight / 50 }}>
              <TextInput
                style={{fontSize:screenWidth/27, fontFamily:'Medium', left: screenWidth / 10, top: screenHeight / 70 }}
                placeholder="Enter your Password .."
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              
              <Icon style={{ left: screenWidth / 35, bottom: screenHeight / 55, color: '#C48F49', marginRight: screenWidth / 1.4 }} size={screenWidth/25} name='lock'></Icon>
            </View>
  
          </View>
  
          <View style={{ alignItems: 'center', marginTop: screenHeight / 6, bottom: screenHeight / 20 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: screenWidth / 250, borderColor: '#C48F49', backgroundColor: '#C48F49', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 2.5 }}>
              <TouchableOpacity onPress={HandleSignIn}>
                <Text style={{ fontSize: screenWidth/18, fontFamily: 'Bold', color: '#fff' }}>Sign In </Text>
              </TouchableOpacity>
            </View>
  
          </View>
  
          <View style={{ alignItems: 'center', marginTop: screenHeight / 35, bottom: screenHeight / 20 }}>
            <Text style={{fontSize: screenWidth/25, fontFamily: 'Medium', color: 'grey' }}>do not have an account yet ?</Text>
          </View>
  
          <View style={{ alignItems: 'center', marginTop: screenHeight / 30, bottom: screenHeight / 20 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: screenWidth / 250, borderColor: '#FFF', backgroundColor: '#FFF', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 2.5 }}>
              <TouchableOpacity onPress={() => {navigation.navigate('RegistrationForm')}}>
                <Text style={{ fontSize: screenWidth/18, fontFamily: 'Bold', color: '#C48F49' }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
  
      </View>
      </LinearGradient>
    );
};
export default LoginForm;