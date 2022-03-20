

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';


// import Loader from './Components/Loader';
const CabScreen =  ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const {width, height} = Dimensions.get("screen")
  const passwordInputRef = createRef();


  const [isLocal, setIsLocal] = useState(false);
  const [isOneWay, setIsOneWay] = useState(true);


  const [dutyHour, setDutyHour] = useState ('');

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    let dataToSend = {email: userEmail, password: userPassword};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === 'success') {
          AsyncStorage.setItem('user_id', responseJson.data.email);
          console.log(responseJson.data.email);
          navigation.replace('DrawerNavigationRoutes');
        } else {
          setErrortext(responseJson.msg);
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>

          <View style={[styles.TopContent]}>
            {/* Out Station / One Way */}
               <TouchableOpacity 
                onPress={() => setIsLocal(false)}
                style={[styles.TopButton,{backgroundColor: isLocal ? 'black' : 'red', width:'50%'}]}>
                  <Image
                        source={require('../../Image/out-staion.png')}
                        resizeMode='contain'
                        style={styles.iconTop}
                    />
                    <Text style={{color: '#FFFFFF', fontWeight: 'bold',}}>Out Station</Text>
                </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setIsLocal(true)}
                style={[styles.TopButton,{backgroundColor: isLocal ? 'red' : 'black', width:'50%'}]}>
                  <Image
                        source={require('../../Image/local.png')}
                        resizeMode='contain'
                        style={styles.iconTop}
                    />                
                    <Text style={{color: '#FFFFFF', fontWeight: 'bold',}}>  Local</Text>
              </TouchableOpacity>
              
          </View>
            { !isLocal ?
             <View style={styles.TripSegment}>
              <TouchableOpacity
                  style={[styles.OneWayStyle,{backgroundColor: isOneWay ? 'yellow': 'white'}]}
                  activeOpacity={0.5}
                  onPress={() => setIsOneWay(true)}>
                  <Text style={[{color: isOneWay ? 'red' : 'black', width:'50%'}]}>One Way</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.OneWayStyle,{backgroundColor: isOneWay ? 'white' : 'yellow'}]}
                  activeOpacity={0.5}
                  onPress={() => setIsOneWay(false)}>
                  <Text style={[{color: isOneWay ? 'black' : 'red', width:'50%'}]}>Round Trip</Text>
                </TouchableOpacity>
             </View>
            :
            null  
          }
         
      <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              //flex: 1,

            }}>
              {
                isLocal ?

                    
                    <View style={{flexDirection: 'column'}}>
                           <View style={styles.SectionStyle}>
                                <TextInput
                                  mode="outlined"
                                  label="City"
                                  //value='Ranjan'
                                  placeholder="Select City"
                                  theme={{ colors: { primary: 'red',underlineColor:'yellow', accent:'red'}}}
                                  maxLength={10}
                                  keyboardType = 'default'
                                  />
                            </View>
                            <View style={styles.SectionStyle}>

                         <Text style={{marginLeft:10, marginBottom:10,   fontWeight: 'bold'}}>Duty Hours</Text>

                         <View style={{flexDirection: 'row'}}>
                           <TouchableOpacity style={styles.radioButton} onPress={() => setDutyHour('2')}>
                               <Ionicons name={dutyHour === '2' ? 'radio-button-on': 'radio-button-off-sharp'} size={20} color={'red'} />
                               <Text style={{marginLeft:10}}>2 Hrs</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.radioButton} onPress={() => setDutyHour('4')}>
                               <Ionicons name={dutyHour === '4' ? 'radio-button-on': 'radio-button-off-sharp'} size={20} color={'red'} />
                               <Text style={{marginLeft:10}}>4 Hrs</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  style={styles.radioButton} onPress={() => setDutyHour('6')} >
                                <Ionicons name={dutyHour === '6' ? 'radio-button-on': 'radio-button-off-sharp'} size={20} color={'red'} />
                                <Text style={{marginLeft:10}}>6 Hrs</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.radioButton} onPress={() => setDutyHour('8')} >
                                <Ionicons name={dutyHour === '8' ? 'radio-button-on': 'radio-button-off-sharp'} size={20} color={'red'} />
                                <Text style={{marginLeft:10}}>8 Hrs</Text>
                            </TouchableOpacity>
                     </View>
                     </View>
                </View>
                :
                <View >
                <KeyboardAvoidingView enabled>
                  <View style={styles.SectionStyle}>
                      <TextInput
                        mode="outlined"
                        label="From Location"
                        //value='Ranjan'
                        placeholder="Select Pick Up"
                        theme={{ colors: { primary: 'red',underlineColor:'yellow', accent:'red'}}}
                        maxLength={10}
                        keyboardType = 'default'
  
                        //right={<TextInput.Icon name="chevron-down" />}                   
                         />
                  </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                          mode="outlined"
                          label="To Location"
                          placeholder="Select Drop"
                          theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
                          maxLength={10}
                          keyboardType = 'default'
                          //right={<TextInput.Icon name="chevron-down" />}                   
  
                        />
                    </View>
                
                  
                  
                  <View style={styles.DateTimeContent}>
                    <View style={styles.SectionStyleBottom}>
                        <TextInput
                          mode="outlined"
                          label="Pick up  Date"
                          placeholder="Pick up Date"
                          theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
                          maxLength={10}
                          keyboardType = 'default'
  
                          right={<TextInput.Icon name="calendar" />}                   
                        />
                    </View>
                    {
                    isOneWay ?
                    
                       <View style={styles.SectionStyleBottom}>
                        <TextInput
                          mode="outlined"
                          label="Pick up  time"
                          placeholder="Pick up time"
                          theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
                          maxLength={10}
                          keyboardType = 'default'
  
                          right={<TextInput.Icon name="clock" />}                   
                        />
                       </View>
                    
                     :
                      <View style={styles.SectionStyleBottom}>
                        <TextInput
                          mode="outlined"
                          label="Return Date"
                          placeholder="Return Date"
                          theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
                          maxLength={10}
                          keyboardType = 'default'
  
                          right={<TextInput.Icon name="calendar" />}                   
                        />
                      </View>
                     }
          
                  </View>
                  {!isOneWay ? 
                    <View style={styles.DateTimeContent}>
                          <View style={styles.SectionStyleBottom}>
                          <TextInput
                            mode="outlined"
                            label="Pick up  time"
                            placeholder="Pick up time"
                            theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
                            maxLength={10}
                            keyboardType = 'default'
  
                            right={<TextInput.Icon name="clock" />}                   
                          />
                        </View>
                        <View>
  
                        </View>
                    </View>
                   :
                   null
                  }
                  
                </KeyboardAvoidingView>
                </View>
            
              }
            
          </ScrollView>
          <View>

          <TouchableOpacity style={styles.bottomContent}
           onPress={() => navigation.navigate('CarScreen')}
          >
                 <Image
                            source={require('../../Image/car.png')}
                            resizeMode='contain'

                          style={styles.iconTop}
                        />
                   <Text style={styles.buttonTextStyle}>  Select Car</Text>

               </TouchableOpacity>

          </View>

    </SafeAreaView>
  );
};

