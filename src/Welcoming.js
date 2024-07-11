import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground, Button, AppLoading } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Welcoming = ({navigation}) => {

    
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
    <View style={{height:screenHeight,width:screenWidth}}>

      <View style={{flex:1}}>

        <ImageBackground
          source={require('./SrcImg/WelcomingBackground.jpg')}
          style={{width:screenWidth, height:screenHeight+30 /*to be changed*/}}
        
        >
        </ImageBackground>

      </View>

<View style={{flex:0.5}}>
<View style={{bottom:screenHeight/7, right:screenWidth/4}}>

<Text style={{color:'#C48F49', fontSize:40, fontFamily:'Black', left:screenWidth/3}}>W</Text>
<Text style={{bottom:screenHeight/18.5, color:'#fff', fontSize:30, fontFamily:'Medium', left:screenWidth/2.35}}>ELCOME TO </Text>
<Text style={{color:'#C48F49', fontSize:30, fontFamily:'Black', left:screenWidth/2.96, bottom:screenHeight/20}}>SHELTER</Text>

</View>

<View style={{left:screenWidth/12, bottom:screenHeight/5.5}}>
<Text style={{width:screenWidth/1.1, color:'#fff', fontSize:15, fontFamily:'Regular',}}>We will help you get the best Shelter that you need as fast as possible</Text>
</View>

<View style={{bottom:screenHeight/7, left:screenWidth/2, borderWidth:screenWidth/250, borderColor:'#C48F49', backgroundColor:'#C48F49', borderRadius:screenWidth/20, height:screenHeight/18, width:screenWidth/2.5}}>
<TouchableOpacity onPress={()=> navigation.navigate('LoginForm')}>
  <Text style={{fontSize:22, fontFamily:'Regular', marginLeft:screenWidth/20, marginTop:screenHeight/120, color:'#fff'}}>Sign In </Text> 
  <Icon style={{left:screenWidth/3.7, bottom:screenHeight/31, color:'#fff'}} size={25} name='arrow-right'></Icon>
</TouchableOpacity>
</View>


</View>
     
      <View>
        <Image
        source={require('./SrcImg/WelcomingBackground4.png')}
        style={{width:screenWidth, height:screenHeight/1.5,top:screenHeight/16 /*to be changed*/ }}
        >

        </Image>
      </View>

    </View>
  


    
  );
};



export default Welcoming;
