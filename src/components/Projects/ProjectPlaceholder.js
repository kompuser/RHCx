import React from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'


const Message = ({ message }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.message}>{message}</Text>
  </View>
)

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'mediumblue'
  },
  message: {
    alignSelf: 'center',
    fontSize: 20
  }
})

export default Message