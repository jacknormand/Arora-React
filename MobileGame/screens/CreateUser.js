import React,{useState} from 'react';
import { ImageBackground,StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { registerAPI } from '../network/apiCalls'
import { TextInput, Button } from 'react-native-paper';


/*
  GOOD IDEA: FIND OUT HOW TO MAKE THE AUTOMATIC LOGIN BUTTON INTO CHECK BOX
*/

function CreateUser ({ navigation }) {

      const [user, setUser] = useState({
          username: '',
          password: '',
          reenter: '',
          email: '',
        });

      const [validColor, setColor] = useState("#f00");
      const [validEmail, setValid] = useState(false);

      const [reenterColor, setreenterColor] = useState("#f00");
      const [validReenter, setReenter] = useState(false);


      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 0

      // function to check if email address is valid
      function emailChecker(email){

        // set user
        setUser({ username: user.username, password: user.password, reenter: user.reenter, email: email });
        // check against regular exp
        if (reg.test(email) === true){
          setColor("#0f0");
          setValid(true);
        }
        else{
          setColor("#f00");
          setValid(false);
        }

      }

      function reenterChecker(pass){

        if(pass == ''){
          setreenterColor("#f00");
          setReenter(false);
        }
        else if (pass == user.password){
          setreenterColor("#0f0");
          setReenter(true);
        }
        else{
          setreenterColor("#f00");
          setReenter(false);
        }

        // set info
        setUser({ username: user.username, password: user.password, reenter: pass, email: user.email });

      }
  
    return (
<View style={styles.container}>
    <ImageBackground source={require('../assets/dusk_background.jpg')} style={styles.image}>
    <Text style={styles.headerText}>Create User</Text> 
      <View style={styles.complete}>
          <Button icon="arrow-left" mode="contained" style={styles.backButton} 
          onPress={() => navigation.goBack()}
          color='rgba(0, 0, 0, 0.3)'>Back
          </Button>
          <Button icon="account-plus-outline" mode="contained" style={styles.createButton} 
          onPress={() => registerAPI( user.username, user.password, user.email, navigation )}
          color='rgba(0, 0, 0, 0.3)'>Create
          </Button>
      </View>

      <View style={styles.createView}>
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.keyboardPush}>


        <View style={styles.field}>
        <Text style={styles.labeltext}>Enter username</Text>
        <TextInput 
        style={styles.textIn}
        autoCapitalize="none"
        value={user.username.trim()}
        onChangeText={text => setUser({ username: text, password: user.password, reenter: user.reenter, email: user.email })}
        activeUnderlineColor={"rgba(0, 0, 0, 0.3)"}
        selectionColor={"#000"}
        />
        </View>

        <View style={styles.field}>
        <Text style={styles.labeltext}>Enter password</Text>
        <TextInput 
        style={styles.textIn}
        autoCapitalize="none"
        secureTextEntry={ true }
        value={user.password.trim()}
        onChangeText={text => setUser({ username: user.username, password: text, reenter: user.reenter, email: user.email})}
        activeUnderlineColor={"rgba(0, 0, 0, 0.3)"}
        activeOutlineColor={"#000"}
        selectionColor={"#000"}
        />
        </View>

        <View style={styles.field}>
        <Text style={styles.labeltext}>Re-enter password</Text>
        <TextInput 
        style={styles.textIn}
        autoCapitalize="none"
        secureTextEntry={ true }
        value={user.reenter.trim()}
        onChangeText={text => reenterChecker(text)}
        activeUnderlineColor={reenterColor}
        underlineColor={reenterColor}
        activeOutlineColor={"#000"}
        selectionColor={"#000"}
        />
        </View>

        <View style={styles.field}>
        <Text style={styles.labeltext}>Enter email address</Text>
        <TextInput 
        style={styles.textIn}
        value={user.email.trim()}
        autoCapitalize="none"
        onChangeText={text => emailChecker(text)}
        activeUnderlineColor={validColor}
        underlineColor={validColor}
        activeOutlineColor={"#000"}
        selectionColor={"#000"}
        />
        </View>


      </KeyboardAvoidingView>
    </View>
  </ImageBackground>
</View>
    )
  }

//Style sheet
const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  headerText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    shadowColor: 'black',
    shadowOpacity: .5,
    marginTop: 60,
    marginBottom: 40,
},
  createView: {
    backgroundColor: 'rgba(163, 163, 163, 0.8)',
    width: "95%",
    borderRadius: 20,
    alignSelf: 'center',
    height: "40%",
    justifyContent: 'center',
  },
  image: {
    flex: 1,
  },

  keyboardPush: {
    flex: 1,
    justifyContent: 'space-evenly',
  },

  backButton: {
    borderRadius: 20,
    bottom: 0,
    marginTop: 5,
    marginBottom: 5,
  },

  createButton: {
    borderRadius: 20,
    bottom: 0,
    marginTop: 5,
    marginBottom: 5,
  },


  complete: {
      flexDirection: 'row',
      justifyContent: "space-evenly",
  },

  textIn: {
    borderBottomColor: '#000',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 2,
    alignSelf: 'center',
    width: "85%",
    height: 40,
    color: 'black',
  },
  labeltext: {
      textAlign: 'center',
      fontSize: 20,
  }

});

export default CreateUser
