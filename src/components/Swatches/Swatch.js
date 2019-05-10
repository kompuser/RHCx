import React, { Component } from 'react'
import * as Font from 'expo-font';
// StyleSheet.setStyleAttributePreprocessor('fontFamily', Font.processFontFamily);
import { Alert, AsyncStorage,KeyboardAvoidingView, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Localization } from 'expo'
import i18n from 'i18n-js'
import { withNavigation } from 'react-navigation' 
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const key = 'state'


class Swatch extends Component {
  constructor(props) {
    super(props);
    this.state  = { isFav: false }
    this._setState = this._setState.bind(this);
    this._addSwatch = this._addSwatch.bind(this);
    //const lang = this.props.screenProps.lang
  };
  
  _setState = async() => {
    const swatch  = this.props.ral
    await AsyncStorage.getItem(key).then(
      (swatches) => {
        const matchedColors = (JSON.parse(swatches))
        for (let i = 0; i < matchedColors.length; i++) {
          if(matchedColors[i].r == swatch ){
            this.setState({isFav: true})
          }
        }
      }
    )
  }

  async componentDidMount() {
    // await Font.loadAsync({
    //   'noto-sans': require('./../../../assets/fonts/NotoSans-Regular.ttf'),
    // });

    this.setState({ fontLoaded: true });
  }

  // componentDidMount = async () => {
  //   await Font.loadAsync({
  //     'noto-sans': require('./../../../assets/fonts/NotoSans-Regular.ttf'),
  //   });
  // }

  _addSwatch = ( color ) => {
    const favs  = this.props.favs
    this.setState({isFav: !this.state.isFav})
    favs.push( color )
    AsyncStorage.setItem('state', JSON.stringify(favs))
  }

  bgColor = () => {
      color = '#' + this.props.hex
      return color
  }

  _hexToRgb = (hex) => {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return r + "," + g + "," + b;
  }

  _hexToRgbTable = (hex) => {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return "['" + r + "','" + g + "','" + b + "']";
  }

  _rgbTable = (hex) => {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    var o = Math.round(((parseInt(r) * 299) + (parseInt(g) * 587) + (parseInt(b) * 114)) /1000);
    return o;
  }
  
  render() {
    
    var swatch = {
      'r': this.props.ral,
      'p': this.props.pantone,
      'c': this.props.cymk,
      'h': this.props.hex,
      'l': this.props.lang
    }    

    return (
      this.state.fontLoaded ? (
      <View style={{ backgroundColor: 'rgb('+this._hexToRgb( this.props.hex )+')', flex:1, flexDirection: 'row', width: width }}>
          <View style={this.styles.row} >
          <TouchableOpacity {...this.props} >
            <View style={this.styles.swatchLabel} >
              <Text style = {this._rgbTable( this.props.hex ) > 125 ? this.styles.darkText:this.styles.brightText} >
                { this.props.display == 'grid' ?  <Text style={{ width: width/4, flex:1 , alignItems: 'center', justifyContent: 'center' }}></Text>  :  'RAL ' + this.props.ral + ' ' + swatch.l }
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>) : null
    )
  }

  styles = StyleSheet.create({
      row: { 
          flexDirection: 'row', 
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: 12 ,
          height: 100,
          width: width
      },
      swatchLabel: {
          width: width,
          height: 100,
          flex: 1,
          justifyContent: 'center',
      },
      swatchText: {
          fontWeight: 'bold',
          fontSize: 18,
          marginBottom: 4
      },
      brightText: {
        color: 'white',
        borderRadius: 12,
        //fontFamily: 'noto-sans',
        padding: 10,
        textTransform: 'uppercase',
        fontSize: 14
      },
      darkText: {
        color: 'black',
        borderRadius: 12,
        padding: 10,
        //fontFamily: 'noto-sans',
        textTransform: 'uppercase',
        fontSize: 14
      }
  })
}

export default withNavigation(Swatch)