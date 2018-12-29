import React, {Component} from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import Firebase from "react-native-firebase";

export default class Home extends Component<{}> {
    state = {
        imageList:[[]]
    };

    componentDidMount() {
        Firebase.database()
            .ref("images")
            .on("value", d => {
                this.setState({
                    imageList: d.val()
                });
            });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    renderItem={({ item }) => (
                        <View>
                            <Image
                                source={{ uri: item.downloadURL }}
                                style={{ width: '100%', height: 200 }}
                            />
                            <Text>
                                { item.title }
                            </Text>
                        </View>
                    )}
                    data={ Object.values(this.state.imageList) }
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