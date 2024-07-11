import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MapScreen = ({route, navigation}) => {

  const {address, price} = route.params;
  console.log("got this address-->", address);
  console.log("got this price-->", price);

  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // Geocoding The House's Address

      try {
        const geocode = await Location.geocodeAsync(address);
        if (geocode.length > 0) {
          const { latitude, longitude } = geocode[0];
          setCoordinates({ latitude, longitude });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  },[]);

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
      {coordinates ? (
        <MapView style={styles.map} initialRegion={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
          <Marker coordinate={coordinates} >
          <MaterialCommunityIcons style={{marginLeft:screenWidth/14 }} name="hoop-house" size={screenWidth/12} color="#C48F49" />
            <View style={styles.cardContainer}>
                <Text style={styles.textInsideCard}>{price} mad</Text>
            </View>
            
          </Marker>
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#C48F49" />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  icon: {
    color: 'red', // Customize the icon style as needed
    fontSize: 24,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth/4.5,
    height: screenHeight/25,
    backgroundColor: "#C48F49",
    borderBottomRightRadius:screenWidth/20,
    borderTopLeftRadius:screenWidth/20,
    
  },
  textInsideCard: {
    fontSize:screenWidth/25,
    fontFamily:'SemiBold'
  }
});

export default MapScreen;
