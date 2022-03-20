

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image} from 'react-native';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get("screen")

const CarRow = ({data, onPress, selectedColor}) => (
    
    <TouchableOpacity onPress={onPress} >
        <View style={ [styles.container, { width:width /3}]}>
                <Text style={[styles.headerText,{color:selectedColor}]}> {data.title} </Text> 
                <Image source={data.uri} resizeMode='' style={styles.CircleShape
                }> 
                </Image>                  
                <Text style={[styles.headerText,{color:selectedColor}]}>₹ {data.price} </Text>
                <Text style={[styles.headerText,{color:selectedColor}]}>Exclusive GST</Text>
        </View>
  </TouchableOpacity>
);

export default CarRow;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: "#e5e5e5",
    },
    
    headerText: {
        fontSize: 14,
        textAlign: "center",
         marginTop: 5,
         marginBottom: 5,
        fontWeight: "normal"
      }, 
      CircleShape: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
       // backgroundColor: '#FF9800',
        borderColor: 'black',
        borderWidth:2
      },
      priceText: {
        fontSize: 14,
        textAlign: "center",
         marginTop: 20,
        fontWeight: "bold"
      }, 
      taxText: {
        fontSize: 14,
        textAlign: "center",
        fontWeight: "normal",
      }, 
   
});