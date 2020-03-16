import React, { Component } from 'react';
import { FlatList, Text, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            AllTheChitts: [],
            user_id: '',
            loggedin:'false'
        }
    }
    getData() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
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
        cleanup();
    }

    componentDidMount() {
        this.getData();
    }

    //loadtoken = async () => {
    //    let token = await asyncstorage.getitem('token');
    //    let loggedin = await asyncstorage.getitem('loggedin');
    //    console.log('this is the token that we passed here:    ' + token + loggedin);
    //    if (token != null) {
    //        this.setstate({
    //            loggedin: 'true'
    //        })
    //    }
    //    else {
    //        this.setstate({
    //            loggedin: 'false'
    //        })
    //    }
    //}

    logOut = async () => {
        AsyncStorage.clear();
        this.props.navigation.navigate("Auth");
       
    }
   
    render() {

        return (

            <View style={styles.container}>
                
                <FlatList
                    data={this.state.AllTheChitts}
                    renderItem={({ item }) => (
                        <View>
                        <Text>{item.user.given_name}</Text>
                            <Text>{item.chit_content}</Text>
                        </View>
                        )}
                    keyExtractor={(item, index) => item.chit_id.toString()}
                />
                    
            
                <Button
                    title="Logout"
                    onPress={this.logOut}
                />

              
              
             
            </View>
        );
    }


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#36485f',
        paddingLeft: 60,
        paddingRight: 60,
    }
});
export default HomeScreen;