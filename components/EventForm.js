import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Modal from "react-native-modal"

class EventForm extends Component {
    constructor(props){
        super(props);
        this.setState = this.setState.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            modalVisible: this.props.parentModalVisible,
        }
    };
    
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
    
    closeModal() {
        this.setState({modalVisible: false})
    }
    render() {
      return (
        <View style={styles.formContainer}>
          <Modal 
            visible={this.state.modalVisible}
            animationType="slide"
            transparent={false}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.buttonContainer}>
              <View>
                <Text>Hello World!</Text>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(false);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
  
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text>Create event at pin location?</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    formContainer: {
      flexDirection: 'row',
      paddingHorizontal: 18,
      paddingVertical: 12,
      marginVertical: 20,
      backgroundColor: 'transparent',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
      },
  });

  export default EventForm;