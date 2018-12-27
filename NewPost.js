/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import RNImagePicker from 'react-native-image-picker';
import Firebase from 'react-native-firebase';

export default class NewPost extends Component<{}> {
    state = {
        uri: "",
        title:"",
    };
    openPicker = () => {
        RNImagePicker.showImagePicker({}, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = {uri: response.uri};
                this.setState(source);
                console.log(source);
            }
        });
    };
    upload = () => {
        Firebase.storage()
            .ref('images/' + new Date().getTime())
            .putFile(this.state.uri, {contentType: 'image/jpeg'})
            .then(( {downloadURL, title} ) =>
                Firebase.database()
                    .ref( 'images/'+ new Date().getTime() )
                    .set({ downloadURL, title })
            )
            .then(() => alert('up'))
            .catch(e =>{
                console.log(e);
                alert('Error');
            });

    };
    render() {
        return (
            <View style={styles.container}>
                <Image source={ {uri: this.state.uri} } style={ styles.image }/>
                <TextInput
                    style={{flex:1, height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title}
                />
                <TouchableOpacity style={ styles.button } onPress={ this.openPicker }>
                    <Text>Open</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.button } onPress={ this.upload }>
                    <Text>Send</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    image: {
        width: '100%',
        height: 200,
        backgroundColor: '#EEE'
    },
    button: {
        width: 150,
        padding: 20,
        marginTop:10,
        alignItems: 'center',
        backgroundColor: '#ccc',
    },
});
