import React, { Component } from 'react';
import { Alert } from 'react-native';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button
} from 'react-native';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            given_name: '',
            family_name: '',
            email: '',
            password: ''
        };
    }

    signUP = () => {
        console.log(this.state.id);
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user",
            {
                method: 'POST',
                headers: {                   
        'Accept': 'application/json',                  
        'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    given_name: this.state.given_name,
                    family_name: this.state.family_name,
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then((response) => {
                Alert.alert("Item Added!" + this.state.given_name + this.state.family_name + this.state.email + this.state.password);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Register</Text>
               
                <TextInput name='given_name' onChangeText={(text) => this.setState({ given_name: text })} value={this.state.given_name.value} style={styles.textinput} placeholderTextColor="white" placeholder='Yourname'
                    underlineColorAndroid={'transparent'} />
                <TextInput name='family_name' onChangeText={(text) => this.setState({ family_name: text })} value={this.state.family_name.value} style={styles.textinput} placeholderTextColor="white" placeholder='Surename'
                    underlineColorAndroid={'transparent'} />
                <TextInput name='email' onChangeText={(text) => this.setState({ email: text })} value={this.state.email.value} style={styles.textinput} placeholderTextColor="white" placeholder='EMail'
                    underlineColorAndroid={'transparent'} />
                <TextInput name='password' onChangeText={(text) => this.setState({ password: text })} value={this.state.password.value} style={styles.textinput} placeholderTextColor="white" placeholder='Password'
                    secureTextEntry={true} underlineColorAndroid={'transparent'} />
                <Button title="SignUp" onPress={this.signUP.bind(this)} />
            </View>
        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#36485f',
        paddingLeft: 60,
        paddingRight: 60,
    },
    header: {
        fontSize: 28,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#55abca',
        marginTop: 30,

    },
    buttontext: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 19,
    }
});
export default SignUp;