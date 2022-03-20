

// Import React and Component
import React, {useState, createRef, useEffect} from 'react';
import {SafeAreaView, Alert  , StyleSheet, View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Dimensions} from 'react-native';
import {
  TextInput,
  DarkTheme,
  DefaultTheme,
  Provider,
  Text 
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, {setClientToken} from '../../shared/APIKit';
import { Dropdown } from 'react-native-element-dropdown';

import DatePicker from 'react-native-date-picker'
import moment from 'moment';

const TempDriverScreen = ({navigation}) => {
  const [nightMode, setNightmode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const [logedInUserData, setUserData] = useState({});

  const [reportingdate, setReportingdate] = useState(new Date())
  const [isReportingdate, setIsReportingdate] = useState(false)

  const [returndate, setReturndate] = useState(new Date())
  const [isreturndate, setIsReturndate] = useState(false)

  const [open, setDateOpen] = useState(false)

  const openLocalDatePkr = () => {
    setIsReportingdate(true)
    setIsReturndate(false)
    setDateOpen(true)
  };
  const openRtnDatePkr = () => {
    setIsReportingdate(false)
    setIsReturndate(true)
    ////Open Picker
    setDateOpen(true)
  };
  
  const setDate = (date) =>{
                   
        if(isReportingdate){
          setReportingdate(date)
        }else if(isreturndate){
          setReturndate(date)
        }
  }
 
  
  const [showReportingDropDown, setshowReportingDropDown] = useState(false);
  const [reportingAddress, setReportingAddress] = useState ('');
  const [reportingAdrList, setReportingAdrList] = useState ([]);
  const handleReportingAddressChange = (item) => {
    console.log("vikas",item);
     console.log('! Aman Reporting address :-', reportingAddress )
     console.log("All address by aman..",allAdress1);
     if(reportingAddress){
       setCity(allAdress1[0].city);
       setAddress(allAdress1[0].address);
       setLandmark(allAdress1[0].landmark);
       setLocality(allAdress1[0].locality);
       setPincode(allAdress1[0].zip);
       console.log("Matched...")
     }
     setshowReportingDropDown(false);
  };

  const [address, setAddress] = useState ('');
  const handleAddressChange = adr => {
       setAddress(adr);
  };
  const [allCityList, setallCityList] = useState ([]);

  const [showCityDropDown, setshowCityDropDown] = useState(false);
  const [city, setCity] = useState ('');
  const [cityList, setCityList] = useState ([]);
  
  const [showlocalityDropDown, setshowlocalityDropDown] = useState(false);
  const [locality, setLocality] = useState ('');
  const [localityList, setLocalityList] = useState ([]);
  const makelocalityArray = () =>{
    console.log('City id',city)
    let arrFilterCt = allCityList.filter(obj => {
      return obj.city_id === city
    })
    if(arrFilterCt.length > 0){
      let selectedCity = arrFilterCt[0]
      console.log('City',selectedCity)
      var localList = selectedCity.all_locality.map(local => ({ value: local.locality_id, label: local.locality_name }));
      console.log('localList',localList)
      setLocalityList(localList)
      setshowlocalityDropDown(true)
    }

  }
  const [pincode, setPincode] = useState ('');
  const handlePincodeChange = pin => { 
    setPincode(pin);
  };
  const [landmark, setLandmark] = useState ('');
  const handleLandmarkChange = lnd => {
    setLandmark(lnd);
  };

  //TIME
  const [showTimeDropDown, setshowTimeDropDown] = useState(false);
  const [reportingTime, setreportingTime] = useState ('');
  const [reportingTimeList, setreportingTimeList] = useState ([]);

  const [showPreviousCarDropDown, setshowPreviousCarDropDown] = useState(false);
  const [previousCar, setpreviousCar] = useState ('');
  const [previousCarList, setpreviousCarList] = useState ([]);
  const [isShowPreviousCarList, setIsShowPreviousCarList] = useState (false);

  const [isShowCarList, setisShowCarList] = useState (false);

  const [showCarDropDown, setshowCarDropDown] = useState(false);
  const [cardetails, setCar] = useState ('');
  const [carList, setCarList] = useState ([]);



  const [showDriverDropDown, setshowDriverDropDown] = useState(false);
  const [driverDetails, setdriverDetails] = useState ('');
  const [driverList, setDriver] = useState ([]);

  const [isSaveAddress, setisSaveAddress] = useState(false);
  const [drivertype, setDriverTypeChecked] = useState('Uniform');

  const [showDutyTypeDropDown, setshowDutyTypeDropDown] = useState(false);
  const [dutytype, setdutyType] = useState ('');

  const [dutyhour, setDutyHour] = useState ('');
  const dutyTypeList = [
    {
      label: "Local",
      value: "Local",
    },
    {
      label: "Out Station",
      value: "Out Station",
    },
    {
      label: "Drop",
      value: "Drop",
    },
  ];
  const [dutyhoursList,setDutyhoursList]=useState([]);
  const [showFromCityDropDown, setshowFromCityDropDown] = useState(false);
 
  const [showToCityDropDown, setshowToCityDropDown] = useState(false);
  const [toCity, setToCity] = useState ('');


  const [remarks, setremarks] = useState ('');
  const [allAdress1,setAlladress1]=useState([])
  const [customerendering,setcustomerendering]=useState(false);
  const handleRemarks = rmk => {
       setremarks(rmk);
  };
 
  const getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      console.log("!!!!! ----- User data  :-", userData);
      const data = JSON.parse(userData)
      // console.log("!!!!! ----- User Obj: ", data.name, data.user_id);
      setUserData(data)
      console.log("!!!!! ----- User ID: ", logedInUserData.user_id);

      //2 For Assigned Task
      getAllData(data.user_id)

      
    } catch (error) {
      console.log("!!!!! ----- Something went wrong, while getting user token", error);
    }
  }

  const getAllData = (userid) => {
    setErrortext('');
    setLoading(true)
    console.log("!!!!! ----- User Aman ID: ", userid);

    const payload = {customerid : userid}
    console.log('All DATA req',payload);

    const onSuccess = ({data}) => {
      // Set JSON Web Token on success
      setLoading(false);
      console.log('All DATA',data);

      var allTm = data.all_timeslot.map( tml => ({ value: tml, label: tml}));
      // console.log('Time list',allTm);

      setreportingTimeList(allTm)

      setAlladress1(data.all_address);
      var customhours=data.duty_hour.map(hr=>({name:hr.hours,id:hr.id,status:'false'}))
      setDutyhoursList(customhours)

      var prevAdrList = data.all_address.map(adrs => ({ value: adrs.id, label: adrs.previous_address,address:adrs.address,city:adrs.city,landmark:adrs.landmark,locality:adrs.locality,zip:adrs.zip}));
     

      setReportingAdrList(prevAdrList)
      var prevCarList = data.all_car.map(prvCar => ({value: prvCar.id, label: prvCar.previous_address,}))

      setallCityList(data.city_list)  
      var cityList = data.city_list.map(city => ({ value: city.city_id, label:city.city_name}));
      console.log('City list',cityList);
      setCityList(cityList)

      var prevCarList = data.all_car.map(car => ({ value: car.car_id, label:  car.car_name}));
      //  if (prevCarList.length > 0) { 
        prevCarList.push({value:0, label:'select New Car'});
        setpreviousCarList(prevCarList)
        // setIsShowPreviousCarList(false)
      // }

      console.log('Previous Car List',prevCarList);


      var carList = data.car_master.map(car => ({ value: car.id, label:  car.car_name}));
      console.log('Car List',carList);
      setCarList(carList)
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
 
   APIKit.post('/Booking/previousRecord', payload)
     .then(onSuccess)
     .catch(onFailure);
  };

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
    if (!dutytype) {
      alert('Please fill duty type');
      return;
    }
    if (dutytype === 'Local' ){
      if (!dutyhour) {
        alert('Please select duty hour');
        return;
      }
     
    }
    
    setLoading(true)

   console.log("user id,,,",logedInUserData.user_id)
    const payload = {
      customer_id : logedInUserData.user_id, 
      reporting_address:reportingAddress,
      address, 
      city, 
      locality, 
      pincode,
      landmark, 
      cardetails,
      drivertype, 
      dutytype,
      dutyhour, 
      remark: remarks,
      reportingdate:moment(reportingdate).format('YYYY-MM-DD'), 
      reportingtime:reportingTime, 
      returndate:dutytype === 'Local' ? "" : moment(returndate).format('YYYY-MM-DD'), 
      driverpreference:"",
      tocity:toCity
    };
     
    console.log("Test....",payload);

   const onSuccess = ({data}) => {
     // Set JSON Web Token on success
     setLoading(false);
     console.log(data);
     setTimeout(() => {
      // Alert.alert('Oops!', error.message);
      Alert.alert('Success!');
    }, 100);
     navigation.navigate('HomeScreen')
     if(data.status == true){
    
     }else{

     }

   };
   const onFailure = error => {
    setLoading(false);
     //console.log("!!!!----message",error.data.message);
     setTimeout(() => {
      // Alert.alert('Oops!', error.message);
      Alert.alert('Success!');
    }, 100);
     navigation.navigate('HomeScreen')
     console.log("!!!!----Error",error);
     
   };

   // Show spinner when call is made
   //this.setState({isLoading: true});

   APIKit.post('/Booking/oncall_book', payload)
     .then(onSuccess)
     .catch(onFailure);
  
  };
  useEffect(() => {
    console.log('TempDriverScreen loaded')
      getToken()
  }, [])
  const setCustomHours=(item)=>{
    console.log("All data",item);
    if(item.id==1){
      dutyhoursList[1]['status']=false
      dutyhoursList[2]['status']=false
    }
    if(item.id=2){
      dutyhoursList[0]['status']=false
      dutyhoursList[2]['status']=false
    }
    if(item.id==3){
      dutyhoursList[0]['status']=false
      dutyhoursList[1]['status']=false
    }
   
    // setcustomerendering(!customerendering);
    // console.log("hours data is...",item)
    setDutyHour(item.name)
    item.status=true;
    // console.log(dutyhoursList);
  }
  return (
    <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
          <SafeAreaView style={styles.safeContainerStyle}>
          <ScrollView  showsVerticalScrollIndicator={false}
            >
            <View >
              <KeyboardAvoidingView enabled>
              
                 <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={reportingAdrList}
        // search
        maxHeight={150}
        labelField="label"
        valueField="value"
        placeholder="Reporting Address*"
        searchPlaceholder="Search..."
        value={reportingAddress}
        onChange={item => {
          // setGender(item.value);
          console.log("vikkkk",item);
          setCity(item.city)
          setAddress(item.address);
          setPincode(item.zip);
          setLocality(item.locality);
          setLandmark(item.landmark);
        }}
      />
                <View style={styles.spacerStyle} />

                <TextInput
                 mode="outlined"
                 label={"Address"}
                 value={address}
                 placeholder="Enter Address"
                 theme={{ colors: { surface:'green',primary: 'red',underlineColor:'yellow', accent:'red'}}}
                  maxLength={50}
                  keyboardType = 'default'
                  onChangeText={handleAddressChange}
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
                  dropDownStyle = {{marginTop: 0.1}}
                  activeColor={'red'}
                  theme={{ colors: { surface:'green',primary: 'red',underlineColor:'yellow', accent:'red'}}}
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
              onChange={() => makelocalityArray()}
              dropDownStyle = {{marginTop: 0.1}}
              activeColor={'green'}
              theme={{ colors: { surface:'red'}}}
            />
            <View style={styles.spacerStyle} />

             <TextInput
                mode="outlined"
                label="Pin Code"
                value={pincode}
                placeholder="Enter Pincode"
                theme={{ colors: { surface:'green',primary: 'red',underlineColor:'yellow', accent:'red'}}}
                maxLength={10}
                keyboardType = 'default'
                onChangeText={handlePincodeChange}
              />
              <View style={styles.spacerStyle} />
                  <TextInput
                    mode="outlined"
                    label="Landmark"
                    value={landmark}
                    placeholder="Enter Landmark"
                    theme={{ colors: { surface:'green',primary: 'red',underlineColor:'yellow', accent:'red'}}}
                    maxLength={50}
                    keyboardType = 'default'
                    onChangeText={handleLandmarkChange}

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
                value={previousCarList}
                onChange={item => {
                  console.log("vikkkk", item.label);
                  if(item.label=='select New Car'){
                    setIsShowPreviousCarList(!isShowPreviousCarList)
                    // Alert.alert("new car choose")
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
               <View style={styles.spacerStyle} />
                 {
                  isShowPreviousCarList === true ?  
                 
                 <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={carList}
        // search
        maxHeight={150}
        labelField="label"
        valueField="value"
        placeholder="Select  Car"
        searchPlaceholder="Search..."
        value={cardetails}
        onChange={item => {
          setCar(item.value);
          console.log("vikkkk",item);
          // setCity(item.city)
          // setAddress(item.address);
          // setPincode(item.zip);
          // setLocality(item.locality);
          // setLandmark(item.landmark);
        }}
      />:null}
                    {/* <DropDown
                        label={"Select  Car"}
                        mode={"outlined"}
                        visible={showCarDropDown}
                        showDropDown={() => setshowCarDropDown(true)}
                        onDismiss={() => setshowCarDropDown(false)}
                        value={cardetails}
                        setValue={setCar}
                        list={carList}
                        dropDownStyle = {{marginTop: 0.1}}
                        activeColor={'red'}
                        theme={{ colors: { surface:'green',primary: 'red',underlineColor:'yellow', accent:'red'}}}
                      /> */}

                  <View style={styles.spacerStyle} />
                  <TouchableOpacity style={{flexDirection:'row',margin:10,  justifyContent: 'flex-start',alignContent: 'center',}}
              
                   onPress={() => setisSaveAddress(!isSaveAddress)}

                  >
              
                      <Ionicons name={isSaveAddress ? 'checkbox': 'square-outline'} size={20} color={'red'} />

                     <Text style={{marginLeft:10}}>Save Address</Text>

                 </TouchableOpacity>
                 <View style={styles.spacerStyle} />

                 <Text style={{marginLeft:10, fontWeight:'bold'}}>Driver Type</Text>

              <View style={{flexDirection: 'row'}}>

                <TouchableOpacity style={{flexDirection:'row',margin:10,  justifyContent: 'space-between',alignContent: 'center',}}
              
                 onPress={() => setDriverTypeChecked('Uniform')}

                 >
                 <Ionicons name={drivertype === 'Uniform' ? 'radio-button-on': 'radio-button-off-sharp'} size={20} color={'red'} />

                  <Text style={{marginLeft:10}}>Uniform</Text>

                 </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row',margin:10,  justifyContent: 'space-between',alignContent: 'center'}}
                    
                    onPress={() => setDriverTypeChecked('Chauffer')}

                >
                 
                 <Ionicons name={drivertype === 'Chauffer' ? 'radio-button-on': 'radio-button-off-sharp'} size={20} color={'red'} />
                 
                 <Text style={{marginLeft:10}}>Chauffer</Text>

               </TouchableOpacity>
             
              </View>
              <View style={styles.spacerStyle} />
              <DropDown
                label={"Duty Type"}
                mode={"outlined"}
                visible={showDutyTypeDropDown}
                showDropDown={() => setshowDutyTypeDropDown(true)}
                onDismiss={() => setshowDutyTypeDropDown(false)}
                value={dutytype}
                setValue={setdutyType}
                list={dutyTypeList}
                // onChange
                dropDownStyle = {{marginTop: 0.1}}
                activeColor={'green'}
                theme={{ colors: { surface:'red'}}}

              />
               <View style={styles.spacerStyle} />
               {
                 dutytype === 'Local' ?
                    <View style={{flexDirection: 'column'}}>
                    <Text style={{marginLeft:10, marginBottom:10,   fontWeight: 'bold'}}>Duty Hours</Text>

                    <View style={{flexDirection: 'row'}}>
                      {dutyhoursList.length>0  && dutyhoursList.map((item,index)=>{
                        return(
                      <TouchableOpacity style={styles.radioButton} onPress={() => setCustomHours(item)} key={index}>
                       
                          <Ionicons name={item.status==true? 'radio-button-on': 'radio-button-off-sharp'} size={20} color={'red'} />

                          <Text style={{marginLeft:10}}>{item.name} Hrs</Text>

                      </TouchableOpacity>)})}
                      {/* <TouchableOpacity style={styles.radioButton} onPress={() => setDutyHour('4')}>
                            <Ionicons name={dutyhour === '4' ? 'radio-button-on': 'radio-button-off-sharp'} size={20} color={'red'} />

                            <Text style={{marginLeft:10}}>4 Hrs</Text>

                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.radioButton} onPress={() => setDutyHour('6')} >
                            <Ionicons name={dutyhour === '6' ? 'radio-button-on': 'radio-button-off-sharp'} size={20} color={'red'} />
                            <Text style={{marginLeft:10}}>6 Hrs</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.radioButton} onPress={() => setDutyHour('8')} >
                            <Ionicons name={dutyhour === '8' ? 'radio-button-on': 'radio-button-off-sharp'} size={20} color={'red'} />
                            <Text style={{marginLeft:10}}>8 Hrs</Text>
                        </TouchableOpacity> */}

                    </View>


                  <View style={styles.spacerStyle} />
                        {/* //DATE AND TIME \\*/}
                    <View style={styles.DateTimeContent}>
                     
                            <TextInput
                               pointerEvents="none"
                              mode="outlined"
                              label="Reporting Date"
                              value={moment(reportingdate).format('YYYY-MM-DD')}
                              placeholder="Reporting Date"
                              theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
                              maxLength={10}
                              keyboardType = 'default'
                              onTouchStart={() =>  openLocalDatePkr()}
                              right={<TextInput.Icon name="calendar" />}                   
                            />
                        <View style={styles.SectionStyleBottom}>
                          <DropDown
                              label={"Select Time"}
                              mode={"outlined"}
                              visible={showTimeDropDown}
                              showDropDown={() => setshowTimeDropDown(true)}
                              onDismiss={() => setshowTimeDropDown(false)}
                              value={reportingTime}
                              setValue={setreportingTime}
                              list={reportingTimeList}
                              dropDownStyle = {{marginTop: 0.1}}
                              activeColor={'green'}
                              theme={{ colors: { surface:'red'}}}

                            />
                  </View>
                      </View>
                    </View>
                 :
                 dutytype === 'Out Station' ?
                 <View  style={{flexDirection: 'column'}}>
                   <View style={styles.SectionStyle}>
                    <DropDown
                          label={"To City"}
                          mode={"outlined"}
                          visible={showToCityDropDown}
                          showDropDown={() => setshowToCityDropDown(true)}
                          onDismiss={() => setshowToCityDropDown(false)}
                          value={toCity}
                          setValue={setToCity}
                          list={cityList}
                          dropDownStyle = {{marginTop: 0.1}}
                          activeColor={'green'}
                          theme={{ colors: { surface:'red'}}}

                        />
                   </View>
                   <View style={styles.spacerStyle} />

                   <View style={styles.DateTimeContent}>
                     <View style={styles.SectionStyleBottom}>
                         <TextInput
                               pointerEvents="none"
                              mode="outlined"
                              label="From Date"
                              value={moment(reportingdate).format('YYYY-MM-DD')}
                              placeholder="Reporting Date"
                              theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
                              maxLength={10}
                              keyboardType = 'default'
                              onTouchStart={() =>  openLocalDatePkr()}
                              right={<TextInput.Icon name="calendar" />}                   
                            />
                     </View>
                     <View style={styles.SectionStyleBottom}>
                         <TextInput
                               pointerEvents="none"
                              mode="outlined"
                              label="To Date"
                              value={moment(returndate).format('YYYY-MM-DD')}
                              placeholder="Reporting Date"
                              theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
                              maxLength={10}
                              keyboardType = 'default'
                              onTouchStart={() =>  openRtnDatePkr()}
                              right={<TextInput.Icon name="calendar" />}                   
                            />
                     </View>
                   </View>
                   <View style={styles.spacerStyle} />

                   <View style={styles.DateTimeContent}>
                     <View style={styles.SectionStyleBottom}>
                     <DropDown
                            label={"Select Time"}
                            mode={"outlined"}
                            visible={showTimeDropDown}
                            showDropDown={() => setshowTimeDropDown(true)}
                            onDismiss={() => setshowTimeDropDown(false)}
                            value={reportingTime}
                            setValue={setreportingTime}
                            list={reportingTimeList}
                            dropDownStyle = {{marginTop: 0.1}}
                            activeColor={'green'}
                            theme={{ colors: { surface:'red'}}}
                          />
                     </View>
                     <View style={styles.SectionStyleBottom}>
                      
                     </View>
                   </View>
               </View>
                 :
                 dutytype === 'Drop' ?
                 <View  style={{flexDirection: 'column'}}>

                     <View style={styles.SectionStyle}>
                    <DropDown
                          label={"To City"}
                          mode={"outlined"}
                          visible={showToCityDropDown}
                          showDropDown={() => setshowToCityDropDown(true)}
                          onDismiss={() => setshowToCityDropDown(false)}
                          value={toCity}
                          setValue={setToCity}
                          list={cityList}
                          dropDownStyle = {{marginTop: 0.1}}
                          activeColor={'green'}
                          theme={{ colors: { surface:'red'}}}
                        />
                   </View>
                   <View style={styles.spacerStyle} />

                   <View style={styles.DateTimeContent}>
                     <View style={styles.SectionStyleBottom}>
                     <TextInput
                               pointerEvents="none"
                              mode="outlined"
                              label="From Date"
                              value={moment(reportingdate).format('YYYY-MM-DD')}
                              placeholder="Reporting Date"
                              theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
                              maxLength={10}
                              keyboardType = 'default'
                              onTouchStart={() =>  openLocalDatePkr()}
                              right={<TextInput.Icon name="calendar" />}                   
                          />
                     </View>
                     <View style={styles.SectionStyleBottom}>
                     <DropDown
                            label={"Select Time"}
                            mode={"outlined"}
                            visible={showTimeDropDown}
                            showDropDown={() => setshowTimeDropDown(true)}
                            onDismiss={() => setshowTimeDropDown(false)}
                            value={reportingTime}
                            setValue={setreportingTime}
                            list={reportingTimeList}
                            dropDownStyle = {{marginTop: 0.1}}
                            activeColor={'green'}
                            theme={{ colors: { surface:'red'}}}

                          />
                     </View>
                   </View>
                   <View style={styles.spacerStyle} />

                  
               </View>
                 :
                  null
               }
                 <View style={styles.spacerStyle} />

               <DropDown
                    label={"Select Driver"}
                    mode={"outlined"}
                    visible={showDriverDropDown}
                    showDropDown={() => setshowDriverDropDown(true)}
                    onDismiss={() => setshowDriverDropDown(false)}
                    value={driverDetails}
                    setValue={setpreviousCar}
                    list={driverList}
                    dropDownStyle = {{marginTop: 0.1}}
                    activeColor={'red'}
                    theme={{ colors: { surface:'green',primary: 'red',underlineColor:'yellow', accent:'red'}}}
                  />
               <View style={styles.spacerStyle} />
                  <TextInput
                    mode="outlined"
                    label={"Remarks"}
                    value={remarks}
                    placeholder="Enter Address"
                    theme={{ colors: { surface:'green',primary: 'red',underlineColor:'yellow', accent:'red'}}}
                    maxLength={50}
                    keyboardType = 'default'
                    onChangeText={handleRemarks}
                    />
                  <View style={styles.spacerStyle} />
                 <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                   onPress={handleSubmitPress}
                      //onPress={() => navigation.navigate('HomeScreen')}
                  >
                  <Text style={styles.buttonTextStyle}>Save</Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  minimumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
                  mode={isReportingdate || isreturndate ? "date":"time"}
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

               <View style={styles.spacerStyle} />
               


              </KeyboardAvoidingView>
            </View>
          </ScrollView>
          </SafeAreaView>
    </Provider>
  );
};

export default TempDriverScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202a3d',
  },
  containerStyle: {
    flex: 1,
  },
  spacerStyle: {
    marginBottom: 30,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
   // justifyContent: "center",
  },
  radioButton:{
    flexDirection:'row',margin:10,  justifyContent: 'space-between',alignContent: 'center'
  },
  DateTimeContent:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor:'red',
  
  },
  SectionStyleBottom: {
    width: '47%', 
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
