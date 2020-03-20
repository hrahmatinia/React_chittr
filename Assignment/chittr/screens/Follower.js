import React, { Component } from 'react';
import { FlatList, Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-community/async-storage';
class Follower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            AllTheFollowers: [],
            user_id: '',
            loggedin:'false',
            token:'',
        }
        this.getAllFollowers = this.getAllFollowers.bind(this);
    }

    loadUserDetails = async () => {
        try {
           
            const userIDFromLogin = await AsyncStorage.getItem('id', (error, item) => console.log('profileid:' + item));
            const id = JSON.parse(userIDFromLogin);
            this.setState({
                user_id: id
            })
        
            const usertokenFromLogin = await AsyncStorage.getItem('userToken', (error, item) => console.log('profiletoken:' + item));
            const usertoken = JSON.parse(usertokenFromLogin);
            this.setState({
                token: usertoken
            })
            console.log('this is the id that we passed here in the Follower screen:    ' + this.state.user_id);
            this.getAllFollowers();
            
        } catch (error) {
            console.log(error);

        }
    }
   

    getAllFollowers = () => {

        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+this.state.user_id+'/followers')
            .then((response) => {
                if(response.status === 200){
                    return response.json()
                }else{
                    console.log('response.statuse:'+response.status);
                }
            })
            .then((responsejson) => {
               
                this.setState({
                    
                    AllTheFollowers: responsejson, 
                });
            })
            .catch((error) => {
                console.log(error);
            });
        
    }

    componentDidMount() {
        this.loadUserDetails();
        this.getAllFollowers();
    }

    
   
    render() {

        return (

            <View style={styles.container}>
            <FlatList
            data={this.state.AllTheFollowers}
            extraData={this.state}
            renderItem={({ item }) => (
                <View style={styles.chittContainer}>
                    <Text style={styles.nameContainer}>{item.given_name}  @{item.user_id}:</Text>
                    
                </View >
                )}
           
            keyExtractor={(item, chit_user_id) => item.user_id.toString()}
            
        />
               
                <Button
                    title="BACK"
                    onPress={() => this.props.navigation.navigate('AboutScreen')}
                />                   

            </View>
        );
    }


}

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
        backgroundColor:'#3F65CD',
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButonText: {
        color: '#fff',
        fontSize: 15,
    }
});
export default Follower;