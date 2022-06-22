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
    const [ messageIndex , setMessageIndex ] = React.useState( 0 );

    // The reciver -> userid -> 1
    // The sender -> userid -> 2 and above
    const getUserData = async () => {
      await AsyncStorage.getItem( "@user" ).then( value => setUsername( value ) );
    }
    
    const onConvoStart = async () => {
      let isFirstInteraction = await AsyncStorage.getItem( '@firstInteraction' )
      //await AsyncStorage.getItem( '@mentorName' ).then( value => mentorName = value );
      let mentorName = 'ThisIsATestMentorName' // Temp name
      if( isFirstInteraction === null ){
        let new_message = {
          _id: 0,
          text: "You are now connected to your mentor, " + mentorName + "!",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "system",
            avatar: ''
          },
        }
        createNewMessage( new_message.text , new_message.createdAt , new_message.user._id , new_message.user.name , 5 )
      }

      await AsyncStorage.setItem( '@firstInteraction' , JSON.stringify( false ) );
    }
    
 
   const fetchMessages = async () => {
      onConvoStart();
      var username = await AsyncStorage.getItem( "@user" );
      return await fetch( 'http://104.248.178.78:8000/Messages/' + '0' ) //hard coded message number
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


  useEffect( () => {
    const unsubscribe = navigation.addListener('focus', () => {
        getUserData();
        fetchMessages();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount( No render on navigation )
    return unsubscribe;
    }, [ navigation ] );
    
      
    //append the sent message to the message array 
    const onSend = useCallback(( messages = [] ) => {
        setMessages( previousMessages => GiftedChat.append( previousMessages, messages ) )

        //Track current message
        setMessageIndex( messageIndex + 1 );
        
        //Create a new message
        createNewMessage( messages[ messageIndex ].text , messages[ messageIndex ].createdAt , messages[ messageIndex ].user._id , messages[ messageIndex ].user.name , 5 )

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
