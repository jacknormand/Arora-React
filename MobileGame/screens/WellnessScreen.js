import React,{useState} from 'react';
import { StyleSheet, View , TouchableOpacity , Text , ImageBackground , Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { moodReportAPI } from '../network/apiCalls'

function WellnessScreen ({ navigation }) {
  const [range,setRange] = useState(0)
  const [rangeTwo,setRangeTwo] = useState(0)
  var out1
  var out2
  var imgPathOne
  var imgPathTwo
  switch(range) {
    case -2:
      out1 = "Very Unpleasant"
      imgPathOne = require('../assets/surveryScreen/-2.png')
      break;
    case -1:
      out1 = "Unpleasant"
      imgPathOne = require('../assets/surveryScreen/-1.png')
      break;
    case 0:
      out1 = "Neutral"
      imgPathOne = require('../assets/surveryScreen/0.png')
      break;
    case 1:
      out1 = "Pleasant"
      imgPathOne = require('../assets/surveryScreen/1.png')
      break;
    case 2:
      out1 = "Very Pleasant"
      imgPathOne = require('../assets/surveryScreen/2.png')
      break;
    }
  
  switch(rangeTwo) {
    case -2:
      out2 = "Very Tense"
      imgPathTwo = require('../assets/surveryScreen/-2.png')
      break;
    case -1:
      out2 = "Tense"
      imgPathTwo = require('../assets/surveryScreen/-1.png')
      break;
    case 0:
      out2 = "Neutral"
      imgPathTwo = require('../assets/surveryScreen/0.png')
      break;
    case 1:
      out2 = "Calm"
      imgPathTwo = require('../assets/surveryScreen/1.png')
      break;
    case 2:
      out2 = "Very Calm"
      imgPathTwo = require('../assets/surveryScreen/2.png')
      break;
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
       <TouchableOpacity style={ styles.submitButton } onPress={() => moodReportAPI( out1 , out2 )}>
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
    fontWeight: 'bold',
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
    marginBottom: 10,
    marginLeft: 20,
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
  },
  
  card: {
    backgroundColor: 'rgba(163, 163, 163, 0.2)',
    marginBottom: 5,
    marginTop: 60,
    width: '85%',
    height: '40%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  cardTwo:{
    backgroundColor: 'rgba(163, 163, 163, 0.2)',
    marginBottom: 5,
    width: '85%',
    height: '40%',  
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default WellnessScreen;
