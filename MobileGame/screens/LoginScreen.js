import React,{useState} from 'react';
import { Alert, ImageBackground,StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

// LOGIN FUNCTION
async function loginUser( user, pass, navigation )
{
  var userID;
  var token;

  await fetch('http://104.248.178.78:8000/api-token-auth', {
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
  if (userID){

    // FROM HERE: store data in async to be used throughout the app


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

function LoginScreen ({ navigation }) {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
 
    return (
          <View style={styles.container}>
          <ImageBackground source={require('../assets/dusk_background.jpg')} style={styles.image}>
            <View style={styles.butterflyView}>
              <Image
              source = {require('../assets/loginScreen/orange_butterfly_image.png')}
              style = {styles.butterfly}
              />
              <Text style={styles.title}>Arora</Text>
            </View>

            {/* MIGHT BE A PROBLEM ON ANDROID */}
            <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardPush}
    >
            <View style={styles.loginView}>
              <TextInput 
                style={styles.textIn}
                placeholder= "Username"
                autoCapitalize="none"
                value={user.username}
                onChangeText={text => setUser({ username: text, password: user.password })}
              />
              <TextInput 
                style={styles.textIn}
                placeholder= "Password"
                secureTextEntry={ true }
                value={user.password}
                onChangeText={text => setUser({ username: user.username, password: text })}
              />
              <TouchableOpacity style={styles.loginBtn} 
              onPress={() => loginUser(user.username, user.password, navigation)}>
                
                <Text style={styles.loginText}>LOGIN</Text>
              </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
    )
  }

//Style sheet
const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  keyboardPush: {
    flex: 1,
  },

  butterflyView: {
    flex: 1,
    alignItems: 'center',
  },
  loginView: {
    backgroundColor: 'rgba(163, 163, 163, 0.8)',
    height: '75%',
    marginBottom: 10,
    alignSelf: 'center',
    width: "95%",
    borderRadius: 20,
  },
  
  image: {
    flex: 1,
    justifyContent: "center"
  },
  butterfly: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  textIn: {
    borderBottomColor: '#7a1133',
    borderBottomWidth: 1,
    alignSelf: 'center',
    width: "85%",
    height: "10%",
    marginVertical: 10,
    color: 'black',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
    
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 10,
    backgroundColor: 'rgba(140, 200, 250, 0.7)',
    flex: 1,
  },

  loginText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
    
  },


});

export default LoginScreen
