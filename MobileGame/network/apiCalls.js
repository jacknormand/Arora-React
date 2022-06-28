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

const locationApiIp = 'http://' + IP + ':' + port + '/' + 'locationreport'; 

//When internet connection is detected upload to database
//Function to upload the user data when network is detected


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
  await fetch( locationApiIp , {
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
  // Need to await values here for PATCH 
  await AsyncStorage.getItem( '@userId' ).then( value => userId = value );
  await AsyncStorage.getItem( '@user_pollen' ).then( value => userPollen = value );
  await AsyncStorage.getItem( '@current_butterfly' ).then( value => currentButterfly = value );
  await AsyncStorage.getItem( '@mood_type' ).then( value => userMood = value );
  await AsyncStorage.getItem( '@stress_type' ).then( value => userStress = value );
  await AsyncStorage.getItem( '@longitude' ).then( value => longitude = value );
  await AsyncStorage.getItem( '@latitude' ).then( value => latitude = value );
  //await AsyncStorage.getItem( '@user_current_mood_updated' ).then( value => moodTime = value );

  await fetch('http://104.248.178.78:8000/userinfo/' + userId , {
    method: 'PATCH',
    headers:{
    'Content-Type':'application/json'
    },
    body: JSON.stringify({ 
	   "user_current_mood": Number( userMood ),
     "user_current_stress": Number( userStress ),
	   "user_current_mood_updated": "2019-02-23T09:38:42.925706Z", 
	   "user_current_location_updated":"2019-02-23T09:38:42.925706Z",
	   "user_current_butterfly": currentButterfly,
	   "user_current_location_lat": latitude, 
	   "user_current_location_long": longitude, 
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

export async function createNewMessage( messageText , messageDate , senderId , senderName , reciverId ){
  await fetch( 'http://104.248.178.78:8000/Message' , {
   method: 'POST',
   headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
   },
   body: JSON.stringify({
    "message_text": messageText,
    "message_date": messageDate,
    "message_sender_id": senderId,
    "message_reciver_id": reciverId,
    "sender_name": senderName 
   })
   })
   .then(response => {
    return response.json();
   })
   .then( data => {
    AsyncStorage.setItem( "@convo_id" , JSON.stringify( data["Convo Id"] ) );
   })
   .catch((error) => {
      console.error('Error:', error);
   })
}


export async function storeUserData( userID ){
  //get current user id and fetch the user data
  await fetch( 'http://104.248.178.78:8000/userinfo/' + userID )
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

export async function getMentor()
{
  //await AsyncStorage.getItem( '@assigned_mentor' ).then( value => mentorId = value );
  await fetch( 'http://104.248.178.78:8000/userinfo/' + '2147483648' )
  .then( response => {
    return response.json();
  }).then( data => {
    AsyncStorage.setItem( '@mentor_name' , data.user_name ); 
  }).catch( error => {
    console.error( error );
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
      // upon creation of user, set default mentor
      // Defualt is superuser id, might be a problem. In production, the supervison will have an actual id
      await AsyncStorage.setItem( '@assigned_mentor' , JSON.stringify( 2147483648 ) );
      // navigate back to login
      navigation.navigate("Login")

    }
    // FIX THIS TO ACCOUNT FOR DIFFERENT ERRORS
    else{
      Alert.alert(
        "Email or username already in use",
        "Change and try again",
        [
          { text: "Ok" }
        ]
      );

    }
}

export async function getConvoId()
{
  var userId , mentorId;
  await AsyncStorage.getItem( '@userId' ).then( value => userId = parseInt( value ) );
  await AsyncStorage.getItem( '@assigned_mentor' ).then( value => mentorId = parseInt( value ) );
  await fetch( ( 'http://104.248.178.78:8000/Messages/' + userId ) + mentorId )
  .then( response => {
    return response.json();
  })
  .then( data => {
    console.log( data );
  })
  .catch( error => {
    console.error( error );
  })
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

    // Test user entered against the one stored.
    // If diff then we need to create the convo 
    var testUser , mentor_name , mentor_id;
    await AsyncStorage.getItem( '@userId' ).then( value => testUser = parseInt( value ) );
    await AsyncStorage.getItem( '@mentor_name' ).then( value => mentor_name = value );
    await AsyncStorage.getItem( "@assigned_mentor" ).then( value => mentor_id = parseInt( value ) );
    if( testUser != userID )
    {
      // Create a system message 
      let text = "You are now connected to your mentor, " + mentor_name + "!";
      createNewMessage( text, new Date(),
      userID, "System", mentor_id )
    }

    // if bool val undefined, then we are autlogin so set it to true
    if (value == undefined){
      value = true;
    }

    // update auto login here. the reason for this is because previously, you could just click 
    // "keep me logged in" and not actually sign in, and when you restarted the app it would bypass
    // the login. putting this here instead of the login screen prevents that from happening
    await AsyncStorage.setItem( '@autoLogin' , JSON.stringify( value ));

    // Store user data into storage
    const storeData = async ( userID ) => {
        await AsyncStorage.setItem( '@user' , user );
        
        //Possibly for auto login
        await AsyncStorage.setItem( '@password' , pass );
        await AsyncStorage.setItem( '@userId' , JSON.stringify( userID ) );
        await AsyncStorage.setItem( '@assigned_mentor' , JSON.stringify( 2147483648 ) );
        await AsyncStorage.setItem( '@is_logged_in' , JSON.stringify( true ) );

        //Might not need
        await AsyncStorage.setItem( '@userToken' , token );
    }
    
    //Save data to local 
    storeData( userID );
    storeUserData( userID );
    getMentor();

    
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
   await AsyncStorage.getItem( '@userId' ).then( value => value != null ? userId = value : console.log( "User Id: Evaluated to null" ) );
   await AsyncStorage.getItem( '@mood_type' ).then( value => value != null ? moodType = value : console.log( " Mood Type: Evaluated to null" ) );
   await AsyncStorage.getItem( '@stress_type' ).then( value => value != null ? stressType = value : console.log( "Stress Type: Evaluated to null" ) );
    
    //Get date and time and format it
  
    var currentdate = new Date();
    AsyncStorage.setItem('@user_current_mood_updated' , JSON.stringify( currentdate ) );

     await fetch( moodFormApiIp, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        //TODO: Mood and Stress values arnt updating in the input types in the database( I need to fix this )
        body: JSON.stringify({
          "user_id":  userId,
          "mood_type": Number( moodType ),
          "user_text": Number( stressType ) 
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
