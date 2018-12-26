import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './Home';
import NewPost from './NewPost';

export default createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home',
        }
    },
    NewPost: {
        screen: NewPost,
        navigationOptions: {
            title: 'NewPost',
        }
    }
});