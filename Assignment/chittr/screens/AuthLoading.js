import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class AuthLoadinScreen extends Component {

    constructor() {
        super();
        this.loadApp();
        this.state = {
            userId: '',
            token: ''
        }
        this.loadApp = this.loadApp.bind(this);
    }

//loading app .if the user is logged in then we go to the Homescreen.if not we go to the firstpage to login
    loadApp = async () => {
        try {
            const usertokenFromLogin = await AsyncStorage.getItem('userToken', (error, item) => console.log('profiletoken:' + item));
            const usertoken = JSON.parse(usertokenFromLogin);
            this.setState({
                token: usertoken
            })
            console.log('this is the token that we passed here in the Authloading screen(if it is null,then user is not logged in):    ' + this.state.token);

            this.props.navigation.navigate(this.state.token ? 'App' : 'Auth');
        } catch (error) {
            console.log(error);

        }
    }


    render() {
        return (
            <View style= { styles.container } >
            <ActivityIndicator />
            < StatusBar barStyle = "default" />
                </View>
        );
    }
}

//stylesheet
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#36485f',
        paddingLeft: 60,
        paddingRight: 60,
    }
});
export default AuthLoadinScreen;





