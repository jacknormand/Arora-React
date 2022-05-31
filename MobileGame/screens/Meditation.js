import React from 'react';
import { View , Text , ImageBackground , StyleSheet , Image , TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../CarouselCardItem'
import data from '../data'
export default function Meditation({ navigation }){
const isCarousel = React.useRef(null)
    return(
        <View style={ style.main }>
         <ImageBackground style={ style.image } resizeMode="cover" source={require('../assets/dusk_background.jpg')}>
            <Text style={ style.header }>
              Mindfulness Meditation
            </Text>

            <View style={style.icons}>
            <Image style={ style.greenIcon } source={require('../assets/meditation/mindfulness_meditation_alpha.png')}/>
            <Image style={ style.greenIconTwo } source={require('../assets/meditation/mindfulness_meditation_button.png')}/>
            </View>

            <View style={ style.gameCard }>
              <Text style={style.boxText}>Focus on the meditation audio{'\n'} to regain your calm mind</Text>


              <Text style={style.boxTextBold}>Choose Theme</Text>
              <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
      />
            </View>

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image style={ style.icon } source={require('../assets/play_button.png')}></Image>
        </TouchableOpacity>

         </ImageBackground>
        </View>
    );
}

const style = StyleSheet.create({
    main:{
    flex: 1,
    },

    image:{
        flex: 1,
      },

    boxText:{
    color: 'white',
    fontSize: 15,
    marginLeft: 10,
    marginTop: 15,
    textAlign: 'center',
    },

    boxTextBold:{
        color: 'white',
        fontSize: 15,
        marginLeft: 10,
        marginTop: 15,
        fontWeight: 'bold',
        paddingBottom: 10,
        },

    gameCard:{
    height: "30%",
    width: "90%",
    marginTop: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    },

    icons:{
        marginTop: 20,
        justifyContent: 'center',
          },

    icon:{
    marginTop: 20,
    alignSelf:'center',
    width: 90,
    height: 90,
        },

    greenIcon:{
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'rgba(255, 255, 255, 0.3)',
      },

    greenIconTwo:{
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    position:'absolute',

        },

    header:{
    fontSize: 30,
    color: 'white',
    marginTop: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    },
})
