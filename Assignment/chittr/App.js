import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React, { Component } from 'react';

import { ActivityIndicator, StatusBar, AsyncStorage, StyleSheet, View} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Chitts from './screens/Chitts';

const AppStackNav = createStackNavigator({
  //  Home: {
   //     screen: HomeScreen
   // },
    About: {
        screen: AboutScreen
    },
    SignUp: {
        screen: SignUp
    },
    Login: {
        screen: Login
    },
    Chitts: {
        screen: Chitts
    }


});

const AuthStack = createStackNavigator({ Home: { screen: HomeScreen } });

class AuthLoadinScreen extends Component {
    constructor(props) {
        super(props);
        this.loadData();
    }
    render() {
        return (
            <View Style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }

    loadData = async () => {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        this.props.navigation.navigate(isLoggedIn !== '1' ? 'Auth' : 'App');
    }

}

const AppContainer = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadinScreen,
        App: AppStackNav,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#36485f',
        paddingLeft: 60,
        paddingRight: 60,
    }
});
export default AppContainer;
