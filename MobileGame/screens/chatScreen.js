import React , { useEffect , useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Alert, ImageBackground, StyleSheet , View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNewMessage } from '../network/apiCalls';
import { Button } from 'react-native-paper';
import  NetInfo from '@react-native-community/netinfo';

export default function ChatScreen({navigation}){
    const [ messages , setMessages ] = React.useState( [] );
    const [ username , setUsername ] = React.useState('');
    const [ messageIndex , setMessageIndex ] = React.useState( 0 );
    const [ isConnected, setIsConnected ] = React.useState( true );

    // Need for global at the moment 
    const getUserData = async () => {
      await AsyncStorage.getItem( "@user" ).then( value => setUsername( value ) );
    }

    useEffect(() => {
      getUserData();

      //Intial status
      NetInfo.fetch().then( state => {
        if( state.isConnected )
        {
          fetchMessages();
        }
        else
        {
          getMessagesAsync();
          Alert.alert(
            "No internet connection",
            "Messageing in offline mode",
            [
              { text: 'Ok'}
            ]
          )  
        }
      });

      //Internet connection listener
      NetInfo.addEventListener( state => {
        if( !state.isConnected )
        {
          Alert.alert(
            "No internet connection",
            "Messageing in offline mode",
            [
              { text: 'Ok'}
            ]
          )
          setIsConnected( false );
        }
        else if( state.isConnected && !isConnected ) // Detect if there was a connection change
        {
          setIsConnected( true );
          fetchMessages();
        }
      });

      const unsubscribe = navigation.addListener('focus', () => {
      });
  
      // Return the function to unsubscribe from the event so it gets removed on unmount( No render on navigation )
      return unsubscribe;

    }, [ navigation ]);
  


    const getMessagesAsync = async () => {
      var messageArray , username;
      await AsyncStorage.getItem( '@messages' ).then( value => messageArray = JSON.parse( value ) );
      await AsyncStorage.getItem( "@user" ).then( value => username = value );
      let messageArrayLen = messageArray.length;
      for( let index = 0; index < messageArrayLen; index++ )
      {  
        let sender = ( messageArray[ index ].sender_name != username ? 2 : 1 );
        let new_message = {
          _id: messageArray[ index ].message_id,
          text: messageArray[ index ].message_text,
          createdAt: messageArray[ index ].message_date,
          user: {
            _id: sender,
            name: messageArray[ index ].sender_name,
            avatar: '',
          },
        };

        //Prevent message duplication when network state changes 
        if( new_message != messages[ index ] )
        {
          // Append the new message to the existing message objects 
          setMessages( previousMessages => GiftedChat.append( previousMessages, new_message ) );
        }
      }
    }
    
   const fetchMessages = async () => {
      //Obtain the user, mentor and other async items
      var username, convoId , messageArray , mentorId , userId;
      await AsyncStorage.getItem( "@messages" )
      .then( value => messageArray = JSON.parse( value ) );
      await AsyncStorage.getItem( "@user" )
      .then( value => username = value );
      await AsyncStorage.getItem( "@convo_id" )
      .then( value => convoId = value );
      await AsyncStorage.getItem( "@assigned_mentor")
      .then( value => mentorId = parseInt( value ) );
      console.log( mentorId );
      await AsyncStorage.getItem( "@userId")
      .then( value => userId = parseInt( value ) );
      // Parse the id 
      convoId = JSON.parse( convoId );

      return await fetch( 'http://104.248.178.78:8000/MessagesBetweenUsers/' + userId + '/' + mentorId  )
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

          if( messages[ index ] != new_message )
          {
            // Append the new message to the existing message objects 
            setMessages( previousMessages => GiftedChat.append( previousMessages, new_message ) );
          }
          
          if( messageArray != null && messageArray[ index ] != new_message )
          {
            messageArray[ index ] = new_message;
          }
        }
        AsyncStorage.setItem( '@messages' , JSON.stringify( messageArray ) );
      }).catch( error => {
        console.error( error );
      })
    }
        
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
            <Button icon="arrow-left" mode="contained" style={style.backButton} 
                    onPress={() => navigation.goBack()}
                    color='rgba(0, 0, 0, 0.0)'>Back
            </Button>
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

  backButton:{
    position: 'absolute', left: 5, top: 75,
    borderRadius: 15,
    zIndex: 1,
    },
})
