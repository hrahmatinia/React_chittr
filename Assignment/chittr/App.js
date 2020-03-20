import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, StatusBar, StyleSheet, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Chitts from './screens/Chitts';
import AuthLoading from './screens/AuthLoading';
import GetAllChits from './screens/GetAllChits';
import ProfileScreen from './screens/ProfileScreen';
import PostChit from './screens/PostChit';
import SearchUsers from './screens/Search';
import UpdateUser from './screens/UpdateUser';
import Following from './screens/Following';
import Follower from './screens/Follower';

const SignUpInTabNavigator = createBottomTabNavigator({
    SignUp: {
        screen: SignUp
      },
    Login: {
        screen: Login
      }
    

})
const AuthStackNavigator = createStackNavigator({

    Welcome: GetAllChits,
    SignUpInTabNavigator: SignUpInTabNavigator,
    Chitt: PostChit,
   UpdateUser: UpdateUser,
   Follower: Follower,
   Following: Following,

})

const AppTabNavigator = createBottomTabNavigator({
    HomeScreen: {
        screen: HomeScreen,

    },
    ProfileScreen: {
        screen: ProfileScreen,
    },
    Followering: {
        screen: AboutScreen,
    },
    Search: {
        screen: SearchUsers,
    }

})

const AppStackNavigator = createStackNavigator({

    AppTabNavigator: {
        screen: AppTabNavigator,
        navigationOptions: ({ navigation }) => ({
            title: 'Chittr',
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Icon name="md-menu" size={24} />
                    </View>

                </TouchableOpacity>
            )
        })
    }
})

const AppDrawerNavigator = createDrawerNavigator({
    Home: AppStackNavigator,
    

})

const AppContainer = createAppContainer(createSwitchNavigator({
    AuthLoading: AuthLoading,
    Auth: AuthStackNavigator,
    App: AppDrawerNavigator,
}
    , {
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
