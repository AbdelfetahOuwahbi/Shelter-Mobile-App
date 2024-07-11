import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback  } from 'react-native';
import { Server } from '../ServerIP';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, FontAwesome5,} from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default function Payment({route, navigation}) {
  return (
    <View style={{flex: 1, }}>
      <Text>Hello World!</Text>
    </View>
  );
}

