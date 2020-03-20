import 'react-native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import renderer from 'react-test-renderer';

test("Snapshot Test(HomeScreen)", ()=>{
    const tree=renderer.create(
        <HomeScreen/>

    ).toJSON();
    
    expect(tree).toMatchSnapshot();
});