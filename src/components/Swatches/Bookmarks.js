import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text,
  Button,
  Modal, 
  View,
  Share,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
var tint;

class Bookmarks extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <View>
        <TouchableOpacity  style={this.styles.toggler} onPress={ () => {this.props.navigation.navigate('Projects', { updated : true })} } >
            <View style={{height: 80, width: 80, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <AntDesign name="book" size={40} color="rgba(255,255,255,0.85)" />
            </View>
        </TouchableOpacity>
      </View>
    );
  }

  styles = StyleSheet.create({
    toggler: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      lineHeight: 1,
      fontSize: 48,
      fontWeight: '600',
      bottom: 20, 
      left: 20 , 
      padding: 0 ,
      height: 80,
      width: 80,
      padding: 0,
      borderRadius: 40,
      backgroundColor: 'rgba(12,12,12,0.35)',
    }
  })
}

export default withNavigation(Bookmarks)
