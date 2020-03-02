import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'


const styles = StyleSheet.create({
    helloText: {
        color: 'red',
        fontSize: 50
    }
});

class SayHello extends Component {
    render() {
        return (
            <View>
                <Text style={styles.helloText}>Hello {this.props.name}</Text>
            </View>
        )
    };
}

class HelloWorldApp extends Component {
    render() {
        
        return (
            <View>
                <SayHello name="Ted" />
                <SayHello name="Ted1" />
                <SayHello name="Ted2" />
                <SayHello name="Ted3" />
            </View>
        );

    }
}
export default HelloWorldApp