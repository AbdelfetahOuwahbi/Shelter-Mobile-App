import React, { useState } from 'react';
import { Text, View, StyleSheet, Animated, Dimensions, TouchableOpacity, TextInput, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Server } from '../ServerIP';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default function CreateItem({route, navigation}) {

    const {user_id, jwtToken} = route.params;

  //  console.log("Were are in CreateItem , this is the user id -->", user_id);
  //  console.log("Were are in CreateItem , this is the user JWT -->",jwtToken);


    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [picture1, setPicture1] = useState('');
    const [picture2, setPicture2] = useState('');
    const [picture3, setPicture3] = useState('');
    const [picture4, setPicture4] = useState('');
    const [price, setPrice] = useState('');

    const ServerIP = Server;

    //The Form That Will Be Sent To Backend
    const [formData, setFormData] = useState(new FormData());

    //Important for The Uniqueness Of The
    const timestamp = Date.now();
    const [isLoading, setIsLoading] = useState(false);

    const [selectedHouseType, setSelectedHouseType] = useState("");

    // Picking The First House Image

    const PickHouseImage1 = async() => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setPicture1(result.assets[0].uri);
         // console.log(result.assets);
          const uri = result.assets[0].uri;
          const fileExtension = uri.split('.').pop();

          for (let i = 0; i < formData._parts.length; i++) {
            const [key, value] = formData._parts[i];
            if (key === 'image1') {
              formData._parts = formData._parts.filter(([key, value]) => key !== "image1");
            }else if(key === 'user_id'){
              formData._parts = formData._parts.filter(([key, value]) => key !== "user_id");
            }else if(key === 'city'){
              formData._parts = formData._parts.filter(([key, value]) => key !== "city");
            }else if(key === 'price'){
              formData._parts = formData._parts.filter(([key, value]) => key !== "price");
            }else if(key === 'address'){
              formData._parts = formData._parts.filter(([key, value]) => key !== "address");
            }else if(key === 'description'){
              formData._parts = formData._parts.filter(([key, value]) => key !== "description");
            }else{
              console.log("Image1 and Other Informations Were not Found..")
            }
          }


          formData.append('image1', {
            uri,
            type: `image/${fileExtension}`,
            name: `image_${timestamp}.${fileExtension}`,
          });
    
          formData.append('user_id', user_id);
          formData.append('city', city.toLowerCase());
          formData.append('address', address);
          formData.append('description', description);
          formData.append('price', price);
          formData.append('houseType', selectedHouseType);

          setFormData(formData);

        } else {
          console.log("Image1 Was Not Selected !!");
        }
      } catch (error) {
        console.log(error);
      }
    };


    
    // Picking The Second House Image

    const PickHouseImage2 = async() => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setPicture2(result.assets[0].uri);
         // console.log(result.assets);
          const uri = result.assets[0].uri;
          const fileExtension = uri.split('.').pop();

          for (let i = 0; i < formData._parts.length; i++) {
            const [key, value] = formData._parts[i];
            if (key === 'image2') {
              formData._parts = formData._parts.filter(([key, value]) => key !== "image2");
            }else{
              console.log("Image2 Was not Found..")
            }
          }


          formData.append('image2', {
            uri,
            type: `image/${fileExtension}`,
            name: `image_${timestamp}.${fileExtension}`,
          });
    
          setFormData(formData);
        } else {
          console.log("Image2 Was Not Selected !!");
        }
      } catch (error) {
        console.log(error);
      }
    };


    
    // Picking The Third House Image

    const PickHouseImage3 = async() => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setPicture3(result.assets[0].uri);
         // console.log(result.assets);
          const uri = result.assets[0].uri;
          const fileExtension = uri.split('.').pop();

          for (let i = 0; i < formData._parts.length; i++) {
            const [key, value] = formData._parts[i];
            if (key === 'image3') {
              formData._parts = formData._parts.filter(([key, value]) => key !== "image3");
            }else{
              console.log("Image3 Was not Found..")
            }
          }


          formData.append('image3', {
            uri,
            type: `image/${fileExtension}`,
            name: `image_${timestamp}.${fileExtension}`,
          });
    
          setFormData(formData);
        } else {
          console.log("Image1 Was Not Selected !!");
        }
      } catch (error) {
        console.log(error);
      }
    };


    
    // Picking The Fourth House Image

    const PickHouseImage4 = async() => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setPicture4(result.assets[0].uri);
         // console.log(result.assets);
          const uri = result.assets[0].uri;
          const fileExtension = uri.split('.').pop();

          for (let i = 0; i < formData._parts.length; i++) {
            const [key, value] = formData._parts[i];
            if (key === 'image4') {
              formData._parts = formData._parts.filter(([key, value]) => key !== "image4");
            }else{
              console.log("Image4 Was not Found..")
            }
          }


          formData.append('image4', {
            uri,
            type: `image/${fileExtension}`,
            name: `image_${timestamp}.${fileExtension}`,
          });
    
          setFormData(formData);
        } else {
          console.log("Image4 Was Not Selected !!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    //Sending The Data To The Database

    const CreateItem = async() => {
      setIsLoading(true);
      //Displaying The Final Content Of the FormData
      console.log("last content of the form Data --> ",formData);

      if (!city || !address || !description || !price || !selectedHouseType) {
        Alert.alert("Informations Less Than Expected !!", "All Informations Are Required..");
      } else if (!picture1 || !picture2 || !picture3 || !picture4) {
        Alert.alert("Pictures Less Than Expected !!", "All Pictures Are Required..");
      } else{

          try {
            const response = await fetch("http://"+ServerIP+":3000/CreateItem", {
              method:'POST',
              headers:'multipart/form-data',
              body:formData,
            });
    
            const data = await response.json();
            
            if (data.message === "Item Created Successfuly..") {
              console.log(data.message);
              setIsLoading(false);
              Alert.alert("Congrats..", data.message);
              navigation.navigate("Home", {user_id : user_id, jwtToken : jwtToken});
            } else {
              setIsLoading(false);
              Alert.alert("Ooh Sorry..", data.message);
            }

          } catch (error) {
            console.log(error);
          }
      //   }
      // }
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
    <View style={{ width: screenWidth, height: screenHeight, flex: 1 }}>
      <View style={{ width: screenWidth, height: screenHeight / 7 }}>
        <View style={{ flexDirection: 'column', marginTop: screenHeight / 15, marginLeft: screenWidth / 20 }}>
          <TouchableOpacity onPress={() => { navigation.navigate('Profile', { user_id: user_id, jwtToken: jwtToken }) }} style={{ bottom: screenHeight / 100, marginLeft: screenWidth / 40 }}>
            <Icon name='arrow-left' size={screenWidth / 14} color={'#C48F49'} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Text style={{ fontSize: screenWidth / 16, fontFamily: 'Black', color: '#C48F49' }}> Create An Item :</Text>
          </View>
        </View>
      </View>

      <View style={{ width: screenWidth, height: 5.3 * screenHeight / 7 }}>
        <ScrollView>

          <View style={{ marginLeft: screenWidth / 20, flexDirection: 'column' }}>
            <View style={{ justifyContent: 'center', width: screenWidth / 1.1, height: screenHeight / 14, marginTop: screenHeight / 30, borderWidth: screenWidth / 250, borderRadius: screenWidth / 20, borderColor: '#C48F49' }}>

              <TextInput
                placeholder='Type The City Where the house is Located'
                onChangeText={text => setCity(text)}
                value={city}
                style={{ marginLeft: screenWidth / 30, fontSize: screenWidth / 28, fontFamily: 'Medium' }}
              />
            </View>

            <View style={{ justifyContent: 'center', width: screenWidth / 1.1, height: screenHeight / 14, marginTop: screenHeight / 50, borderWidth: screenWidth / 250, borderRadius: screenWidth / 20, borderColor: '#C48F49' }}>

              <TextInput
                placeholder='Type The Address Of the House'
                onChangeText={text => setAddress(text)}
                value={address}
                style={{ marginLeft: screenWidth / 30, fontSize: screenWidth / 28, fontFamily: 'Medium' }}
              />
            </View>

            <View style={{ marginTop: screenHeight / 50, marginLeft: screenWidth / 30, flexDirection: 'column' }}>
              <Text style={{ fontSize: screenWidth / 26, fontFamily: 'SemiBold' }}>Enter A Description That can atract Costumers </Text>

              <Text style={{ fontSize: screenWidth / 30, fontFamily: 'Regular' }}>(Talk about the house, the location, the price....) </Text>
            </View>

            <View style={{ justifyContent: 'center', width: screenWidth / 1.1, height: screenHeight / 6, marginTop: screenHeight / 100, borderWidth: screenWidth / 250, borderRadius: screenWidth / 20, borderColor: '#C48F49' }}>

              <TextInput
                placeholder='Type The Description Here ...'
                onChangeText={text => setDescription(text)}
                value={description}
                style={{ marginLeft: screenWidth / 30, fontSize: screenWidth / 28, fontFamily: 'Medium', width: screenWidth / 1.2, height: screenHeight / 6.5, textAlignVertical: 'top' }}
                multiline={true}
                maxLength={450}
              />
            </View>

            <View style={{ justifyContent: 'center', width: screenWidth / 1.1, height: screenHeight / 14, marginTop: screenHeight / 50, borderWidth: screenWidth / 250, borderRadius: screenWidth / 20, borderColor: '#C48F49' }}>

              <TextInput
                placeholder='Type The Price Of the Rent in ( MAD )'
                onChangeText={text => setPrice(text)}
                value={price}
                style={{ marginLeft: screenWidth / 30, fontSize: screenWidth / 28, fontFamily: 'Medium' }}
              />
            </View>
          </View>

          <View style={{ marginTop: screenHeight / 40, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: screenWidth / 26, fontFamily: 'Medium' }}>select the type of house you'd like to add</Text>
            <View style={{ paddingBottom: screenHeight / 80, marginTop: screenHeight / 70, flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { setSelectedHouseType("room") }} style={{ alignItems: 'center', width: screenWidth / 3.5, height: screenHeight / 17, backgroundColor: selectedHouseType === "room" ? "#C48F49" : "#fff", borderColor: '#C48F49', borderWidth: screenWidth / 200, borderRadius: screenWidth / 10 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: screenWidth / 30, color: selectedHouseType === "room" ? "#fff" : "#C48F49" }}>room</Text>
                  <Ionicons name="md-bed" size={screenWidth / 15} color={selectedHouseType === "room" ? "#fff" : "#C48F49"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelectedHouseType("see side") }} style={{ alignItems: 'center', marginLeft: screenWidth / 40, width: screenWidth / 3.5, height: screenHeight / 17, backgroundColor: selectedHouseType === "see side" ? "#C48F49" : "#fff", borderColor: '#C48F49', borderWidth: screenWidth / 200, borderRadius: screenWidth / 10 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: screenWidth / 30, color: selectedHouseType === "see side" ? "#fff" : "#C48F49" }}>sea side</Text>
                  <Icon name='water' size={screenWidth / 15} color={selectedHouseType === "see side" ? "#fff" : "#C48F49"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelectedHouseType("pool") }} style={{ alignItems: 'center', marginLeft: screenWidth / 40, width: screenWidth / 3.5, height: screenHeight / 17, backgroundColor: selectedHouseType === "pool" ? "#C48F49" : "#fff", borderColor: '#C48F49', borderWidth: screenWidth / 200, borderRadius: screenWidth / 10 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: screenWidth / 30, color: selectedHouseType === "pool" ? "#fff" : "#C48F49" }}>pool</Text>
                  <MaterialCommunityIcons name="pool" size={screenWidth / 15} color={selectedHouseType === "pool" ? "#fff" : "#C48F49"} />
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: screenHeight / 40, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { setSelectedHouseType("riad") }} style={{ alignItems: 'center', width: screenWidth / 3.5, height: screenHeight / 17, backgroundColor: selectedHouseType === "riad" ? "#C48F49" : "#fff", borderColor: '#C48F49', borderWidth: screenWidth / 200, borderRadius: screenWidth / 10 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: screenWidth / 30, color: selectedHouseType === "riad" ? "#fff" : "#C48F49" }}>Riad</Text>
                  <MaterialCommunityIcons name="greenhouse" size={screenWidth / 15} color={selectedHouseType === "riad" ? "#fff" : "#C48F49"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelectedHouseType("cabane") }} style={{ alignItems: 'center', marginLeft: screenWidth / 40, width: screenWidth / 3.5, height: screenHeight / 17, backgroundColor: selectedHouseType === "cabane" ? "#C48F49" : "#fff", borderColor: '#C48F49', borderWidth: screenWidth / 200, borderRadius: screenWidth / 10 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: screenWidth / 30, color: selectedHouseType === "cabane" ? "#fff" : "#C48F49" }}>cabane</Text>
                  <MaterialCommunityIcons name="hoop-house" size={screenWidth / 15} color={selectedHouseType === "cabane" ? "#fff" : "#C48F49"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelectedHouseType("farm") }} style={{ alignItems: 'center', marginLeft: screenWidth / 40, width: screenWidth / 3.5, height: screenHeight / 17, backgroundColor: selectedHouseType === "farm" ? "#C48F49" : "#fff", borderColor: '#C48F49', borderWidth: screenWidth / 200, borderRadius: screenWidth / 10 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: screenWidth / 30, color: selectedHouseType === "farm" ? "#fff" : "#C48F49" }}>farm</Text>
                  <MaterialCommunityIcons name="home-assistant" size={screenWidth / 15} color={selectedHouseType === "farm" ? "#fff" : "#C48F49"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ marginTop: screenHeight / 80, marginLeft: screenWidth / 10 }}>
            <Text style={{ fontSize: screenWidth / 26, fontFamily: 'Medium' }}>Pick 4 pictures of the House :</Text>
          </View>

          <View style={{ marginTop: screenHeight / 80, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ flexDirection: 'column' }}>
              <TouchableOpacity onPress={PickHouseImage1} style={{ alignItems: 'center', justifyContent: 'center', borderRadius: screenWidth / 20, borderWidth: screenWidth / 200, borderColor: '#C48F49', width: screenWidth / 2.8, height: screenHeight / 17 }}>
                {picture1 ? (
                  <Image
                    source={{ uri: picture1 }}
                    style={{ width: screenWidth / 2.8, height: screenHeight / 17, borderRadius: screenWidth / 20 }}
                    resizeMode='cover'
                  />
                ) : (
                  <Entypo name='images' size={screenWidth / 14} color={'#C48F49'} />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={PickHouseImage2} style={{ alignItems: 'center', justifyContent: 'center', borderRadius: screenWidth / 20, marginTop: screenHeight / 80, borderWidth: screenWidth / 200, borderColor: '#C48F49', width: screenWidth / 2.8, height: screenHeight / 17 }}>
                {picture2 ? (
                  <Image
                    source={{ uri: picture2 }}
                    style={{ width: screenWidth / 2.8, height: screenHeight / 17, borderRadius: screenWidth / 20 }}
                    resizeMode='cover'
                  />
                ) : (
                  <Entypo name='images' size={screenWidth / 14} color={'#C48F49'} />
                )}
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'column' }}>
              <TouchableOpacity onPress={PickHouseImage3} style={{ alignItems: 'center', justifyContent: 'center', borderRadius: screenWidth / 20, borderWidth: screenWidth / 200, borderColor: '#C48F49', width: screenWidth / 2.8, height: screenHeight / 17 }}>
                {picture3 ? (
                  <Image
                    source={{ uri: picture3 }}
                    style={{ width: screenWidth / 2.8, height: screenHeight / 17, borderRadius: screenWidth / 20 }}
                    resizeMode='cover'
                  />
                ) : (
                  <Entypo name='images' size={screenWidth / 14} color={'#C48F49'} />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={PickHouseImage4} style={{ alignItems: 'center', justifyContent: 'center', borderRadius: screenWidth / 20, marginTop: screenHeight / 80, borderWidth: screenWidth / 200, borderColor: '#C48F49', width: screenWidth / 2.8, height: screenHeight / 17 }}>
                {picture4 ? (
                  <Image
                    source={{ uri: picture4 }}
                    style={{ width: screenWidth / 2.8, height: screenHeight / 17, borderRadius: screenWidth / 20 }}
                    resizeMode='cover'
                  />
                ) : (
                  <Entypo name='images' size={screenWidth / 14} color={'#C48F49'} />
                )}
              </TouchableOpacity>
            </View>
          </View>


        </ScrollView>

      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <TouchableOpacity onPress={CreateItem} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 1.02, height: screenHeight / 18, backgroundColor: '#C48F49', borderRadius: screenWidth / 20 }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#C48F49" />
          ) : (
            <Text style={{ fontFamily: 'Medium', fontSize: screenWidth / 18, color: '#fff' }}>Submit Item</Text>
          )}
        </TouchableOpacity>
      </View>

    </View>
  );
}
