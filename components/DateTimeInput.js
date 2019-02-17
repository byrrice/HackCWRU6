import React from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  DatePickerIOS,
  TextInput,
  Picker,
  ScrollView,
} from 'react-native';
import { MapView } from 'expo'
import { Marker, ProviderPropType } from 'react-native-maps';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

class DateTimeInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false }
    this.open = () => this.setState({ open: true })
    this.close = () => this.setState({ open: false })
  }

  render() {
    const { value, onChange } = this.props;
    return (
      <TouchableOpacity onPressIn={this.open}>
        <TextInput onFocus={this.open} value={value ? value.toLocaleString() : 'Enter Date'} />
        <Modal
          visible={this.state.open}
          onDismiss={this.close}
        >
          <DatePickerIOS
            date={value}
            onDateChange={onChange}
            mode='datetime'
          />
          <View style={styles.buttonContainer}>
            <Button
              onPress={this.close}
              title="Okay"
            />
          </View>
        </Modal>
      </TouchableOpacity>
    )
  }
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
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  formContainer: {
    flexDirection: 'column',
    marginVertical: 'auto',
    backgroundColor: 'transparent',
  },
});

export default DateTimeInput;