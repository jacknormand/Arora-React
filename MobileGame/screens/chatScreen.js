import React , { useEffect , useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Alert, ImageBackground, StyleSheet , View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNewMessage } from '../network/apiCalls';
import { Button } from 'react-native-paper';
import { useNetInfo } from '@react-native-community/netinfo';

/*
  TODO: Checking network connections difficult here because first state is unknown so it returns null.
  This is an issue when using a useEffect for API calls
*/

export default function ChatScreen({navigation}){
    const [ messages , setMessages ] = React.useState( [] );
    const [ username , setUsername ] = React.useState('');
    const [ messageIndex , setMessageIndex ] = React.useState( 0 );

    //const [ isConnected, setIsConnected ] = React.useState(null);
    let NetInfo = useNetInfo();
    const connection = NetInfo.isConnected; // Returns null for fist state 
    
    const network = () => {
      if( connection === false ){
          Alert.alert('No connection', 
          'Chat needs an internet connection',
          [
            { text: "Ok" , onPress: () => navigation.navigate("Home") }
          ])     
      }
    }

    // Need for global at the moment 
    const getUserData = async () => {
      await AsyncStorage.getItem( "@user" ).then( value => setUsername( value ) );
    }
    
   const fetchMessages = async () => {
      //Obtain the user, mentor and other async items
      network(); 
      var username, convoId;
      await AsyncStorage.getItem( "@user" ).then( value => username = value );
      await AsyncStorage.getItem( "@convo_id" ).then( value => convoId = value );

      // Parse the id 
      convoId = JSON.parse( convoId );

      return await fetch( 'http://104.248.178.78:8000/Messages/' + convoId )
      .then( response => {
        return response.json();
      }).then( data => {
        let messageArrayLen = data.length;
        for( let index = 0; index < messageArrayLen; index++ ){
          // Check if current user sent the message, 1 if true , 2 if false 
          let sender = ( data[ index ].sender_name != username ? 2 : 1 );
          let new_message = {
            _id: data[ index ].message_id,
            text: data[ index ].message_text,
            createdAt: data[ index ].message_date,
            user: {
              _id: sender,
              name: data[ index ].sender_name,
              avatar: '',
            },
          };
          // Append the new message to the existing message objects 
          setMessages( previousMessages => GiftedChat.append( previousMessages, new_message ) );
        }
      }).catch( error => {
        console.error( error );
      })
    }

  // Unmounting function on navigation, then re mounts when user navigates back( updating the feed )
  useEffect( () => {
    const unsubscribe = navigation.addListener('focus', () => {
      //Check for initial connection 
      network();
      getUserData();
      fetchMessages();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount( No render on navigation )
    return unsubscribe;
    }, [ navigation ] );
    
      
  //append the sent message to the message array 
  const onSend = useCallback( async ( messages = [] ) => {
        setMessages( previousMessages => GiftedChat.append( previousMessages, messages ) )

        // Get the user and mentor id for message sender and reciver ids
        var user_id , mentor_id;
        await AsyncStorage.getItem( "@userId" ).then( value => user_id = parseInt( value ) );
        await AsyncStorage.getItem( "@assigned_mentor" ).then( value => mentor_id = parseInt( value ) );
        
        setMessageIndex( messageIndex + 1 );

        //Create a new message                           
        createNewMessage( messages[ messageIndex ].text , messages[ messageIndex ].createdAt ,
                          user_id , messages[ messageIndex ].user.name , mentor_id );
    }, [] )
    
    return(
    <View style={style.main}>
        <ImageBackground source={require('../assets/dusk_background.jpg')} resizeMode='cover' style={style.background}>
        <View style={style.header}>
            <Button icon="arrow-left" mode="contained" style={style.backButton} 
                    onPress={() => navigation.goBack()}
                    color='rgba(0, 0, 0, 0.0)'>Back
            </Button>
            </View>
            <GiftedChat
                messages={ messages }
                isTyping={ true }
                renderUsernameOnMessage={ true }
                onSend={ messages => onSend( messages ) }
                alwaysShowSend={ true }
                messagesContainerStyle={ style.messageBox }
                showAvatarForEveryMessage={ false }
                user={{
                _id: 1,
                name: username,
            }} 
            />
        </ImageBackground>
    </View>


    )
}

const style = StyleSheet.create({
    main:{
        flex:1,
       },
    background:{
        flex: 1,
      },
  messageBox:{
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },

  header:{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .4)',
        height: '12%',
        zIndex: 1,
        position: 'absolute',
  },

  backButton:{
    height: 50,
    width: 100,
    position: 'absolute', left: 5, bottom: 0,
    borderRadius: 15,
    },
})
