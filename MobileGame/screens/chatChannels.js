import { AspectRatio } from '@material-ui/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React , {useCallback} from 'react'
import { View , Text , TouchableOpacity , StyleSheet , FlatList } from 'react-native';
import { Modal, TextInput , Searchbar } from 'react-native-paper';


export default function ChatChannels({navigation}){
    const [ username , setUsername ] = React.useState('');
    const [ toUser , setToUser ] = React.useState('');
    
    
    const getCurrentUser = async () => {
        const userName = await AsyncStorage.getItem('@user');
        setUsername( userName );
    }
    getCurrentUser()

    const temp = () => {
        setToUser( toUser )
    }

    return(
        <View style={ style.main }>
          <Text style={ style.header }>{username}</Text>
          <Searchbar style={ style.searchBar } onSubmitEditing={ temp } placeholder='Search' value={ setToUser }></Searchbar>
          <Text style={ style.msgText }>
              Messages
          </Text>
          <View>
              <Text>
                  {toUser}
              </Text>
          </View>
        </View>
    )
}

const style = StyleSheet.create({
    main:{
        flex: 1,
    },
    header:{
        marginTop: 35,
        fontSize: 30,
        marginLeft: 10,
        marginBottom: 10,
    },
    createNew:{
        fontSize: 20,
    },
    input:{
        width:'50%',
    },
    searchBar:{
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center'
    },
    msgText:{
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 10,
    }
})