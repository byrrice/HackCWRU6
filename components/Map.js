import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { MapView } from 'expo'
import { Marker, ProviderPropType } from 'react-native-maps';
// import {createStackNavigator, createAppContainer} from 'react-navigation';
import EventForm from './EventForm'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 41.5075;
const LONGITUDE = -81.60844;
const LATITUDE_DELTA =0.007;
const LONGITUDE_DELTA = 0.01;//LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// const MainNavigator = createStackNavigator({
//   Map: {screen: MapScreen},
//   CreateEvent: {screen: EventScreen},
// });

// const Event = t.struct({
//   Name: t.String,
//   StartTime: t.Tim,
//   password: t.String,
//   terms: t.Boolean
// });

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      markerButtonPressed: false,
      eventFormVisible: false
    };
  }

  onMapPress(e) {
    this.setState({
      markers: [
        // ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor(),
        },
      ],
      eventFormVisible: true,
    });
    console.log("hello");
  }

  render() {
    if (this.state.markerButtonPressed){
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={(e) => this.onMapPress(e)}
        >
          {this.state.markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}
        </MapView>
        
        <EventForm parentModalVisible = {this.state.eventFormVisible}/>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={() => this.setState({ markerButtonPressed: false })}
            style={styles.bubble_red}
          >
          <Text > Cancel </Text>
          </TouchableOpacity>
          <View
           // onPress={() => this.setState({ markers: [] })}
            style={styles.bubble}
          >
            <Text> Tap map to set marker </Text>
          </View>
        </View>
      </View>
    );
  }
  else{
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
                  >
          {this.state.markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ markerButtonPressed: true})}
            style={styles.bubble}
          >
            <Text> Create Marker </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  }
}

Map.propTypes = {
  provider: ProviderPropType,
};

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
  bubble_red: {
    backgroundColor: 'rgba(255,0,0,0.7)',
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
  exit_button: {
    width: 20,
    paddingHorizontal: 12,
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default Map;

// export default class Map extends Component {
//   constructor(props){
//     super(props);
//     this.setState = this.setState.bind(this);
//     this.state = {
//       region: {
//         latitude: 41.5075,
//         longitude: -81.60844,
//         latitudeDelta: 0.007,
//         longitudeDelta: 0.019,
//       },
//     }
//   }
//   getInitialState() {
//     return {
//         region: {
//         latitude: 41.5075,
//         longitude: -81.60844,
//         latitudeDelta: 0.007,
//         longitudeDelta: 0.019,
//       },
//     };
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <MapView
//           style={styles.container}
//           region = {this.state.region}
//           onRegionChange = {this.onRegionChange}
//           style={{ flex: 1 }}
//           showsUserLocation
//           showsMyLocationButton
//         />
//           <SetMarker />
//       </View>
//     )
//   };
// }
// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: '80%',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   bubble: {
//     backgroundColor: 'rgba(255,255,255,0.7)',
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//     borderRadius: 20,
//   },
//   latlng: {
//     width: 200,
//     alignItems: 'stretch',
//   },
//   button: {
//     width: 80,
//     paddingHorizontal: 12,
//     alignItems: 'center',
//     marginHorizontal: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginVertical: 20,
//     backgroundColor: 'transparent',
//   },
// });