import React, { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

//Api ip routes
const loginApiIp = 'http://104.248.178.78:8000/api-token-auth';
const moodFormApiIp = 'http://104.248.178.78:8000/moodreport';


//When internet connection is detected upload to database

export async function storeUserData(){
  //get current user id and fetch the user data
  let userId = await AsyncStorage.getItem( '@userId' );
  await fetch( 'http://104.248.178.78:8000/userinfo/' + userId )
    .then(response => {
      return response.json();
    }).then( data => {
      //Add values to the async storage for later use
      AsyncStorage.setItem( '@user_pollen' , JSON.stringify( data.user_pollen ));
      AsyncStorage.setItem( '@user_b0_count' , JSON.stringify( data.user_b0_count ));
      AsyncStorage.setItem( '@user_b1_count' , JSON.stringify( data.user_b1_count ));
      AsyncStorage.setItem( '@user_b2_count' , JSON.stringify( data.user_b2_count ));
      AsyncStorage.setItem( '@user_b3_count' , JSON.stringify( data.user_b3_count ));
      AsyncStorage.setItem( '@user_b4_count' , JSON.stringify( data.user_b4_count ));
      AsyncStorage.setItem( '@current_butterfly' , JSON.stringify( data.user_current_butterfly ));
      AsyncStorage.setItem( '@user_current_mood"' , JSON.stringify( data.user_current_mood ));
      AsyncStorage.setItem( '@user_current_mood_updated' , JSON.stringify( data.user_current_mood_updated ));
    }).catch( error => {
      console.error(error)
    })
}

export async function loginAPI( user, pass, navigation )
{
  var userID;
  var token;

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
    // FROM HERE: store data in async to be used throughout the app
    const storeData = async () => {
        await AsyncStorage.setItem( '@user' , user );
        //Possibly for auto login
        await AsyncStorage.setItem( '@password' , pass );
        await AsyncStorage.setItem( '@userId' , JSON.stringify( userID ) );
        //Might not need
        await AsyncStorage.setItem( '@userToken' , token );
    }
    //Store local data
    storeData();
    storeUserData();

    // go to wellness check
    navigation.navigate("Wellness")
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

export async function moodReportAPI( moodType , stressType , navigation ){
    await fetch( moodFormApiIp, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        //TODO: See what values to use here. These are place holders
        body: JSON.stringify({
          "user_id": 5,
          "mood_type": 2,
          "user_text": 2
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
