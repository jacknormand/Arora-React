import React from 'react';
import { StyleSheet, View , TouchableOpacity , Text , ImageBackground , Image } from 'react-native';
import { Card } from 'react-native-paper';
import Slider from '@react-native-community/slider';

function WellnessScreen ({ navigation }) {
  
  return (
    <View style={styles.container}>
     <ImageBackground source={require('../assets/dusk_background.jpg')} resizeMode="cover" style={ styles.backgroundImage }>

      <Card style={styles.card}>
        <Text style={ styles.cardText }>How is your mood today?</Text>
        <Image source={require('../assets/surveryScreen/black_butterfly.png')} style={ styles.butterfly }/>
        <Slider
        style={ styles.slider }
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="#ff0045"
        maximumTrackTintColor="#000000"
      />
      </Card>

      <Card style={styles.cardTwo}>
        <Text style={ styles.cardText }>How stressed are you today?</Text>
        <Image source={require('../assets/surveryScreen/black_butterfly.png')} style={ styles.butterfly }/>
        <Slider
        style={ styles.slider }
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="#ff0045"
        maximumTrackTintColor="#000000"
      />
      </Card>

      <View style={ styles.textAlign }>
       <TouchableOpacity style={ styles.button } onPress={() => navigation.navigate('Home')}>
        <Text style={ styles.buttonText }> SKIP </Text>
       </TouchableOpacity>
       <TouchableOpacity style={ styles.submitButton } onPress={() => navigation.navigate('Home')}>
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
    fontSize: 30,
    textAlign: 'center',
  },
  
  textAlign:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  
  backgroundImage:{
    flex: 1,
  },

  butterfly:{
    alignSelf: 'center',
  },

  slider:{
    alignSelf: 'center',
    width: 250,
  },
  
  button:{
    backgroundColor: 'rgba(140, 200, 250, 1)',
    height: 50,
    width: 80,
    marginBottom: 10,
    marginLeft: 20,
  },
  
  submitButton:{
    backgroundColor: 'rgba(140, 200, 250, 1)',
    height: 50,
    width: 80,
    marginBottom: 10,
    position: 'absolute', right: 20
  },
  
  buttonText:{
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 20,
  },
  
  card: {
    backgroundColor: 'rgba(163, 163, 163, 0.2)',
    marginBottom: 5,
    marginHorizontal: 20,
    marginTop: 40,
    width: '85%',
    height: '40%',
    alignItems: 'center',
  },
  
  cardTwo:{
    backgroundColor: 'rgba(163, 163, 163, 0.2)',
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 5,
    width: '85%',
    height: '40%',
    alignItems: 'center',   
  },









  
});

export default WellnessScreen;
