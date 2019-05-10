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

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
var tint;

export default class ShareSwatch extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <View style={this.styles.toggler} >
        <TouchableOpacity onPress={ this.props._handleShare } >
            <View style={{height: 80, width: 80}}></View>
        </TouchableOpacity>
      </View>
    );
  }

  styles = StyleSheet.create({
    toggler: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: 1,
      fontSize: 48,
      fontWeight: '600',
      padding: 0 ,
      height: 80,
      width: 80,
      padding: 0,
      borderRadius: 40,
      backgroundColor: 'rgba(255,255,0,0.5)',
    }
  })
}

