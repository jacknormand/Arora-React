import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
//import { useNetInfo } from '@react-native-community/netinfo';
import * as Location from 'expo-location';

// Variables to insert for port and IP
const port = '8000'
const IP = '104.248.178.78'

//Api ip routes
//const regIp = 'http://104.248.178.78:8000/';
const regIp = 'http://' + IP + ':' + port + '/';
//const loginApiIp = 'http://104.248.178.78:8000/api-token-auth';
const loginApiIp = 'http://' + IP + ':' + port + '/' + 'api-token-auth';
//const moodFormApiIp = 'http://104.248.178.78:8000/moodreport';
const moodFormApiIp = 'http://' + IP + ':' + port + '/' + 'moodreport';
//const registerApiIp = 'http://104.248.178.78:8000/userinfo';
const registerApiIp = 'http://' + IP + ':' + port + '/' + 'userinfo';

//When internet connection is detected upload to database
//Function to upload the user data when network is detected
/*
  ==============================================
  ASK ABOUT THE USER UPDATE
  ==============================================
*/

const createUserLocationReport = async () => {
  //get the permission from user and get values accordingly
  let { status }  = await Location.requestForegroundPermissionsAsync()
  if( status === 'granted' ){
   let location = await Location.getCurrentPositionAsync({});
    await AsyncStorage.setItem( '@longitude' , JSON.stringify( location.coords.longitude ) );
    await AsyncStorage.setItem( '@latitude' , JSON.stringify( location.coords.latitude ) );
  }
  else{
    //Temp location values for permission denied 
    await AsyncStorage.setItem( '@longitude' , JSON.stringify( .2 ) );
    await AsyncStorage.setItem( '@latitude' , JSON.stringify( .7 ) );  
  }
  
  //Get values out of storage
  let userId = await AsyncStorage.getItem( '@userId' );
  let longitude = await AsyncStorage.getItem( '@longitude' );
  let latitude = await AsyncStorage.getItem( '@latitude' );
  latitude = parseFloat( latitude );
  longitude = parseFloat( longitude );


  //Api call to make location report 
  await fetch( regIp + 'locationreport' , {
    method: 'POST',
    headers:{
    'Content-Type':'application/json'
    },
    body: JSON.stringify({
      "location_report_lat" :   Number( Math.round( latitude * 100 ) / 100 ),
      "location_report_long":   Number( Math.round( longitude * 100 ) / 100),
      "user_id": userId
    })
  }).then( response => {
    return response.json();
  })
  .catch(error => {
    console.error( error );
  })
}

export async function updateDatabase(){
   createUserLocationReport();
   let userId = await AsyncStorage.getItem( '@userId' );
   let userPollen = await AsyncStorage.getItem( '@user_pollen' );
   let currentButterfly = await AsyncStorage.getItem( '@current_butterfly' );
   let userMood = await AsyncStorage.getItem( '@user_current_mood' );
   let longitude = await AsyncStorage.getItem( '@longitude' );
   let latitude = await AsyncStorage.getItem( '@latitude' );
   //let timeSubmmited = await AsyncStorage.getItem( '@user_current_mood_updated' );
   //parse to JSON object
   //timeSubmmited = JSON.parse( timeSubmmited );
   await fetch('http://104.248.178.78:8000/userinfo/' + userId , {
    method: 'PATCH',
    headers:{
    'Content-Type':'application/json'
    },
    body: JSON.stringify({ // NEED TO CHECK IF WE STILL NEED THESE VALUES FOR UPDATE
	   "user_current_mood": userMood,
	   "user_current_mood_updated": "2019-02-23T09:38:42.925706Z", // See if we still need to update location data
	   "user_current_location_updated":"2019-02-23T09:38:42.925706Z",
	   "user_current_butterfly": currentButterfly, // What is this
	   "user_current_location_lat": latitude, // Temp
	   "user_current_location_long": longitude, // Temp 
	   "user_pollen": userPollen,
	   "user_points": 3 
    })
   }).then( response => {
     return response.json();
   })
   .catch(error => {
     console.error( error );
   })
}

//Function to create user butterfly( NOT DONE ) 
/*
MIGHT NOT NEED THESE BUT GOING TO CHECK ATTRIUM DATA 
==========================================================
export async function updateButterFlies(){
  let userId = await AsyncStorage.getItem('@userId');
  await fetch( regIp + 'userbutterfly' , {
    method: 'POST',
    headers:{
    'Content-Type':'application/json' 
    },
    body: JSON.stringify({
      "butterfly_id":2,
      "user_id": userId
    })
  }).then( response => {
    return response.json();
  }).catch( error => {
    console.error( error );
  })
}

//Function to create a user attrium for first time( NOT DONE )
export async function createAttrium(){
  let userId = await AsyncStorage.getItem( '@userId' );
  //Not real URL
  await fetch( 'http://104.248.178.78:8000/ButterflyAtriums/butterflyatrium' , {
   method: 'POST',
   headers:{
   'Content-Type':'application/json' 
   },
   body: JSON.stringify({
    'user_id' : userId,
    'user_b0_count' : 0,
    'user_b1_count' : 0,
    'user_b2_count' : 0,
    'user_b3_count' : 0,
  })
 }).then( response => {
   return response.json();
 }).catch( error => {
   console.log( error );
 })
}
===================================================================
*/

