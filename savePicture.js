import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      image:null
    };
    this.tirarFoto = this.tirarFoto.bind(this);
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

  render() {

    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.camera}
          ref={(camera)=>{
            this.camera = camera;
          }}
          type={RNCamera.Constants.Type.back}
          permissionDialogTitle="Permissão para usar a camera"
          permissionDialogMessage="Nós precisamos usar a sua camera"
        />
        <View style={styles.controlArea}>
          <Button title="Tirar Foto" onPress={this.tirarFoto} />
          <Image resizeMode='contain' style={styles.image} source={this.state.image} />
        </View>
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
    height: 300
  },
  image:{
    width: 200,
    height: 200
  }
});