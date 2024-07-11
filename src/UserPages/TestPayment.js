import React, { useRef, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Animated, Dimensions, TouchableOpacity, TextInput, Image, ScrollView, KeyboardAvoidingView, Alert, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Server } from '../ServerIP';
import { AddPayoutMethod } from './AddPayoutMethod';

export default function TestPayment({onNonceRetrieved}) {
  
    return (
        <AddPayoutMethod
        onNonceRetrieved={async (nonce) => {
          const response = await fetch(`http://${HOST}:3000/createPaymentTransaction`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({'amount': 10, 'nonce': nonce,})
          });
          const { isCardVerified, errorText } = await response.data;
          Alert.alert(isCardVerified ? "Card verified successfully" : `Card verification error - ${errorText}`);
        }}
      />
    )
  }
