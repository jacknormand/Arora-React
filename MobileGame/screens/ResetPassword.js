import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect, useState} from 'react';
import { ImageBackground , View , Text , StyleSheet , TextInput ,TouchableOpacity } from 'react-native';

export default function ResetPassword( { navigation } ){
    const [ user , setUser ] = useState({
        oldpassword: '',
        reenteredold: '',
        newpassword: '',
        reenterednew: ''
    });
    const [ oldPass , setOldPass ] = useState('');

    const validate = () => {
        if( checkOldPassword() && checkReenterOld() && checkNewPassReenter() ){
            //call password patch
            console.log("Good");
        }
        else if( !checkOldPassword() ){
            console.log("Bad");
        }
        else if( !checkNewPassReenter() ){
            console.log("Bad");
        }
        else if( !checkReenterOld() ){
            console.log("Bad");
        }
    }

    const getPass = async () => {
        await AsyncStorage.getItem( '@pass').then( value => setOldPass( value) );
    }

    useEffect(() => {
        getPass();
    })

    const checkOldPassword = async () => {
        return oldPass === user.oldpassword;
    }

    const checkReenterOld = () => {
        user.oldpassword === user.reenteredold;
    }

    const checkNewPassReenter = () => {
        user.newpassword === user.reenterednew;
    }

    return(
        <View style={ style.main }>
            <ImageBackground source={ require('../assets/dusk_background.jpg')} style={ style.background }>
                <View style={ style.resetBox }>
                    <Text style={style.labeltext}>Enter your old password</Text>
                    <TextInput 
                    style={style.textIn}
                    autoCapitalize="none"
                    secureTextEntry={ true }
                    value={user.oldpassword.trim()}
                    onChangeText={text => setUser( { oldpassword: text , reenteredold: user.reenteredold , newpassword: user.newpassword , reenterednew: user.reenterednew } )} />
                    
                    <Text style={style.labeltext}>Re-enter your old password</Text>
                    <TextInput 
                    style={style.textIn}
                    autoCapitalize="none"
                    secureTextEntry={ true }
                    value={user.reenteredold.trim()}
                    onChangeText={text => setUser( { oldpassword: user.oldpassword , reenteredold: text , newpassword: user.newpassword , reenterednew: user.reenterednew } )} />

                    <Text style={style.labeltext}>Enter your new password</Text>
                    <TextInput 
                    style={style.textIn}
                    autoCapitalize="none"
                    secureTextEntry={ true }
                    value={user.newpassword.trim()}
                    onChangeText={text => setUser( { oldpassword: user.oldpassword , reenteredold: user.reenterednew , newpassword: text , reenterednew: user.reenterednew } )} />

                    <Text style={style.labeltext}>Re-enter your new password</Text>
                    <TextInput 
                    style={style.textIn}
                    autoCapitalize="none"
                    secureTextEntry={ true }
                    value={user.reenterednew.trim()}
                    onChangeText={text => setUser( { oldpassword: user.oldpassword , reenteredold: user.reenteredold , newpassword: user.newpassword , reenterednew: text } )} />

                    <TouchableOpacity onPress={ validate() } style={ style.confirm }>
                        <Text style={ style.text}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const style = StyleSheet.create({
    main:{
        flex: 1,
    },
    background:{
        flex: 1,
        justifyContent: 'center'
    },
    resetBox:{
        width: '90%',
        height: '40%',
        backgroundColor: 'rgba(163, 163, 163, 0.8)',
        alignSelf: 'center',
    },
    confirm:{
        height: '15%',
        width: '30%',
        borderRadius: 10,
        backgroundColor: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 15,
        bottom: 0,
    },
    text:{
        alignSelf: 'center',
    },
    textIn: {
        borderBottomColor: '#000',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderBottomWidth: 2,
        alignSelf: 'center',
        width: "85%",
        height: 40,
        color: 'black',
        marginBottom: 5,
      },

      labeltext: {
        textAlign: 'center',
        fontSize: 20,
    }

})