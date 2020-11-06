import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    ImageBackground,
    FlatList,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    Pressable
} from 'react-native';

import { Card, CardItem } from 'native-base';

import { SearchBar } from 'react-native-elements'

import Modal, { BottomModal, ModalContent, SlideAnimation, ModalButton } from 'react-native-modals'

var testData = [
    {
        "id": 1, "title": "Cocktail 1", "thumbnail": "https://guardian.ng/wp-content/uploads/2018/06/Various-cocktails.-Photo-Getty-Images.jpg",
        "share_id": "https://guardian.ng/wp-content/uploads/2018/06/Various-cocktails.-Photo-Getty-Images.jpg", "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    }
]

export default class RecipeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RecipeData: [],
            reloadKey: 0,
            blogData: false,
            addsData: false,
            search: "",
            alcVisible: false,
            nalcVisible: false,
        }
        this.arrayholder = [];
    }

    componentDidMount() {

        this.setState({ RecipeData: this.props.route.params.RecipeData });
    }

    renderPage = (data, newData) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.body}>
                    <View style={styles.content}>
                        <Image source={{ uri: data[0].thumbnail }} style={styles.mainImage} />
                        <Text style={styles.title}>
                            {newData.name}
                            {console.log(newData)}
                        </Text>
                        <Text style={styles.info}>
                            {newData.short_description}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: '4%' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'grey' }} />
                        </View>
                        <Text style={{ fontWeight: '400', fontSize: 19 }}>
                            Information
                    </Text>
                        <View style={{ marginVertical: '3%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '55%' }}>
                                    <Text style={styles.info}>
                                        Taste Profile
                        </Text>
                                </View>
                                <Text style={styles.info}>
                                    {newData.taste_profile}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '55%' }}>
                                    <Text style={styles.info}>
                                        Strength
                        </Text>
                                </View>
                                <Text style={styles.info}>
                                    {newData.strength}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '55%' }}>
                                    <Text style={styles.info}>
                                        Preparation Method
                        </Text>
                                </View>
                                <Text style={styles.info}>
                                    {newData.preparation_methods}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '55%' }}>
                                    <Text style={styles.info}>
                                        Glass Type
                        </Text>
                                </View>
                                <Text style={styles.info}>
                                    {newData.glass_type}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: '4%' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'grey' }} />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    render() {
        return (
            this.renderPage(testData, this.state.RecipeData)
        )
    }
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        width: '95%',
        alignSelf: "center"
    },
    title: {
        alignContent: "flex-start",
        fontWeight: "bold",
        fontSize: 24,
        paddingHorizontal: 4,
        paddingVertical: 7,
        marginTop: "6%"
    },
    content: {
        width: "90%",
        alignSelf: "center"
    },
    info: {
        color: "grey",
        alignSelf: "flex-start"
    },
    mainImage: {
        marginTop: "5%",
        height: "40%",
        width: "100%",
        resizeMode: "cover"
    }
});
