

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

const BookingHistoryScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Your BookingHistory is empty
            {'\n\n'}
            This is the BookingHistory Screen
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
             
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
         
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default BookingHistoryScreen;