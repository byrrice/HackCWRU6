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
    this.readMarkers = this.readMarkers.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      markers: [],
      all_markers: [],
      markerButtonPressed: false,
      modalVisible: false,
      retrieved_markers: false
    };
  }

  addEvent(form, location) {
    firebase
      .database()
      .ref("events/")
      .push({
        form,
        location
      })
      .then(data => {
        console.log("addEventItself:" + data);
      });
  }

  componentDidMount() {
    this.readMarkers();
  }

  readMarkers() {
    var leadsRef = firebase.database().ref("events");
    leadsRef.once(
      "value",
      function(snapshot) {
        snapshot.forEach(
          function(childSnapshot) {
            var childData = childSnapshot.val();
            this.setState({
              all_markers: [
                ...this.state.all_markers,
                {
                  coordinate: childData.location,
                  forminfo: childData.form
                }
              ]
            });
            console.log(childData.form);
          }.bind(this)
        );
      }.bind(this)
    );
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onMapPress(e) {
    this.setState({
      markers: [
        //...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor()
        }
      ],
      modalVisible: true
    });
  }

  onSubmit(form) {
    //form["coordinate"] = this.state.markers[0].coordinate
    this.addEvent(form, this.state.markers[0].coordinate);
    this.setModalVisible(false);
    this.setState({ markerButtonPressed: false });
    this.readMarkers();
  }

  render() {
    //this.setState({ retrieved_markers: true });
    if (this.state.markerButtonPressed) {
      return (
        <View style={styles.container}>
          <MapView
            provider={this.props.provider}
            style={styles.map}
            initialRegion={this.state.region}
            onPress={e => this.onMapPress(e)}
            showsUserLocation
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
      //this.readMarkers();
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
            {this.state.all_markers.map(marker => (
              <Marker coordinate={marker.coordinate} />
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
