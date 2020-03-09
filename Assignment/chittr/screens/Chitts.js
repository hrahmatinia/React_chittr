import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button } from 'react-native';
import { List, ListItem } from React-native-elements;
class Chitts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            AllTheChitts: [],
            user_id:''
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

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.AllTheChitts}
                    renderItem={({ item }) => <Text>{item.user.given_name}{item.chit_content}</Text>}
                    keyExtractor={({ chit_id }, index) => chit_id}
                />
            </View>
        );
    }

   
}
export default Chitts;