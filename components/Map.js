import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  DatePickerIOS
} from "react-native";
import { MapView } from "expo";
import { Marker, ProviderPropType } from "react-native-maps";
import ApiKeys from "./constants/ApiKeys";
import * as firebase from "firebase";

// import {createStackNavigator, createAppContainer} from 'react-navigation';
import EventForm from "./EventForm";
import { Form } from "./Form";

const { width, height } = Dimensions.get("window");
const firebaseConfig = {
  apiKey: "AIzaSyAomUzviEzRitHhTK1IR9LJbfhU6_9CzBk",
  authDomain: "justpincase-c0785.firebaseapp.com",
  databaseURL: "https://justpincase-c0785.firebaseio.com",
  projectId: "justpincase-c0785",
  storageBucket: "justpincase-c0785.appspot.com",
  messagingSenderId: "357323316713"
};
const ASPECT_RATIO = width / height;
const LATITUDE = 41.5075;
const LONGITUDE = -81.60844;
const LATITUDE_DELTA = 0.007;
const LONGITUDE_DELTA = 0.01; //LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;
if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}
function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      markers: [],
      markerButtonPressed: false,
      modalVisible: false
    };
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("wokeeey");
        console.log(position.coords.latitude);
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
          // latitudeDelta: this.state.region.latitudeDelta,
          // longitudeDelta: this.state.region.longitudeDelta
        });
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }

  addEvent(latitude) {
    firebase
      .database()
      .ref("users/")
      .set({
        latitude
      })
      .then(data => {
        console.log("data ", data);
      });
  }

  componentDidMount() {
    this.addEvent(1.0);
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("wokeeey");
        console.log(position.coords.latitude);
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
            // latitudeDelta: this.state.region.latitudeDelta,
            // longitudeDelta: this.state.region.longitudeDelta
          }
          // latitudeDelta: this.state.region.latitudeDelta,
          // longitudeDelta: this.state.region.longitudeDelta
        });
        let tempCoords = {
          latitude: Number(position.coords.latitude),
          longitude: Number(position.coords.longitude)
        };
        this._map.animateToCoordinate(tempCoords, 1);
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }

  onRegionChange(region) {
    this.setState({ region });
    console.log(region);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onMapPress(e) {
    this.setState({
      markers: [
        // ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor()
        }
      ],
      modalVisible: true
    });
    console.log("hello");
  }

  onSubmit(form) {
    console.log(form);
    addEvent(form);
    this.setModalVisible(false);
    this.markerButtonPressed = false;
  }

  render() {
    console.log("hello");
    if (this.state.markerButtonPressed) {
      return (
        <View style={styles.container}>
          <MapView
            provider={this.props.provider}
            style={styles.map}
            initialRegion={this.state.region}
            onPress={e => this.onMapPress(e)}
            showsUserLocation
            showsMyLocationButton
          >
            {this.state.markers.map(marker => (
              <Marker
                key={marker.key}
                coordinate={marker.coordinate}
                pinColor={marker.color}
              />
            ))}
          </MapView>

          <View style={styles.formContainer}>
            <Modal
              visible={this.state.modalVisible}
              animationType="slide"
              transparent={false}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <Form
                onSubmit={this.onSubmit}
                onCancel={() => this.setModalVisible(false)}
              />
            </Modal>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.setState({ markerButtonPressed: false })}
              style={styles.bubble_red}
            >
              <Text> Cancel </Text>
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
    } else {
      return (
        <View style={styles.container}>
          <MapView
            provider={this.props.provider}
            style={styles.map}
            initialRegion={this.state.region}
            onRegionChange={this.onRegionChange}
            showsUserLocation
            showsMyLocationButton
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
              onPress={() => this.setState({ markerButtonPressed: true })}
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
  provider: ProviderPropType
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  bubble_red: {
    backgroundColor: "rgba(255,0,0,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  exit_button: {
    width: 20,
    paddingHorizontal: 12,
    alignItems: "flex-start",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  },
  formContainer: {
    flexDirection: "column",
    marginVertical: "auto",
    backgroundColor: "transparent"
  }
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
