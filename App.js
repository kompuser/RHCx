import React, { Component } from 'react'
// import * as Font from 'expo-font';
// StyleSheet.setStyleAttributePreprocessor('fontFamily', Font.processFontFamily);
import {
	Alert,
	AsyncStorage,
	DrawerLayoutAndroid,
	Platform,
	StyleSheet,
	Button,
	Text,
	View,
	Dimensions
} from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer, withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import i18n from 'i18n-js';
import data from './data/swatches.json';
import Home from './Home';
import SingleSwatch from './SingleSwatch';
import Projects from './Projects';
import CameraApp from './CameraApp';
//noto
console.disableYellowBox = true;

const SwatchesNav = createStackNavigator({
	Swatches: { screen: Home },
	SingleSwatch: { screen: SingleSwatch }
}, { headerMode: 'none' })

const RootStack = createStackNavigator(
	{
		Home: {
			screen: SwatchesNav
		},
		Camera: {
			screen: CameraApp
		},
		Projects: {
			screen: Projects
		}
	},
	{
		headerMode: 'none'
	}
);

const AppContainer = createAppContainer(RootStack);

const key = 'state'

export default class App extends React.Component {


	constructor() {
		super()
		this.state = {
			favourites: [],
			swatches: data,
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height,
		}
		this.onLayout = this.onLayout.bind(this);
		i18n.fallbacks = true;
	};

	onLayout(e) {
		this.setState({
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height,
		})
	}
	
	async componentDidMount() {
		// await Font.loadAsync({
		// 	'noto-sans': require('./assets/fonts/NotoSans-Regular.ttf'),
    	// });
    	// this.setState({ fontLoaded: true });
    	// console.log('font!')
		try {
			let favourites = await AsyncStorage.getItem(key)
			if (favourites !== null) {
				favourites = JSON.parse(favourites)
				this.setState({ favourites })
			}
		} catch (e) {
			console.log( locale )
		}
	}
	async componentDidUpdate() {
		try {
			let favourites = await AsyncStorage.getItem(key)
			if (favourites !== null) {
				favourites = JSON.parse(favourites)
				this.setState({ favourites })
			}
		} catch (e) {
			//console.log(e)
		}
	}

	addFavourite = async (swatch) => {
		const favourites = this.state.favourites;
		favourites.push(swatch)
		AsyncStorage.setItem(key, JSON.stringify(favourites))
		.then(() => this.setState({ favourites }) )
		
	}

	removeFavourite = async (swatch) => {
		const favourites = this.state.favourites
		try{
			await AsyncStorage.getItem(key)
			.then( 
				(swatches) => {
					const f = JSON.parse(swatches)
					for (let i = 0; i < f.length ; i++) {
						if( f[i].r == swatch.r ) {
							f.splice(i, 1)
							AsyncStorage.setItem(key, JSON.stringify(f))
							.then( () => this.setState({ favourites }) )
						}
					}
				}
			)
		} catch (error) {
			console.log(error.message.toString());
		}
	}

	render() {
		const favourites = this.state.favourites;
		return (
			<AppContainer  screenProps={{
				w: this.state.width,
				h: this.state.height,
				swatches: this.state.swatches,
				favourites: this.state.favourites,
				addFavourite: this.addFavourite,
				removeFavourite: this.removeFavourite,
			}} />
		)
	}
}
