import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, Image, ImageBackground, SafeAreaView} from 'react-native';
import {Server} from './ServerIP';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const RegistrationForm= ({navigation}) => {


  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cin, setCin] = useState('');
  const [cinpicture, setCinPicture] = useState('');
  const [pictureClicked, setPictureClicked] = useState(false); // checking if the user clicks to chose the cin picture or not
  const [create_password, setCreatepassword] = useState('');
  const [confirm_password, setConfirmpassword] = useState('');

  // The Form That Will Be Sent
  const [formData, setFormData] = useState(new FormData());
  const timestamp = Date.now();

  const ServerIP = Server;

  // Giving the user the hand to choose the Cin Picture
  const PickCinPicture = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setCinPicture(result.assets[0].uri);
        const uri = result.assets[0].uri;
        const fileExtension = uri.split('.').pop();

        // Append new image data to existing FormData object in state
        const formData1 = new FormData();

        formData1.append('CinPicture', {
          uri,
          type: `image/${fileExtension}`,
          name: `image_${timestamp}.${fileExtension}`,
        });
        formData1.append('first_name', first_name);
        formData1.append('last_name', last_name);
        formData1.append('phone', phone);
        formData1.append('email', email);
        formData1.append('address', address);
        formData1.append('cin', cin);
        formData1.append('create_password', create_password);
        formData1.append('confirm_password', confirm_password);

        setFormData(formData1);

        //an alert is showen when the user clicks to chose a picture and then changes his mind
      } else {
        Alert.alert(
          'Attention !!',
          'Cin Picture is Required !!',
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
      console.log(error);
    }
  }

  //Handling The press of Sign Up Button

  const HandleSignUp = async () => {
    // checking if the user clicks to chose the cin picture or not
    if (pictureClicked === false) {
    //  console.log("Cin Picture is necessary, make sure to pick a verified and clear card picture !!");
    Alert.alert(
      'Cin Picture is necessary ..',
      'make sure to pick a verified and clear card picture !!',
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
    console.log("Last Content of The Form -->", formData);
    //Checking That All Fields Has A Value
    if (create_password !== confirm_password) {

      Alert.alert(
        'Attention !!',
        'Please Make a match pair of password !!',
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
    // Cheking That No field is Empty
    else if (!first_name || !last_name || !phone || !email || !address || !cin || !create_password || !confirm_password) {
      Alert.alert(
        'Attention !!',
        'All fields Are Required !!',
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

    } else {

      try {

        //Appending the informations to the Form Before Sending

        const response = await fetch("http://" + ServerIP + ":3000/Register", {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        const data = await response.json();
        console.log(data.message);

        if (data.message === "User Registered Successfuly...") {
          navigation.navigate("LoginForm");
          setFormData(new FormData());
          setFirstname('');
          setLastname('');
          setPhone('');
          setEmail('');
          setAddress('');
          setCin('');
          setCinPicture('');
          setCreatepassword('');
          setConfirmpassword('');
        } else {
          Alert.alert(
            'Attention !!',
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
          setFormData(new FormData());
          setEmail('');

        }


      } catch (error) {
        console.log(error);
      }
    }

    setPictureClicked(false);
  }

  //Array of Fillable User's Informations
  const informations = [

    {
      Credentials: (

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: screenHeight / 3.5 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', borderColor: '#C48F49', borderWidth: screenHeight / 600, height: screenHeight / 15, width: screenWidth / 1.2, borderRadius: screenHeight / 35 }}>
            <TextInput
              style={{ fontSize: screenWidth / 27, marginRight: screenWidth / 3 }}
              placeholder="Type Your First name"
              value={first_name}
              onChangeText={(text) => setFirstname(text)}
            />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', borderColor: '#C48F49', borderWidth: screenHeight / 600, height: screenHeight / 15, width: screenWidth / 1.2, marginTop: screenHeight / 30, borderRadius: screenHeight / 35 }}>
            <TextInput
              style={{ fontSize: screenWidth / 27, marginRight: screenWidth / 3 }}
              placeholder="Type Your Last name"
              value={last_name}
              onChangeText={(text) => setLastname(text)}
            />
          </View>

        </View>
      ),
    },

    {
      Credentials: (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: screenHeight / 3.5 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', borderColor: '#C48F49', borderWidth: screenHeight / 600, height: screenHeight / 15, width: screenWidth / 1.2, borderRadius: screenHeight / 35 }}>
            <TextInput
              style={{ fontSize: screenWidth / 27, marginRight: screenWidth / 8 }}
              placeholder="Type Your Phone Here ..+212 020.."
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', borderColor: '#C48F49', borderWidth: screenHeight / 600, height: screenHeight / 15, width: screenWidth / 1.2, marginTop: screenHeight / 30, borderRadius: screenHeight / 35 }}>
            <TextInput
              style={{ fontSize: screenWidth / 27, marginRight: screenWidth / 3 }}
              placeholder="Type Your Email Here"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

        </View>
      ),
    },

    {
      Credentials: (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: screenHeight / 3.5 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', borderColor: '#C48F49', borderWidth: screenHeight / 600, height: screenHeight / 15, width: screenWidth / 1.2, borderRadius: screenHeight / 35 }}>
            <TextInput
              style={{ fontSize: screenWidth / 27, marginRight: screenWidth / 3 }}
              placeholder="Type Your Address here"
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
        </View>
      ),
    },

    {
      Credentials: (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: screenHeight / 3.5 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', borderColor: '#C48F49', borderWidth: screenHeight / 600, height: screenHeight / 15, width: screenWidth / 1.2, borderRadius: screenHeight / 35 }}>
            <TextInput
              style={{ fontSize: screenWidth / 27, marginRight: screenWidth / 6 }}
              secureTextEntry={true}
              placeholder="Create a strong password"
              onChangeText={(text) => setCreatepassword(text)}
              value={create_password}
            />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', borderColor: '#C48F49', borderWidth: screenHeight / 600, height: screenHeight / 15, marginTop: screenHeight / 30, width: screenWidth / 1.2, borderRadius: screenHeight / 35 }}>
            <TextInput
              style={{ fontSize: screenWidth / 27, marginRight: screenWidth / 4 }}
              secureTextEntry={true}
              placeholder="Confirm the password"
              onChangeText={(text) => setConfirmpassword(text)}
              value={confirm_password}
            />
          </View>
        </View>
      ),
    },

    {
      Credentials: (

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: screenHeight / 3.5 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', borderColor: '#C48F49', borderWidth: screenHeight / 600, height: screenHeight / 15, width: screenWidth / 1.2, borderRadius: screenHeight / 35 }}>
            <TextInput
              style={{ fontSize: screenWidth / 27, marginRight: screenWidth / 2.5 }}
              placeholder="Type Your CIN Here"
              value={cin}
              onChangeText={(text) => setCin(text)}
            />
          </View>

          <TouchableOpacity onPress={ () => {PickCinPicture(); setPictureClicked(true)}}>
            <View style={{ alignItems: 'center', justifyContent: 'center', borderColor: '#C48F49', borderWidth: screenHeight / 600, height: screenHeight / 10, width: screenWidth / 2, marginTop: screenHeight / 30, borderRadius: screenHeight / 35 }}>
              {cinpicture ? (
                <Image
                  source={{ uri: cinpicture }}
                  style={{ width: screenWidth / 5, height: screenHeight / 16 }}
                />
              ) : (

                <Icon name='image' size={screenWidth / 10} color={'black'} />
              )}
              <Text style={{ fontSize: screenWidth / 29, fontFamily: 'Regular' }}>Load your Card picture..</Text>
            </View>
          </TouchableOpacity>

        </View>
      ),
    }

  ];


  const [currentinfosIndex, setCurrentinfosIndex] = useState(0);

  //handling the first_name

  const handlePreviousSlide = () => {
    if (currentinfosIndex === 0) {
      navigation.navigate("LoginForm");
    }
    else if (currentinfosIndex > 0) {
      setCurrentinfosIndex(currentinfosIndex - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentinfosIndex <= informations.length - 1) {
      setCurrentinfosIndex(currentinfosIndex + 1);
    }
  };

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

  return (
    <LinearGradient colors={['#5b3d08', '#3d1e08']} style={{ width: screenWidth, height: screenHeight + 30, justifyContent: 'center', alignItems: 'center' }}>

      <View style={{ borderColor: '#C48F49', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: screenWidth / 20, borderWidth: screenWidth / 100, height: screenHeight / 2, width: screenWidth / 1.1 }}>
        <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', bottom: screenHeight / 6.2 }}>

          <Icon name="user-plus" style={{ top: screenHeight / 4, color: '#C48F49' }} size={screenWidth / 10} />
          {informations[currentinfosIndex].Credentials}

          <View style={{ alignItems: 'center', flexDirection: 'row', top: screenHeight / 25 }}>
            <TouchableOpacity style={[{ left: screenWidth / 9, borderRadius: screenHeight / 30, borderColor: '#C48F49', borderWidth: screenWidth / 200, height: screenHeight / 16, width: screenWidth / 2.5, backgroundColor: currentinfosIndex === 0 ? '#fff' : '#C48F49' }]} onPress={handlePreviousSlide}>
              <Text style={{ fontSize: screenWidth / 25, textAlign: 'center', marginTop: screenHeight / 60, color: currentinfosIndex === 0 ? '#C48F49' : '#fff', fontFamily: 'Bold' }}>Previous</Text>
            </TouchableOpacity>
            {currentinfosIndex === 4 ? (
              <TouchableOpacity style={[{ right: screenWidth / 9, borderRadius: screenHeight / 30, borderColor: '#C48F49', borderWidth: screenWidth / 200, height: screenHeight / 16, width: screenWidth / 2.5, marginLeft: screenWidth / 4, backgroundColor: currentinfosIndex === informations.length - 1 ? '#fff' : '#C48F49' }]} onPress={HandleSignUp}>
                <Text style={{ fontSize: screenWidth / 25, textAlign: 'center', marginTop: screenHeight / 60, color: currentinfosIndex === 4 ? '#C48F49' : '#fff', fontFamily: 'Bold' }}>Sign Up</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[{ right: screenWidth / 9, borderRadius: screenHeight / 30, borderColor: '#C48F49', borderWidth: screenWidth / 200, height: screenHeight / 16, width: screenWidth / 2.5, marginLeft: screenWidth / 4, backgroundColor: currentinfosIndex === informations.length - 1 ? '#fff' : '#C48F49' }]} onPress={handleNextSlide}>
                <Text style={{ fontSize: screenWidth / 25, textAlign: 'center', marginTop: screenHeight / 60, color: '#fff', fontFamily: 'Bold' }}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </View>
    </LinearGradient>

  );
};

export default RegistrationForm;
