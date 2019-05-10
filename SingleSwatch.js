import React, {Component} from 'react';
import * as Font from 'expo-font';
import {
  Alert,
  AsyncStorage,
  Platform, 
  StyleSheet, 
  Text,
  Button,
  View,
  Share,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { withNavigation } from 'react-navigation'
import { AntDesign } from '@expo/vector-icons';
import { Localization } from 'expo'
import i18n from 'i18n-js'
import uuidV4 from 'uuid/v4'
import data from './data/swatches.json';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

i18n.locale = Localization.locale
const locale = i18n.locale.substr(0, 2) 
const key = 'state'

class SingleSwatch extends Component {
  constructor(props) {
    super(props)
    this._handleShare = this._handleShare.bind(this);
    this.state = {
      isFav: false,
      swatches: data.colors,
      currentSelectIndex: this.props.navigation.state.params.swatchIndex
    }
  }

  async componentDidMount(){
    const swatch  = this.props.navigation.state.params.swatch
    
    // await Font.loadAsync({
    //   //'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    //   'noto-sans': require('./assets/fonts/NotoSans-Regular.ttf'),
    // });
  
    this.setState({ fontLoaded: true });
    
    try {
      let favs = await AsyncStorage.getItem(key)
			if (favs !== null) {
        favourites = JSON.parse(favs)
        //Alert.alert( favourites.toString() )
        for (let i = 0; i < favourites.length; i++) {
          if(favourites[i].r == swatch.r ){
            let addFav = this.setState({isFav: true})
          }
        }
      }
    } catch (e) { }
  }

  async componentWillMount() {
    const swatchIndex  = this.props.navigation.state.params.swatchIndex
    const swatch  = this.props.navigation.state.params.swatch
    const fv  = this.props.navigation.state.params.favourite
    const favs  = this.props.screenProps.favourites
    
    try {
      if(fv && fv.length ) {
        this.setState({isFav: true})
      }
      let favs = await AsyncStorage.getItem(key)
			if (favs !== null) {
        favourites = JSON.parse(favs)
        for (let i = 0; i < favourites.length; i++) {
          if(favourites[i].r == swatch.r ){
            let addFav = this.setState({isFav: true})
          }
        }
      }
    } catch (e) {
      Alert.alert('error from AsyncStorage: ', e)
    }
  }

  _getLang() {
    const swatch  = this.props.navigation.state.params.swatch
    const lang = {
      'de': (
        swatch.de
      ),
      'en': (
        swatch.en
      ),
      'es': (
        swatch.es
      ),
      'fr': (
        swatch.fr
      ),
      'it': (
        swatch.it
      ),
      'nl': (
        swatch.nl
      )
    }[locale];
    return lang
  }

  _getPantone() {
    const pantone  = this.props.navigation.state.params.swatch.p
    const pantone_lang = {
      'en': (
        pantone.en
      ),
      'fr': (
        pantone.fr
      )
    }[locale];
    if( !pantone.en ){
      return pantone
    }else{
      return pantone_lang
    }
  }

  _hexToRgb = (hex) => {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return r + "," + g + "," + b;
  }

  _rgbTable = (hex) => {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    var o = Math.round(((parseInt(r) * 299) + (parseInt(g) * 587) + (parseInt(b) * 114)) /1000);
    return o;
  }

  _addSwatch = ( color ) => {  
    this.setState({isFav: true})
    this.props.screenProps.addFavourite(color) 
    this.props.navigation.navigate('Projects')
  }

  _removeSwatch = ( color ) => {  
    this.setState({isFav: false})
    this.props.screenProps.removeFavourite(color) 
    this.props.navigation.navigate('Projects')
  }

  _handleShare = async ( swatch ) => {
    try {
      const result = await Share.share({
        message:
          'RAL ' + swatch.r + ' '+ this._getLang() + '\n'
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  backHome = () => {
    this.props.navigation.navigate('Swatches')
  }

  render() {
    
    const { screenProps: { swatches } } = this.props
    const swatch  = this.props.navigation.state.params.swatch
    const swatchIndex  = this.state.currentSelectIndex
    return (
      <KeyboardAvoidingView style={{ height: height + 40, backgroundColor: '#'+ swatch.h }}>
        <View style={{ backgroundColor: '#'+ swatch.h, width: width , height: height, paddingTop: 40 }}>

          { this.state.fontLoaded ? 

          <View style={{ padding: 20, height: height  }}>
            <Text style = {this._rgbTable( swatch.h ) > 125 ? this.styles.darkText:this.styles.brightText}>
              RAL { swatch.r +' '+this._getLang() }{'\n'}HEX { swatch.h }{'\n'}RGB { this._hexToRgb(swatch.h) }{'\n'}PANTONE { this._getPantone() }
            </Text>
          </View>

          : null }

          <View style={{ position: 'absolute', bottom: -20, width: width, flex: 1  }}>
            
            <View style={{ position: 'absolute', bottom: 0, left: 20  }}>
              <TouchableOpacity onPress={ () => { this.backHome() } } >
                <View style={{ backgroundColor: 'rgba(12,12,12,0.35)', height: 80, width: 80, borderRadius: 40 , flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <AntDesign name="enter" size={40} color="rgba(255,255,255,0.85)" />
                </View>
                </TouchableOpacity>
            </View>

            <View style={{ position: 'absolute', bottom: 0, left: (width/2) - 40 }}>
              { this.state.isFav ? 
                <TouchableOpacity onPress={ () => { this._removeSwatch( swatch ) } }>
                  <View style={{ backgroundColor: 'rgba(12,12,12,0.35)', height: 80, width: 80, borderRadius: 40 }}>
                    <Text style={{ textAlign: 'center', lineHeight: 80 }}>
                    <AntDesign name="pushpin" size={40} color="rgba(255,255,255,0.85)" />
                    </Text>
                  </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={ () => { this._addSwatch( swatch ) } } >
                  <View style={{ backgroundColor: 'rgba(12,12,12,0.35)', height: 80, width: 80, borderRadius: 40 }}>
                    <Text style={{ textAlign: 'center', lineHeight: 80 }}>
                      <AntDesign name="pushpino" size={40} color="rgba(255,255,255,0.85)" />
                    </Text>
                  </View>
                </TouchableOpacity>
              }
            </View>
            <View style={{ position: 'absolute', bottom: 0, right: 20 }}>
              <TouchableOpacity onPress={ () => { this._handleShare(swatch) } } >
                <View style={{ backgroundColor: 'rgba(12,12,12,0.35)', height: 80, width: 80, borderRadius: 40 , flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <AntDesign name="export" size={40} color="rgba(255,255,255,0.85)" />
                </View>
                </TouchableOpacity>
            </View>
          </View>
        </View>
     </KeyboardAvoidingView>
    );
  }

  styles = StyleSheet.create({
    row: { 
        width: width,
        height: height,
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 12 ,
        flex: 1,
    },
    swatchLabel: {

    },
    swatchText: {
      fontFamily: 'noto-sans',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
    },
    brightText: {
      color: 'white',
      borderRadius: 12,
      backgroundColor:'rgba(12, 12, 12, 0.2)',
      padding: 10,
      textTransform: 'uppercase',
      fontSize: 18,
      fontFamily: 'noto-sans'
    },
    darkText: {
      color: 'black',
      borderRadius: 12,
      backgroundColor:'rgba(12, 12, 12, 0.15)',
      padding: 10,
      textTransform: 'uppercase',
      fontSize: 18,
      lineHeight: 26,
      fontFamily: 'noto-sans'
    },
    shareButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      height: 80,
      width: 80,
      borderRadius: 40
    }
})

}

export default withNavigation( SingleSwatch )
