import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview'; 

export default class MoreView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.arrayholder = [];
    }

    componentDidMount() {

    }

    render() {
        return (
            <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
                <WebView source={{ html : this.props.route.params.staticData }} scalesPageToFit={false}/>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        alignContent: "flex-start",
        fontWeight: "bold",
        fontSize: 24,
        paddingHorizontal: 4,
        paddingVertical: 7,
    },
    content: {
        width: "82%",
        alignSelf: "center",
        color: 'white',
        fontSize: 16,
        marginLeft: '4%',
        fontWeight: '100'
    }
});
