import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, Slider } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      image:null,
      cameraType:RNCamera.Constants.Type.back,
      cameraFlash:RNCamera.Constants.FlashMode.off,
      cameraFlashText:'Flash: OFF',
      cameraZoom:0
    };
    this.tirarFoto = this.tirarFoto.bind(this);
    this.trocarCamera = this.trocarCamera.bind(this);
    this.trocarFlash = this.trocarFlash.bind(this);
    this.trocaZoom = this.trocaZoom.bind(this);
  }

  tirarFoto() {
    if(this.camera) {

      this.camera.takePictureAsync({ quality:0.8, width: 500 }).then((data)=>{
          //data.width
          //data.height
          //data.uri
          //data.base64
          this.setState({image:data});
      });

    }
  }

  trocarCamera() {
    if(this.camera) {
      let state = this.state;
      if(this.state.cameraType == RNCamera.Constants.Type.back) {
        state.cameraType = RNCamera.Constants.Type.front;
      } else {
        state.cameraType = RNCamera.Constants.Type.back;
      }

      this.setState(state);
    }
  }

  trocarFlash() {
    let state = this.state;
    if(this.camera) {

      if(this.state.cameraFlash == RNCamera.Constants.FlashMode.off) {
        state.cameraFlash = RNCamera.Constants.FlashMode.on;
        state.cameraFlashText = "Flash ON";
      } else if(this.state.cameraFlash == RNCamera.Constants.FlashMode.on) {
        state.cameraFlash = RNCamera.Constants.FlashMode.auto
        state.cameraFlashText = "Flash Auto";
      } else if(this.state.cameraFlash == RNCamera.Constants.FlashMode.auto) {
        state.cameraFlash = RNCamera.Constants.FlashMode.torch;
        state.cameraFlashText = "Flash Torch";
      } else if (this.state.cameraFlash == RNCamera.Constants.FlashMode.torch) {
        state.cameraFlash = RNCamera.Constants.FlashMode.off;
        state.cameraFlashText = "Flash OFF";        
      }
    this.setState(state);
    }
  }

  trocaZoom(v) {
    this.setState({cameraZoom:v});
  }


  render() {

    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.camera}
          ref={(camera)=>{
            this.camera = camera;
          }}
          type={this.state.cameraType}
          flashMode={this.state.cameraFlash}
          zoom={this.state.cameraZoom}
          permissionDialogTitle="Permissão para usar a camera"
          permissionDialogMessage="Nós precisamos usar a sua camera"
        />
        <View style={styles.controlArea}>
          <View style={styles.controlAreaItem}>
            <Button title={this.state.cameraFlashText} onPress={this.trocarFlash} />
          </View>
          <View style={styles.controlAreaItem}>
            <Button title="Tirar Foto" onPress={this.tirarFoto} />
          </View>
          <View style={styles.controlAreaItem}>
            <Button title="Trocar" onPress={this.trocarCamera} />
          </View>                    
        </View>
              
        <Slider style={styles.slider} minimumValue={0} maximumValue={1} onValueChange={this.trocaZoom} />

      </View>
    );

  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#000000'
  },
  camera:{
    height: 300
  },
  controlArea:{
    height: 150,
    flexDirection: 'row'
  },
  controlAreaItem:{
    flex:1,
    padding: 5
  },
  image:{
    width: 100,
    height: 100
  },
  slider:{
    width: '100%',
    height: 50,
    backgroundColor: '#00FF00'
  }
});