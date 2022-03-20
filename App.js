// In App.js in a new project

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Import Screens
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import ForgotPasswordScreen from './Screen/ForgotPasswordScreen';
import RegisterScreen from './Screen/RegisterScreen';
import HomeScreen from './Screen/DrawerScreens/HomeScreen';
import BookingHistoryScreen from './Screen/DrawerScreens/BookingHistoryScreen';
import TempDriverScreen from './Screen/DrawerScreens/TempDriverScreen';
import ProfileScreen from './Screen/DrawerScreens/ProfileScreen';
import DriverScreen from './Screen/DrawerScreens/DriverScreen';
import CarScreen from './Screen/DrawerScreens/CarScreen';
import CabScreen from './Screen/DrawerScreens/CabScreen';
import ThankuScreen from './Screen/DrawerScreens/ThankuScreen';
//import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';
import {Button, Image} from 'react-native';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = () => {
  return (

  <Stack.Navigator initialRouteName="HomeScreen">

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home', 
          headerStyle: {
            backgroundColor: 'white', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'normal', //Set Header text style
          },
        }}
      />
       
       <Stack.Screen
        name="DriverScreen"
        component={DriverScreen}
        options={{
          title: 'Contratual Driver', 
          tabBarVisible: false,
          headerStyle: {
            backgroundColor: 'white', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'normal', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="TempDriverScreen"
        component={TempDriverScreen}
        options={{
          title: 'Temporary Driver', //Set Header Title
          headerStyle: {
            backgroundColor: 'white', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'normal', //Set Header text style
          },
          tabBarVisible: false

        }}
      />
      <Stack.Screen
        name="CabScreen"
        component={CabScreen}
        options={{
          title: 'Cab Booking', //Set Header Title
          headerStyle: {
            backgroundColor: 'white', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'normal', //Set Header text style
          },
          tabBarVisible: false

        }}

      />
      <Stack.Screen
        name="CarScreen"
        component={CarScreen}
        options={{headerShown: false}}

      />
      <Stack.Screen
        name="ThankuScreen"
        component={ThankuScreen}
        options={{headerShown: false}}

      />
    </Stack.Navigator>
  )
}
const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: 'rgba(219, 35, 36, 1.0)', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'normal', //Set Header text style
          },
        }}
      />
      
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          title: 'Forgot Password', //Set Header Title
          headerStyle: {
            backgroundColor: 'rgba(219, 35, 36, 1.0)', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'normal', //Set Header text style
          },
        }}
      />
        {<Stack.Screen
          name="RootTabBar"
          component={RootTabBar}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />}
    </Stack.Navigator>
  );
};
const RootTabBar = () => {
  return (
    <Tab.Navigator
    
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home';
        }else if (route.name === 'My Bookings') {
          iconName = focused ? 'ios-list' : 'ios-list';
        }else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
      tabBarActiveBackgroundColor:'red',
      tabBarInactiveBackgroundColor:'white',

    })}
    
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false, }} />
      <Tab.Screen name="My Bookings" component={BookingHistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RootTabBar"
          component={RootTabBar}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        {/* <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
//source ~/.bash_profile
//npx react-native run-android