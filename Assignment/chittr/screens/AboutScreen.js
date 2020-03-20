
//this screen has only two buttons to navigate to followers and following pages
import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

import Followers from './Follower';
import Following from './Following';
class AboutScreen extends Component {
    render() {
        return (
            <View>
            <Text>Followrs Screen < /Text>

            < TouchableOpacity style = { styles.followersButon }  onPress = {() => this.props.navigation.navigate('Following')}>
            <Text style={ styles.addButonText }> Following < /Text>
            < /TouchableOpacity>

            < TouchableOpacity style = { styles.followingButon }  onPress = {() => this.props.navigation.navigate('Followers')}>
                <Text style={ styles.addButonText }> Followers < /Text>
                    < /TouchableOpacity>
                    < /View>
        );
    }

}
const AppContainer = createAppContainer(createStackNavigator({
    Followers: {
        screen: Followers,
        navigationOptions: {
            headerShown: false,
        }
    },
    Following: {
        screen: Following,
        navigationOptions: {
            headerShown: false,
        }
    },
    AboutScreen: AboutScreen,

}
    , {
        initialRouteName: 'AboutScreen',
    }
));


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
        paddingTop: 10,
    },
    chittContainer: {
        paddingLeft: 3,
        paddingRight: 3,
        fontSize: 20,
        fontWeight: 'bold',
    },
    nameContainer: {
        paddingLeft: 3,
        fontSize: 18,
        fontWeight: 'bold',
    },
    familyContainer: {
        paddingLeft: 3,
        fontSize: 18,
        fontWeight: 'bold',
    },
    emailContainer: {
        paddingLeft: 3,
        fontSize: 18,
        fontWeight: 'bold',
    },
    chitContainer: {
        paddingLeft: 13,
        paddingRight: 3,
        fontSize: 15,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#bdeded',
    },
    followersButon: {
        position: 'absolute',
        zIndex: 11,
        top: 20,
        right: 20,
        bottom: 50,
        backgroundColor: '#3F65CD',
        width: 60,
        height: 30,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    followingButon: {
        position: 'absolute',
        zIndex: 11,
        top: 20,
        left: 20,
        bottom: 50,
        backgroundColor: '#3F65CD',
        width: 60,
        height: 30,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButonText: {
        color: '#fff',
        fontSize: 12,
    }
});

export default AppContainer;