export async function storeUserData(){
  //get current user id and fetch the user data
  let userId = await AsyncStorage.getItem( '@userId' );
  await fetch( 'http://104.248.178.78:8000/userinfo/' + userId )
    .then( response => {
      return response.json();
    }).then( data => {
      //Load values from database to the async storage for later use
      AsyncStorage.setItem( '@user_pollen' , JSON.stringify( data.user_pollen ));
      AsyncStorage.setItem( '@user_b0_count' , JSON.stringify( data.user_b0_count ));
      AsyncStorage.setItem( '@user_b1_count' , JSON.stringify( data.user_b1_count ));
      AsyncStorage.setItem( '@user_b2_count' , JSON.stringify( data.user_b2_count ));
      AsyncStorage.setItem( '@user_b3_count' , JSON.stringify( data.user_b3_count ));
      AsyncStorage.setItem( '@user_b4_count' , JSON.stringify( data.user_b4_count ));
      AsyncStorage.setItem( '@current_butterfly' , JSON.stringify( data.user_current_butterfly ));
      AsyncStorage.setItem( '@user_current_mood' , JSON.stringify( data.user_current_mood ));
      AsyncStorage.setItem( '@user_current_mood_updated' , JSON.stringify( data.user_current_mood_updated ));
    }).catch( error => {
      console.error(error)
    })
}

export async function registerAPI( user, pass, email, navigation )
{
  var userID;

  await fetch( registerApiIp, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "username": user,
      "email": email,
      "password": pass
    })
    })
    .then( response => {
      return response.json()
    })
    .then( data => {
      userID = data.user_id;
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    // creation success
    if ( userID ){

      // navigate back to login
      // go to wellness check
      navigation.navigate("Login")


    }
    // FIX THIS TO ACCOUNT FOR DIFFERENT ERRORS
    else{
      Alert.alert(
        "Credential Error",
        "Try again",
        [
          { text: "Ok" }
        ]
      );

    }


  
  

}

export async function loginAPI( user, pass, navigation, value )
{
  var userID;
  var token;
  
  //For future in case of no internet connection, check if the user id is not null if not then the user is still logged in. 
  // let tempId = await AsyncStorage.getItem( "@user_id" ); We know if the user has ever been logged in on the device 
  // let tempAutoLogin = await AsyncStorage.getItem( "@autoLogin" );
  //if( tempId != null && autoLogin === "true" )
  //        ( Used to bypass the api call so if theres no internet the user can still log in )

  //Fetch the login API 
  await fetch( loginApiIp, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "username": user,
    "password": pass
  })
  })
  .then( response => {
    //return response.json()
    return response.json()
    // OR RESPONSE.text might fix error, but then we have to get data out of string
  })
  .then( data => {
    userID = data.user_id;
    token = data.token;
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  // USER EXISTS and correct credentials
  // If info entered isnt correct, userID wont be passed back and wont exist
  if ( userID ){

    // if bool val undefined, then we are autlogin so set it to true
    if (value == undefined){
      value = true;
    }

    // update auto login here. the reason for this is because previously, you could just click 
    // "keep me logged in" and not actually sign in, and when you restarted the app it would bypass
    // the login. putting this here instead of the login screen prevents that from happening
    await AsyncStorage.setItem( '@autoLogin' , JSON.stringify( value ));

    // Store user data into storage
    const storeData = async () => {
        await AsyncStorage.setItem( '@user' , user );
        
        //Possibly for auto login
        await AsyncStorage.setItem( '@password' , pass );
        await AsyncStorage.setItem( '@userId' , JSON.stringify( userID ) );

        //set temp user locations, in case user doesnt grant location permissions
        await AsyncStorage.setItem( '@longitude' , JSON.stringify( .2 ) );
        await AsyncStorage.setItem( '@latitude' , JSON.stringify( .7 ) );

        //Might not need
        await AsyncStorage.setItem( '@userToken' , token );
    }
    
    //Save data to local 
    storeData();
    storeUserData();

    
    //Get user stored setting 
    const autoSignIn = await AsyncStorage.getItem( '@autoLogin' );


    //If user wants auto login then we still need a screen timer
    if( autoSignIn === "true" ){
      setTimeout(() => {
        navigation.navigate("Wellness");
      }, 2000);
    }
    else{
      // go to wellness check
      navigation.navigate("Wellness")
    }  
  }
  else {
    Alert.alert(
      "Incorrect Credentials",
      "Try again",
      [
        { text: "Ok" }
      ]
    );
  }
}

export async function moodReportAPI( navigation ){
    //Obtain mood api data from storage
    let userId = await AsyncStorage.getItem( '@userId' );
    let moodType = await AsyncStorage.getItem( '@mood_type' );
    let stressType = await AsyncStorage.getItem( '@stress_type' );
    moodType = moodType.toString;
    stressType = stressType.toString;
    
    //Get date and time and format it
    var currentdate = new Date();
    let timeSubmmited = currentdate.getFullYear() + "-"
                       + (currentdate.getMonth()+1)  + "-" 
                       + currentdate.getDate() + "TO"
                       + currentdate.getHours() + ":"  
                       + currentdate.getMinutes() + ":" 
                       + currentdate.getSeconds() + "."
                       + currentdate.getMilliseconds();
                       + "Z"
  
    AsyncStorage.setItem('@user_current_mood_updated' , JSON.stringify( timeSubmmited) );
    
     await fetch( moodFormApiIp, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        //TODO: Mood and Stress values arnt updating in the input types in the database( I need to fix this )
        body: JSON.stringify({
          "user_id": userId,
          "mood_type": moodType,
          "user_text": stressType 
        })
        })
        .then(response => {
          return response.json();
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        navigation.navigate('Home')
}
