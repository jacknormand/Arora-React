import React , { useEffect , useCallback , useLayoutEffect} from 'react'
import { GiftedChat , Avatar } from 'react-native-gifted-chat'
import { ImageBackground, Alert , StyleSheet , View , TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNewMessage } from '../network/apiCalls';
import { Button } from 'react-native-paper';

export default function ChatScreen({navigation}){
    const [ messages , setMessages ] = React.useState( [] );
    const [ avatar , setAvatar ] = React.useState('');
    const [ username , setUsername ] = React.useState('');
    const [ userId , setUserId ] = React.useState( 0 );
    const [ messageIndex , setMessageIndex ] = React.useState( 0 );
    const [ assignedMentorId , setAssignedMentorId ] = React.useState( 0 );
    const [ convoId , setConvoId ] = React.useState( 0 );

    // Gather data stored in async that will be needed for submitting a message 
    const getUserData = async () => {
      await AsyncStorage.getItem( "@user" ).then( value => setUsername( value ) );
      await AsyncStorage.getItem( "@userId" ).then( value => setUserId( parseInt( value ) ) );
      await AsyncStorage.getItem( "@assigned_mentor" ).then( value => setAssignedMentorId( parseInt( value ) ) );
    }
    
   const fetchMessages = async () => {
    // Obtain the user, mentor and other async items 
      var user_id , mentor_id , username , newChat , firstTime , mentor_name , convoId;
      await AsyncStorage.getItem( "@user" ).then( value => username = value );
      await AsyncStorage.getItem( "@start_new_chat").then( value => newChat = value );
      await AsyncStorage.getItem( "@userId" ).then( value => user_id = value );
      await AsyncStorage.getItem( "@assigned_mentor" ).then( value => mentor_id = value );
      await AsyncStorage.getItem( '@mentor_name' ).then( value => mentor_name = value )
      await AsyncStorage.getItem( '@first_time_chat' ).then( value => firstTime = value );

    // Check if a new chat room needs to be initalized 
      if( newChat === "true" || firstTime === null ){
        let new_message = {
          _id: 0,
          text: "You are now connected to your mentor, " + mentor_name + "!",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "system",
            avatar: ''
          },
        }
        // Init convo
        createNewMessage( new_message.text , new_message.createdAt ,
              user_id  , new_message.user.name , mentor_id )
      }

      await AsyncStorage.setItem( '@first_time_chat' , JSON.stringify( false ) );
      await AsyncStorage.setItem( '@start_new_chat' , JSON.stringify( false ) );

      // Get the convo id
      await AsyncStorage.getItem( "@convo_id" ).then( value => convoId = value );

      // Parse the id 
      convoId = JSON.parse( convoId );

      // Fetch the messages 
      return await fetch( 'http://104.248.178.78:8000/Messages/' + convoId )
      .then( response => {
        return response.json();
      }).then( data => {
        let messageArrayLen = data.length;
        for( let index = 0; index < messageArrayLen; index++ ){
          let sender = ( data[ index ].sender_name != username ? 2 : 1 );
          let new_message = {
            _id: data[ index ].message_id,
            text: data[ index ].message_text,
            createdAt: data[ index ].message_date,
            user: {
              _id: sender,
              name: data[ index ].sender_name,
              avatar: 'https://placeimg.com/140/140/any',
            },
          }
          setMessages( previousMessages => GiftedChat.append( previousMessages, new_message ) )

          setMessageIndex( messageIndex + 1 );
        }
      }).catch( error => {
        console.error( error );
      })
    }

  // Unmounting function on navigation, then re mounts when user navigates back( updating the feed )
  useEffect( () => {
    const unsubscribe = navigation.addListener('focus', () => {
        // check for net connection here
        // checkForConnection()
        getUserData();
        //getConvoId();
        fetchMessages();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount( No render on navigation )
    return unsubscribe;
    }, [ navigation ] );
    
      
  //append the sent message to the message array 
  const onSend = useCallback( async ( messages = [] ) => {
        setMessages( previousMessages => GiftedChat.append( previousMessages, messages ) )
        var user_id , mentor_id;
        await AsyncStorage.getItem( "@userId" ).then( value => user_id = value );
        await AsyncStorage.getItem( "@assigned_mentor" ).then( value => mentor_id = value );

        //Track current message
        setMessageIndex( messageIndex + 1 );
        
        //Create a new message                           
        createNewMessage( messages[ messageIndex ].text , messages[ messageIndex ].createdAt ,
                          user_id , messages[ messageIndex ].user.name , mentor_id )
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
                avatar: '../assets/home/profile_filled_button.png'
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
