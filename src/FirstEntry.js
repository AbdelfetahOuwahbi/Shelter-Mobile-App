import React, {useState, useRef} from 'react';
import { Text, View, FlatList, Animated, TouchableOpacity, Dimensions } from 'react-native';
import EntrySlides from './EntrySlides';
import EntryItem from './EntryItem';
import EntryPaginator from './EntryPaginator';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function FirstEntry({navigation}) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const ScrollX = useRef( new Animated.Value(0)).current;
    const slidesRef = useRef(null);   

    const viewableItemChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50 }).current; 

    const renderNextButton = () => {
        if (currentIndex === EntrySlides.length - 1) {
          return (
            <TouchableOpacity style={{bottom:screenHeight/80, marginLeft:screenWidth/2.1, borderRadius:screenWidth/30, width:screenWidth/2, height:screenHeight/22, backgroundColor:'brown', alignItems:'center', justifyContent:'center'}}
                              onPress={() => {navigation.navigate('Welcoming')}}>
              <Text style={{fontSize:20, fontFamily:'ExtraBold'}}>Get Started</Text>
            </TouchableOpacity>
          );
        }
        return null;
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
        <LinearGradient
          colors={['#5b3d08', '#3d1e08']}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <View style={{ flex: 3 }}>
            <FlatList
              data={EntrySlides}
              renderItem={({ item }) => <EntryItem item={item} />}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              bounces={false}
              keyExtractor={(item) => item.id}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: ScrollX } } }], {
                useNativeDriver: false,
              })}
              scrollEventThrottle={32}
              onViewableItemsChanged={viewableItemChanged}
              viewabilityConfig={viewConfig}
              ref={slidesRef}
            />
          </View>
    
          <EntryPaginator data={EntrySlides} scrollX={ScrollX} />
          
          {renderNextButton()}
    
        </LinearGradient>
      );
    }
