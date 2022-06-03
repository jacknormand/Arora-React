import React,{useState} from 'react';
import { StyleSheet, View , TouchableOpacity , Text , ImageBackground , Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { moodReportAPI } from '../network/apiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo'; 

function WellnessScreen ({ navigation }) {
  const [range,setRange] = useState(0)
  const [rangeTwo,setRangeTwo] = useState(0)
  const network = useNetInfo();
  const connectivity = network.isConnected;
  var out1
  var out2
  let moodType
  let stressType
  var imgPathOne
  var imgPathTwo
  switch(range) {
    case -2:
      out1 = "Very Unpleasant"
      moodType = 1;
      imgPathOne = require('../assets/surveryScreen/-2.png')
      break;
    case -1:
      out1 = "Unpleasant"
      moodType = 2;
      imgPathOne = require('../assets/surveryScreen/-1.png')
      break;
    case 0:
      out1 = "Neutral"
      moodType = 3;
      imgPathOne = require('../assets/surveryScreen/0.png')
      break;
    case 1:
      out1 = "Pleasant"
      moodType = 4;
      imgPathOne = require('../assets/surveryScreen/1.png')
      break;
    case 2:
      out1 = "Very Pleasant"
      moodType = 5;
      imgPathOne = require('../assets/surveryScreen/2.png')
      break;
    }
  
  switch(rangeTwo) {
    case -2:
      out2 = "Very Tense"
      stressType = 1
      imgPathTwo = require('../assets/surveryScreen/-2.png')
      break;
    case -1:
      out2 = "Tense"
      stressType = 2
      imgPathTwo = require('../assets/surveryScreen/-1.png')
      break;
    case 0:
      out2 = "Neutral"
      stressType = 3
      imgPathTwo = require('../assets/surveryScreen/0.png')
      break;
    case 1:
      out2 = "Calm"
      stressType = 4
      imgPathTwo = require('../assets/surveryScreen/1.png')
      break;
    case 2:
      out2 = "Very Calm"
      stressType = 5
      imgPathTwo = require('../assets/surveryScreen/2.png')
      break;
      }
  //Store wellness survey questions in async in case of offline
  const updateReport = async () => {
    await AsyncStorage.setItem( '@mood_type' , JSON.stringify( moodType ));
    await AsyncStorage.setItem( '@stress_type' , JSON.stringify( stressType ));
  }
  updateReport();

  function checkNetworkAndUpdate( navigation ){
    if( connectivity ){
     moodReportAPI( navigation )
    }
  }
    
  return (
    <View style={styles.container}>
    <ImageBackground source={require('../assets/dusk_background.jpg')} resizeMode="cover" style={ styles.backgroundImage }>
      <View style={styles.card}>
        <Text style={ styles.cardText }>How is your mood {'\n'}today?</Text>
        <Image source={imgPathOne} style={ styles.butterfly }/>
        <Slider
        style={ styles.slider }
        minimumValue={-2}
        maximumValue={2}
        step={1}
        minimumTrackTintColor="#ff0045"
        maximumTrackTintColor="#000000"
        thumbTintColor='pink'
        onValueChange={(value) => setRange(value)}
      />
      <Text style={styles.bottomText}>

          {out1}
        </Text>
      </View>

      <View style={styles.cardTwo}>
        <Text style={ styles.cardText }>How stressed are {'\n'}you today?</Text>
        <Image source={imgPathTwo} style={ styles.butterfly }/>
      <Slider
        style={ styles.slider }
        minimumValue={-2}
        maximumValue={2}
        step={1}
        minimumTrackTintColor="#ff0045"
        maximumTrackTintColor="#000000"
        thumbTintColor='pink'
        onValueChange={(value) => setRangeTwo(value)}
      />

      <Text style={styles.bottomText}>
          {out2}
        </Text>
      </View>
      <View style={styles.cards}>
       <TouchableOpacity style={ styles.button } onPress={() => navigation.navigate('Home')}>
        <Text style={ styles.buttonText }> SKIP </Text>
       </TouchableOpacity>
       <TouchableOpacity style={ styles.submitButton } onPress={() => checkNetworkAndUpdate( navigation )}>
        <Text style={ styles.buttonText }>SUBMIT</Text>
       </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  cardText:{
    color: 'white',
    fontSize: 25,
  },
  
  backgroundImage:{
    flex: 1,
  },

  butterfly:{
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },

  slider:{
    width: 250,
  },

  bottomText:{
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  
  button:{
    borderRadius: 15,
    backgroundColor: 'rgba(140, 200, 250, .7)',
    height: 50,
    width: 80,
    position: 'absolute', left: 20,
    justifyContent: 'center',
  },
  
  submitButton:{
    borderRadius: 15,
    backgroundColor: 'rgba(140, 200, 250, .7)',
    height: 50,
    width: 80,
    marginBottom: 10,
    position: 'absolute', right: 20,
    justifyContent: 'center',
  },
  
  buttonText:{
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  
  card: {
    backgroundColor: 'rgba(163, 163, 163, 0.5)',
    marginBottom: 5,
    marginTop: 60,
    width: '85%',
    height: '40%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  
  cardTwo:{
    backgroundColor: 'rgba(163, 163, 163, 0.5)',
    marginBottom: 5,
    width: '85%',
    height: '40%',  
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },

});

export default WellnessScreen;
