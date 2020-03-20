import React, { Component } from 'react';
import { FlatList, Text, View, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Value } from 'react-native-reanimated';
import { TextInput } from 'react-native-gesture-handler';


class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            AllTheUsers: [],
            inputString: '',
            isVisible: false,
            given_name: '',
            family_name: '',
            email: '',
            recent_chits: [],
            loggedin: 'false',
            userId: '',
            chit_id: '',
            token: '',
            timestamp: '',
            user_id: '',
            SerachedUser_givenname: '',
        }
        this.SearchUser = this.SearchUser.bind(this);
    }

    componentDidMount() {
        this.loadUserDetails();
    }

//retrive user datail(async storage)
    loadUserDetails = async () => {
        try {

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
            console.log('this is the token that we passed here in the Search screen:    ' + this.state.token);



        } catch (error) {
            console.log(error);

        }
    }
    emptyList() {
        return <Text>Fetching</Text>
    }

    //search user is happening here
    SearchUser() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q=' + this.state.inputString)
            .then((response) => response.json())
            .then((responsejson) => {
                this.setState({
                    isLoading: false,
                    AllTheUsers: responsejson,

                });
            })
            .catch((error) => {
                console.log(error);
            });

    }

//this method is responsible for follow button
    Follow = (followingID) => {
        console.log('UP Top followwwwwww print:' + this.state.SerachedUser_givenname);
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + followingID + "/follow",
            {
                method: 'POST',
                headers: {

                    'X-Authorization': this.state.token
                },

            })
            .then((response) => {

                console.log('Response:   ' + this.state.SerachedUser_givenname);
                if (response.status === 200) {
                    console.log("followed: " + response.status);
                    Alert.alert("You Are Now Following  " + this.state.SerachedUser_givenname);
                }
                else {
                    console.log("perhaps you are already follow this user");
                    Alert.alert("something went wrong! please try later");
                }


            })
            .catch((error) => {
                console.error(error);
            });

    }





    render() {

        return (

            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.searchText} placeholder={'type here...'} onChangeText={(text) => this.setState({ inputString: text })} value={this.state.inputString} placeholderTextColor="gray"
                        underlineColorAndroid={'transparent'} />
                    <TouchableOpacity style={styles.searchButon} onPress={this.SearchUser}>
                        <Text style={styles.addButonText}>Search</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.inputContainer}>
                    <FlatList
                        data={this.state.AllTheUsers}

                        renderItem={({ item }) => (
                            <View style={styles.chittContainer}>
                                <Text style={styles.nameContainer}>{item.given_name}  @{item.user_id}:</Text>
                                <Text style={styles.chitContainer}>{item.chit_content}</Text>
                                <TouchableOpacity style={styles.addButon} onPress={() => this.Follow(item.user_id)}>
                                    <Text style={styles.addButonText}>Follow</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.UnFollowButon} onPress={() => this.Follow(item.user_id)}>
                                    <Text style={styles.addButonText}>UnFollow</Text>
                                </TouchableOpacity>
                                <Text style={styles.addButonText}>Follow</Text>
                            </View >
                        )}

                        keyExtractor={(item, user_id) => item.user_id}
                        ListEmptyComponent={this.emptyList}

                    />





                </View>
            </View>
        );
    }


}

const styles = StyleSheet.create({

    container: {
        flex: 1,

        backgroundColor: 'white',
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
        paddingTop: 10,
    },
    inputContainer: {
        top: 30,
        paddingLeft: 3,
        paddingRight: 3,
        fontSize: 20,
        fontWeight: 'bold',
    },
    chittContainer: {
        justifyContent: 'center',
        top: 50,
        paddingLeft: 3,
        paddingRight: 3,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    nameContainer: {
        position: 'absolute',
        zIndex: 11,
        left: 20,
        bottom: 50,


        justifyContent: 'center',
        elevation: 8,

    },
    chitContainer: {
        top: 3,
        paddingLeft: 13,
        paddingRight: 3,
        fontSize: 15,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#bdeded',
    },
    searchButon: {
        position: 'absolute',
        zIndex: 11,
        right: 20,

        backgroundColor: '#3F65CD',
        width: 70,
        height: 30,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButon: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 50,
        backgroundColor: '#3F65CD',
        width: 70,
        height: 30,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButonText: {
        color: '#fff',
        fontSize: 15,
    },
    searchText: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#111',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },
    FlatList: {
        top: 20,
        alignItems: 'center',
    }
});
export default Search;