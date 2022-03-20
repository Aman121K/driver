// Import React and Component
import React, { useState, createRef, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  // TextInput
} from 'react-native';
import {
  TextInput,
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
  RadioButton,
  Text
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, { setClientToken } from '../../shared/APIKit';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

// import Loader from './Components/Loader';
const DriverScreen = ({ navigation }) => {
  const [nightMode, setNightmode] = useState(false);
  const [logedInUserData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const { width, height } = Dimensions.get("screen")
  //MARK:- Reporting Address
  const [showReportingAddress, setshowReportingAddress] = useState(false);
  const [reportingAddress, setreportingAddress] = useState('');
  const [reportingAdrList, setReportingAdrList] = useState([]);
  const [showTimeDropDown1, setshowTimeDropDown1] = useState(false);
  const [showTimeDropDown2, setshowTimeDropDown2] = useState(false);
  const [showTimeDropDown3, setshowTimeDropDown3] = useState(false);
  const [returndate, setReturndate] = useState(new Date())
  const [language1,setLanguage1]=useState(false);
  const [language2,setLanguage2]=useState(false);
  const [language3,setLanguage3]=useState(false);

  //MARK:- City
  const [allCityList, setallCityList] = useState([]);
  const [address, setAddress] = useState('');
  const [showCityDropDown, setshowCityDropDown] = useState(false);
  const [city, setCity] = useState('');
  const [cityList, setCityList] = useState([]);

  const [showlocalityDropDown, setshowlocalityDropDown] = useState(false);
  const [locality, setLocality] = useState('');
  const [localityList, setLocalityList] = useState([]);
  // const [reportingAdrList, setReportingAdrList] = useState ([]); 
  const makelocalityArray = () => {
    console.log('City id', city)
    let arrFilterCt = allCityList.filter(obj => {
      return obj.city_id === city
    })
    if (arrFilterCt.length > 0) {
      let selectedCity = arrFilterCt[0]
      console.log('City', selectedCity)
      var localList = selectedCity.all_locality.map(local => ({ value: local.locality_id, label: local.locality_name }));
      console.log('localList', localList)
      setLocalityList(localList)
      setshowlocalityDropDown(true)
    }
  }

  //MARK:- CAR
  const [showCarDrpDwn, setShowCarDrpDwn] = useState(false);
  const [car, setCar] = useState('');
  const [chooseCar,setChooseCar]=useState('');
  const [previousCarList, setpreviousCarList] = useState([]);
  const [newaddress,setNewAddres]=useState();

  const [showAllCarDropDown, setshowAllCarDropDown] = useState(false);
  const [allCarList, setallCarList] = useState([]);
  const [isShowPreviousCarList, setIsShowPreviousCarList] = useState (false);

  const [showReportingDropDown, setshowReportingDropDown] = useState(false);
  const [reportingTime, setreportingTime] = useState('');
  const [jobreportingtime,setJobreportingTime]=useState();
  const [reportingTimeList, setreportingTimeList] = useState([]);
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [isreturndate, setIsReturndate] = useState(false)
  const [open, setDateOpen] = useState(false)

  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const [weeklyOff, setweeklyOff] = useState('');
  const [reportingdate, setReportingdate] = useState(new Date())
  const [isReportingdate, setIsReportingdate] = useState(false)
  const [eatingHabits, setEatingHabit] = useState('');
  const [religion,setReligion]=useState('');
  const [language,setLanguage]=useState('')
  const [carList,setCarList]=useState([]);
  const [interviewTimeFrom,setInterviewTimeFrom]=useState();
  const [interviewTimeTo,setInterviewTimeTo]=useState();
  const [dutyhours,setDutyHours]=useState();
  const [salart,setSalary]=useState('');
  const [overtime,setOverTime]=useState('');
  const [ageFrom,setAgeFrom]=useState('');
  const [ageTo,setAgeto]=useState('');
  const [reportdropdown,setreportdropdown]=useState(false);
  const weeklyOffList = [
    {
      label: "Monday",
      value: "Monday",
    },
    {
      label: "Tuesday",
      value: "Tuesday",
    },
    {
      label: "Wednesday",
      value: "Wednesday",
    },
    {
      label: "Thursday",
      value: "Thursday",
    },
    {
      label: "Friday",
      value: "Friday",
    },
    {
      label: "Saturday",
      value: "Saturday",
    },
    {
      label: "Sunday",
      value: "Sunday",
    },
  ];
  const handleSubmitPress = () => {
    setErrortext('');
    if (!address) {
      alert('Please fill address');
      return;
    }
    if (!city) {
      alert('Please select City');
      return;
    }
    if (!locality) {
      alert('Please select Locality');
      return;
    }
    if (!pincode) {
      alert('Please fill Pincode');
      return;
    }
    if (!landmark) {
      alert('Please fill Landmark');
      return;
    }    
    setLoading(true)

//     {"reporting_address":"","address":"","city":"","locality":"","pincode":"","landmark":"","customer_id":"","woff":"","religion":"",
// "language":"","reportingtime":"","cardetails":"","drivertype":"","dutyhour":"","salary":"","overtime":"",
// "interviewdate":"","interviewtimefrom":"","interviewtimeto":"","agefrom":"","ageto":"","eathabit":""}
   
    const payload = {
      "reporting_address":"1","address":address,"city":city,"locality":locality,"pincode":pincode,"landmark":landmark,"customer_id":logedInUserData.user_id,"woff":weeklyOff,"religion":religion,
"language":language,"reportingtime":"20:20","cardetails":car,"drivertype":"","dutyhour":dutyhours,"salary":salart,"overtime":overtime,
"interviewdate":reportingdate,"interviewtimefrom":interviewTimeFrom,"interviewtimeto":interviewTimeTo,"agefrom":ageFrom,"ageto":ageTo,"eathabit":eatingHabits
      // customer_id : logedInUserData.user_id, 
      // reporting_address:reportingAddress,
      // address, 
      // city, 
      // locality, 
      // pincode,
      // landmark, 
      // cardetails:"",
      // drivertype:"", 
      // dutytype:"",
      // dutyhour:dutyhours, 
      // salary:salart,
      // overtime:overtime,
      // interviewdate:reportingTime,
      // interviewtimefrom:interviewTimeFrom,
      // interviewtimeto:interviewTimeTo,
      // agefrom:ageFrom,
      // ageto:ageTo,
      // eathabit:eatingHabits

    };
     
    console.log("Save DAta is.",payload);

   const onSuccess = ({data}) => {
     setLoading(false);
     console.log("AMan data..",data);
     setTimeout(() => {
      Alert.alert('Success!');
    }, 100);
     navigation.navigate('HomeScreen')
     if(data.status == true){
    
     }else{

     }

   };
   const onFailure = error => {
    setLoading(false);
     setTimeout(() => {
      Alert.alert('Success!');
    }, 100);
     navigation.navigate('HomeScreen')
     console.log("!!!!----Error",error);
   };
   APIKit.post('/Booking/contractual_book', payload)
     .then(onSuccess)
     .catch(onFailure);
  };

  const getAllData = (userid) => {
    setErrortext('');
    setLoading(true)
    console.log("!!!!! ----- User ID: ", userid);

    const payload = { customerid: userid }
    console.log('All DATA req', payload);

    const onSuccess = ({ data }) => {
      setLoading(false);
      console.log('All DATA contractual', data);
      var carList = data.car_master.map(car => ({ value: car.id, label:  car.car_name}));
      // console.log('Car List by aman',carList);
      setCarList(carList)
      var allTm = data.all_timeslot.map(tml => ({ value: tml, label: tml }));
      console.log('Time list', allTm);
      setreportingTimeList(allTm)
      var prevAdrList = data.all_address.map(adrs => ({ value: adrs.id, label: adrs.previous_address, address: adrs.address, city: adrs.city, landmark: adrs.landmark, locality: adrs.locality, zip: adrs.zip }));
      setReportingAdrList(prevAdrList)
      // var prevCarList = data.all_car.map(prvCar => ({value: prvCar.id, label: prvCar.previous_address }))
      setallCityList(data.city_list)
      var cityList = data.city_list.map(city => ({ value: city.city_id, label: city.city_name }));
      // console.log('City list', cityList);
      setCityList(cityList)
      var prevCarList = data.all_car.map(car => ({ value: car.car_id, label:  car.car_name}));
      console.log("real data....",prevCarList);
      
      var newRd={value:data.all_car.length+1,label:'Select New Car'};
      // var newData={...prevCarList,...newRd}
      prevCarList.push(newRd)
      setpreviousCarList(prevCarList)
      //  if (prevCarList.length > 0) { 
      //   prevCarList(prevCarList)
      //   setIsShowPreviousCarList(false)
      // }
    
     
    };

    const onFailure = error => {
      //console.log("!!!!----message",error.data.message);
      setLoading(false);
      console.log("!!!!----Error", error);
      console.log("!!!!----Error Response", error.response);
      console.log("!!!!----error.response.data", error.response.data);
      console.log("!!!!----error.response.status", error.response.status);
      console.log("!!!!----headers", error.response.headers);
      setTimeout(() => {
        // Alert.alert('Oops!', error.message);
        Alert.alert('Oops!', 'User id or password incorrect');
      }, 100);
    };

    // Show spinner when call is made
    //this.setState({isLoading: true});

    APIKit.post('/Booking/previousRecord', payload)
      .then(onSuccess)
      .catch(onFailure);

  };

  const getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      console.log("!!!!! ----- User data  :-", userData);
      const data = JSON.parse(userData)
      console.log("!!!!! ----- User Obj: ", data.name, data.user_id);
      setUserData(data)
      console.log("Real User Id: ", logedInUserData.user_id);

      //2 For Assigned Task
      getAllData(data.user_id)

    } catch (error) {
      console.log("!!!!! ----- Something went wrong, while getting user token", error);
    }
  }

  useEffect(() => {
    console.log('DriverScreen loaded')
    getToken()
  }, [])

  const openLocalDatePkr = () => {
    setIsReportingdate(true)
    setIsReturndate(false)
    setDateOpen(true)
  };
  const selectMarathi=()=>{
  setLanguage('Marathi')
  setLanguage1(!language1);
  }
  const selectHindi=()=>{
    setLanguage('Hindi')
    setLanguage2(!language2);
  }
  const selectEnglish=()=>{
    setLanguage('English')
    setLanguage3(!language3);
  }
  const onSearch=(text)=>{
    console.log(text)
  }
  const selectedItemRecordsSave=(item)=>{
    setreportingAddress(item.label)
    setCity(item.city)
                  setAddress(item.address);
                  setPincode(item.zip);
                  setLocality(item.locality);
                  setLandmark(item.landmark);
                  setreportdropdown(false);
  }
  const setDate = (date) =>{
                   
    if(isReportingdate){
      setReportingdate(date)
    }else if(isreturndate){
      setReturndate(date)
    }
}
  return (
    <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{ flex: 1, margin: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View >
            <KeyboardAvoidingView enabled>
              {/* <View> */}
                {/* <View><TextInput  mode="outlined" value={reportingAddress}  onChangeText={(e)=>setreportingAddress(e)} placeholder='Reporting Address *'    right={<TextInput.Icon name="dropbox" onPress={()=>setreportdropdown(!reportdropdown)} />}   theme={{ colors: { primary: 'red', underlineColor: 'yellow', accent: 'red' } }}></TextInput></View>
                {reportdropdown?
                <View style={{borderWidth:.5,padding:10,borderRadius:10,height:100,marginTop:2}}>
                  <ScrollView>
                  {reportingAdrList.length>0 && reportingAdrList.map((item,index)=>{

                    return(
                      <TouchableOpacity key={index} onPress={()=>selectedItemRecordsSave(item)}>
                      <View >
                        <Text>{item.label}</Text>
                        </View>
                        </TouchableOpacity>
                    )
                  })}
                    </ScrollView>
                </View>
              :null} */}
               
                <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={reportingAdrList}
                search
                maxHeight={150}
                
                labelField="label"
                valueField="value"
                placeholder="Reporting Address*"
                searchPlaceholder="Search"
                value={reportingAddress}
                // renderInputSearch={(text)=>onSearch(text)}
                onChange={item => {
                  console.log("vikkkk", item);
                  setCity(item.city)
                  setAddress(item.address);
                  setPincode(item.zip);
                  setLocality(item.locality);
                  setLandmark(item.landmark);
                }}
              />
            
              {/* </View> */}
             
              <View style={styles.spacerStyle} />
              <TextInput
                mode="outlined"
                label="Address"
                value={address}
                onChangeText={(e)=>setAddress(e)}
                placeholder="Enter address"
                theme={{ colors: { primary: 'red', underlineColor: 'yellow', accent: 'red' } }}
                maxLength={50}
                keyboardType='default'
              />
              <View style={styles.spacerStyle} />
              <DropDown
                label={"City"}
                mode={"outlined"}
                visible={showCityDropDown}
                showDropDown={() => setshowCityDropDown(true)}
                onDismiss={() => setshowCityDropDown(false)}
                value={city}
                onChange={() => makelocalityArray()}
                setValue={setCity}
                list={cityList}
                placeholder={'Hello'}
                dropDownStyle={{ marginTop: 0.1 }}
                activeColor={'red'}
                theme={{ colors: { surface: 'green', primary: 'red', underlineColor: 'yellow', accent: 'red' } }}
              />
              <View style={styles.spacerStyle} />
              <DropDown
                label={"Locality"}
                mode={"outlined"}
                visible={showlocalityDropDown}
                showDropDown={() => makelocalityArray()}
                onDismiss={() => setshowlocalityDropDown(false)}
                value={locality}
                setValue={setLocality}
                list={localityList}
                dropDownStyle={{ marginTop: 0.1 }}
                activeColor={'green'}
                theme={{ colors: { surface: 'red' } }}
              />
              <View style={styles.spacerStyle} />

              <TextInput
                mode="outlined"
                label="Pin Code"
                value={pincode}
                onChangeText={(e)=>setPincode(e)}
                placeholder="Enter Pincode"
                theme={{ colors: { surface: 'green', primary: 'red', underlineColor: 'yellow', accent: 'red' } }}
                maxLength={50}
                keyboardType='number-pad'
              />

              <View style={styles.spacerStyle} />

              <TextInput
                mode="outlined"
                label="Landmark"
                value={landmark}
                onChangeText={(e)=>setLandmark(e)}
                placeholder="Enter Landmark"
                theme={{ colors: { surface: 'green', primary: 'red', underlineColor: 'yellow', accent: 'red' } }}
                maxLength={50}
                keyboardType='default'

              />

              <View style={styles.spacerStyle} />
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={previousCarList}
                maxHeight={100}
                labelField="label"
                valueField="value"
                placeholder="Select a Car *"
                searchPlaceholder="Search..."
                value={car}
                onChange={item => {
                  console.log("vikkkk", item);
                  if(item.label=='Select New Car'){
                    // Alert.alert("choose kar enable");
                    setIsShowPreviousCarList(!isShowPreviousCarList);
                  }
                  else{
                    setIsShowPreviousCarList(false)
                  }
                  // setChooseCarStatus(true);
                  // setCity(item.city)
                  // setAddress(item.address);
                  // setPincode(item.zip);
                  // setLocality(item.locality);
                  // setLandmark(item.landmark);
                }}
              />
              {/* <DropDown
                label={"Select a Car"}
                mode={"outlined"}
                visible={showCarDrpDwn}
                showDropDown={() => setShowCarDrpDwn(true)}
                onDismiss={() => setShowCarDrpDwn(false)}
                value={car}
                setValue={setCar}
                list={previousCarList}
                dropDownStyle={{ marginTop: 0.1 }}
                activeColor={'red'}
                theme={{ colors: { surface: 'green', primary: 'red', underlineColor: 'yellow', accent: 'red' } }}
              /> */}
              <View style={styles.spacerStyle} />
             {isShowPreviousCarList==true?
              <DropDown
                label={"Choose a Car"}
                mode={"outlined"}
                visible={showAllCarDropDown}
                showDropDown={() => setshowAllCarDropDown(true)}
                onDismiss={() => setshowAllCarDropDown(false)}
                value={car}
                setValue={setChooseCar}
                list={car=="Select New Car"?carList:carList}
                dropDownStyle={{ marginTop: 0.1 }}
                activeColor={'red'}
                theme={{ colors: { surface: 'green', primary: 'red', underlineColor: 'yellow', accent: 'red' } }}
              />:null}
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>Job Details</Text>
              </View>
              <View style={styles.spacerStyle} />
              <TextInput
                mode="outlined"
                label="Duty Hours"
                value={dutyhours}
                placeholder="Duty Hour"
                onChangeText={(e)=>setDutyHours(e)}
                theme={{ colors: { primary: 'red', underlineColor: 'transparent' } }}
                maxLength={10}
                keyboardType='number-pad'

              />
              <View style={styles.spacerStyle} />

              <DropDown
                label={"Reporting Time"}
                mode={"outlined"}
                visible={showReportingDropDown}
                showDropDown={() => setshowReportingDropDown(true)}
                onDismiss={() => setshowReportingDropDown(false)}
                value={jobreportingtime}
                setValue={setJobreportingTime}
                list={reportingTimeList}
                dropDownStyle={{ marginTop: 0.1 }}
                activeColor={'red'}
                theme={{ colors: { surface: 'green', primary: 'red', underlineColor: 'yellow', accent: 'red' } }}
              />
              <View style={styles.spacerStyle} />

              <TextInput
                mode="outlined"
                label="Salary"
                value={salart}
                placeholder="Salary"
                theme={{ colors: { primary: 'red', underlineColor: 'transparent' } }}
                maxLength={10}
                keyboardType='number-pad'
                onChangeText={(e)=>setSalary(e)}

              />
              <View style={styles.spacerStyle} />

              <TextInput
                mode="outlined"
                label="Overtime"
                value={overtime}
                placeholder="Overtime"
                onChangeText={(e)=>setOverTime(e)}
                theme={{ colors: { primary: 'red', underlineColor: 'transparent' } }}
                maxLength={10}
                keyboardType='number-pad'

              />
              <View style={styles.spacerStyle} />
              <DropDown
                label={"Weekly Off"}
                mode={"outlined"}
                visible={showMultiSelectDropDown}
                showDropDown={() => setShowMultiSelectDropDown(true)}
                onDismiss={() => setShowMultiSelectDropDown(false)}
                value={weeklyOff}
                setValue={setweeklyOff}
                list={weeklyOffList}
                
                
                dropDownStyle={{ marginTop: 0.1 }}

                multiSelect
              />
              <View style={styles.spacerStyle} />
              <View>
                <Text style={{ fontSize: 18, fontWeight: '800' }}>Interview Details</Text>
              </View>
              <View style={styles.spacerStyle} />
              <View style={styles.DateTimeContent}>

                <TextInput
                  pointerEvents="none"
                  mode="outlined"
                  label="Interview Date"
                  value={moment(reportingdate).format('YYYY-MM-DD')}
                  placeholder="Reporting Date"
                  theme={{ colors: { primary: 'red', underlineColor: 'transparent' } }}
                  maxLength={10}
                  keyboardType='default'
                  onTouchStart={() => openLocalDatePkr()}
                  right={<TextInput.Icon name="calendar" />}
                />

              </View>
              <View style={styles.spacerStyle} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={styles.SectionStyleBottom}>
                  <DropDown
                    label={"Time From"}
                    mode={"outlined"}
                    visible={showTimeDropDown2}
                    showDropDown={() => setshowTimeDropDown2(true)}
                    onDismiss={() => setshowTimeDropDown2(false)}
                    value={interviewTimeFrom}
                    setValue={setInterviewTimeFrom}
                    list={reportingTimeList}
                    dropDownStyle={{ marginTop: 0.1 }}
                    activeColor={'green'}
                    theme={{ colors: { surface: 'red' } }}

                  />
                </View>
                <View style={styles.SectionStyleBottom}>
                  <DropDown
                    label={"Time To"}
                    mode={"outlined"}
                    visible={showTimeDropDown3}
                    showDropDown={() => setshowTimeDropDown3(true)}
                    onDismiss={() => setshowTimeDropDown3(false)}
                    value={interviewTimeTo}
                    setValue={setInterviewTimeTo}
                    list={reportingTimeList}
                    dropDownStyle={{ marginTop: 0.1 }}
                    activeColor={'green'}
                    theme={{ colors: { surface: 'red' } }}

                  />
                </View>
              </View>
              <View style={styles.spacerStyle} />
              <View>
                <Text style={{ fontSize: 18, fontWeight: '800' }}>Additional Information</Text>
              </View>
              <View style={styles.spacerStyle} />
              <View style={styles.spacerStyle1} >
                <View style={{ width: '45%' }}>

                  <TextInput
                    mode="outlined"
                    label="Age from"
                    value={ageFrom}
                    placeholder="Age from "
                    theme={{ colors: { primary: 'red', underlineColor: 'transparent' } }}
                    maxLength={10}
                    onChangeText={(e)=>setAgeFrom(e)}
                    keyboardType='number-pad'
                  />
                </View>
                <View style={{ width: '45%' }}>
                  <TextInput
                    mode="outlined"
                    label="Age To"
                    value={ageTo}
                    placeholder="Age To"
                    onChangeText={(e)=>setAgeto(e)}
                    theme={{ colors: { primary: 'red', underlineColor: 'transparent' } }}
                    maxLength={10}
                    keyboardType='number-pad'
                  />
                </View>
              </View>
              <View style={styles.spacerStyle} />
              <View>
                <Text style={{ fontSize: 15, fontWeight: '500' }}>Eating Habits</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.radioButton} onPress={() => setEatingHabit('veg')} >
                  <Ionicons name={eatingHabits === 'veg' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 10 }}>Vegeterian</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioButton} onPress={() => setEatingHabit('nonveg')} >
                  <Ionicons name={eatingHabits === 'nonveg' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 10 }}>Non Vegeterian</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.spacerStyle} />
              <View>
                <Text style={{ fontSize: 15, fontWeight: '500' }}>Religion</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.radioButtonreligion} onPress={() => setReligion('hindu')} >
                  <Ionicons name={religion === 'hindu' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />
                  <Text style={{ marginLeft:2 }}>Hindu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioButtonreligion} onPress={() => setReligion('Muslim')} >
                  <Ionicons name={religion === 'Muslim' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 2 }}>Muslim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioButtonreligion} onPress={() => setReligion('Christian')} >
                  <Ionicons name={religion === 'Christian' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 2 }}>Christian</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioButtonreligion} onPress={() => setReligion('Zorathastian')} >
                  <Ionicons name={religion === 'Zorathastian' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 2 }}>Zorathastian</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.spacerStyle} />
              <View>
                <Text>Language Known</Text>
              </View>
              {/* <View style={styles.spacerStyle} /> */}
              <View style={{flexDirection:'row',}}>
                <TouchableOpacity style={styles.radioButtonlanguage} onPress={() =>selectMarathi()} >
               
                  <Ionicons name={language1 ? 'checkbox' : 'square-outline'} size={20} color={'red'} />
                  <Text style={{ marginLeft:5 }}>Marathi</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.radioButtonlanguage} onPress={() => selectHindi()} >
                  <Ionicons name={language2  ? 'checkbox' : 'square-outline'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 10 }}>Hindi</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.radioButtonlanguage} onPress={() => selectEnglish()} >
                  <Ionicons name={language3 ? 'checkbox' : 'square-outline'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 10 }}>English</Text>
                </TouchableOpacity>
               
              </View>


              <View style={styles.spacerStyle} />
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}
                // onPress={() => navigation.navigate('HomeScreen')}
              >
                <Text style={styles.buttonTextStyle}>Save</Text>
              </TouchableOpacity>
              <View style={styles.spacerStyle} />


            </KeyboardAvoidingView>
            <DatePicker
              modal
              minimumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
              mode={isReportingdate || isreturndate ? "date" : "time"}
              open={open}
              date={reportingdate}
              onConfirm={(date) => {
                setDateOpen(false)
                setDate(date)
              }}
              onCancel={() => {
                setDateOpen(false)
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default DriverScreen;
const styles = StyleSheet.create({
  spacerStyle: {
    marginBottom: 20,
  },
  spacerStyle1: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between'
  },
  mainBody: {
    // justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignContent: 'space-between',
  },


  SectionStyle: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  radioButton:{
    flexDirection:'row',marginLeft:10
  },
  radioButtonreligion:{
flexDirection:'row',
marginLeft:5
  },
  radioButtonlanguage:{
    flexDirection:'row',
    marginLeft:10
      },
  DateTimeContent: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // //backgroundColor:'red',
    // marginTop:20,
    // marginLeft:20,
    // marginRight:20
  },
  SectionStyleBottom: {
    width: '47%',
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    marginTop: 20

  },
  PriceView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 20
  },
  buttonStyle: {
    backgroundColor: 'rgba(219, 35, 36, 1.0)',
    color: '#FFFFFF',
    paddingLeft: 20,
    paddingRight: 20,
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
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 60,
    // width:'200%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    // backgroundColor:'white'
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    // backgroundColor:'red'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});