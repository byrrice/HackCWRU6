import React from 'react'
import { TouchableOpacity, Alert, Button, StyleSheet, Text, View } from 'react-native'
import { MapView } from 'expo'
import { Marker } from 'react-native-maps'

export default class SetMarker extends React.Component {
    constructor(props){
        super(props);
        this.setState = this.setState.bind(this);
        this.initializeMarkers = this.initializeMarkers.bind(this);
        this.state = {
            markerButtonVisible: true,
        }
    }
    initializeMarkers(){
        this.setState(( {markerButtonVisible: false} ))
    }
    render() {
        if(!this.state.markerButtonVisible) {
            return(
                <Text> Tap the map to set a pin </Text>
            )
        }
        else{
            return (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => { this.initializeMarkers() }}
                                      style={styles.bubble}
                    >
                    <Text> Button </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    };
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    bubble: {
      backgroundColor: 'rgba(255,255,255,0.7)',
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 20,
    },
    latlng: {
      width: 200,
      alignItems: 'stretch',
    },
    button: {
      width: 80,
      paddingHorizontal: 12,
      alignItems: 'center',
      marginHorizontal: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginVertical: 20,
      backgroundColor: 'transparent',
    },
  });