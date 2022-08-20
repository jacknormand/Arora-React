import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
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
const registerApiIp = 'http://' + IP + ':' + port + '/' + 'createuser';

const locationApiIp = 'http://' + IP + ':' + port + '/' + 'locationreport';

const createUserLocationReport = async () => {
  //get the permission from user and get values accordingly
  let { status }  = await Location.requestForegroundPermissionsAsync()
  if( status === 'granted' ){
   let location = await Location.getCurrentPositionAsync({});
    await AsyncStorage.setItem( '@longitude' , JSON.stringify( location.coords.longitude ) );
    await AsyncStorage.setItem( '@latitude' , JSON.stringify( location.coords.latitude ) );
  }
  else{
    await AsyncStorage.setItem( '@longitude' , JSON.stringify( .2 ) );
    await AsyncStorage.setItem( '@latitude' , JSON.stringify( .7 ) );  
  }
  
  //Get values out of storage
  let userId = await AsyncStorage.getItem( '@userId' );
  let longitude = await AsyncStorage.getItem( '@longitude' );
  let latitude = await AsyncStorage.getItem( '@latitude' );
  let token = await AsyncStorage.getItem("@token");
  latitude = parseFloat( latitude );
  longitude = parseFloat( longitude );

  //Api call to make location report 
  await fetch( locationApiIp , {
    method: 'POST',
    headers:{
    'Content-Type':'application/json',
    Authorization: 'Bearer ' + JSON.parse( token ) // user token here, no reason to use api token. 
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
  await AsyncStorage.getItem( '@assigned_mentor').then( value => mentorId = value );
  //await AsyncStorage.getItem( '@user_current_mood_updated' ).then( value => moodTime = value );
  let token = await AsyncStorage.getItem("@token");
  await fetch('http://104.248.178.78:8000/userinfo/' + userId , {
    method: 'PATCH',
    headers:{
    'Content-Type':'application/json',
     Authorization: 'Bearer ' + JSON.parse( token )
    },
    body: JSON.stringify({ 
	   "user_current_mood": Number( userMood ),
     "user_current_stress": Number( userStress ),
	   "user_current_mood_updated": new Date(), 
	   "user_current_location_updated":new Date(),
	   "user_current_butterfly": currentButterfly,
	   "user_current_location_lat": latitude, 
	   "user_current_location_long": longitude, 
	   "user_pollen": userPollen,
     "mentor_id": mentorId,
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
  let token = await AsyncStorage.getItem("@token");
  await fetch( 'http://104.248.178.78:8000/Message' , {
   method: 'POST',
   headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + JSON.parse( token )
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
  let token = await AsyncStorage.getItem("@token");
  //get current user id and fetch the user data
  await fetch( 'http://104.248.178.78:8000/userinfo/' + userID , {
    headers: {
      Authorization: 'Bearer ' + JSON.parse( token )
    }
    })
    .then( response => {
      return response.json();
    }).then( data => {
      AsyncStorage.setItem( '@user_pollen' , JSON.stringify( data.user_pollen ));
      AsyncStorage.setItem( '@user_b0_count' , JSON.stringify( data.user_b0_count ));
      AsyncStorage.setItem( '@user_b1_count' , JSON.stringify( data.user_b1_count ));
      AsyncStorage.setItem( '@user_b2_count' , JSON.stringify( data.user_b2_count ));
      AsyncStorage.setItem( '@user_b3_count' , JSON.stringify( data.user_b3_count ));
      AsyncStorage.setItem( '@user_b4_count' , JSON.stringify( data.user_b4_count ));
      AsyncStorage.setItem( '@current_butterfly' , JSON.stringify( data.user_current_butterfly ));
      AsyncStorage.setItem( '@user_current_mood' , JSON.stringify( data.user_current_mood ));
      AsyncStorage.setItem( '@user_current_mood_updated' , JSON.stringify( data.user_current_mood_updated ));
      AsyncStorage.setItem( '@assigned_mentor' , JSON.stringify( data.mentor_id ) );
    }).catch( error => {
      console.error(error)
    })
}

export async function changeMentor(){
  var userId , mentorId; 
  await AsyncStorage.getItem( "@userId")
  .then( value => userId = parseInt( value ) );

  await AsyncStorage.getItem( '@assigned_mentor')
  .then( value => mentorId = parseInt( value ) );

  let token = await AsyncStorage.getItem("@token");

  await fetch( 'http://104.248.178.78:8000/changementor/' + userId , {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + JSON.parse( token ),
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "mentor_id": mentorId
    })
    })
    .then( response => {
      return response.json();
    })
    .catch( error => {
      console.error( error );
  })
}

export async function getMentor()
{
  var mentorId, token;
  await AsyncStorage.getItem( '@assigned_mentor')
  .then( value => mentorId = parseInt( value ) );
  await AsyncStorage.getItem("@token")
  .then( value => token = value);
  console.log(token);
  await fetch( 'http://104.248.178.78:8000/userinfo/' + mentorId, {
    headers:{
      Authorization: 'Bearer ' + JSON.parse( token ),
    }
  })
  .then( response => {
    return response.json();
  }).then( data => {
    AsyncStorage.setItem( '@mentor_name' , data.user_name ); 
  }).catch( error => {
    console.error( error );
  })
}

export async function registerAPI( user, pass, email , navigation )
{
  var userID;

  await fetch( registerApiIp, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
      // Initalize some information
      AsyncStorage.setItem( "@userId" , JSON.stringify( userID ) );
      AsyncStorage.setItem( '@messages' , JSON.stringify( [] ) );
      
      //Get supervisor info for default mentor on user create
      const getMentorInfo = async ( userID ) => {
        // Make sure all data is collected before heading to next step. We dont want to pass null here  
        getSupervisorId()
        .then(() => {
          AsyncStorage.getItem( "@assigned_mentor")
          .then( mentor_id => {
            changeMentor();
            getMentor()
            .then(() => {
              AsyncStorage.getItem("@mentor_name")
              .then( value => {
                //Create a first time sys message for user if no errors occured during data collection
                let text = "You are now connected to your mentor, " + value + "!";
                createNewMessage( text, new Date(), userID, "System", mentor_id );

                // navigate back to login
                navigation.navigate("Login")
              })
            })
          })
        })
      }

      //Set up mentor fields for user
      getMentorInfo( userID )
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
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "username": user,
    "password": pass
  })
  })
  .then( response => {
    return response.json();
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
    var autoSignIn;

    // if bool val undefined, then we are autlogin so set it to true
    if (value == undefined){
      value = true;
    }

    // update auto login here. the reason for this is because previously, you could just click 
    // "keep me logged in" and not actually sign in, and when you restarted the app it would bypass
    // the login. putting this here instead of the login screen prevents that from happening
    console.log("Token: ");
    console.log( token );
    console.log("login: ");
    console.log( value );
    console.log("User: ");
    console.log( user );
    console.log("Pass: ");
    console.log( pass );
    console.log("UserId: ");
    console.log( userID );
    const storeLoginData = async () => {
      await AsyncStorage.setItem('@token', JSON.stringify( token ) );
      await AsyncStorage.setItem( '@autoLogin' , JSON.stringify( value ));
      await AsyncStorage.setItem( '@user' , user );
      await AsyncStorage.setItem( '@password' , pass );
      await AsyncStorage.setItem( '@userId' , JSON.stringify( userID ) );
      await AsyncStorage.setItem( '@is_logged_in' , JSON.stringify( true ) );
    }

    storeLoginData()
    .then(
      //Save data to local
      storeUserData( userID )
      .then(() => { 
        getMentor() 
      })
      .catch( error => {
        console.error( error );
      })
    )
    .catch( error => {
      console.error( error );
    })

    //Get user stored setting 
    await AsyncStorage.getItem( '@autoLogin' )
    .then( value => autoSignIn = value );

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

export async function getSupervisorId(){
  let token = await AsyncStorage.getItem("@token");
  await fetch( 'http://104.248.178.78:8000/supervisor' , {
    headers: {
      Authorization: 'Bearer ' + JSON.parse( token )
    }
  })
  .then( response => {
    return response.json();
  })
  .then( data => {
    AsyncStorage.setItem( "@assigned_mentor" , JSON.stringify( data.user_id ));
  })
  .catch( error => {
    console.log( error );
  })
}


export async function ValidAccessCodes(){
  await fetch('http://104.248.178.78:8000/AccessCodes' )
  .then( response => {
    return response.json();
  })
  .then( data => {
    AsyncStorage.setItem( "@valid_access_codes" , JSON.stringify( data ) );
  })
  .catch( error => {
    console.log( error );
  })
}

export async function moodReportAPI( navigation ){  
   var userId , moodType , stressType;

   //Load in async storage values for API 
   await AsyncStorage.getItem( '@userId' )
   .then( value => userId = value );
   await AsyncStorage.getItem( '@mood_type' )
   .then( value => moodType = value );
   await AsyncStorage.getItem( '@stress_type' )
   .then( value => stressType = value );
   let token = await AsyncStorage.getItem("@token");
   var currentdate = new Date();
   AsyncStorage.setItem('@user_current_mood_updated' , JSON.stringify( currentdate ) );

    await fetch( moodFormApiIp, {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + JSON.parse( token )
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