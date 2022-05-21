import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const loginApiIp = 'http://104.248.178.78:8000/api-token-auth';
const moodFormApiIp = 'http://104.248.178.78:8000/moodreport';

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

  .then(response => {
    return response.json()
  })
  .then(data => {
    userID = data.user_id
    token = data.token
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  // USER EXISTS and correct credentials
  // If info entered isnt correct, userID wont be passed back and wont exist
  if ( userID ){

    // FROM HERE: store data in async to be used throughout the app
    const storeData = async () => {
        await AsyncStorage.setItem('@user' , user );
    }

    storeData();

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
          "user_id": 2,
          "mood_type": moodType,
          "user_text": stressType
        })
        })
        .then(response => {
          return response.json()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
        //TODO: navigate to home without invalid promise
}
