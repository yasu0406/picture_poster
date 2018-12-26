import React, {Component} from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import Firebase from "react-native-firebase";

export default class Home extends Component<{}> {
    state = {
        data:[],
    };

    componentDidMount() {
        Firebase.database()
            .ref("images")
            .on("value", d => {
                this.setState({
                    data: Object.values(d.toJSON()).map(( {downloadURL} ) => downloadURL)
                });
            });
    }

    render() {
        console.log(this.state);
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item }}
                            style={{ width: '100%', height: 200 }}
                        />
                    )}
                    data={this.state.data}
                    keyExtractor={key => key}
                />
                <TouchableOpacity
                    onPress= {() => this.props.navigation.navigate("NewPost")}
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        position: 'absolute',
                        right: 20,
                        bottom: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: "#333"
                    }}
                >
                    <Text style={{ color: '#FFF' }}>New</Text>
                </TouchableOpacity>
            </View>
        )
    }
}