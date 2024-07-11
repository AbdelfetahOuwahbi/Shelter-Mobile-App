import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, Image, ImageBackground, ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
import { Server } from '../ServerIP';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, FontAwesome, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function FullReport({route, navigation }) {

    const { admin_id, jwtToken, costumer_id, provider_id, title, reason} = route.params;



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
    <View style={styles.container}>
        <TouchableOpacity onPress={() => {navigation.navigate('Dashboard', {user_id : admin_id, jwtToken : jwtToken})}} style={{marginBottom: screenHeight/10, marginRight: screenWidth/1.4}}>
        <Icon name='arrow-left' size={screenWidth/12} color={'#C48F49'} />
        </TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.title}>● Report Made by Costumer With ID : {costumer_id} against Provider With ID : {provider_id} </Text>
        <Text style={styles.title2}>Title : {title} </Text>
        <Text style={styles.body}>Reason : {reason} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: screenWidth/40,
    padding: screenWidth/20,
    width: screenWidth/1.2,
    height: screenHeight/1.5,
    shadowColor: 'grey',
    shadowOffset: { width: screenWidth/10, height: screenHeight/50 },
    shadowOpacity: 0.2,
    shadowRadius: screenWidth/20,
    elevation: screenWidth/100,

  },
  title: {
    fontSize: screenWidth/22,
    fontFamily: 'Black',
    
  },
  title2: {
    marginTop: screenHeight/40,
    fontSize: screenWidth/24,
    fontFamily: 'Bold',
    
  },
  body: {
    marginTop: screenHeight/20,
    fontSize: screenWidth/25,
    fontFamily: 'SemiBold',
  },
});
