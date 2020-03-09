import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button
} from 'react-native';
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    Login = () => {
        console.log(this.state.id);
        return fetch("http://10.0.2.2:3333/api/v0.0.5/login",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                if (result.Status == 'Invalid')
                    alert('Invalid User');
                else
                   // (<Redirect to='./screens/AboutScreen'/>);
                 // this.props.router.push('./screens/AboutScreen');
                { () => this.props.navigation.navigate('./screens/AboutScreen') };
            });
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Login</Text>

                <TextInput name='email' onChangeText={(text) => this.setState({ email: text })} value={this.state.email.value} style={styles.textinput} placeholderTextColor="white" placeholder='EMail'
                    underlineColorAndroid={'transparent'} />
                <TextInput name='password' onChangeText={(text) => this.setState({ password: text })} value={this.state.password.value} style={styles.textinput} placeholderTextColor="white" placeholder='Password'
                    secureTextEntry={true} underlineColorAndroid={'transparent'} />

                <Button title="Login" onPress={this.Login.bind(this)} />
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
export default Login;