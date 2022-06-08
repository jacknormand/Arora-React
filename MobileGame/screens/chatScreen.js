import React , { useEffect , useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { Alert } from 'react-native';

export default function ChatScreen(){
    const [ messages , setMessages ] = React.useState( [] );
    
    //Create the message object

    //User object maybe? 
    
      
    //append the sent message to the message array 
    const onSend = useCallback(( messages = [] ) => {
        setMessages( previousMessages => GiftedChat.append( previousMessages, messages ) )
    }, [] )
    
    return(
       <GiftedChat
       messages={ messages }
       isTyping={ true }
       onSend={ messages => onSend( messages ) }
       user={{
         _id: 1,
       }} 
       />
    )
}