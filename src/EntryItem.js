import React from 'react';
import { Text, View, FlatList, Image, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default EntryItem = ({item}) => {
  return (
    <View style={{justifyContent:'center', alignItems:'center', width:screenWidth}}>
        <Image source={item.image} style={{marginBottom:screenHeight/10, alignItems:'center', justifyContent:'center', width:screenWidth/1.1, height:screenHeight/1.8}}/>
        <View style={{}}>
            <Text style={{fontFamily: 'Black', fontSize:screenWidth/15, marginBottom:screenHeight/40, color:'#fff', textAlign:'center'}}>{item.title}</Text>
            <Text style={{fontFamily: 'Medium', fontSize:screenWidth/22, marginBottom:screenHeight/40, paddingHorizontal:20, color:'#fff', textAlign:'center'}}>{item.description}</Text>
        </View>
       </View>
  );
}
