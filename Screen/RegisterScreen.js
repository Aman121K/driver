
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
  Alert,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import APIKit, {setClientToken} from '../shared/APIKit';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from './Components/Loader';

const RegisterScreen = ({navigation}) => {
  const [name, setUserName] = useState('');
  const [email, setUserEmail] = useState('');
  const [mobile, setUserPhone] = useState('');
  const [password, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const {width, height} = Dimensions.get("screen")
  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!email) {
      alert('Please fill Email');
      return;
    }
    if (!password) {
      alert('Please fill Password');
      return;
    }
    if (!name) {
      alert('Please fill email');
      return;
    }
    if (!mobile) {
      alert('Please fill email');
      return;
    }
    setLoading(true);
   

    const payload = {name, email, mobile, password};
    console.log(payload);

   const onSuccess = ({data}) => {
     // Set JSON Web Token on success
     setLoading(false);

     console.log(data);
     if(data.status == true){
        setTimeout(() => {
          // Alert.alert('Oops!', error.message);
          Alert.alert('Success!', data.message);
        }, 100);
        navigation.navigate('LoginScreen')
     }else{
        setTimeout(() => {
          // Alert.alert('Oops!', error.message);
          Alert.alert('Success!', data.message);
        }, 100);
     }

   };

   const onFailure = error => {
     //console.log("!!!!----message",error.data.message);
     setLoading(false);
     console.log("!!!!----Error",error);
     console.log("!!!!----Error Response", error.response);
     console.log("!!!!----error.response.data",error.response.data);
     console.log("!!!!----error.response.status",error.response.status);
     console.log("!!!!----headers",error.response.headers);      
     setTimeout(() => {
          // Alert.alert('Oops!', error.message);
           Alert.alert('Oops!', 'User id or password incorrect');
     }, 100);
   };

   // Show spinner when call is made
   //this.setState({isLoading: true});

   APIKit.post('/Auth/signup', payload)
     .then(onSuccess)
     .catch(onFailure);
  
  };
  const handleNameChange = name => {
    setUserName(name);
  };
  const handleEmaileChange = email => {
    setUserEmail(email);
  };
  const handlePhoneChange = mobile => {
    setUserPhone(mobile);
  };
  const handlePasswordChange = password => {
    setUserPassword(password);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      
      <View style={styles.mainBody}>
      <Loader loading={loading} />

      <View style={{ width: '100%', height:height / 4, backgroundColor:'black'}}>
        <ImageBackground source={require('../Image/login-bg.png')} resizeMode="cover" style={styles.TopImage}>
                  <Image
                      source={require('../Image/logo.png')}
                    style={styles.Logo}
                  />
         </ImageBackground>
      </View>
      <View style={styles.ContentView}>
      <ScrollView keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flex: 1,
              
              justifyContent: 'center',
              alignContent: 'center',
            }}>             
            <View >
              <Text
                  style={{
                    color: 'rgba(219, 35, 36, 1.0)',
                    fontWeight: 'bold',
                    fontSize: 18,
                    padding: 10,
                  }}
                 >
                 Register
                </Text>
                <View style={styles.SectionStyle}>
                    <TextInput
                      mode="outlined"
                      value={name}
                      label="Name"
                      autoCapitalize="none"
                      placeholder="Enter name"
                      theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
                      maxLength={50}
                      onChangeText={handleNameChange}

                      //right={<TextInput.Affix text="/100" />}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                      mode="outlined"
                      autoCapitalize="none"
                      value={email}
                      label="Email"
                      placeholder="Enter email"
                      theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
                      maxLength={50}
                      keyboardType = 'email-address'
                      onChangeText={handleEmaileChange}

                      //right={<TextInput.Affix text="/100" />}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                      mode="outlined"
                      label="Phone number"
                      autoCapitalize="none"
                      value={mobile}
                      placeholder="Enter phone number"
                      theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
                      maxLength={10}
                      keyboardType = 'default'
                      onChangeText={handlePhoneChange}

                      //right={<TextInput.Affix text="/100" />}
                    />
                </View>
                <View style={styles.SectionStyle}>
                  <TextInput
                        mode="outlined"
                        label="Password"
                        autoCapitalize="none"
                        
                        autoCorrect = {false}
                        value={password}
                        placeholder="Enter password"
                        theme={{ colors: { primary: 'red',underlineColor:'red',}}}
                        secureTextEntry
                        right={<TextInput.Icon name="eye" />}
                        onChangeText={handlePasswordChange}

                  />
                </View>
                {errortext != '' ? (
                  <Text style={styles.errorTextStyle}>
                    {errortext}
                  </Text>
                ) : null}
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={handleSubmitPress}>
                  <Text style={styles.buttonTextStyle}>Register</Text>
                </TouchableOpacity>
                <View style={styles.bottomContent}>
                  <Text
                   style={styles.registerTextStyle}
                   onPress={() => navigation.navigate('LoginScreen')}>
                    
                 </Text>
                 <Text
                   style={styles.registerTextStyle}
                   onPress={() => navigation.navigate('LoginScreen')}>
                    Already have account? Login
                 </Text>
                
                </View>
                <View
                    style={{
                      height: 30,
                      padding: 20
                    }}
                  >
                </View>
            </View>
          </ScrollView>

      </View>
    </View>

      </SafeAreaView>
    
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainBody: {
   // justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex:2,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignContent: 'space-between',
  },
  TopImage: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'space-between'
  },
  Logo:{
    width: '50%', 
    height: '30%',
    resizeMode: 'contain',
    justifyContent: "flex-start",
    position: 'absolute',
    right: 1,
    top: 20,
    //backgroundColor: '#FFFFFF'           
  },
  ContentView:{ width: '90%',
   height: '70%', 
   backgroundColor:'white',
   marginTop:-40, 
   borderRadius: 15,  
   shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
  shadowRadius: 5,
  shadowOpacity: 0.5
},
  SectionStyle: {
    marginTop: 10,
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 12,
  },
  bottomContent:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor:'red',
    marginLeft:20,
    marginRight:20
  }
});