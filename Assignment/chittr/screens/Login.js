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
import AsyncStorage from '@react-native-community/async-storage';
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            XAuthorization: '',
            loggedIn: 'false',
            id: '',
            token:''
           
        };
    }
    // i have to use Async
    Login = () => {
       
        console.log("Email:   " + this.state.email + "    and  pass:  " + this.state.password);
        return fetch("http://10.0.2.2:3333/api/v0.0.5/login",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                   // loggedIn: this.state.loggedIn,
                })
            })

            .then((Response) => {
               
                console.log(Response.status);
                if (Response.status == 200) {
                    this.setState({
                        loggedIn: 'true'
                    })
                    console.log("successfull Login");
                    this.props.navigation.navigate('App');
                }
                else {
                    this.setState({
                        loggedIn: 'false'
                    })
                    console.log("Email or password is invalid");
                    Alert.alert('Unsuccessful Login', 'Email or Password Is Not Valid');
                   // this.props.navigation.navigate('Auth');
                }
                return Response.json()
            }) 
            .then((result) => {
                console.log(result);
                if (result.token !== null) {
                    this.setState({ token: result.token });
                    this.setState({ id: result.id });
                    this.saveToken();
                }
                else {
                    Alert.alert('Unsuccessful Login', 'Email or Password Is Not Valid');
                }
            }).catch((error) => {
                console.log('There has been a problem with your fetch operation: ' +error);
                throw error;
            });
       
    }

    saveToken = async () => {
        await AsyncStorage.setItem('userToken', JSON.stringify(this.state.token));
        await AsyncStorage.setItem('id', JSON.stringify(this.state.id));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Login</Text>

                <TextInput name='email' onChangeText={(text) => this.setState({ email: text })} value={this.state.email.value} style={styles.textinput} placeholderTextColor="white" placeholder='EMail'
                    underlineColorAndroid={'transparent'} />
                <TextInput name='password' onChangeText={(text) => this.setState({ password: text })} value={this.state.password.value} style={styles.textinput} placeholderTextColor="white" placeholder='Password'
                    secureTextEntry={true} underlineColorAndroid={'transparent'} />

                <Button title="Login" onPress={this.Login} />
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