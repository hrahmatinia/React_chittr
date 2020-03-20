import React, { Component } from 'react';
import { FlatList, Text, View, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            AllTheChitts: [],
            user_id: '',
            loggedin: 'false',
            UserId: '',
            token: ''
        }
        this.getData = this.getData.bind(this);

    }

    GetUserDetails = async () => {
        try {
            const userID = await AsyncStorage.getItem('id', (error, item) => console.log('profileid:' + item));
            const id = JSON.parse(userID);
            this.setState({
                userId: id
            })

            const usertoken = await AsyncStorage.getItem('userToken', (error, item) => console.log('profiletoken in  home:' + item));
            const userToken = JSON.parse(usertoken);
            this.setState({
                token: userToken
            })
            this.getData();

        } catch (error) {
            console.log(error);

        }
    }

    getData() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits?start=0&count=100',
            {

                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token
                }
            })
            .then((response) => response.json())
            .then((responsejson) => {
                this.setState({
                    isLoading: false,
                    AllTheChitts: responsejson,
                });
            })
            .catch((error) => {
                console.log(error);
            });

    }

    getChitImage(chitID){
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits/'+chitID +'photo',
            {
                method:'GET',
                // headers: {
                //     'Content-Type': 'application/json',
                //     'X-Authorization': this.state.token
                // }
            })
            .then((response) => {
                if(response.status === 200){
                    console.log(response)
                    return true;
                }else if(response.status === 404){
                    console.log("image not found")
                  return false;
                }
              
            })
            .catch((error) => {
                console.log(error);
            });

    }
    componentDidMount() {
        this.GetUserDetails();
        this.getData();
    }




    render() {

        return (

            <View style= { styles.container } >

            <FlatList
                    data={ this.state.AllTheChitts }
        extraData = { this.state }
        renderItem = {({ item }) => (
            <View style= { styles.chittContainer } >
            <Text style={ styles.nameContainer }> { item.user.given_name }  @{ item.user.user_id }: </Text>
                < Text style = { styles.chitContainer } > { item.chit_content } < /Text>
                    < /View >
                        )
    }

    keyExtractor = {(item, chit_id) => item.chit_id.toString()
}

/>

    < TouchableOpacity style = { styles.addButon } onPress = {() => this.props.navigation.navigate('Chitt')}>
        <Text style={ styles.addButonText }> +</Text>
            < /TouchableOpacity>




            < /View>
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
        fontSize: 15,
    }
});
export default HomeScreen;