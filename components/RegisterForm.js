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
import DropDownInput from './DropDownInput'
import DateTimeInput from './DateTimeInput'

export class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {
            first: "",
            last: "",
            email: "",
            password: "",
        };
    }

    changeFormState(name) {
        return (value) => this.setState({ [name]: value })
    }

    render() {
        return (
            <ScrollView style={{ marginTop: 30 }}>
                <View style={styles.formContainer}>
                    <Input label="First Name" error="not found">
                        <TextInput
                            placeholder="John"
                            value={this.state.first}
                            onChangeText={this.changeFormState('first')} />
                    </Input>
                    <Input label="Last Name">
                        <TextInput
                            placeholder="Smith"
                            value={this.state.last}
                            onChangeText={this.changeFormState('last')} />
                    </Input>
                    <Input label="Email">
                        <TextInput
                            placeholder="jks23@case.edu"
                            value={this.state.email}
                            onChangeText={this.changeFormState('email')} />
                    </Input>
                    <Input label="password">
                        <TextInput
                            placeholder="Password"
                            value={this.state.password}
                            onChangeText={this.changeFormState('password')} />
                    </Input>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.props.onCancel}
                        title="Cancel"
                    />
                    <Button
                        onPress={() => this.props.onSubmit(this.state)}
                        title="Submit"
                    />
                </View>
            </ScrollView>
        );
    }
}

const Input = ({ label, error, children }) => (
    <View style={{ marginBottom: 10, marginTop: 10, marginHorizontal: 10 }}>
        {
            label && <Text style={{ fontWeight: 'bold' }}>{label}</Text>
        }
        <View style={{ paddingLeft: 2, paddingVertical: 10, borderRadius: 4, borderColor: error ? 'red' : 'black', borderWidth: 1 }}>
            {children}
        </View>
        {
            error && <Text style={{ color: 'red' }}>{error}</Text>
        }
    </View>
)

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

export default RegisterForm;