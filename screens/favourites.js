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

export default class FavouritesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featureDictionary: [],
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
        var testData = [
            { "id": 1, "title": "Cocktail 1", "thumbnail": "https://guardian.ng/wp-content/uploads/2018/06/Various-cocktails.-Photo-Getty-Images.jpg" },
            { "id": 2, "title": "Cocktail 2", "thumbnail": "https://www.standard.co.uk/s3fs-public/thumbnails/image/2016/09/30/10/cocktails.jpg" },
            { "id": 3, "title": "Cocktail 3", "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/9/94/Sidecar-cocktail.jpg" }
        ]

        this.setState({ featureDictionary: testData });
    }

    SearchFilterFunction(text) {
        const newData = this.arrayholder.filter(function (item) {
            const itemData = item.title ? item.title.toUpperCase() :
                ''.toUpperCase();
            const textData = text.toUpperCase(); return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource: newData, search: text,
        });
    }

    renderFeaturedCards = (data) => {
        return (
            <View style={{ width: Dimensions.get('window').width / 3, paddingHorizontal: 6, paddingBottom: 4 }} >
                <TouchableOpacity onPress={() => this.renderRecipeView(data.item.id)}>
                    <Card style={{ marginVertical: "3%", marginHorizontal: "2%", borderRadius: 25 }}>
                        <Image source={{ uri: data.item.thumbnail }}
                            style={{
                                resizeMode: "cover",
                                height: Dimensions.get('window').height * 0.17, width: Dimensions.get('window').width * 0.3, borderRadius: 25
                            }} />
                    </Card>
                    <Text style={styles.content}>
                        {data.item.title}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderRecipeView(data) {
        this.props.navigation.navigate('RecipeView', { RecipeData: data })
    }

    render() {
        return (
            <SafeAreaView>
                <Text>
                    Favourites page
                </Text>
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
        width: "90%",
        alignSelf: "center"
    }
});
