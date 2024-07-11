import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, Image, ImageBackground, ScrollView, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
import { Server } from '../ServerIP';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, AntDesign, Foundation, FontAwesome, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Dashboard({route, navigation}) {

  const { user_id, jwtToken } = route.params;

  //  console.log("Were are in Dashboard , this is the user id -->", user_id);
  //  console.log("Were are in Dashboard , this is the user JWT -->",jwtToken);

  const decodedJWT = jwt_decode(jwtToken);

  const first_name = decodedJWT.first_name;
  const role = decodedJWT.role;

  // console.log(role);

    const voiceStatistics = "Here Are The Updated Statistics";
    const voiceReservations = "Here Are The Latest Reservations";
    const voiceHouses = "Here Are The Latest Added Houses, you can find a Specific house by searching its ID";
    const voiceUsers = "Here Are The Latest Joined Users, you can find a Specific user by searching his ID";
    const voiceReports = "Here Are The Latest Made Reports";
    const [welcomingVoice, setWelcomingVoice] = useState(`Welcome to shelter admin dahshboard, Good Morning ${first_name}`);
    const [clickedOption, setClickedOption] = useState('statistics');

    //Sreach Variables

    const [searchedUser, setSearchedUser] = useState('');
    const [searchedHouse, setSearchedHouse] = useState('');

    const [searchedUserID, setSearchedUserID] = useState(0);
    const [searchedUserFirstName, setSearchedUserFirstName] = useState('');
    const [searchedUserLastName, setSearchedUserLastName] = useState('');
    const [searchedUserPhone, setSearchedUserPhone] = useState('');
    const [searchedUserEmail, setSearchedUserEmail] = useState('');
    const [searchedUserCin, setSearchedUserCin] = useState('');
    const [searchedisProvider, setSearchedIsProvider] = useState(false);
    const [searcheddateJoined, setSearchedDateJoined] = useState('');
    const [searchedprofilePic, setSearchedProfilePic] = useState(null);
    const [searchedcinPic, setSearchedCinPic] = useState(null);

    const [searchedhouse_ID, setSearchedHouse_ID] = useState([]);
    const [searchedprovider_ID, setSearchedProvider_ID] = useState([]);
    const [searchedhouse_City, setSearchedHouse_City] = useState([]);
    const [searchedhouse_Address, setSearchedHouse_Addresses] = useState([]);
    const [searchedhouse_Description, setSearchedHouse_Descriptions] = useState([]);
    const [searchedhouse_Price, setSearchedHouse_Prices] = useState([]);
    const [searchedhouse_Picture1, setSearchedHouse_Pictures1] = useState([]);
    const [searchedhouse_Picture2, setSearchedHouse_Pictures2] = useState([]);
    const [searchedhouse_Picture3, setSearchedHouse_Pictures3] = useState([]);
    const [searchedhouse_Picture4, setSearchedHouse_Pictures4] = useState([]);
    const [searcheddate_added, setSearchedDate_Added] = useState();


    // Statistics Section
    const [nbUsers, setNbUsers] = useState(0);
    const [nbReservations, setNbReservations] = useState(0);
    const [nbHouses, setNbHouses] = useState(0);
    const [nbProviders, setNbProviders] = useState(0);
    const [nbReports, setNbReports] = useState(0);

    // Users Section

    const [userID, setUserID] = useState([]);
    const [userFirstName, setUserFirstName] = useState([]);
    const [userLastName, setUserLastName] = useState([]);
    const [userPhone, setUserPhone] = useState([]);
    const [userEmail, setUserEmail] = useState([]);
    const [userCin, setUserCin] = useState([]);
    const [isProvider, setIsProvider] = useState([]);
    const [dateJoined, setDateJoined] = useState([]);
    const [profilePic, setProfilePic] = useState([]);
    const [cinPic, setCinPic] = useState([]);
    

    //Reservations Section
    const [reservationID, setReservationID] = useState([]);
    const [status, setStatus] = useState([]);
    const [isPayed, setIsPayed] = useState([]);
    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);
    const [nbTravelers, setNbTravelers] = useState([]);

    const [houseID, setHouseID] = useState([]);
    const [housePrice, setHousePrice] = useState([]);
    const [houseAddress, setHouseAddress] = useState([]);

    const [costumerID, setCostumerID] = useState(0);
    const [costumerName, setCostumerName] = useState([]);
    const [costumerPic, setCostumerPic] = useState([]);

    const [providerID, setProviderID] = useState([]);
    const [providerName, setProviderName] = useState([]);
    const [providerPic, setProviderPic] = useState([]);
    

    //Houses Section

    const [house_ID, setHouse_ID] = useState([]);
    const [provider_ID, setProvider_ID] = useState([]);
    const [house_City, setHouse_City] = useState([]);
    const [house_Address, setHouse_Addresses] = useState([]);
    const [house_Description, setHouse_Descriptions] = useState([]);
    const [house_Price, setHouse_Prices] = useState([]);
    const [house_Picture1, setHouse_Pictures1] = useState([]);
    const [house_Picture2, setHouse_Pictures2] = useState([]);
    const [house_Picture3, setHouse_Pictures3] = useState([]);
    const [house_Picture4, setHouse_Pictures4] = useState([]);
    const [date_added, setDate_Added] = useState();


    //Reports Section

    const [ReportID, setReportID] = useState([]);
    const [costumID, setCostumID] = useState([]);
    const [provID, setProvID] = useState([]);
    const [title, setTitle] = useState([]);
    const [reason, setReason] = useState([]);
    const [dateMade, setDateMade] = useState([]);

    const ServerIP = Server;

    const [Profile_Picture, setProfile_Picture] = useState(null);
      
// Calling all methods on page launch

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        GetUsersForDash();
        GetReservationsForDash();
        GetHousesForDash();
        GetReportsForDash();
        GetProfilePicture();
        // Call any other methods you want to execute here
      });
    
      return () => {
        unsubscribe();
      };
    }, [navigation]);


//Getting The Profile Picture Of The Admin

    const GetProfilePicture = async() => {
   
      try {
        const response = await fetch("http://" + ServerIP + ":3000/GetProfilePictureForAdmin", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({'user_id': user_id }),
        });
   
        const data = await response.json();
           // console.log(data);
             if (data.message === "Image Got Successfuly") {
               console.log(data.message);
               setProfile_Picture(data.Profile_Picture);
             } else {
               console.log(data.message);
             }
         
      } catch (error) {
        console.log(error);
      }       
     };

    //Welcoming The Admin By Voice

      useEffect(() =>{

       const currentHour = new Date().getHours();

       if (currentHour >= 12 && currentHour < 18) {
         setWelcomingVoice(`Welcome to shelter admin dahshboard, Good afternoon ${first_name}`);
       } else if (currentHour >= 18) {
         setWelcomingVoice(`Welcome to shelter admin dahshboard, Good evening ${first_name}`);
       }
              const WelcomeToSay = welcomingVoice;
              const speakOptions = {
                  rate: 0.90,
                };
              Speech.speak(WelcomeToSay, speakOptions);

              PresentDataByVoice(clickedOption);

      }, []);


    const PresentDataByVoice = (option) =>{

      let Presenting = "";
      if (option === "statistics") {        
        Presenting = voiceStatistics;
    }else if (option === "users") {        
          Presenting = voiceUsers;
      }else if (option === "reports") {
          Presenting = voiceReports;
      }else if (option === "reservations") {
          Presenting = voiceReservations;
      }else if (option === "houses") {
          Presenting = voiceHouses;
      }

      const speakOptions = {
        rate: 0.90,
      };
    Speech.speak(Presenting, speakOptions);

    }; 


