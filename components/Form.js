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
    Picker
} from 'react-native';
//import DateTimePicker from 'react-native-modal-datetime-picker';
import { MapView } from 'expo'
import { Marker, ProviderPropType } from 'react-native-maps';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


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

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {
            name: "",
            start_date: new Date,
            end_date: new Date,
            description: "",
            tags: [],
            category: "",
            users: "",
            group: ""
        };
    }

    changeFormState(name) {
        return (value) => this.setState({ [name]: value })
    }

    render() {
        return (
            <View style={{ marginTop: 30 }}>
                <View style={styles.formContainer}>
                    <Input label="Name" error="not found">
                        <TextInput
                            placeholder="John Smith"
                            value={this.state.name}
                            onChangeText={this.changeFormState('name')} />
                    </Input>
                    <Input label="Description">
                        <TextInput
                            placeholder="Description"
                            value={this.state.description}
                            onChangeText={this.changeFormState('description')} />
                    </Input>
                    <Input label="Start Date">
                        <DateTimeInput
                            value={this.state.start_date}
                            onChange={this.changeFormState('start_date')}
                        />
                    </Input>
                    <Input label="End Date">
                        <DateTimeInput
                            value={this.state.start_date}
                            onChange={this.changeFormState('end_date')}
                        />
                    </Input>
                    <Input label="Category">
                        <DropDownInput
                            items={["Sports", "And stuff"]}
                            value={this.state.category}
                            style={{ height: 50, width: 100 }}
                            onChange={this.changeFormState('category')} />
                    </Input>
                    <Input label="Add User">
                        <TextInput
                            placeholder="Jane Doe"
                            value={this.state.users}
                            onChangeText={this.changeFormState('name')} />
                    </Input>
                    <Input label="Add Group">
                        <TextInput
                            placeholder="Hack CWRU 6"
                            value={this.state.group}
                            onChangeText={this.changeFormState('description')} />
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
            </View>
        );
    }
}

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

class DropDownInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false }
        this.open = () => this.setState({ open: true })
        this.close = () => this.setState({ open: false })
    }

    render() {
        const { items, value, onChange } = this.props;
        return (
            <TouchableOpacity onPressIn={this.open}>
                <TextInput onFocus={this.open} value={value ? value : 'Enter Category'} />
                <Modal
                    visible={this.state.open}
                    onDismiss={this.close}
                >
                    <Picker
                        category={value}
                        onValueChange={onChange}
                        mode='dropdown'

                    >
                        {
                            items.map(
                                item =>
                                    <Picker.Item
                                        key={item}
                                        label={item}
                                        value={item}
                                    />
                            )
                        }
                    </Picker>
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

export default Map;