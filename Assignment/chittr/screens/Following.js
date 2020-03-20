import React, { Component } from 'react';
import { FlatList, Text, View, Button, StyleSheet, TouchableOpacity , Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-community/async-storage';
class Following extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            AllTheFollowings: [],
            user_id: '',
            loggedin: 'false',
            token: '',
        }
        this.getAllFollowing = this.getAllFollowing.bind(this);
    }

    loadUserDetails = async() => {
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
            console.log('this is the id that we passed here in the Following screen:    ' + this.state.user_id);
            this.getAllFollowing();

        } catch (error) {
            console.log(error);

        }
    }


    getAllFollowing = () => {

        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.user_id + '/following')
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    console.log('response.statuse:' + response.status);
                }
            })
            .then((responsejson) => {

                this.setState({

                    AllTheFollowings: responsejson,
                });
            })
            .catch((error) => {
                console.log(error);
            });

    }

    componentDidMount() {
        this.loadUserDetails();
        this.getAllFollowing();
    }

    UnFollow = (FollowedUserID) =>{
return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+FollowedUserID+'/follow',

{
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
       'X-Authorization': this.state.token 
    }
})
.then((response) => {
  
    if (response.status == 200) {
        console.log("User has been Unfollowed" );
        Alert.alert("User has been Unfollowed" );

    }
    else {
        console.log("Something gone wrong.please try later!");
        Alert.alert("Something gone wrong.please try later!" );
    }
    
   
})
.catch((error) => {
    console.error(error);
});


    } 

    render() {

        return (

            <View style={styles.container}>
            <FlatList
            data={this.state.AllTheFollowings}
            extraData={this.state}
            renderItem={({ item }) => (
                <View style={styles.chitContainer}>
                    <Text style={styles.nameContainer}>{item.given_name}  @{item.user_id}:</Text>
                    <TouchableOpacity style={styles.UnFollowButon} onPress={()=>this.UnFollow(item.user_id)}>
                    <Text style={styles.addButonText}>UnFollow</Text>
                    </TouchableOpacity>
                   
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
        flexDirection:'column',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
        paddingTop: 20,
        
    },
    chittContainer: {
        justifyContent: 'space-between',
        top:12,
        paddingLeft: 3,
        paddingRight: 3,
        fontSize: 20,
        fontWeight: 'bold',
        flexDirection:'column',
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
        paddingBottom: 1,
       marginTop:20,
       marginBottom: 10,
    },
    UnFollowButon: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
       
        backgroundColor: '#3F65CD',
        width: 80,
        height: 30,
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
export default Following;