/// Getting The Statistics

    useEffect(() =>{

      if (clickedOption === "statistics") {
        
        const GetStatistics = async() => {
          
          try {
            
            const response = await fetch("http://"+ServerIP+":3000/GetStatisticsForDash", {
              method: 'GET',
              headers:{'Content-Type' : 'application/json'}
            });
            
            const data = await response.json();
            
            setNbUsers(data.NumberOfUsers);
            setNbReservations(data.NumberOfReservations);
            setNbHouses(data.NumberOfHouses);
            setNbProviders(data.NumberOfProviders);
            setNbReports(data.NumberOfReports);
            
          } catch (error) {
            console.log(error);
          }
        };
        
        GetStatistics();
      }
    },[clickedOption]);

    useEffect(() => {
      if (searchedUser === '') {
        GetUsersForDash();
      }
    }, [searchedUser]);

    useEffect(() => {
      if (searchedHouse === '') {
        GetHousesForDash();
      }
    }, [searchedHouse]);


/// Getting The Users

     const GetUsersForDash = async() =>{

      const FormattedJoined = [];

      try {

        const response = await fetch("http://"+ServerIP+":3000/GetUsersForDash", {
          method: 'GET',
          headers: {'Content-Type' : 'application/json'},
        });

        const data = await response.json();

        if (data.message === "Users informations get successfuly..") {
         console.log(data.message);
           setUserID(data.userID);
           setUserFirstName(data.userFirstName);
           setUserLastName(data.userLastName);
           setUserPhone(data.userPhone);
           setUserEmail(data.userEmail);
           setUserCin(data.userCin);
           setIsProvider(data.isProvider);
           for (let i = 0; i < data.dateJoined.length; i++) {
            const date = new Date(data.dateJoined[i]);
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();

            const formattedDate = `${day} ${month} ${year}`;
            FormattedJoined.push(formattedDate);
           }
           setDateJoined(FormattedJoined);
           setProfilePic(data.profilePicture);
           setCinPic(data.cinPic);

         } else {
          console.log(data.message);
          Alert.alert("Oops!!", data.message);
         }
      } catch (error) {
        console.log(error);
      }
     };

/// Getting The Users by Search

     const GetUsersBySearch = async() =>{

      setUserID([]);
      setUserFirstName([]);
      setUserLastName([]);
      setUserLastName([]);
      setUserPhone([]);
      setUserEmail([]);
      setUserCin([]);
      setIsProvider([]);
      setDateJoined([]);
      setProfilePic([]);
      setCinPic([]);

      const FormattedJoined = [];

      try {

        const response = await fetch("http://"+ServerIP+":3000/GetUsersBySearch", {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({'user_id' : searchedUser})
        });

        const data = await response.json();

        if (data.message === "User informations get successfuly..") {
         console.log(data.message);
           setSearchedUserID(data.userID);
           setSearchedUserFirstName(data.userFirstName);
           setSearchedUserLastName(data.userLastName);
           setSearchedUserPhone(data.userPhone);
           setSearchedUserEmail(data.userEmail);
           setSearchedUserCin(data.userCin);
           setSearchedIsProvider(data.isProvider);
            const date = new Date(data.dateJoined);
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();

            const formattedDate = `${day} ${month} ${year}`;
            FormattedJoined.push(formattedDate);
  
           setSearchedDateJoined(FormattedJoined);
           setSearchedProfilePic(data.profilePicture);
           setSearchedCinPic(data.cinPic);

         } else {
          console.log(data.message);
          Alert.alert("Oops!!", data.message);
         }
      } catch (error) {
        console.log(error);
      }
     };


/// Getting the reservations


     const GetReservationsForDash = async() =>{

      const FormattedStartDate = [];
      const FormattedEndDate = [];

      try {

        const response = await fetch("http://"+ServerIP+":3000/GetReservationsForDash", {
          method: 'GET',
          headers: {'Content-Type' : 'application/json'},
        });

        const data = await response.json();

        if (data.message === "Reservations informations get successfuly..") {
          console.log(data.message);
          setReservationID(data.reservationID);
          setStatus(data.status);
          setIsPayed(data.isPayed);
          setHouseID(data.houseID);
          setHousePrice(data.housePrice);
          setHouseAddress(data.houseAddress);
          setCostumerID(data.costumerID);
          setCostumerName(data.costumerName);
          setCostumerPic(data.costumerPic);
          setProviderID(data.providerID);
          setProviderName(data.providerName);
          setProviderPic(data.providerPic);

          for (let i = 0; i < data.startDate.length; i++) {
            const date1 = new Date(data.startDate[i]);
            const date2 = new Date(data.endDate[i]);

            const day1 = date1.getDate();
            const month1 = date1.toLocaleString('default', { month: 'long' });
            const year1 = date1.getFullYear();

            const day2 = date2.getDate();
            const month2 = date2.toLocaleString('default', { month: 'long' });
            const year2 = date2.getFullYear();

            const formattedDate1 = `${day1} ${month1} ${year1}`;
            const formattedDate2 = `${day2} ${month2} ${year2}`;

            FormattedStartDate.push(formattedDate1);
            FormattedEndDate.push(formattedDate2);
          }
          setStartDate(FormattedStartDate);
          setEndDate(FormattedEndDate);
          setNbTravelers(data.nbTravelers);
        } else {
          console.log(data.message)
        }
      } catch (error) {
        console.log(error);
      }
     };


/// Getting The Houses

     const GetHousesForDash = async() =>{

      const FormattedAddedDate = [];

      try {

        const response = await fetch("http://"+ServerIP+":3000/GetHousesForDash", {
          method: 'GET',
          headers: {'Content-Type' : 'application/json'},
        });

        const data = await response.json();

        if (data.message === "Houses informations get successfuly..") {
          console.log(data.message);
          setHouse_ID(data.house_ID);
          setProvider_ID(data.provider_ID);
          setHouse_City(data.house_City);
          setHouse_Addresses(data.house_Address);
          setHouse_Descriptions(data.house_Description);
          setHouse_Prices(data.house_Price);
          setHouse_Pictures1(data.house_Picture1);
          setHouse_Pictures2(data.house_Picture2);
          setHouse_Pictures3(data.house_Picture3);
          setHouse_Pictures4(data.house_Picture4);

          for (let i = 0; i < data.date_added.length; i++) {
            const date = new Date(data.date_added[i]);
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();

            const formattedDate = `${day} ${month} ${year}`;
            FormattedAddedDate.push(formattedDate);
          }
          setDate_Added(FormattedAddedDate);

        } else {
          console.log(data.message)
        }
      } catch (error) {
        console.log(error);
      }
     };
     


     /// Getting The Houses

     const GetHousesBySearch = async() =>{

      setHouse_ID([]);
      setProvider_ID([]);
      setHouseAddress([]);
      setHousePrice([]);
      setHouse_Descriptions([]);
      setHouse_City([]);
      setDate_Added([]);
      setHouse_Pictures1([]);
      setHouse_Pictures2([]);
      setHouse_Pictures3([]);
      setHouse_Pictures4([]);

      const FormattedAddedDate = [];

      try {

        const response = await fetch("http://"+ServerIP+":3000/GetHouseBySearch", {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({'house_id' : searchedHouse})
        });

        const data = await response.json();

        if (data.message === "House informations get successfuly..") {
          console.log(data.message);
          setSearchedHouse_ID(data.house_ID);
          setSearchedProvider_ID(data.provider_ID);
          setSearchedHouse_City(data.house_City);
          setSearchedHouse_Addresses(data.house_Address);
          setSearchedHouse_Descriptions(data.house_Description);
          setSearchedHouse_Prices(data.house_Price);
          setSearchedHouse_Pictures1(data.house_Picture1);
          setSearchedHouse_Pictures2(data.house_Picture2);
          setSearchedHouse_Pictures3(data.house_Picture3);
          setSearchedHouse_Pictures4(data.house_Picture4);

          for (let i = 0; i < data.date_added.length; i++) {
            const date = new Date(data.date_added[i]);
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();

            const formattedDate = `${day} ${month} ${year}`;
            FormattedAddedDate.push(formattedDate);
          }
          setSearchedDate_Added(FormattedAddedDate);

        } else {
          console.log(data.message);
          Alert.alert("Oops!!", data.message);
        }
      } catch (error) {
        console.log(error);
      }
     };


