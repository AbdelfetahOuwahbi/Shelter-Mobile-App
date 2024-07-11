import React from 'react';
import {View, Dimensions, Animated } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default EntryPaginator = ({data, scrollX}) => {

  return (
    <View style={{flexDirection:'row', height:screenHeight/30}}>
        {data.map((_,i) => {
            const inputRange = [(i-1)*screenWidth, i*screenWidth, (i+1)*screenWidth];

            
            const dotWidth = scrollX.interpolate({

                inputRange,
                outputRange:[10,30,10],
                extrapolate: 'clamp',
            });
            const Opacity = scrollX.interpolate({

                inputRange,
                outputRange:[0.3,1,0.3],
                extrapolate: 'clamp',
            });
            return <Animated.View style={{height:screenHeight/80, width:dotWidth, opacity:Opacity, borderRadius:screenWidth/40, backgroundColor:'grey', marginHorizontal:screenWidth/55}} key={i.toString()}/>;
        })}

        </View>
 
  );
}
