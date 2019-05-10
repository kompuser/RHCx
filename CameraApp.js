import React from 'react';
import {
	Alert,
  AsyncStorage,
  CameraRoll,
	DrawerLayoutAndroid,
  Platform,
  Image,
  PixelRatio,
	StyleSheet,
	Button,
	Text,
  View,
  TouchableOpacity,
	Dimensions
} from 'react-native'
import { Camera, Permissions, FileSystem, Constants, takeSnapshotAsync } from 'expo';
import { withNavigation } from 'react-navigation'
import { AntDesign } from '@expo/vector-icons';
// import { PixiView } from './PixiView';
// import * as PIXI from 'pixi.js';
import ExpoPixi, { PIXI } from 'expo-pixi';
var width = Dimensions.get('window').width
var height = Dimensions.get('window').height

//logical pixels-- device-independant pixels
const targetPixelCount = 1080;
const pixelRatio = PixelRatio.get();
const pixels = targetPixelCount / pixelRatio;
let context = null
//PIXI


async function readPixelsAsync(uri) {
  //const app = ExpoPixi.application({ context });
  const app = new PIXI.Application({ context });
  const sprite = await Pixi.Sprite.fromExpoAsync(uri);
  app.stage.addChild(sprite);
  return app.renderer.extract.pixels(sprite);
}

class CameraApp extends React.Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    RALfromCamera: false,
    RALimage: null,
    foo: null,
    ready: false
  };


  async componentDidMount() {
    
    context = await Expo.GLView.createContextAsync();

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    FileSystem.deleteAsync(FileSystem.documentDirectory + 'RAL', {
      idempotent: true
    }).then(
      function(){
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'RAL').catch(e => {
          console.log(e, 'Directory exists');
        });
      }
    )
    this.setState({ready: true})  
  }



  backHome = () => {
    this.props.navigation.navigate('Swatches')
  }

  screenGrab = async () => {
    const uri = await Expo.takeSnapshotAsync(this.image);

    //Alert.alert(uri)
    console.log('capture dans ' + uri)
    const pixels = await readPixelsAsync(uri);
    // console.log('cool', uri, pixels.length / 4);

    // const getPixel = index => {
    //   const pixel = index * 4;
    //   return pixels.slice(pixel, pixel + 4);
    // };

    // const [r, g, b, a] = getPixel(0);
    // console.log({ r, g, b, a });
    // this.setState({
    //   image: { uri },
    //   color: `rgba(${r}, ${g}, ${b}, ${(1.0 / 255) * a})`,
    // });
  };

  snap = async () => {
    if(this.camera) {
      let photo = await this.camera.takePictureAsync({
        skipProcessing: true,
        onPictureSaved: this.onPictureSaved
      });
      this.setState({
        foo: Math.random()
      });
    }
  }

  onPictureSaved = async (photo) => {
    const id = Math.random()
    this.camera.pausePreview()

    await FileSystem.moveAsync({
      from: photo.uri,
      to: `${FileSystem.documentDirectory}RAL/${id}.jpg`,
    })
    .then( function(){
      //
    })
    
    this.setState({ RALfromCamera: true });
    this.setState({ RALimage: FileSystem.documentDirectory + 'RAL/'+ id +'.jpg' })
    //console.log( this.state.RALimage )
    //this.setState({ RALimage: photo.uri })
    this.camera.resumePreview()
  }

  render() {
    const { hasCameraPermission } = this.state
    const { ready, image, color } = this.state

    if (hasCameraPermission === null) {
      return <View />;
    
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    
    } else {

      return (
        <View style={{ flex: 1 }}>
          <Camera 
          style={{ flex: 1 , height: height / 2}} 
          ref={ref => { this.camera = ref; }}
          type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 20, 
                  right: 20,
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  padding: 20
                }}
                >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          
          <View style={ styles.half }>
            {
              ! this.state.RALimage ? null :

                <View style={{ flex: 1, width: width }}>
                  
                  <TouchableOpacity onPress={ this.screenGrab } >
                    <Image 
                      style={{ borderWidth: 0, borderColor: 'white', width: width / 2, height: height / 2 }}
                      source={{ uri: `${ this.state.RALimage }` }}
                    />
                  </TouchableOpacity>
                  
                  <Expo.GLView  
                    collapsable={false} 
                    ref={ref => (this.image = ref)}
                    style={{ backgroundColor: '#ffff00', right: 0, position: 'absolute', bottom: 0, flex: 1, width: width / 2, height: height / 2}}
                  />
                  
                </View>
            }
            <View style={{ position: 'absolute', bottom: 20, width: width }}>
              <View style={{ position: 'absolute', bottom: 0, left: 20 }}>
                <TouchableOpacity onPress={ this.backHome } >
                  <View style={{ backgroundColor: 'rgba(12,12,12,0.35)', height: 80, width: 80, borderRadius: 40, flex:1, alignItems: 'center', justifyContent: 'center'}}>
                    <AntDesign name="enter" size={40} color="rgba(255,255,255,0.85)" />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ position: 'absolute', bottom: 0, right: 20 }}>
                <TouchableOpacity onPress={ this.snap } >
                  <View style={{ backgroundColor: 'rgba(12,12,12,0.35)', height: 80, width: 80, borderRadius: 40, flex:1, alignItems: 'center', justifyContent: 'center'}}>
                    <AntDesign name="picture" size={40} color="rgba(255,255,255,0.85)" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        )
      }
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
  half: {
    width: width,
    height: height / 2,
    backgroundColor: 'rgba(16,16,16,1)'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default withNavigation(CameraApp)
