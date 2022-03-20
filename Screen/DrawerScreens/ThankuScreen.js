

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


// import Loader from './Components/Loader';
const ThankuScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const {width, height} = Dimensions.get("screen")
  const passwordInputRef = createRef();

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
    <View style={styles.mainBody}>
    {/* <Loader loading={loading} /> */}

          <TouchableOpacity style={{ width: '100%', height:'100%', backgroundColor:'white'}}
           onPress={() => navigation.navigate('HomeScreen')}
          >
            <ImageBackground source={require('../../Image/Thanku.jpeg')} resizeMode="cover" style={styles.TopImage}>
                      
            </ImageBackground>
          </TouchableOpacity>
    <View style={styles.ContentView}>
  

    </View>
  </View>
    </SafeAreaView>
  );
};

export default ThankuScreen;
const styles = StyleSheet.create({
  
  mainBody: {
   // justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex:2,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignContent: 'space-between',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    borderWidth: 4,
    borderColor:'black',
    backgroundColor:'gray',
    justifyContent: "center",


 },
  TopImage: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: "center",
    alignItems: 'center'

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
  ContentView:{ width: '100%',
   height: '80%', 
   backgroundColor:'white',
   
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
    justifyContent: 'space-between',
    //backgroundColor:'red',
    marginLeft:20,
    marginRight:20
  }
});