/// Getting The Reports


     const GetReportsForDash = async() =>{

      const FormattedDateMade = [];

      try {

        const response = await fetch("http://"+ServerIP+":3000/GetReportsForDash", {
          method: 'GET',
          headers: {'Content-Type' : 'application/json'},
        });

        const data = await response.json();

        if (data.message === "Reports informations get successfuly..") {
        //  console.log(data);
          setReportID(data.ReportID);
          setCostumID(data.costumID);
          setProvID(data.provID);
          setTitle(data.title);
          setReason(data.reason);
          for (let i = 0; i < data.dateMade.length; i++) {
            const date = new Date(data.dateMade[i]);
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();

            const formattedDate = `${day} ${month} ${year}`;
            FormattedDateMade.push(formattedDate);
          }
          setDateMade(FormattedDateMade);

        } else {
          console.log(data.message)
        }
      } catch (error) {
        console.log(error);
      }
     };

//Conferming the User delete

const Confirmation = async(user) =>{
    
  Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this User?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log(`Delete Canceled for user ID ${user}..`),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => RemoveUser(user) },
      ],
      { cancelable: false }
    );
  };



const RemoveUser = async(user) =>{

  try {
    
    const response = await fetch("http://" +ServerIP+ ":3000/DeleteUser", {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({'user_id' : user})
    });

    const data = await response.json();

    if (data.message === "User Deleted Successfuly..") {
      console.log(data.message);
      GetUsersForDash();
    } else {
      console.log(data.message);
      Alert.alert("Oops!!", data.message);
    }
  } catch (error) {
    console.log(error);
  }
};


// Confirming the House Delete

const ConfirmHouseDelete = async(user_id, house) =>{
    
  Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this House?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log(`Delete Canceled for House ID ${house}..`),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => RemoveHouse(user_id, house) },
      ],
      { cancelable: false }
    );
  };


//Handling The Removal of an House

