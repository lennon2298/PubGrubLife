import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    FlatList,
    Image,
    ActivityIndicator,
    Pressable
} from 'react-native';
import { UnorderedList, ListItem } from 'react-native-lists-library';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage'

export default class RecipeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RecipeData: [],
            recipeId: 0,
            reloadKey: 0,
            recipeRecieved: false,
            search: '',
            fav: false
        }
        this.arrayholder = [];
        this.favItems = [];
    }

    componentDidMount() {

        this.setState({ recipeId: this.props.route.params.cocktail_id });
        this.handleRequest();
    }

    async handleRequest() {
        const favToken = await AsyncStorage.getItem('favourites');
        console.log(JSON.parse(favToken));
        if(favToken != null)
            this.favItems = JSON.parse(favToken);
        const instance = axios.create({
            baseURL: 'https://jadookijhappi.com/pubgrub/apis/',
            timeout: 5000,
        });
        console.log("lolol");
        const payload = new FormData();
        payload.append("cocktail_id", this.props.route.params.cocktail_id)
        await instance
            .post('details/', payload)
            .then(response => {
                this.setState({ RecipeData: response.data });
                // console.log(response.data);
                this.setState({ recipeRecieved: true })
            })
            .catch(error => {
                console.log(error);
                if (error.response) {
                    console.log("error data" + error.response.data);
                    console.log("error status" + error.response.status);
                    console.log("error header" + error.response.headers);
                } else if (error.request) {
                    console.log("error request" + error.request);
                    this.refs.toast.show('Network Error');
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    renderLists = (data) => {
        return (
            <View flexDirection='row'>
                <Text style={{marginRight:wp('2%')}}>{'\u2022'}</Text>
                <Text style={styles.info}>
                    {data.item}
                </Text>
            </View>
        )
    }

    handleFavs(data) {
        this.favItems.push(data);
        console.log(this.favItems);
        AsyncStorage.setItem('favourites', JSON.stringify(this.favItems));
    }

    renderPage = (newData) => {
        if (this.state.recipeRecieved) {
            return (
                <SafeAreaView style={{flex:1, backgroundColor: '#FFFFFF'}} >
                    {/* {console.log(newData)} */}
                    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
                    <Image source={{ uri: newData.Cocktail.image }} style={styles.mainImage} />
                    <View style={styles.body}>
                        <View style={styles.content}>
                            <Text style={styles.title}>
                                {newData.Cocktail.name}

                            </Text>
                            <View style={{flexDirection: 'row', marginBottom: hp('1%')}}>
                            <Pressable onPress={() => {  }} style={{marginRight: 5}}>
                                <Icon name="share-social-sharp" color="#F67F21" size={28}/>
                            </Pressable>
                            <Pressable onPress={() => { this.setState({fav : true}); this.handleFavs(newData.Cocktail); }}>
                                {
                                    this.state.fav ? <Icon name="heart" color="#F67F21" size={28}/> :
                                    <Icon name="heart-outline" color="#F67F21" size={28}/>
                                }
                            </Pressable>
                            </View>
                            <Text style={styles.info}>
                                {newData.Cocktail.short_description}
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
                                        {newData.Cocktail.taste_profile}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '55%' }}>
                                        <Text style={styles.info}>
                                            Strength
                                        </Text>
                                    </View>
                                    <Text style={styles.info}>
                                        {newData.Cocktail.strength}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '55%' }}>
                                        <Text style={styles.info}>
                                            Preparation Method
                                        </Text>
                                    </View>
                                    <Text style={styles.info}>
                                        {newData.Cocktail.preperation_methods}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '55%' }}>
                                        <Text style={styles.info}>
                                            Glass Type
                                        </Text>
                                    </View>
                                    <Text style={styles.info}>
                                        {newData.Cocktail.glass_type}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: '4%' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'grey' }} />
                            </View>
                            <Text style={{ fontWeight: '400', fontSize: 19 }}>
                                Ingredients
                            </Text>
                            <View style={{ marginVertical: '3%' }}>
                            <FlatList
                                nestedScrollEnabled={true}
                                snapToAlignment={"center"}
                                data={newData.Cocktail.ingredients}
                                extraData={this.state}
                                keyExtractor={(article, id) => id.toString()}
                                renderItem={data => this.renderLists(data)}
                            />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: '4%' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'grey' }} />
                            </View>
                            <Text style={{ fontWeight: '400', fontSize: 19 }}>
                                Steps for Preparation
                            </Text>
                            <View style={{ marginVertical: '3%' }}>
                            <FlatList
                                nestedScrollEnabled={true}
                                snapToAlignment={"center"}
                                data={newData.Cocktail.steps_for_preperartion}
                                extraData={this.state}
                                keyExtractor={(article, id) => id.toString()}
                                renderItem={data => this.renderLists(data)}
                            />
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                </SafeAreaView>
            );
        }
        else {
            return (
                <SafeAreaView>
                    <ActivityIndicator></ActivityIndicator>
                </SafeAreaView>
            );
        }
    }

    render() {
        return (
            this.renderPage(this.state.RecipeData)
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
        paddingVertical: 7,
        marginTop: "6%"
    },
    content: {
        width: "95%",
        alignSelf: "center"
    },
    info: {
        color: "grey",
        flexWrap: 'wrap',
        flexShrink: 1,
    },
    mainImage: {
        height: hp("33%"),
        width: "100%",
        resizeMode: "cover"
    }
});
