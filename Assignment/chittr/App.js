import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import React, { Component } from 'react';

import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Chitts from './screens/Chitts';
import AuthLoading from './screens/AuthLoading';
import GetAllChits from './screens/GetAllChits';
import ProfileScreen from './screens/ProfileScreen';


const AuthStackNavigator = createStackNavigator({
    
    Welcome: GetAllChits,
  
    SignUp: SignUp,
    
    Login:Login
 
})

const AppTabNavigator = createBottomTabNavigator({
    HomeScreen: {
        screen: HomeScreen,
    },
    Profile: {
        screen: ProfileScreen
    },
    AboutScreen: {
        screen: AboutScreen
    }

})
const AppStackNavigator = createStackNavigator({
    AppTabNavigator: {
        screen: AppTabNavigator
    }
}) 

const AppDrawerNavigator = createDrawerNavigator({
    Home:AppStackNavigator
})

const AppContainer = createAppContainer(createSwitchNavigator({
    AuthLoading: AuthLoading,
    Auth: AuthStackNavigator,
    App: AppDrawerNavigator,
     }
    ,{
        initialRouteName: 'AuthLoading',
    }
))


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#36485f',
        paddingLeft: 60,
        paddingRight: 60,
    }
})


export default AppContainer;
//const AppStackNav = createStackNavigator({
//     Home: {
//        screen: HomeScreen
//     },
//    About: {
//        screen: AboutScreen
//    },
//    SignUp: {
//        screen: SignUp
//    },
//    Login: {
//        screen: Login
//    },
//    Chitts: {
//        screen: Chitts
//    }

//});

//const AuthStack = createStackNavigator({
//    Home: {
//        screen: HomeScreen
//    } });

//class AuthLoadinScreen extends Component {
//    constructor(props) {
//        super(props);
//        this.loadData();
//    }
//    render() {
//        return (
//            <View Style={styles.container}>
//                <ActivityIndicator />
//                <StatusBar barStyle="default" />
//            </View>
//        );
//    }

//    loadData = async () => {
//        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
//        this.props.navigation.navigate(isLoggedIn !== '1' ? 'Auth' : 'App');
//    }

//}

//const AppContainer = createAppContainer(createSwitchNavigator(
//    {
//        AuthLoading: AuthLoadinScreen,
//        App: AppStackNav,
//        Auth: AuthStack,
//    },
//    {
//        initialRouteName: 'AuthLoading',
//    }
//));


//export default AppContainer;
