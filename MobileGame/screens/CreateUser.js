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
        email: '',
      });

      const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  
    return (
<View style={styles.container}>
    <ImageBackground source={require('../assets/dusk_background.jpg')} style={styles.image}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.keyboardPush}>
        <View style={styles.complete}>
            <Button icon="arrow-left" mode="contained" style={styles.backButton} 
            onPress={() => navigation.goBack()}
            color='rgba(0, 0, 0, 0.3)'>Back
            </Button>
            <Button icon="account-plus-outline" mode="contained" style={styles.createButton} 
            onPress={() => registerAPI( user.username, user.password, user.email, navigation )}
            color='rgba(0, 0, 0, 0.3)'>Create User
            </Button>
        </View>
        <View style={styles.createView}>
            <Text style={styles.labeltext}>Enter username</Text>
            <TextInput 
            style={styles.textIn}
            autoCapitalize="none"
            value={user.username}
            onChangeText={text => setUser({ username: text, password: user.password, email: user.email })}
            activeUnderlineColor={"rgba(0, 0, 0, 0.3)"}
            selectionColor={"#650427"}
            />
            <Text style={styles.labeltext}>Enter password</Text>
            <TextInput 
            style={styles.textIn}
            autoCapitalize="none"
            secureTextEntry={ true }
            value={user.password}
            onChangeText={text => setUser({ username: user.username, password: text,  email: user.email})}
            activeUnderlineColor={"rgba(0, 0, 0, 0.3)"}
            activeOutlineColor={"grey"}
            selectionColor={"#650427"}
            />
            <Text style={styles.labeltext}>Enter email address</Text>
            <TextInput 
            style={styles.textIn}
            value={user.email}
            autoCapitalize="none"
            onChangeText={text => setUser({ username: user.username, password: user.password,  email: text })}
            activeUnderlineColor={"rgba(0, 0, 0, 0.3)"}
            activeOutlineColor={"grey"}
            selectionColor={"#650427"}
            />
        </View>
        <View style={styles.complete}>

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

  createView: {
    backgroundColor: 'rgba(163, 163, 163, 0.8)',
    height: '80%',
    width: "95%",
    borderRadius: 20,
    alignSelf: 'center',
  },
  image: {
    flex: 1,
  },

  keyboardPush: {
    flex: 1,
    justifyContent: 'flex-end',
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
    borderBottomColor: '#7a1133',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 2,
    alignSelf: 'center',
    width: "85%",
    height: 40,
    marginTop: 10,
    color: 'black',
  },
  labeltext: {
      textAlign: 'center',
      fontSize: 20,
      marginTop: 15,
  }

});

export default CreateUser