const RemoveHouse = async(user_id, house_id) =>{

   try {
       const response = await fetch("http://"+ServerIP+":3000/DeleteHouse", {
           method: 'POST',
           headers: ({'Content-Type' : 'application/json'}),
           body: JSON.stringify({'user_id' : user_id, 'house_id' : house_id}),
       }); 

       const data = await response.json();

       if (data.message === "House Deleted Successfully...") {            
           console.log(data.message);
           Alert.alert("Removed..", data.message);
           GetHousesForDash();
       } else {
          console.log(data.message);
          Alert.alert("OOps..", data.message);
       }
   } catch (error) {
       console.log(error);
   }
};



    // Handle back button press event after the login
    useEffect(() => {
      const handleBackPress = () => {
        if (navigation.isFocused()) {
          BackHandler.exitApp();
          return true;
        }
        return false;
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress
      );
  
      return () => backHandler.remove();
    }, [navigation]);
        
      //FONTS LOADED  
  const [fontsLoaded] = useFonts({
    'Black': require('../../assets/fonts/Cinzel-Black.ttf'),
    'Bold': require('../../assets/fonts/Cinzel-Bold.ttf'),
    'ExtraBold': require('../../assets/fonts/Cinzel-ExtraBold.ttf'),
    'SemiBold': require('../../assets/fonts/Cinzel-SemiBold.ttf'),
    'Medium': require('../../assets/fonts/Cinzel-Medium.ttf'),
    'Regular': require('../../assets/fonts/Cinzel-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

   

  return (
    <View style={{flex:1, width: screenWidth, height: screenHeight}}>

        <View style={{borderBottomColor:'lightgrey', borderBottomWidth: screenWidth/300, justifyContent: 'center', flex: 0.25}}>
          <View style={{marginTop: screenHeight/40, flexDirection:'row', justifyContent:'space-between'}}>
          <View style={{marginLeft: screenWidth / 10, flexDirection:'column'}}>
            <Text style={{fontSize: screenWidth/22, fontFamily:'Black', color: "#C48F49"}}>Shelter Administration</Text>
            <Text style={{fontSize: screenWidth/18, fontFamily:'Black'}}>Dashboard</Text>
          </View>
        <TouchableOpacity style={{ marginTop: screenHeight / 100, marginRight: screenWidth / 10 }} >
        <FontAwesome name="send" size={screenWidth/15} color="#C48F49" />
        </TouchableOpacity>
          </View>
        </View>

        <View style={{borderBottomColor:'lightgrey', borderBottomWidth: screenWidth/300, justifyContent:'center', flex: 0.16}}>
          <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{width: screenWidth/6}} onPress={() => { navigation.navigate('AdminProfile', { user_id: user_id, jwtToken: jwtToken }) }}>
              {Profile_Picture !== null ? (
                <Image
                  source={{uri : "http://" +ServerIP+ ":3000/" + Profile_Picture}}
                  style={{marginLeft: screenWidth/30, width: screenWidth / 8, height: screenHeight / 17, borderRadius: screenWidth / 5 }}
                />
              ) : (
                <Image
                  source={require('../UserPages/UsrPgsImg/userGrey.png')}
                  style={{marginLeft: screenWidth/30, width: screenWidth / 8, height: screenHeight / 17, borderRadius: screenWidth / 5 }}
                />
              )}
        </TouchableOpacity>
        <View style={{marginLeft: screenWidth/50, width: screenWidth/1.2, }}>
        <Text style={{fontSize: screenWidth/20, fontFamily:'Black'}}>Welcome Again, {first_name} 👋</Text>
        </View>
          </View>
        </View>

        <View style={{borderBottomColor:'lightgrey', borderBottomWidth: screenWidth/300, justifyContent: 'center', flex: 0.12}}>
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

        <TouchableOpacity onPress={() => {setClickedOption('statistics'); PresentDataByVoice('statistics');}} style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 3.5, height: screenHeight / 22, backgroundColor:(clickedOption === "statistics" ? ("#C48F49") : ("#fff")), borderColor: '#C48F49', borderWidth: screenWidth / 500, borderRadius: screenWidth / 10 }}>
            <Text style={{ textAlign: 'center', fontFamily: 'SemiBold', fontSize: screenWidth / 28, color:(clickedOption === "statistics" ? ("#fff") : ("#C48F49"))}}>Statistics</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setClickedOption('users'); PresentDataByVoice('users'); GetUsersForDash(); setSearchedUser('');}} style={{marginLeft: screenWidth/40, alignItems: 'center', justifyContent: 'center', width: screenWidth / 3.5, height: screenHeight / 22, backgroundColor:(clickedOption === "users" ? ("#C48F49") : ("#fff")), borderColor: '#C48F49', borderWidth: screenWidth / 500, borderRadius: screenWidth / 10 }}>
            <Text style={{ textAlign: 'center', fontFamily: 'SemiBold', fontSize: screenWidth / 28, color: (clickedOption === "users" ? ("#fff") : ("#C48F49")) }}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setClickedOption('reservations'); PresentDataByVoice('reservations'); GetReservationsForDash();}} style={{marginLeft: screenWidth/40, alignItems: 'center', justifyContent: 'center', width: screenWidth / 3.5, height: screenHeight / 22, backgroundColor:(clickedOption === "reservations" ? ("#C48F49") : ("#fff")), borderColor: '#C48F49', borderWidth: screenWidth / 500, borderRadius: screenWidth / 10 }}>
            <Text style={{ textAlign: 'center', fontFamily: 'SemiBold', fontSize: screenWidth / 28, color: (clickedOption === "reservations" ? ("#fff") : ("#C48F49")) }}>Reservations</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setClickedOption('houses'); PresentDataByVoice('houses'); GetHousesForDash(); setSearchedHouse('');}} style={{marginLeft: screenWidth/40, alignItems: 'center', justifyContent: 'center', width: screenWidth / 3.5, height: screenHeight / 22,  backgroundColor:(clickedOption === "houses" ? ("#C48F49") : ("#fff")), borderColor: '#C48F49', borderWidth: screenWidth / 500, borderRadius: screenWidth / 10 }}>
            <Text style={{ textAlign: 'center', fontFamily: 'SemiBold', fontSize: screenWidth / 28, color: (clickedOption === "houses" ? ("#fff") : ("#C48F49")) }}>Houses</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setClickedOption('reports'); PresentDataByVoice('reports'); GetReportsForDash();}} style={{marginLeft: screenWidth/40, alignItems: 'center', justifyContent: 'center', width: screenWidth / 3.5, height: screenHeight / 22,  backgroundColor:(clickedOption === "reports" ? ("#C48F49") : ("#fff")),  borderColor: '#C48F49', borderWidth: screenWidth / 500, borderRadius: screenWidth / 10 }}>
            <Text style={{ textAlign: 'center', fontFamily: 'SemiBold', fontSize: screenWidth / 28, color: (clickedOption === "reports" ? ("#fff") : ("#C48F49")) }}>Reports</Text>
        </TouchableOpacity>
            </ScrollView>
          </View>

        </View>
        <View style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: screenHeight/50}}>

            {/* Statistics Section */}

            {clickedOption === "statistics" ? (

            <View style={{marginTop: screenHeight/80, alignItems: 'center', flexDirection:'column', justifyContent:'space-around'}}>
            <View >
              <LinearGradient colors={['#C48F49', '#955223']} style={{flexDirection: 'row', width: screenWidth/1.3, height: screenHeight/6, borderColor:'#C48F49', borderRadius:screenWidth/30, borderWidth: screenWidth/300}}>
              <View style={{borderRightColor:'lightgrey', borderRightWidth: screenWidth/400, alignItems:'center', justifyContent:'center', flexDirection:'column', width: screenWidth/2.7, height: screenHeight/10}}>
                <Text style={{fontSize: screenWidth/22, fontFamily:'Bold', color:'#fff'}}>Number Of</Text>
                <Text style={{fontSize: screenWidth/22, fontFamily:'Bold', color:'#fff'}}>Users</Text>
              </View>
              <View style={{alignItems:'center', justifyContent:'center', flexDirection:'column', width: screenWidth/2.7, height: screenHeight/6}}>
                <Text style={{fontSize: screenWidth/22, fontFamily:'Black', color:'#fff'}}>{nbUsers}</Text>
                <Text style={{fontSize: screenWidth/25, fontFamily:'Black', color:'#fff'}}>user</Text>
              </View>
              </LinearGradient>
            </View>

            <View >
              <LinearGradient colors={['#C48F49', '#955223']} style={{marginTop: screenHeight/50, flexDirection: 'row', width: screenWidth/1.3, height: screenHeight/6, borderColor:'#C48F49', borderRadius:screenWidth/30, borderWidth: screenWidth/300}}>
              <View style={{borderRightColor:'lightgrey', borderRightWidth: screenWidth/400, alignItems:'center', justifyContent:'center', flexDirection:'column', width: screenWidth/2.7, height: screenHeight/10}}>
                <Text style={{fontSize: screenWidth/22, fontFamily:'Bold', color:'#fff'}}>Number Of</Text>
                <Text style={{fontSize: screenWidth/22, fontFamily:'Bold', color:'#fff'}}>Reservations</Text>
              </View>
              <View style={{alignItems:'center', justifyContent:'center', flexDirection:'column', width: screenWidth/2.7, height: screenHeight/6}}>
                <Text style={{fontSize: screenWidth/22, fontFamily:'Black', color:'#fff'}}>{nbReservations}</Text>
                <Text style={{fontSize: screenWidth/25, fontFamily:'Black', color:'#fff'}}>reservation</Text>
              </View>
              </LinearGradient>
            </View>

            <View >
            <LinearGradient colors={['#C48F49', '#955223']} style={{marginTop: screenHeight/50, flexDirection: 'row', width: screenWidth/1.3, height: screenHeight/6, borderColor:'#C48F49', borderRadius:screenWidth/30, borderWidth: screenWidth/300}}>
              <View style={{borderRightColor:'lightgrey', borderRightWidth: screenWidth/400, alignItems:'center', justifyContent:'center', flexDirection:'column', width: screenWidth/2.7, height: screenHeight/10}}>
                <Text style={{fontSize: screenWidth/22, fontFamily:'Bold', color:'#fff'}}>Number Of</Text>
                <Text style={{fontSize: screenWidth/22, fontFamily:'Bold', color:'#fff'}}>Houses</Text>
              </View>
              <View style={{alignItems:'center', justifyContent:'center', flexDirection:'column', width: screenWidth/2.7, height: screenHeight/6}}>
                <Text style={{fontSize: screenWidth/22, fontFamily:'Black', color:'#fff'}}>{nbHouses}</Text>
                <Text style={{fontSize: screenWidth/25, fontFamily:'Black', color:'#fff'}}>house</Text>
              </View>
            </LinearGradient>
            </View>

            <View >
            <LinearGradient colors={['#C48F49', '#955223']} style={{marginTop: screenHeight/50, flexDirection: 'row', width: screenWidth/1.3, height: screenHeight/6, borderColor:'#C48F49', borderRadius:screenWidth/30, borderWidth: screenWidth/300}}>
              <View style={{borderRightColor:'lightgrey', borderRightWidth: screenWidth/400, alignItems:'center', justifyContent:'center', flexDirection:'column', width: screenWidth/2.7, height: screenHeight/10}}>
                <Text style={{fontSize: screenWidth/22, fontFamily:'Bold', color:'#fff'}}>Number Of</Text>
                <Text style={{fontSize: screenWidth/22, fontFamily:'Bold', color:'#fff'}}>Providers</Text>
              </View>
              <View style={{alignItems:'center', justifyContent:'center', flexDirection:'column', width: screenWidth/2.7, height: screenHeight/6}}>
                <Text style={{fontSize: screenWidth/22, fontFamily:'Black', color:'#fff'}}>{nbProviders}</Text>
                <Text style={{fontSize: screenWidth/25, fontFamily:'Black', color:'#fff'}}>provider</Text>
              </View>
            </LinearGradient>
            </View>

            <View >
            <LinearGradient colors={['#C48F49', '#955223']} style={{marginTop: screenHeight/50, flexDirection: 'row', width: screenWidth/1.3, height: screenHeight/6, borderColor:'#C48F49', borderRadius:screenWidth/30, borderWidth: screenWidth/300}}>
              <View style={{borderRightColor:'lightgrey', borderRightWidth: screenWidth/400, alignItems:'center', justifyContent:'center', flexDirection:'column', width: screenWidth/2.7, height: screenHeight/10}}>
                <Text style={{fontSize: screenWidth/22, fontFamily:'Bold', color:'#fff'}}>Number Of</Text>
                <Text style={{fontSize: screenWidth/22, fontFamily:'Bold', color:'#fff'}}>Reports</Text>
              </View>
              <View style={{alignItems:'center', justifyContent:'center', flexDirection:'column', width: screenWidth/2.7, height: screenHeight/6}}>
                <Text style={{fontSize: screenWidth/22, fontFamily:'Black', color:'#fff'}}>{nbReports}</Text>
                <Text style={{fontSize: screenWidth/25, fontFamily:'Black', color:'#fff'}}>report</Text>
              </View>
            </LinearGradient>
            </View>
            </View>

            // Users Section

            ): clickedOption === "users" ? (
              <View style={{marginTop: screenHeight/80, alignItems: 'center', flexDirection:'column', justifyContent:'space-around'}}>
             
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: screenWidth / 300, borderColor: '#fff', marginRight: screenWidth / 22, marginLeft: screenWidth / 25, marginTop: screenHeight / 70, height: screenHeight / 17, borderRadius: screenWidth, backgroundColor: '#fff' }}>

                  <View style={{ left: screenWidth / 20 }}>
                    <Icon name='search-location' size={screenWidth / 18} color={'#C48F49'} />
                  </View>
                  <View style={{ width: screenWidth / 1.4, left: screenWidth / 10 }}>
                    <TextInput
                      style={{ fontSize: screenWidth / 27, fontFamily: 'SemiBold' }}
                      placeholder='Search User By ID Ex: 22 ...'
                      keyboardType='numeric'
                      value={searchedUser}
                      onChangeText={text => setSearchedUser(text)}
                      
                    />
                  </View>
                  <TouchableOpacity onPress={() => {GetUsersBySearch()}} style={{ right: screenWidth / 20 }}>
                    <FontAwesome name="angle-double-right" size={screenWidth / 10} color="#C48F49" />
                  </TouchableOpacity>
                </View>

                { userID.length > 0 ? (
                  <View>
                  {userID.map((userId, userIndex) =>(
                <LinearGradient key={userIndex} colors={['rgba(196, 143, 73, 0.25)', 'rgba(10, 2, 0, 0.25)']} style={{marginTop: screenHeight/50, width: screenWidth/1.1, height: screenHeight/2.3, borderWidth: screenWidth/400, borderRadius: screenWidth/40, borderColor: 'grey'}}>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, justifyContent:'center', width:screenWidth/1.106, borderRadius: screenWidth/40, height: screenHeight/20}}>
                    {isProvider[userIndex] === 1 ? (

                    <View style={{marginLeft: screenWidth/20, flexDirection:'row'}}>
                      <Text style={{fontSize: screenWidth/28, fontFamily: 'Black'}}>a Provider  </Text>
                    <MaterialIcons name="verified" size={screenWidth/15} color="#2741fe" />
                    </View>
                    ) : (
                    <View style={{marginLeft: screenWidth/20, flexDirection:'row'}}>
                    <Text style={{fontSize: screenWidth/28, fontFamily: 'Black'}}>Not a Provider  </Text>
                  <Icon name="minus" size={screenWidth/15} color="red" />
                  </View>
                    )}
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, justifyContent:'center', width:screenWidth/1.106, borderRadius: screenWidth/40, height: screenHeight/15}}>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "Profile", pictureToSee : "http://"+ServerIP+":3000/"+profilePic[userIndex]});}}>
                      <Image 
                      source={profilePic[userIndex] !== null ? ({uri : "http://"+ServerIP+":3000/"+profilePic[userIndex]}) : (require('../UserPages/UsrPgsImg/userGrey.png'))}
                      style={{marginLeft: screenWidth/30, width: screenWidth / 8, height: screenHeight / 17, borderRadius: screenWidth / 5 }}
                      />
                    </TouchableOpacity>
                    <Text style={{fontSize: screenWidth/28, fontFamily: 'Bold'}}> {userFirstName[userIndex]} {userLastName[userIndex]}</Text>
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, width:screenWidth/1.106, borderRadius: screenWidth/40, height: screenHeight/20}}>
                    <View style={{flexDirection:'row'}}>
                      <View style={{borderRightColor:'#fff', borderRightWidth: screenWidth/400, justifyContent:'center', width:screenWidth/2.5, height: screenHeight/20}}>
                        <View style={{marginLeft: screenWidth/50, flexDirection:'row'}}>
                          <Text style={{fontSize:screenWidth/27, fontFamily:'Bold'}}>User ID : </Text>
                          <Text style={{fontSize:screenWidth/25, fontFamily:'Medium'}}>{userId}</Text>
                        </View>
                      </View>
                      <View style={{flex:1, justifyContent:'center'}}>
                      <View style={{marginLeft: screenWidth/100, flexDirection:'row'}}>
                          <Text style={{fontSize:screenWidth/27, fontFamily:'Bold'}}>Joined At : </Text>
                          <Text style={{fontSize:screenWidth/25, fontFamily:'Medium'}}> {dateJoined[userIndex]} </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, justifyContent: 'center', width:screenWidth/1.106, borderRadius: screenWidth/40, height: screenHeight/20}}>
                    <View style={{marginLeft: screenWidth/40, flexDirection:'row'}}>
                      <Text style={{fontSize:screenWidth/27, fontFamily:'Bold'}}>Email : </Text>
                      <Text style={{fontSize:screenWidth/25, fontFamily:'Medium'}}>{userEmail[userIndex]} </Text>
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, justifyContent: 'center', width:screenWidth/1.106, borderRadius: screenWidth/40, height: screenHeight/20}}>
                  <View style={{marginLeft: screenWidth/40, flexDirection:'row'}}>
                      <Text style={{fontSize:screenWidth/27, fontFamily:'Bold'}}>Phone : </Text>
                      <Text style={{fontSize:screenWidth/25, fontFamily:'Medium'}}>{userPhone[userIndex]} </Text>
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, justifyContent: 'center', width: screenWidth/1.106, height: screenHeight/11, borderRadius: screenWidth/40}}>
                  <View style={{marginLeft: screenWidth/10, flexDirection:'row'}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{fontSize:screenWidth/27, fontFamily:'Bold'}}>Cin : </Text>
                      <Text style={{fontSize:screenWidth/25, fontFamily:'Medium'}}>{userCin[userIndex]} </Text>
                    </View>
                    <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "Cin", pictureToSee : cinPic[userIndex]});}}>
                    <Image 
                      source={{uri : "http://"+ServerIP+":3000/"+cinPic[userIndex]}}
                      style={{marginLeft: screenWidth/30, width: screenWidth / 3, height: screenHeight / 12, borderRadius: screenWidth / 50 }}
                      resizeMode='contain'
                      />
                    </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: '#2296bb', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 3.5 }}>
                        <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>Mail User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('EditUser', {user_id : user_id, jwtToken : jwtToken, userId : userId, first_name : userFirstName[userIndex], last_name : userLastName[userIndex], email : userEmail[userIndex], phone : userPhone[userIndex], cin : userCin[userIndex]})}} style={{marginLeft: screenWidth/80, alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: 'rgb(118, 200, 47)', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 3.5 }}>
                        <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>Edit User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {Confirmation(userId)}} style={{marginLeft: screenWidth/80, alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: 'rgb(255, 78, 47)', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 3.5 }}>
                        <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>Remove User</Text>
                    </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
                ))}
                </View>
                ) : searchedUserID !== '' ? (
                  <View>
                  <LinearGradient colors={['rgba(196, 143, 73, 0.25)', 'rgba(10, 2, 0, 0.25)']} style={{marginTop: screenHeight/50, width: screenWidth/1.1, height: screenHeight/2.3, borderWidth: screenWidth/400, borderRadius: screenWidth/40, borderColor: 'grey'}}>
                    <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, justifyContent:'center', width:screenWidth/1.106, borderRadius: screenWidth/40, height: screenHeight/20}}>
                      {searchedisProvider === 1 ? (

                      <View style={{marginLeft: screenWidth/20, flexDirection:'row'}}>
                        <Text style={{fontSize: screenWidth/28, fontFamily: 'Black'}}>a Provider  </Text>
                      <MaterialIcons name="verified" size={screenWidth/15} color="#2741fe" />
                      </View>
                      ) : (
                        <View style={{marginLeft: screenWidth/20, flexDirection:'row'}}>
                        <Text style={{fontSize: screenWidth/28, fontFamily: 'Black'}}>Not a Provider  </Text>
                      <Icon name="minus" size={screenWidth/15} color="#2741fe" />
                      </View>
                      )}
                    </View>
                    <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, justifyContent:'center', width:screenWidth/1.106, borderRadius: screenWidth/40, height: screenHeight/15}}>
                    <View style={{flexDirection:'row'}}>
                      <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "Profile", pictureToSee : "http://"+ServerIP+":3000/"+searchedprofilePic});}}>
                        <Image 
                        source={searchedprofilePic !== null ? ({uri : "http://"+ServerIP+":3000/"+searchedprofilePic}) : (require('../UserPages/UsrPgsImg/userGrey.png'))}
                        style={{marginLeft: screenWidth/30, width: screenWidth / 8, height: screenHeight / 17, borderRadius: screenWidth / 5 }}
                        />
                      </TouchableOpacity>
                      <Text style={{fontSize: screenWidth/28, fontFamily: 'Bold'}}>  {searchedUserFirstName} {searchedUserLastName}</Text>
                      </View>
                    </View>
                    <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, width:screenWidth/1.106, borderRadius: screenWidth/40, height: screenHeight/20}}>
                      <View style={{flexDirection:'row'}}>
                        <View style={{borderRightColor:'#fff', borderRightWidth: screenWidth/400, justifyContent:'center', width:screenWidth/2.5, height: screenHeight/20}}>
                          <View style={{marginLeft: screenWidth/50, flexDirection:'row'}}>
                            <Text style={{fontSize:screenWidth/27, fontFamily:'Bold'}}>User ID : </Text>
                            <Text style={{fontSize:screenWidth/25, fontFamily:'Medium'}}>{searchedUserID}</Text>
                          </View>
                        </View>
                        <View style={{flex:1, justifyContent:'center'}}>
                        <View style={{marginLeft: screenWidth/100, flexDirection:'row'}}>
                            <Text style={{fontSize:screenWidth/27, fontFamily:'Bold'}}>Joined At : </Text>
                            <Text style={{fontSize:screenWidth/25, fontFamily:'Medium'}}>{searcheddateJoined}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, justifyContent: 'center', width:screenWidth/1.106, borderRadius: screenWidth/40, height: screenHeight/20}}>
                      <View style={{marginLeft: screenWidth/40, flexDirection:'row'}}>
                        <Text style={{fontSize:screenWidth/27, fontFamily:'Bold'}}>Email : </Text>
                        <Text style={{fontSize:screenWidth/25, fontFamily:'Medium'}}>{searchedUserEmail} </Text>
                      </View>
                    </View>
                    <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, justifyContent: 'center', width:screenWidth/1.106, borderRadius: screenWidth/40, height: screenHeight/20}}>
                    <View style={{marginLeft: screenWidth/40, flexDirection:'row'}}>
                        <Text style={{fontSize:screenWidth/27, fontFamily:'Bold'}}>Phone : </Text>
                        <Text style={{fontSize:screenWidth/25, fontFamily:'Medium'}}>{searchedUserPhone} </Text>
                      </View>
                    </View>
                    <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, justifyContent: 'center', width: screenWidth/1.106, height: screenHeight/11, borderRadius: screenWidth/40}}>
                    <View style={{marginLeft: screenWidth/10, flexDirection:'row'}}>
                      <View style={{flexDirection: 'column'}}>
                        <Text style={{fontSize:screenWidth/27, fontFamily:'Bold'}}>Cin : </Text>
                        <Text style={{fontSize:screenWidth/25, fontFamily:'Medium'}}> {searchedUserCin} </Text>
                      </View>
                      <TouchableOpacity onPress={() => {navigation.navigate('ViewPicture', {PictureType : "Cin", pictureToSee : searchedcinPic});}}>
                      <Image 
                        source={{uri : "http://"+ServerIP+":3000/"+ searchedcinPic}}
                        style={{marginLeft: screenWidth/30, width: screenWidth / 3, height: screenHeight / 12, borderRadius: screenWidth / 50 }}
                        resizeMode='contain'
                        />
                      </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                      <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: '#2296bb', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 3.5 }}>
                        <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>Mail User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('EditUser', {user_id : user_id, jwtToken : jwtToken, userId : searchedUserID, first_name : searchedUserFirstName, last_name : searchedUserLastName, email : searchedUserEmail, phone : searchedUserPhone, cin : searchedUserCin})}} style={{marginLeft: screenWidth/80, alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: 'rgb(118, 200, 47)', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 3.5 }}>
                        <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>Edit User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {Confirmation(searchedUserID)}} style={{marginLeft: screenWidth/80, alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: 'rgb(255, 78, 47)', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 3.5 }}>
                        <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>Remove User</Text>
                    </TouchableOpacity>
                      </View>
                    </View>
                  </LinearGradient>
                  </View>
                ) : null}
              </View>

              // Reservations Section

            ) : clickedOption === "reservations" ? (
              <View>
              {reservationID.length > 0 ? (
              <View style={{marginTop: screenHeight/80, alignItems: 'center', flexDirection:'column', justifyContent:'space-around'}}>
                  {reservationID.map((reserveID, reserveIndex) => (
                <LinearGradient key={reserveIndex}  colors={['rgba(196, 143, 73, 0.25)', 'rgba(10, 2, 0, 0.25)']} style={{marginTop: screenHeight/50, width: screenWidth/1.1, height: screenHeight/1.96, borderWidth: screenWidth/400, borderRadius: screenWidth/40, borderColor: 'grey'}}>
                    
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/25, borderRadius: screenWidth/40}}>
                    <View style={{marginLeft: screenWidth/40, flexDirection: 'row'}}>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}> Reservation ID :</Text>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {reserveID} </Text>
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center',  justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/25, borderRadius: screenWidth/40}}>
                  <View style={{marginLeft: screenWidth/40, flexDirection: 'row'}}>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}> Costumer ID :</Text>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {costumerID[reserveIndex]} </Text>
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center',  justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/25, borderRadius: screenWidth/40}}>
                  <View style={{marginLeft: screenWidth/40, flexDirection: 'row'}}>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}> Provider ID :</Text>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {providerID[reserveIndex]} </Text>
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center',  justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/25, borderRadius: screenWidth/40}}>
                  <View style={{marginLeft: screenWidth/40, flexDirection: 'row'}}>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}> House ID :</Text>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {houseID[reserveIndex]} </Text>
                    </View>
                  </View>
                  <View style={{justifyContent:'center', alignItems:'center', borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, width: screenWidth/1.1, height: screenHeight/11, borderRadius: screenWidth/40}}>
                  
                  <View style={{flexDirection: 'row'}}>

                      <View style={{flexDirection:'column'}}>
                        <Text style={{fontSize : screenWidth/27, fontFamily : 'Medium'}}> {costumerName[reserveIndex]} </Text>
                        <Image 
                        source={costumerPic[reserveIndex] !== null ? ({uri : "http://"+ServerIP+":3000/"+ costumerPic[reserveIndex]}) : (require('../UserPages/UsrPgsImg/userGrey.png'))}
                        style={{width: screenWidth / 8, height: screenHeight / 17, borderRadius: screenWidth / 5 }}
                        />
                      </View>

                      <View style={{marginTop: screenHeight/25, flexDirection:'row'}}>
                      
                        <Text style={{fontSize : screenWidth/24, fontFamily : 'Bold'}}>  Ordered From    </Text>
                        <AntDesign name="arrowright" size={screenWidth/15} color="#2741fe" />
                      
                      </View>

                      <View style={{flexDirection:'column'}}>
                        <Text style={{fontSize : screenWidth/27, fontFamily : 'Medium'}}> {providerName[reserveIndex]} </Text>
                        <Image 
                        source={providerPic[reserveIndex] !== null ? ({uri : "http://"+ServerIP+":3000/"+ providerPic[reserveIndex]}) : (require('../UserPages/UsrPgsImg/userGrey.png'))}
                        style={{width: screenWidth / 8, height: screenHeight / 17, borderRadius: screenWidth / 5 }}
                        />
                      </View>

                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, justifyContent:'center', width: screenWidth/1.1, height: screenHeight/25, borderRadius: screenWidth/40}}>
                  <View style={{marginLeft: screenWidth/40, flexDirection: 'row'}}>
                      <Text style={{fontSize: screenWidth/28, fontFamily:'Bold'}}> House Price :</Text>
                      <Text style={{fontSize: screenWidth/28, fontFamily:'Medium', color:'green'}}> {housePrice[reserveIndex]} MAD/Night </Text>
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, width: screenWidth/1.1, height: screenHeight/20, borderRadius: screenWidth/40}}>
                  <View style={{marginTop: screenHeight/200, marginLeft: screenWidth/40, flexDirection: 'row', width: screenWidth/1.8}}>
                      <Text style={{fontSize: screenWidth/28, fontFamily:'Bold'}}> House Address :</Text>
                      {houseAddress[reserveIndex] && houseAddress[reserveIndex].length >= 20 ? (
                        <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {houseAddress[reserveIndex].substring(0,20)}... </Text>
                      ) : (
                        <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {houseAddress[reserveIndex]} </Text>
                      )}
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, justifyContent:'center', width: screenWidth/1.1, height: screenHeight/25, borderRadius: screenWidth/40}}>
                  <View style={{marginLeft: screenWidth/40, flexDirection: 'row'}}>
                      <Text style={{fontSize: screenWidth/28, fontFamily:'Bold'}}> Payment Status :</Text>
                      <Text style={{fontSize: screenWidth/28, fontFamily:'Medium', color: 'green'}}> {isPayed[reserveIndex]} </Text>
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, justifyContent:'center', width: screenWidth/1.1, height: screenHeight/25, borderRadius: screenWidth/40}}>
                  <View style={{marginLeft: screenWidth/40, flexDirection: 'row'}}>
                      <Text style={{fontSize: screenWidth/28, fontFamily:'Bold'}}> Status :</Text>
                      <Text style={{fontSize: screenWidth/28, fontFamily:'Medium', color:'green'}}> {status[reserveIndex]} </Text>
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, justifyContent:'center', width: screenWidth/1.1, height: screenHeight/25, borderRadius: screenWidth/40}}>
                  <View style={{marginLeft: screenWidth/40, flexDirection: 'row'}}>
                      <Text style={{fontSize: screenWidth/28, fontFamily:'Bold'}}> Number Of Travelers :</Text>
                      <Text style={{fontSize: screenWidth/28, fontFamily:'Medium'}}> {nbTravelers[reserveIndex]} </Text>
                    </View>
                  </View>
                  <View style={{justifyContent:'center', width: screenWidth/1.1, height: screenHeight/20, borderRadius: screenWidth/40}}>
                  <View style={{marginLeft: screenWidth/40, flexDirection: 'row'}}>
                      <Text style={{fontSize: screenWidth/28, fontFamily:'Bold'}}> Reserved From :</Text>
                      <Text style={{fontSize: screenWidth/28, fontFamily:'Medium', color:'green'}}> {startDate[reserveIndex]} to {endDate[reserveIndex]} </Text>
                    </View>
                  </View>
                
                </LinearGradient>
                ))}
              </View>
            ):null }
              </View>

              // THE Houses Section

            ) : clickedOption === "houses" ? (
              <View style={{marginTop: screenHeight/80, alignItems: 'center', flexDirection:'column', justifyContent:'space-around'}}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: screenWidth / 300, borderColor: '#fff', marginRight: screenWidth / 22, marginLeft: screenWidth / 25, marginTop: screenHeight / 70, height: screenHeight / 17, borderRadius: screenWidth, backgroundColor: '#fff' }}>

                  <View style={{ left: screenWidth / 20 }}>
                    <Icon name='search-location' size={screenWidth / 18} color={'#C48F49'} />
                  </View>
                  <View style={{ width: screenWidth / 1.4, left: screenWidth / 10 }}>
                    <TextInput
                      style={{ fontSize: screenWidth / 27, fontFamily: 'SemiBold' }}
                      placeholder='Search User By ID Ex: 22 ...'
                      keyboardType='numeric'
                      value={searchedHouse}
                      onChangeText={text => setSearchedHouse(text)}
                      
                    />
                  </View>
                  <TouchableOpacity onPress={() => {GetHousesBySearch()}} style={{ right: screenWidth / 20 }}>
                    <FontAwesome name="angle-double-right" size={screenWidth / 10} color="#C48F49" />
                  </TouchableOpacity>
                  </View>

                  {house_ID.length > 0 ? (
                <View>
                  {house_ID.map((H_id, houseIndex) =>(
                <LinearGradient key={houseIndex} colors={['rgba(196, 143, 73, 0.25)', 'rgba(10, 2, 0, 0.25)']} style={{marginTop: screenHeight/60, width: screenWidth/1.1, height: screenHeight/2.1, borderColor: 'lightgrey', borderWidth: screenWidth/400, borderRadius: screenWidth/30}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    <Image 
                    source={{uri : "http://" +ServerIP+ ":3000/" + house_Picture1[houseIndex]}}
                    style={{width: screenWidth/1.106, height: screenHeight/5, borderRadius: screenWidth/40}}
                    />
                    <Image 
                    source={{uri : "http://" +ServerIP+ ":3000/" +house_Picture2[houseIndex]}}
                    style={{marginLeft: screenWidth/80, width: screenWidth/1.106, height: screenHeight/5, borderRadius: screenWidth/40}}
                    />
                    <Image 
                    source={{uri : "http://" +ServerIP+ ":3000/" +house_Picture3[houseIndex]}}
                    style={{marginLeft: screenWidth/80, width: screenWidth/1.106, height: screenHeight/5, borderRadius: screenWidth/40}}
                    />
                    <Image 
                    source={{uri : "http://" +ServerIP+ ":3000/" +house_Picture4[houseIndex]}}
                    style={{marginLeft: screenWidth/80, width: screenWidth/1.106, height: screenHeight/5, borderRadius: screenWidth/40}}
                    />
                  </ScrollView>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>House ID :</Text>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {H_id} </Text>
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>Provider ID :</Text>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {provider_ID[houseIndex]} </Text>
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>City :</Text>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {house_City[houseIndex]} </Text>
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>Address :</Text>
                      {house_Address[houseIndex] && house_Address[houseIndex]?.length >= 22 ? (
                        <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}>
                          {house_Address[houseIndex].substring(0, 22)}...
                        </Text>
                      ) : (
                        <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}>
                          {house_Address[houseIndex]}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>Description :</Text>
                      {house_Description[houseIndex] && house_Description[houseIndex].length >= 22 ? (
                        <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}>
                          {house_Description[houseIndex].substring(0, 22)}...
                        </Text>
                      ) : (
                        <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}>
                          {house_Description[houseIndex]}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>Price :</Text>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Medium', color:'green'}}> {house_Price[houseIndex]} MAD/Night </Text>
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>Added at :</Text>
                      <Text style={{fontSize: screenWidth/25, fontFamily:'Medium', color:'green'}}> {date_added[houseIndex]} </Text>
                    </View>
                  </View>
                  <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/14, borderRadius: screenWidth/40}}>
                    <View style={{flexDirection:'row'}}>
                  <TouchableOpacity onPress={() => {navigation.navigate('EditHouse', {user_id : user_id, jwtToken : jwtToken, houseId : H_id, houseCity : house_City[houseIndex], houseAddress : house_Address[houseIndex], houseDescription : house_Description[houseIndex], housePrice : house_Price[houseIndex]})}} style={{alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: 'rgb(118, 200, 47)', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 3 }}>
                        <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>Edit House</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{ConfirmHouseDelete(provider_ID[houseIndex], H_id)}} style={{marginLeft: screenWidth/40, alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: 'rgb(255, 78, 47)', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 3 }}>
                        <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>Remove House</Text>
                    </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
                ))}
                </View>
                  ) : searchedHouse !== '' ? (
                    <LinearGradient colors={['rgba(196, 143, 73, 0.25)', 'rgba(10, 2, 0, 0.25)']} style={{marginTop: screenHeight/60, width: screenWidth/1.1, height: screenHeight/2.1, borderColor: 'lightgrey', borderWidth: screenWidth/400, borderRadius: screenWidth/30}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                        <Image 
                        source={{uri : "http://" +ServerIP+ ":3000/" +searchedhouse_Picture1}}
                        style={{width: screenWidth/1.106, height: screenHeight/5, borderRadius: screenWidth/40}}
                        />
                        <Image 
                        source={{uri : "http://" +ServerIP+ ":3000/" +searchedhouse_Picture2}}
                        style={{marginLeft: screenWidth/80, width: screenWidth/1.106, height: screenHeight/5, borderRadius: screenWidth/40}}
                        />
                        <Image 
                        source={{uri : "http://" +ServerIP+ ":3000/" +searchedhouse_Picture3}}
                        style={{marginLeft: screenWidth/80, width: screenWidth/1.106, height: screenHeight/5, borderRadius: screenWidth/40}}
                        />
                        <Image 
                        source={{uri : "http://" +ServerIP+ ":3000/" +searchedhouse_Picture4}}
                        style={{marginLeft: screenWidth/80, width: screenWidth/1.106, height: screenHeight/5, borderRadius: screenWidth/40}}
                        />
                      </ScrollView>
                      <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                        <View style={{flexDirection:'row'}}>
                          <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>House ID :</Text>
                          <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {searchedhouse_ID} </Text>
                        </View>
                      </View>
                      <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                        <View style={{flexDirection:'row'}}>
                          <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>Provider ID :</Text>
                          <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {searchedprovider_ID} </Text>
                        </View>
                      </View>
                      <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                        <View style={{flexDirection:'row'}}>
                          <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>City :</Text>
                          <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {searchedhouse_City} </Text>
                        </View>
                      </View>
                      <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                        <View style={{flexDirection:'row'}}>
                          <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>Address :</Text>
                          {searchedhouse_Address.length >= 22 ? (
                        <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {searchedhouse_Address.substring(0,22)}... </Text>
                      ) : (
                        <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {searchedhouse_Address} </Text>
                      )}
                        </View>
                      </View>
                      <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                        <View style={{flexDirection:'row'}}>
                          <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>Description :</Text>
                          {searchedhouse_Description.length >= 22 ? (
                        <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {searchedhouse_Description.substring(0,22)}... </Text>
                      ) : (
                        <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {searchedhouse_Description} </Text>
                      )}
                        </View>
                      </View>
                      <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                        <View style={{flexDirection:'row'}}>
                          <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>Price :</Text>
                          <Text style={{fontSize: screenWidth/25, fontFamily:'Medium', color:'green'}}> {searchedhouse_Price} MAD/Night </Text>
                        </View>
                      </View>
                      <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                        <View style={{flexDirection:'row'}}>
                          <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>Added at :</Text>
                          <Text style={{fontSize: screenWidth/25, fontFamily:'Medium', color:'green'}}> {searcheddate_added} </Text>
                        </View>
                      </View>
                      <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/14, borderRadius: screenWidth/40}}>
                        <View style={{flexDirection:'row'}}>
                      <TouchableOpacity onPress={() => {navigation.navigate('EditHouse', {user_id : user_id, jwtToken : jwtToken, houseId : searchedhouse_ID, houseCity : searchedhouse_City, houseAddress : searchedhouse_Address, houseDescription : searchedhouse_Description, housePrice : searchedhouse_Price})}} style={{alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: 'rgb(118, 200, 47)', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 3 }}>
                            <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>Edit House</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>{ConfirmHouseDelete(searchedprovider_ID, searchedhouse_ID)}} style={{marginLeft: screenWidth/40, alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: 'rgb(255, 78, 47)', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 3 }}>
                            <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>Remove House</Text>
                        </TouchableOpacity>
                        </View>
                      </View>
                    </LinearGradient>
                  ) : null}
              </View>

              // Reports Section

            ) : (
              <View style={{marginTop: screenHeight/80, alignItems: 'center', flexDirection:'column', justifyContent:'space-around'}}>
                {ReportID.length > 0 ? (
                <View>
                  {ReportID.map((reportID, reportIndex) =>(
                <LinearGradient key={reportIndex} colors={['rgba(196, 143, 73, 0.25)', 'rgba(10, 2, 0, 0.25)']} style={{marginTop: screenHeight/60, width: screenWidth/1.1, height: screenHeight/3.5, borderColor: 'lightgrey', borderWidth: screenWidth/400, borderRadius: screenWidth/30}}>
                <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>Report ID :</Text>
                    <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {reportID} </Text>
                  </View>
                </View>
                <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>Costumer ID :</Text>
                    <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {costumID[reportIndex]} </Text>
                  </View>
                </View>
                <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>provider ID :</Text>
                    <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {provID[reportIndex]} </Text>
                  </View>
                </View>
                <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/35, borderRadius: screenWidth/40}}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>Made at :</Text>
                    <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {dateMade[reportIndex]} </Text>
                  </View>
                </View>
                <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/24, borderRadius: screenWidth/40}}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>Title :</Text>
                    {title[reportIndex] && title[reportIndex].length >= 22 ? (
                        <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {title[reportIndex].substring(0,22)}... </Text>
                      ) : (
                        <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {title[reportIndex]} </Text>
                      )}
                  </View>
                </View>
                <View style={{borderBottomColor:'#fff', borderBottomWidth: screenWidth/400, alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/20, borderRadius: screenWidth/40}}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize: screenWidth/25, fontFamily:'Bold'}}>Reason :</Text>
                     {reason[reportIndex] && reason[reportIndex].length >= 22 ? (
                        <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {reason[reportIndex].substring(0,22)}... </Text>
                      ) : (
                        <Text style={{fontSize: screenWidth/25, fontFamily:'Medium'}}> {reason[reportIndex]} </Text>
                      )}
                  </View>
                </View>
                <View style={{alignItems:'center', justifyContent: 'center', width: screenWidth/1.1, height: screenHeight/14, borderRadius: screenWidth/40}}>
                  <TouchableOpacity onPress={() => {navigation.navigate('FullReport', {admin_id : user_id, jwtToken : jwtToken, costumer_id : costumID[reportIndex], provider_id : provID[reportIndex], title : title[reportIndex], reason : reason[reportIndex]})}} style={{alignItems: 'center', justifyContent: 'center', borderColor: '#fff', backgroundColor: 'rgb(118, 200, 47)', borderRadius: screenWidth / 20, height: screenHeight / 18, width: screenWidth / 2 }}>
                        <Text style={{ fontSize: screenWidth / 28, fontFamily: 'ExtraBold', color: 'white' }}>View Full Report</Text>
                    </TouchableOpacity>
                </View>
                </LinearGradient>           
              ))}
                </View>
                ) : null}
              </View>
              
            )}
          </ScrollView>

        </View>
      
    </View>
  );
}
