import React, { Component } from 'react';
import * as Font from 'expo-font';
import {
  Alert,
  AsyncStorage,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Share,
  StyleSheet,
  Text,
  TextInput,
  Button,
  ScrollView,
  View
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { Localization } from 'expo'
import i18n from 'i18n-js'

import uuidV4 from 'uuid/v4';
import Message from './src/components/Projects/ProjectPlaceholder'

var projectIndex = 0

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

i18n.locale = Localization.locale
const locale = i18n.locale.substr(0, 2) 

class Projects extends React.Component {
  
  constructor(props) {
    super(props)
    this.state= {
      favourites:[]
    }
    const favourites = this.props.screenProps.favourites
  }

  navigate = (item) => {
    this.props.navigation.navigate('SingleSwatch', { swatch : item, favourite : true})
  }

  backHome = () => {
    this.props.navigation.navigate('Swatches')
  }

  _getLang(locale, item) {
    //const item = item
    const lang = {
      'de': (
        item.de
      ),
      'en': (
        item.en
      ),
      'es': (
        item.es
      ),
      'fr': (
        item.fr
      ),
      'it': (
        item.it
      ),
      'nl': (
        item.nl
      )
    }[locale];
    return lang
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
    var o = Math.round(((parseInt(r) * 299) + (parseInt(g) * 587) + (parseInt(b) * 114)) / 1000);
    return o;
  }

  _handleShare = async (swatch) => {
    const { screenProps: { favourites } } = this.props;
    try {
      const result = await Share.share({
        message: '' +
          favourites.map((item, index) => (
            'RAL ' + item.r
            ) + '\n'
          )
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

  async componentWillMount() {
		try {
			const { screenProps: { favourites } } = this.props
		} catch (e) {
		}
	}

  async componentDidMount() {
    // await Font.loadAsync({
    //   //'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    //   'noto-sans': require('./assets/fonts/NotoSans-Regular.ttf'),
    // });

    this.setState({ fontLoaded: true });
  }

  render() {
    const { screenProps: { favourites } } = this.props
    // const lang = locale
    // console.log(locale)
    return (
      <View style={{ flex: 1, height: height + 40, backgroundColor: "#4b4b4b", paddingTop: 34 }}>
        <ScrollView style={{ flex: 1, height: height }}>
        
          { this.state.fontLoaded ? 
          
          <View style={styles.container}>
            {
              !favourites || !favourites.length ? <View style={{ height: height, width: width }}>
                <Text style={{ height: height, position: 'absolute', top: height / 2, bottom: 0, left: 0, right: 0, textAlign: 'center', color: '#d4d4d4' }}>Empty !{'\n'} Please add some colour here.</Text></View> :
                favourites.map((item, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => this.navigate(item)}
                  >
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'rgb('+this._hexToRgb( item.h )+')', flex: 1, flexDirection: 'row', width: width, height: 100, padding: 12 }}>
                      <Text style={this._rgbTable(item.h) > 125 ? styles.darkText : styles.brightText}>RAL {item.r +' '+ this._getLang(locale, item)}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))
            }
          </View>
          : null }

        </ScrollView>
        <View style={{ position: 'absolute', bottom: 20, width: width }}>
          <View style={{ position: 'absolute', bottom: 0, left: 20 }}>
            <TouchableOpacity onPress={ this.backHome } >
              <View style={{ backgroundColor: 'rgba(12,12,12,0.35)', height: 80, width: 80, borderRadius: 40, flex:1, alignItems: 'center', justifyContent: 'center'}}><AntDesign name="enter" size={40} color="rgba(255,255,255,0.85)" /></View>
            </TouchableOpacity>
          </View>
          <View style={{ position: 'absolute', bottom: 0, right: 20 }}>
            {
              !favourites || !favourites.length ? <Text></Text> :
            <TouchableOpacity onPress={ this._handleShare} >
              <View style={{ backgroundColor: 'rgba(12,12,12,0.35)', height: 80, width: 80, borderRadius: 40 , flex:1, alignItems: 'center', justifyContent: 'center'}}>
              <AntDesign name="export" size={40} color="rgba(255,255,255,0.85)" />
              </View>
            </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 0,
    backgroundColor: 'transparent',
    width: width,
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  brightText: {
    color: 'white',
    borderRadius: 12,
    // fontFamily: 'noto-sans',
    padding: 10,
    textTransform: 'uppercase',
    fontSize: 14
  },
  darkText: {
    color: 'black',
    borderRadius: 12,
    // fontFamily: 'noto-sans',
    padding: 10,
    textTransform: 'uppercase',
    fontSize: 14
  }


});


export default withNavigation(Projects)
