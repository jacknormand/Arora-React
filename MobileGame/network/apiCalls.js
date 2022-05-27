import React, { useState , useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

//Api ip routes
const regIp = 'http://104.248.178.78:8000/';
const loginApiIp = 'http://104.248.178.78:8000/api-token-auth';
const moodFormApiIp = 'http://104.248.178.78:8000/moodreport';


//When internet connection is detected upload to database
//Function to upload the user data when network is detected
/*
  ==============================================
  ASK ABOUT THE USER UPDATE
  ==============================================
*/
 
export async function updateDatabase(){
   let userId = await AsyncStorage.getItem( '@userId' );
   let userPollen = await AsyncStorage.getItem( '@user_pollen' );
   //let b0 = await AsyncStorage.getItem( '@user_b0_count' );
   //let b1 = await AsyncStorage.getItem( '@user_b1_count' );
   //let b2 = await AsyncStorage.getItem( '@user_b2_count' );
   //let b3 = await AsyncStorage.getItem( '@user_b3_count' );
   //let b4 = await AsyncStorage.getItem( '@user_b4_count' );
   let currentButterfly = await AsyncStorage.getItem( '@current_butterfly' );
   let userMood = await AsyncStorage.getItem( '@user_current_mood' );
   //let timeSubmmited = await AsyncStorage.getItem( '@user_current_mood_updated' );
   await fetch('http://104.248.178.78:8000/userinfo/' + userId , {
    method: 'PATCH',
    headers:{
    'Content-Type':'application/json'
    },
    body: JSON.stringify({ // NEED TO CHECK IF WE STILL NEED THESE VALUES FOR UPDATE
	   "user_current_mood": userMood,
	   "user_current_mood_updated": "2019-02-23T09:38:42.925706Z", //See if we still need to update location data
	   "user_current_location_updated":"2019-02-23T09:38:42.925706Z",
	   "user_current_butterfly": currentButterfly,
	   "user_current_location_lat": 0.7,
	   "user_current_location_long": 0.2,
	   "user_pollen": userPollen,
	   "user_points": 3 // What is this
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
    .then(response => {
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

export async function loginAPI( user, pass, navigation )
{
  var userID;
  var token;
  
  //Fetch the login API 
  await fetch( loginApiIp, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "username": user,
    "password": pass
  })
  })
  .then( response => {
    return response.json()
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
    // Store user data into storage
    const storeData = async () => {
        await AsyncStorage.setItem( '@user' , user );
        
        //Possibly for auto login
        await AsyncStorage.setItem( '@password' , pass );
        await AsyncStorage.setItem( '@userId' , JSON.stringify( userID ) );
        
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
    //Get date and time and format it
    var currentdate = new Date(); 
    let timeSubmmited = currentdate.getFullYear() + "-"
                       + (currentdate.getMonth()+1)  + "-" 
                       + currentdate.getDate() + "TO"
                       + currentdate.getHours() + ":"  
                       + currentdate.getMinutes() + ":" 
                       + currentdate.getSeconds() + "."
                       +currentdate.getMilliseconds()
    console.log( timeSubmmited );
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
