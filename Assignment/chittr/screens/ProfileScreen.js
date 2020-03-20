import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

import UpdateUser from './UpdateUser';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            AllTheChitts: [],
            given_name: '',
            family_name: '',
            email: '',
            recent_chits: [],
            loggedin: 'false',
            userId: '',
            chit_id: '',
            token: '',
            timestamp: ''
        }
        this.getUserData = this.getUserData.bind(this);
    }

    //retrive user data with async storage
    loadUserDetails = async () => {
        try {
            const Time = await AsyncStorage.getItem('timeStamp', (error, item) => console.log('timestamp:' + item));
            const timestampp = JSON.parse(Time);
            this.setState({
                timestamp: timestampp
            })
            const userIDFromLogin = await AsyncStorage.getItem('id', (error, item) => console.log('profileid:' + item));
            const id = JSON.parse(userIDFromLogin);
            this.setState({
                userId: id
            })

            const usertokenFromLogin = await AsyncStorage.getItem('userToken', (error, item) => console.log('profiletoken:' + item));
            const usertoken = JSON.parse(usertokenFromLogin);
            this.setState({
                token: usertoken
            })
            console.log('this is the id that we passed here in the profile screen:    ' + this.state.token);
            this.getUserData();

        } catch (error) {
            console.log(error);

        }
    }

//get user data(profile material)
    getUserData() {
        console.log('userid:    ' + this.state.userId);
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.userId,
            {
                method: 'GET',

            })
            .then((response) => response.json())
            .then((responsejson) => {
                this.setState({
                    isLoading: false,
                    recent_chits: responsejson.recent_chits,
                    given_name: responsejson.given_name,
                    family_name: responsejson.family_name,
                    email: responsejson.email,
                    // timestamp:responsejson.timestamp,
                });
                this.saveUserData();
            })
            .catch((error) => {
                console.log(error);
            });

    }
//saving user details in async storage
    saveUserData = async () => {
        try {
            await AsyncStorage.setItem('userGivenName', JSON.stringify(this.state.given_name));
            await AsyncStorage.setItem('userFamilyName', JSON.stringify(this.state.family_name));
            await AsyncStorage.setItem('userEmail', JSON.stringify(this.state.email));
            console.log('this is the given name( ProfileSCreen):' + this.state.given_name + 'this is the family name:' + this.state.family_name + 'this is the email:' + this.state.email);
        } catch (error) {
            console.log(error);

        }
    }

    componentDidMount() {
        this.loadUserDetails();
        this.saveUserData();
    }


    logOut = async () => {
        AsyncStorage.clear();
        this.props.navigation.navigate("Auth");

    }

    render() {

        return (

            <View style= { styles.container } >
            <View style={ styles.profileContainer }>
                <Text style={ styles.idContainer }> USer ID: { this.state.userId } </Text>
                    < Text style = { styles.nameContainer } > Given Name: { this.state.given_name } </Text>
                        < Text style = { styles.familyContainer } > Family Name: { this.state.family_name } </Text>
                            < Text style = { styles.emailContainer } > EMail: { this.state.email } </Text>
                                < /View>
                                < FlatList
                                 data = { this.state.recent_chits }
                                  renderItem = {({ item }) => (
                               <View style= { styles.chittContainer } >
                               <Text style={ styles.chitContainer }> { item.chit_content } < /Text>
                               < Text style = { styles.idContainer } > Chit_ID: { item.chit_id } </Text>
                              < Text style = { styles.timeContainer } > Time: { this.state.timestamp } </Text>

                        < /View>
                    )
    }
                      keyExtractor = {(item, index) => item.chit_id.toString()}/>

    < TouchableOpacity style = { styles.addButon }  onPress = {() => this.props.navigation.navigate('UpdateUser')}>
        <Text style={ styles.addButonText }> Update < /Text>
            < /TouchableOpacity>
            < Button title = "Logout" onPress = { this.logOut } />

                </View>
        );
    }


}


//stylesheet
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
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
    profileContainer: {
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#bdeded',
        marginBottom: 20,
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
    addButon: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 50,
        backgroundColor: '#3F65CD',
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButonText: {
        color: '#fff',
        fontSize: 12,
    }
});

const AppContainer = createAppContainer(createStackNavigator({
    UpdateUser: {
        screen: UpdateUser,
        navigationOptions: {
            headerShown: false,
        }
    },
    ProfileScreen: ProfileScreen,

}
    , {
        initialRouteName: 'ProfileScreen',
    }
));

export default AppContainer;
