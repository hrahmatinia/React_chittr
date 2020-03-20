import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            token: '',
            email: '',
            password: ''
        }
        this.Login = this.Login.bind(this);
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
                   
                })

            })

            .then((response) => {

                console.log(response.status);
                if (response.status === 200) {
                   // this.setState({ token: response.status.toString() });
                   // console.log("successfull Login" +this.state.token );
                   
                }
                else {
                    console.log("Email or password is invalid");
                    Alert.alert('Unsuccessful Login', 'Email or Password Is Not Valid');
                    // this.props.navigation.navigate('Auth');
                }
                return response.json();
            })
            .then((result) => {
                console.log(result);
               // let t = result.token;
               // this.setState({ token: JSON.stringify(this.state.token), id: result.id } );
               
                this.setState({ token: result.token }, () => console.log(this.state.token));
                console.log('After set state in login:' + '    ' + this.state.token);
                this.setState({ id: result.id }, function () {
                    console.log(this.state.id);
                });
                //let i = result.id;
                console.log('After set state in login:' + '    ' + this.state.id);
                this.saveToken();
                this.props.navigation.navigate('App');
            }).catch((error) => {
                console.log('There has been a problem with your fetch operation: ' + error);
                throw error;
            });
       
    }

   
    saveToken = async () => {
        try {
            await AsyncStorage.setItem('userToken', JSON.stringify( this.state.token ));
            await AsyncStorage.setItem('id', JSON.stringify(this.state.id));
            console.log('this is the login id:' + this.state.token + this.state.id);
        } catch (error) {
            console.log(error);

        }
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