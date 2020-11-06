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
    Pressable,
    LogBox
} from 'react-native';

import { Card, CardItem } from 'native-base';

import { SearchBar } from 'react-native-elements'

import Modal, { BottomModal, ModalContent, SlideAnimation, ModalButton } from 'react-native-modals'

import Icon from 'react-native-vector-icons/FontAwesome';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import SplashScreen from 'react-native-splash-screen'

export default class Home extends Component {
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
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        LogBox.ignoreLogs(['Animated.event now requires a second argument for options'])
        setTimeout(() => SplashScreen.hide(), 1000);
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
            <View style={{ paddingHorizontal: 6, paddingBottom: 4 }} >
                <Pressable onPress={() => this.renderRecipeView(data.item.id)}>
                    <Card style={{ marginVertical: hp("3%"), marginHorizontal: wp("2%"), borderRadius: 25 }}>
                        <Image source={{ uri: data.item.thumbnail }}
                            style={{
                                resizeMode: "cover",
                                height: hp('20%'), width: wp('39%'), borderRadius: 25
                            }} />
                    </Card>
                    <Text style={styles.content}>
                        {data.item.title}
                    </Text>
                </Pressable>
            </View>
        )
    }

    renderRecipeView(data) {
        this.props.navigation.navigate('SubListing', { RecipeData: data })
    }

    render() {
        return (
            <SafeAreaView>
                <SearchBar round lightTheme
                    searchIcon style={{ width: 0.5 }}
                    onChangeText={text => this.SearchFilterFunction(text)} onClear={text => this.SearchFilterFunction('')} placeholder="Search..." value={this.state.search}
                />
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Featured Cocktails
                </Text>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0}
                        snapToAlignment={"center"}
                        data={this.state.featureDictionary}
                        extraData={this.state}
                        keyExtractor={(article, id) => id.toString()}
                        renderItem={data => this.renderFeaturedCards(data)}
                    />
                </View>
                <View style={{ width: "95%", alignSelf: "center" }}>
                    <Pressable onPress={() => { this.setState({ alcVisible: true }) }}>
                        <Card style={{ borderTopLeftRadius: 25, borderTopRightRadius: 25, marginTop: 16 }}>
                            <ImageBackground source={require('../res/wisky2_new.png')}
                                style={{
                                    height: hp('35%'), width: wp('95%'), borderTopLeftRadius: 25,
                                    borderTopRightRadius: 25, alignSelf: "center", overflow: "hidden", textAlignVertical: "center", justifyContent: "center"
                                }}>
                                <Text style={{ alignSelf: "center", fontSize: 24, fontWeight: "700", color: "white" }}>
                                    Alcoholic
                        </Text>
                        <Icon name="chevron-down" color="#ffffff" size={25} style={{alignSelf: "center"}}></Icon>
                            </ImageBackground>
                        </Card>
                    </Pressable>
                    <Pressable onPress={() => { this.setState({ nalcVisible: true }) }} style={{ position: "absolute", top: hp('24%'), alignSelf: "center" }}>
                        <Card style={{ borderTopLeftRadius: 25, borderTopRightRadius: 25, alignSelf: "center" }}>
                            <ImageBackground source={require('../res/wisky2_new.png')}
                                style={{
                                    height: hp('35%'), width: wp('95%'), borderTopLeftRadius: 25,
                                    borderTopRightRadius: 25, alignSelf: "center", overflow: "hidden", flex:1, justifyContent: "center"
                                }}>
                                <Text style={{ alignSelf: "center", fontSize: 24, fontWeight: "700", color: "white" }}>
                                    Non-Alcoholic
                        </Text>
                        <Icon name="chevron-down" color="#ffffff" size={25} style={{alignSelf: "center"}}></Icon>
                            </ImageBackground>
                        </Card>
                    </Pressable>
                </View>
                <BottomModal visible={this.state.alcVisible} onTouchOutside={() => { this.setState({ alcVisible: false }) }}
                    modalAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    swipeDirection={['up', 'down']} // can be string or an array
                    swipeThreshold={200} // default 100
                    onSwipeOut={(event) => {
                        this.setState({ alcVisible: false });
                    }}>
                    <ModalContent>
                        <Text>
                            lmao lmao Alcoholic Modal
                        </Text>
                    </ModalContent>
                </BottomModal>
                <BottomModal visible={this.state.nalcVisible} onTouchOutside={() => { this.setState({ nalcVisible: false }) }}
                    modalAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    swipeDirection={['up', 'down']} // can be string or an array
                    swipeThreshold={200} // default 100
                    onSwipeOut={(event) => {
                        this.setState({ nalcVisible: false });
                    }}>
                    <ModalContent>
                        <Text>
                            lmao lmao Non-Alcoholic Modal
                        </Text>
                    </ModalContent>
                </BottomModal>
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
