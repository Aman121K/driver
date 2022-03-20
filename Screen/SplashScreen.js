

// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  View,
  StyleSheet,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
     // Check if user_id is set or not
    //  If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('userData').then((value) =>
        navigation.replace(
          value === null ? 'Auth' : 'RootTabBar'
        ),
      );
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
          <ImageBackground source={require('../Image/splash-screen.png')} resizeMode="cover" style={styles.image}>
            <Image
                source={require('../Image/logo.png')}
              style={{ width: '70%', resizeMode: 'contain', margin: 10, justifyContent: "center", alignItems: 'center', flex: 1,
            }}
            />
      
         </ImageBackground>
     
     
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center'

  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems:'center'

  },

});