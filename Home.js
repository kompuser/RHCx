import React, { Component } from 'react';
import {
  Platform,
  Modal,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import { withNavigation } from 'react-navigation';
//import LottieView from 'lottie-react-native';
import Swatches from './src/components/Swatches/Swatches';
import data from './data/swatches.json';
//import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true 
    }
  }
  
  static navigationOptions = {
    title: 'Home'
  };

  componentDidMount() {
    //this.animation.play()
  }

  setModalVisible() {
    this.setState({ modalVisible: false })
  }

  render() {
    return (
      <View style={this.styles.container}>
        <Swatches data={data.colors} screenProps={{ swatches: data.colors }} />
        {/* <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <LottieView 
            autoPlay
            loop={false}
            source={require('./data/loader.json')}
            onAnimationFinish={ ()=> { this.setState({ modalVisible: false }) } }
          />
        </Modal> */}
      </View>
    )
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(229,229,229)',
    },
    welcome: {
      fontSize: 48,
      textAlign: 'center',
      margin: 0,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    }
  });
}

