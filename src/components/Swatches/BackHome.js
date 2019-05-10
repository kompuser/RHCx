import React, { Component } from 'react';
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
import { withNavigation } from 'react-navigation';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
var tint;

class BackHome extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <View>
        <TouchableOpacity style={this.styles.toggler} onPress={() => { this.props.navigation.navigate('Swatches') }} >
          <View style={{ height: 80, width: 80, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Back</Text>
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
      bottom: 24,
      left: 40,
      padding: 0,
      height: 80,
      width: 80,
      padding: 0,
      borderRadius: 40,
      backgroundColor: 'rgba(0,255,255,0.35)',
    }
  })
}

export default withNavigation(BackHome)
