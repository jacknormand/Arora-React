import React,{useState} from 'react';
import { Switch, ImageBackground,StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { loginAPI } from '../network/apiCalls'
import { TextInput, Button } from 'react-native-paper';


/*
  GOOD IDEA: FIND OUT HOW TO MAKE THE AUTOMATIC LOGIN BUTTON INTO CHECK BOX
*/

function LoginScreen ({ navigation }) {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [ stayLoggedinBtn , setStayLoggedinBtn ] = useState( false );
  //Set auto log in state to true
  const setLoggedIn = async () => {
    if (!stayLoggedinBtn){
    setStayLoggedinBtn( true );
    }
    else{
      setStayLoggedinBtn( false );
    }
    
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : 0
  
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

            {/* MIGHT BE A PROBLEM ON ANDROID ( dont think so tho)*/}
            <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardPush}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={styles.createView}>
      <Button icon="account-plus-outline" mode="contained" style={styles.backButton} 
          onPress={() => navigation.navigate('Create')}
          color='rgba(0, 0, 0, 0.3)'>Create New User
          </Button>
      </View>
            <View style={styles.loginView}>

              <TextInput 
                style={styles.textIn}
                autoCapitalize="none"
                value={user.username}
                onChangeText={text => setUser({ username: text, password: user.password })}
                activeUnderlineColor={"#7da6d3"}
                activeOutlineColor={"grey"}
                selectionColor={"#650427"}
                mode={'outlined'}
                label={"Username"}
              />
              <TextInput 
                style={styles.textIn}
                secureTextEntry={ true }
                value={user.password}
                onChangeText={text => setUser({ username: user.username, password: text })}
                activeUnderlineColor={"#7da6d3"}
                activeOutlineColor={"grey"}
                selectionColor={"#650427"}
                label={"Password"}
                mode={'outlined'}
              />

              <View style={styles.bottomhalf}>

              <TouchableOpacity style={styles.loginBtn} 
              onPress={() => loginAPI( user.username, user.password, navigation, stayLoggedinBtn )}>
                
                <Text style={styles.loginText}>LOGIN</Text>
                
              </TouchableOpacity>
              <View style={styles.switcher}>
                <Text style={styles.stayloggedTXT}>Stay Logged In:</Text>
                    <Switch
                      trackColor={{ false: "#767577", true: "rgba(150, 181, 217, 1)" }}
                      thumbColor={stayLoggedinBtn ? "#650427" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={setLoggedIn}
                      value={stayLoggedinBtn}

                      />
              </View>

              </View>

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
  bottomhalf:{
    flex: 1,
    justifyContent: 'center',
  },

  keyboardPush: {
    flex: 1,
  },

  backButton: {
    width: "95%",
    alignSelf: 'center',
    borderRadius: 20,
  },

  switcher: {
    alignSelf: 'center',
    flexDirection:'row',
    alignItems: 'center',
  },

  stayloggedTXT: {
    color: 'white',
    fontSize: 20,
    marginRight: 10,
  },

  butterflyView: {
    flex: .75,
    alignItems: 'center',
  },
  loginView: {
    backgroundColor: 'rgba(163, 163, 163, 0.8)',
    height: '90%',
    marginBottom: 10,
    alignSelf: 'center',
    width: "95%",
    borderRadius: 20,
  },
  
  image: {
    flex: 1,
    justifyContent: "center",
  },
  butterfly: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  textIn: {
    borderBottomColor: '#7a1133',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 2,
    alignSelf: 'center',
    width: "85%",
    height: 40,
    marginVertical: 0,
    marginTop: 10,
    color: 'black',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
    
  },

  loginBtn: {
    width: "75%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: .6,
  },

  loginText: {
    color: 'white',
    fontSize: 20,
    
  },


});

export default LoginScreen
