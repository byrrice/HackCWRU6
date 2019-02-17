
import { MapView } from "expo";
import { Marker, ProviderPropType } from "react-native-maps";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";

import React from "react";
import { StyleSheet, Text, TextInput, View, Button, Modal } from "react-native";
import RegisterForm from './RegisterForm'
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.state = { email: "", password: "", errorMessage: null, modalVisible: false };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log("handleLogin");
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.setModalVisible(true)}
        />
      <View style={styles.formContainer}>
        <Modal
          visible={this.state.modalVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <RegisterForm
            onSubmit={this.onSubmit}
            onCancel={() => this.setModalVisible(false)}
          />
        </Modal>
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    textAlign: 'center'
  }
});
