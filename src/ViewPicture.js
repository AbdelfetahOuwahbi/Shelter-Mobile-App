import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, Image, ImageBackground, ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
import { Server } from './ServerIP';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, FontAwesome, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import ImageViewer from 'react-native-image-zoom-viewer';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function ViewPicture ({route, navigation}) {

    const {PictureType, pictureToSee} = route.params;

    console.log(pictureToSee);
    const ServerIP = Server;

    const images = [
        {
          url: PictureType === 'House' || PictureType === 'Cin'
            ? 'http://' + ServerIP + ':3000/' + pictureToSee
            : pictureToSee !== null 
              ? pictureToSee
              : "https://www.google.com/search?sxsrf=APwXEdceu-U-GI7MzYD1_C7hjPs3IgvSrA:1686415904887&q=userGrey&tbm=isch&sa=X&ved=2ahUKEwii_dDnlLn_AhUUVaQEHWoYBjYQ0pQJegQICRAB&biw=1366&bih=625&dpr=1#imgrc=g1S1yHroa2wmGM",
        },
      ];

        //FONTS LOADED  
        const [fontsLoaded] = useFonts({
            'Black': require('../assets/fonts/Cinzel-Black.ttf'),
            'Bold': require('../assets/fonts/Cinzel-Bold.ttf'),
            'ExtraBold': require('.././assets/fonts/Cinzel-ExtraBold.ttf'),
            'SemiBold': require('../assets/fonts/Cinzel-SemiBold.ttf'),
            'Medium': require('../assets/fonts/Cinzel-Medium.ttf'),
            'Regular': require('../assets/fonts/Cinzel-Regular.ttf'),
        });
    
        if (!fontsLoaded) {
            return null;
        }
  
    return (
      <View style={styles.container}>
        <View style={{width: screenWidth, height: screenHeight/5}}>
        <View style={{marginTop: screenHeight/15, marginLeft: screenWidth/20}}>
            <Text style={{fontSize: screenWidth/20, fontFamily: 'Black', color:'#fff'}}>{`${PictureType} Picture`}</Text>
        </View>
        </View>

        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <ImageViewer
          imageUrls={images}
          renderIndicator={() => null}
          style={styles.imageViewer}
        />
        </View>
     
       
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth, 
    height: screenHeight,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageViewer: {
    width: screenWidth,
    height: screenHeight,
    bottom: screenHeight/15
  },
});

