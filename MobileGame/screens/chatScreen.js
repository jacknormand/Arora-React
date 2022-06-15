import React , { useEffect , useCallback , useLayoutEffect} from 'react'
import { GiftedChat , Avatar } from 'react-native-gifted-chat'
import { ImageBackground, Alert , StyleSheet , View , TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

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
    position: 'absolute', left: 0, bottom: 0,
    borderRadius: 15,
    },
})