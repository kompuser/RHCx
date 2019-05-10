import React, { Component } from 'react'
import * as Font from 'expo-font';
StyleSheet.setStyleAttributePreprocessor('fontFamily', Font.processFontFamily);
import { StyleSheet } from 'react-native'

export default class css extends React.Component {

  componentDidMount() {
    Font.loadAsync({
      'noto-sans': require('./fonts/NotoSans-Regular.ttf'),
    });
  }

  css = StyleSheet.create({
      noto: {
      fontFamily: 'noto-sans'
    }

  });

}