export default CabScreen;
const styles = StyleSheet.create({
  
  mainBody: {
   // justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex:2,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignContent: 'space-between',
  },
 

  SectionStyle: {
    marginTop: 20,
    marginLeft:20,
    marginRight:20
  },
  DateTimeContent:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor:'red',
    marginTop:20,
    marginLeft:20,
    marginRight:20
  },
  SectionStyleBottom: {
    width: '47%', 
  },
  bottomContent:{
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(219, 35, 36, 1.0)',
    marginTop:20,
    alignItems:'center',
  },

  TopContent:{
   // padding:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
 
  TopButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    padding:10
  },
 TopSegmentView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
   // backgroundColor:'red',
  },
  iconTop:{
    width: 50,
    height: 50
  },
  TripSegment:{
    flexDirection: 'row',
    justifyContent: 'center',
   // backgroundColor: 'white',
    margin:20,
    //borderRadius: 30,
    borderColor:'gray',
    borderWidth:2
  },
  OneWayStyle: {
    width:'50%',
    color: 'black',
    padding:10,
    alignItems:'center',
  },

  buttonTextStyle: {
    color: 'white',
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
  radioButton:{
    flexDirection:'row',margin:10,  justifyContent: 'space-between',alignContent: 'center'
  },
  
});