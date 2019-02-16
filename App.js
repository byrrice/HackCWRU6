import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';
import Map from './components/Map'
import SetMarker from './components/SetMarker'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.setState = this.setState.bind(this);
    this.state = {
      // region: {
      //   latitude: 41.5075,
      //   longitude: -81.60844,
      //   latitudeDelta: 0.007,
      //   longitudeDelta: 0.019,
      // },
      markers: [{
        latlng: {
          latitude: 41.5075,
          longitude: -81.60844,
        },
        title: 'marker test',
        description: 'ta ta ra',
      }],
    }
  }
  getInitialState() {
    return {
        region: {
        latitude: 41.5075,
        longitude: -81.60844,
        latitudeDelta: 0.007,
        longitudeDelta: 0.019,
      },
    };
  }
  // What the fuck is this error
  // onRegionChange(e) {
  //   this.setState( {region: e} );
  // }

  render() {
    return (
      // <MapView
      //   region = {this.state.region}
      //   onRegionChange = {this.onRegionChange}
      //   style={{ flex: 1 }}
      // >
      // {this.state.markers.map(marker => (
      //   <Marker
      //     coordinate={marker.latlng}
      //     title={marker.title}
      //     description={marker.description}
      //   />
      // ))}
      < Map />
    );
  }

}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
