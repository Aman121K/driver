

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import CarRow from './Views/CarRow';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';


// import Loader from './Components/Loader';
const CarScreen = ({navigation}) => {
  
  const [loading, setLoading] = useState(false);
  const {width, height} = Dimensions.get("screen")

  const DATA = [
    {
      id: '1',
      title: 'Toyota Innova',
      price: '4599',
      uri: require('../../Image/ToyotaInnova.jpg'),
      seat_count:'7 +1 Seater'
    },
    {
      id: '2',
      title: 'MS Swift',
      price: '3599',
      uri: require('../../Image/msswift.jpeg'),
      seat_count:'4 +1 Seater'


    },
    {
      id: '3',
      title: 'Honda City',
      price: '2599',
      uri: require('../../Image/honda-city.png'),
      seat_count:'4 +1 Seater'

    },
    {
      id: '4',
      title: 'Toyota Camry',
       uri: require('../../Image/toyota-camry.png'),
      price: '2599',
      seat_count:'4 +1 Seater'
    },
  ];
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  rowClicked = (item, index) => {
    console.log(item.title, index)
    setSelectedData(item)
    setSelectedIndex(index);

  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.topBar}>
      <TouchableOpacity style={styles.topBarButton}
       onPress={() => navigation.navigate('CabScreen')}
      >
        <Image source={require('../../Image/back.png')} resizeMode='contain' style={styles.barButton
                  }> 
                  </Image> 
      </TouchableOpacity>
      <View style={styles.titleView}>
          <Text style={styles.headerText}>Dadar - Pune</Text>
          <Text style={styles.headerTextNormal}>09/01/2022 - 10/01/2022 | 06:30 AM</Text>
      </View>
      <Image resizeMode='contain' style={styles.barButton
                  }> 
        </Image> 
      <TouchableOpacity style={styles.topBarButton}>

      </TouchableOpacity>
      </View>
          <View style={styles.list}>
          <ImageBackground source={require('../../Image/bg-floral.png')} resizeMode="cover" style={styles.TopImage}>
          <FlatList
                      horizontal
                      data={DATA}
                      extraData ={selectedIndex} 
                      renderItem={
                        ({ item, index }) =>
                        
                        <CarRow
                          data= {item}
                          
                          onPress={() => this.rowClicked(item, index)}
                          selectedColor = {selectedIndex === index ? 'red' : 'black'}
                        />
                      }              
                /> 
             </ImageBackground>
            
          </View> 
          {selectedData != '' ? (<Text style={styles.bodyText}>{selectedData.title} or Equivalent</Text>) : (<Text style={styles.SelectCarText}>{selectedData.title} Select a car</Text>)}
          {selectedData != '' ? (
                 <View style={styles.mainBody}>
                 <View style={styles.bodyTextContent}>
     
                 <Text style={styles.price}>₹  {selectedData.price}</Text>
                 <Text style={styles.tax}>Exclusive GST</Text>
                 <View style={{flexDirection: 'row',alignContent: 'center',marginTop: 20, marginLeft:20}}>
                           <TextInput.Icon name="circle" size={10} color='red'/>
                          <Text style={styles.tax}>  {selectedData.seat_count}</Text>
                 </View>
                 <View style={{flexDirection: 'row',alignContent: 'center',marginTop: 20, marginLeft:20}}>
                           <TextInput.Icon name="circle" size={10} color='red'/>
                          <Text style={styles.tax}> AC</Text>
                 </View>
                 <View style={{flexDirection: 'row',alignContent: 'center',marginTop: 20, marginLeft:20}}>
                           <TextInput.Icon name="circle" size={10} color='red'/>
                          <Text style={styles.tax}>  Air Bag</Text>
                 </View>
                 </View>
                     <Image source={selectedData.uri} resizeMode='contain' style={styles.imageBody}> 
                       </Image> 
                 </View> 
                ) : null}
               {selectedData != '' ? (

               <TouchableOpacity style={styles.bottomContent}
                onPress={() => navigation.navigate('ThankuScreen')}
            >
                        <Image
                              source={require('../../Image/car.png')}
                              resizeMode='contain'

                            style={styles.imageSelectCar}
                          />
                    <Text style={styles.buttonTextStyle}>  Select Car</Text>

                </TouchableOpacity> ):null}

    </SafeAreaView>
  );
};

export default CarScreen;
const styles = StyleSheet.create({
  topBar:{
    backgroundColor: 'white',
    height: 44,
    alignItems: 'center',
    justifyContent:'center',
    alignContent: 'space-between',
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
  shadowRadius: 2,
  shadowOpacity: 0.3,
  },
  topBarButton:{
    //backgroundColor : 'red'

  },
  barButton:{
    //backgroundColor : 'red',
    width:25,
    height:25
  },
  titleView:{
    width:'80%',
    //backgroundColor: 'blue'
  },
  headerText:{
    color:'red',
    fontSize:16,
    fontWeight:'bold',
    textAlign:'center'
  },
  headerTextNormal:{
    color:'black',
    fontSize:15,
    fontWeight:'normal',
    textAlign:'center'
  },
  list: {
    height:200,
    //backgroundColor: 'yellow',
    alignItems:'center', justifyContent:'center',
  },
  mainBody: {
   // justifyContent: 'center', //Centered horizontally
    //alignItems: 'center', //Centered vertically
    flexDirection: 'row',
    alignContent: 'center',
  },
  bodyTextContent:{
    flexDirection: 'column',
    width:'40%'

  },
  price:{
    color:'red',
    fontSize:16,
    marginLeft:20,
    fontSize:30,
    fontWeight:'bold',
    textAlign:'left'
  },
  tax:{
    color:'black',
    fontSize:16,
    marginLeft:20,
    fontSize:18,
    fontWeight:'normal',
    textAlign:'left'
  },
  SelectCarText:{
    color:'black',
   margin:40,
    fontSize:16,
    fontWeight:'bold',
    textAlign:'center'
  },
  bodyText:{
    color:'black',
    marginTop:20,
    marginLeft:20,
    fontSize:16,
    fontWeight:'bold',
    textAlign:'left'
  },
  imageBody:{
    //backgroundColor : 'red',
    height:300,
    width:'60%',
    alignContent: 'center',
    
  },
  TopImage: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: "center",
    alignItems: 'center'

  },
 
 
  SectionStyle: {
    marginTop: 20,
    marginLeft:20,
    marginRight:20
  },
  buttonStyle: {
    backgroundColor: 'rgba(219, 35, 36, 1.0)',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 44,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 12,
    alignSelf: 'center',
  },
 
  bottomContent:{
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(219, 35, 36, 1.0)',
    margin:20,
    alignItems:'center',
    borderRadius: 10,
  },
  imageSelectCar:{
    width: 50,
    height: 50
  },
});