import React , { useEffect , useCallback , useLayoutEffect} from 'react'
import { GiftedChat , Avatar } from 'react-native-gifted-chat'
import { Alert , StyleSheet , View , TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChatScreen({navigation}){
    const [ messages , setMessages ] = React.useState( [] );
    const [ avatar , setAvatar ] = React.useState('');
    const [ username , setUsername ] = React.useState('');


    // The reciver -> userid -> 1
    // The sender -> userid -> 2 and above
    const getUserData = async () => {
      const username = await AsyncStorage.getItem( "@user" );
      const avatar = '../assets/home/profile_filled_button.png';
      setAvatar( avatar );
      setUsername( username );
    }
    //Get the users name and avatar
    getUserData();

    //temp sender message 
    useEffect(() => {
      setMessages([
          {
              _id: 1,
              text: 'Hello developer',
              createdAt: new Date(),
              user: {
                  _id: 2,
                  name: 'temp sender',
                  avatar: 'https://placeimg.com/140/140/any',
              },
          },
      ])
  }, []);
    
    /*
    useLayoutEffect(() => {
      navigation.setOptions({
          headerLeft: () => (
              <View style={{ marginLeft: 20 }}>
                  <Avatar
                      rounded
                      source={require('../assets/home/profile_filled_button.png')}
                  />
              </View>
          )
       })
      })
    */
    
    //Create the message object

    //User object maybe? 
    
      
    //append the sent message to the message array 
    const onSend = useCallback(( messages = [] ) => {
        setMessages( previousMessages => GiftedChat.append( previousMessages, messages ) )

        // We can have message database entries here 
        // Text , Time , User , ext 
    }, [] )
    
    return(
       <GiftedChat
        messages={ messages }
        isTyping={ true }
        renderUsernameOnMessage={ true }
        onSend={ messages => onSend( messages ) }
        alwaysShowSend={ true }
        messagesContainerStyle={ style.messageBox }
        showAvatarForEveryMessage={ true }
        user={{
         _id: 1,
         name: username,
         avatar: '../assets/home/profile_filled_button.png'
       }} 
       />
    )
}

const style = StyleSheet.create({
  messageBox:{
    backgroundColor: 'rgba(0, 0, 0, .5)',
  }
})