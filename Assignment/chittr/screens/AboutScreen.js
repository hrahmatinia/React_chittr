import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
class AboutScreen extends Component {
    render() {
        return (
            <View>
                <Text>About Screen</Text>
            </View>,
            <View>
               
                    <Button
                        title="Chitts"
                        onPress={() => this.props.navigation.navigate('Login')}
                    />
            </View>
        );
    }
}
export default AboutScreen;