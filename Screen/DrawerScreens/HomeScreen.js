
// Import React and Component
import React, {useState, createRef} from 'react';
import {StyleSheet,View, TouchableOpacity, SafeAreaView, Image, Text, ScrollView} from 'react-native';
import { Dimensions } from 'react-native';

const HomeScreen =  ({navigation}) =>{
  return (
    <SafeAreaView style={{flex: 1}}>
     <ScrollView >
            
         <TouchableOpacity style={styles.CardView}
                            onPress={() => navigation.navigate('TempDriverScreen')}

         >
           <Image
                  source={require('../../Image/t_deriver.png')}
                style={styles.Logo}
              />

         </TouchableOpacity>  
         <TouchableOpacity style={styles.CardView}
                            onPress={() => navigation.navigate('DriverScreen')}

          >
              <Image
                  source={require('../../Image/p_driver.png')}
                style={styles.Logo}
              />

         </TouchableOpacity>
         <TouchableOpacity style={styles.CardView}
                                     onPress={() => navigation.navigate('CabScreen')}

         >
           <Image
                  source={require('../../Image/cab_booking.png')}
                style={styles.Logo}
              />

         </TouchableOpacity>  
      </ScrollView>
    </SafeAreaView>
  );
};


export default HomeScreen;
const styles = StyleSheet.create({
  CardView:{ 
     height: Dimensions.get('window').width / 2.4, 
     backgroundColor:'transparent',
     marginTop:10,
   
  },
Logo:{
  width: '100%' ,
  height: '100%',//Dimensions.get('window').width / 4,
  resizeMode: 'contain',
  //position: 'absolute',
  //top: 20,
  //backgroundColor: '#FFFFFF'           
},
TextStyle: {
  color: '#000',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 15,
  alignSelf: 'center',
  marginBottom: 20
},
});