import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
class HomeScreen extends Component {
    render() {
        return (
            <View>
                <Text>Home Screen</Text>
                <Button
                    title="About Me"
                    onPress={() => this.props.navigation.navigate('About')}
                />
                <View>
                    <Text>Home Screen</Text>
                    <Button
                        title="Register"
                        onPress={() => this.props.navigation.navigate('SignUp')}
                    />
                    <Button
                        title="Login"
                        onPress={() => this.props.navigation.navigate('Login')}
                    />
                </View>
            </View>
          
        );
       
    }

}
export default HomeScreen;