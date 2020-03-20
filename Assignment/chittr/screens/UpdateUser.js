import React, { Component } from 'react';
import { Alert } from 'react-native';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
class UpdateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            given_name: '',
            family_name: '',
            email: '',
            password: '',
            token:'',
            userId:''
        };
    }


    GetUserDetails = async () => {
        try {
            const userID = await AsyncStorage.getItem('id', (error, item) => console.log('profileid:' + item));
            const id = JSON.parse(userID);
            this.setState({
                userId: id
            })

            const usertoken = await AsyncStorage.getItem('userToken', (error, item) => console.log('profiletoken:' + item));
            const userToken = JSON.parse(usertoken);
            this.setState({
                token: userToken
            })
            const userGivenName = await AsyncStorage.getItem('userGivenName', (error, item) => console.log('profileGivenName:' + item));
            const GivenName = JSON.parse(userGivenName);
            this.setState({
                given_name: GivenName
            })

            const userFamilyName = await AsyncStorage.getItem('userFamilyName', (error, item) => console.log('profileFamilyName:' + item));
            const FamilyName = JSON.parse(userFamilyName);
            this.setState({
                family_name: FamilyName
            })
            const userEmail = await AsyncStorage.getItem('userEmail', (error, item) => console.log('profileEmail:' + item));
            const Email = JSON.parse(userEmail);
            this.setState({
                email: Email
            })
       
        } catch (error) {
            console.log(error);

        }
    }

    Update = () => {
        //console.log(this.state.id);
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+this.state.userId,
            {
                method: 'PATCH',
                headers: {                   
        'Accept': 'application/json',                  
        'Content-Type': 'application/json',
        'X-Authorization': this.state.token
                },
                body: JSON.stringify({
                    given_name: this.state.given_name,
                    family_name: this.state.family_name,
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then((response) => {
                Alert.alert("Item Added!" + this.state.given_name + this.state.family_name + this.state.email + this.state.password);
                console.log(response.status);
                if (response.status == 201) {
                    console.log("Updated Successfully" + "      "+ this.state.given_name + "      " + this.state.family_name + "      " + this.state.email + "      " + this.state.password);
                    this.props.navigation.navigate('ProfileScreen');
                }
              
               
            })
            .catch((error) => {
                console.error(error);
            });
    }

    
    componentDidMount() {
       this.GetUserDetails();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Update</Text>
               
                <TextInput  name='given_name' onChangeText={(text) => this.setState({ given_name: text })} value={this.state.given_name} style={styles.textinput} placeholderTextColor="white" placeholder='Your Name'
                    underlineColorAndroid={'transparent'} />
                <TextInput name='family_name' onChangeText={(text) => this.setState({ family_name: text })} value={this.state.family_name} style={styles.textinput} placeholderTextColor="white" placeholder='Surename'
                    underlineColorAndroid={'transparent'} />
                <TextInput name='email' onChangeText={(text) => this.setState({ email: text })} value={this.state.email} style={styles.textinput} placeholderTextColor="white" placeholder='EMail'
                    underlineColorAndroid={'transparent'} />
                <TextInput name='password' onChangeText={(text) => this.setState({ password: text })} value={this.state.password} style={styles.textinput} placeholderTextColor="white" placeholder='Password'
                    secureTextEntry={true} underlineColorAndroid={'transparent'} />
                <Button title="Update" onPress={this.Update} />
                <Button title="Cancel" onPress={() => this.props.navigation.navigate('ProfileScreen')} />
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
    },
    header: {
        fontSize: 28,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#55abca',
        marginTop: 30,

    },
    buttontext: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 19,
    }
});
export default UpdateUser;