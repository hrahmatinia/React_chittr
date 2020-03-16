import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, AsyncStorage } from 'react-native';
class HomeScreen extends Component {
    constructor(props) {
        super(props);
     //   this.loadData();
        this.state = {
            isLoading: true,
            AllTheChitts: [],
            user_id: '',
            loggedIn: true
        }
    }
    getData() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    AllTheChitts: responseJson,
                });
            })
            .catch((error) => {
                this.setState({ error, isLoading: false });
                console.log(error);
            });
    }

    componentDidMount() {
        this.getData();
    }

    loadtoken = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
    }
    logOut = async () => {
       
        await AsyncStorage.clear();
        this.props.navigattion.navigate('Auth');
    }
   // loadData = async () => {
    //    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    //    this.props.navigation.navigate(isLoggedIn !== '1' ? 'Auth' : 'App');
   // }
    render() {
        return (

           <View>
                <FlatList
                    data={this.state.AllTheChitts}
                    renderItem={({ item }) => <Text>{item.user.given_name}{item.chit_content}</Text>}
                    keyExtractor={({ chit_id }, index) => chit_id}
                />

                <Button
                    title="token"
                    onPress={this.loadtoken}
                />
              

                <Button
                    title="Login"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
                <Button
                    title="Logout"
                    onPress={() => this.props.navigation.navigate('Logout')}
                />
            </View>
        );
    }


}
export default HomeScreen;