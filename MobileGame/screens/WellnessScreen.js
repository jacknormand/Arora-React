import React from 'react';
import { StyleSheet, View , TouchableOpacity , Text } from 'react-native';
import { Card } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';

function WellnessScreen ({ navigation }) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="This is Slider One" />
      </Card>
      <Card style={styles.card}>
        <Card.Title title="This is Slider Two" />
      </Card>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={ styles.skip }> SKIP </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: DefaultTheme.colors.background,
    alignItems: 'center',
    paddingTop: 10
  },
  card: {
    backgroundColor: 'rgba(163, 163, 163, 0.8)',
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 40,
    borderRadius: 5,
    width: '80%',
  },
  
  skip:{
    fontSize:50,
  },
});

export default WellnessScreen;
