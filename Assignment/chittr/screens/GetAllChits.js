import React, { Component } from 'react';
import { FlatList, Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-community/async-storage';
class GetAllChits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            AllTheChitts: [],
            user_id: '',
            loggedin: 'false',
            refreshing: false,
        }
    }

    handleRefresh = () => {
        this.setState({
            refreshing: true,
        })
        this.getData();
    }
    getData() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits?start=0&count=100')
            .then((response) => response.json())
            .then((responsejson) => {
                this.setState({
                    isLoading: false,
                    AllTheChitts: responsejson,
                });
                this.setState({
                    refresh: false,
                })
            })
            .catch((error) => {
                console.log(error);
            });
        this.getData();
    }

    componentDidMount() {
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
refreshing = { this.state.refreshing }
onRefresh = { this.handleRefresh }
    />

    <Button
                    title="Login"
onPress = {() => this.props.navigation.navigate('Login')}
/>                   

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
export default GetAllChits;