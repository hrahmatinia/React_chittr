import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';




class AuthLoadinScreen extends Component {

    constructor() {
        super()
        this.loadApp()
    }

    loadApp = async () => {
        const userToken = await AsyncStorage.getItem('userToken').then((userToken) => {
            console.log(userToken)
            this.props.navigation.navigate(userToken ? 'Auth' : 'App')
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
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
    }
});
export default AuthLoadinScreen;





