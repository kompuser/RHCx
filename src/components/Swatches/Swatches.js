import React from 'react'
import { ActivityIndicator, AsyncStorage, Alert, KeyboardAvoidingView, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { AntDesign } from '@expo/vector-icons';
import Swatch from './Swatch'
// import CameraApp from './Camera'
import Toggler from './Toggler'
import Bookmarks from './Bookmarks'
import { TextInput } from 'react-native-gesture-handler';
import { Localization } from 'expo';
import i18n from 'i18n-js';

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height
i18n.locale = Localization.locale
const lang = i18n.locale.substr(0, 2) 


class Swatches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: this.props.data,
      selectedItem: null,
      isGrid: false,
      text:'',
      dataSource: this.props.data
    };
    this.arrayholder = this.props.data
    this._handleClick = this._handleClick.bind(this)
    const favourites = this.props.screenProps.favourites
  }

  async componentDidMount() {
  }
  
  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.r
      const textData = text
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      dataSource: newData,
      text: text
    })
  }

  navigate = (item, index) => {
    this.props.navigation.navigate('SingleSwatch', { swatch: item , swatchIndex: index })
  }

  _handleClick = () => {
    this.setState({ isGrid: !this.state.isGrid })
  }

  _keyExtractor = (item, index) => item.r

  _renderItem = ({ item, index }) => (
    <Swatch
      selectedItem={item}
      display={(this.state.isGrid ? 'grid' : 'row')}
      ral={item.r}
      hex={item.h}
      cymk={item.c}
      pantone={item.p}
      onPress={() => this.navigate(item, index)}
      key={item}
      swatchIndex={index}
      lang={{
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
      }[lang]}
    />
  )

  render() {
    const { data } = this.props.data
    const { screenProps: { swatches } } = this.props
    const { screenProps: { favourites } } = this.props
    // console.log('swatches')
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          onChangeText={text => this.SearchFilterFunction( text )}
          value= { this.state.text }
          autoComplete = "off"
          placeholder= "search RAL" 
          keyboardType = "numeric"
          style={{ padding: 10 }}
        />
        <ScrollView>
          <FlatList
            data={ this.state.dataSource }
            key={(this.state.isGrid ? 1 : 0)}
            ItemSeparatorComponent={this._flatListItemSeparator}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            numColumns={(this.state.isGrid ? 4 : 1)}
          />
        </ScrollView>
        <Toggler _handleClick={this._handleClick} eye={(this.state.isGrid ? 'open' : 'closed')} />
        {/*<View style={{ position: 'absolute', bottom: 20, left: (width/2) - 40 }}>
          <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('Camera') }}>
            <View style={{ backgroundColor: 'rgba(12,12,12,0.35)', height: 80, width: 80, borderRadius: 40 }}>
              <Text style={{ textAlign: 'center', lineHeight: 80 }}>
                <AntDesign name="camerao" size={40} color="rgba(255,255,255,0.85)" />
              </Text>
            </View>
          </TouchableOpacity>
        </View>*/} 
        <Bookmarks counter={1} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    backgroundColor: 'transparent',
    width: width,
    marginTop: 40,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#34495e',
  },
  title: {
    color: '#666'
  },
  titleContainer: {
    fontSize: 18
  },
  buttonContainer: {
    paddingVertical: 15,
    marginTop: 20,
    backgroundColor: '#2c3e50',
    borderRadius: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#ecf0f1',
    fontWeight: '700'
  },
});

export default withNavigation(Swatches)
