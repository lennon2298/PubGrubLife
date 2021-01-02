import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    View,
    Text,
    FlatList,
    Pressable
} from 'react-native';

import { Card, CardItem, Thumbnail } from 'native-base';
import { SearchBar } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class SubListingsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sublistingDictionary: [],
            listingsDictionary: [],
            reloadKey: 0,
            blogData: false,
            addsData: false,
            search: "",
            alcVisible: false,
            nalcVisible: false,
            fav: false,
            
        }
        this.favItems = [];
        this.arrayholder = [];
        this.device_id = -1;
    }

    async componentDidMount() {
        const device_id = await AsyncStorage.getItem('device_id');
        console.log(device_id);
        this.device_id = JSON.parse(device_id);
        this._bootstrapAsync();
        this.onLoad();
        this.handleRequest();
        this.willFocusSubscription = this.props.navigation.addListener(
            'focus',
            async () => {
                const device_id = await AsyncStorage.getItem('device_id');
                console.log(device_id);
                this.device_id = JSON.parse(device_id);
                this._bootstrapAsync();
                this.onLoad();
                this.handleRequest();
            }
          );
    }

    _bootstrapAsync = async () => {
        const favToken = await AsyncStorage.getItem('favourites');
        this.favItems = JSON.parse(favToken);
        var arr = this.favItems;
        this.setState({fav : true});
        this.setState({fav : true});
      };

    onLoad = () => {
        this.props.navigation.addListener('focus', () => this._bootstrapAsync())
    }

    async handleRequest() {
        const instance = axios.create({
          baseURL: 'https://jadookijhappi.com/pubgrub/apis/',
          timeout: 5000,
        });
        console.log("lolol");
        await instance
          .get('favorites/' + this.device_id + "/")
          .then(response => {
            this.setState({ favDictionary : response.data });
            
            //console.log(this.state.sublistingDictionary);
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

    async handleSearch() {
        const instance = axios.create({
          baseURL: 'https://jadookijhappi.com/pubgrub/apis/',
          timeout: 5000,
        });
        console.log("lolol");
        var keywords = "/search/keyword:" + this.state.search + "/" + this.device_id + "/"
        
        console.log(keywords);
            await instance
          .get(keywords)
          .then(response => {
            this.setState({ listingsDictionary : response.data });
            console.log(this.state.listingsDictionary);
            this.renderListingsView(this.state.listingsDictionary);
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

        renderListingsView(data) {
            this.setState({search: ""});
            if(this.state.listingsDictionary.length > 0) {
                this.props.navigation.navigate('NewListing', { NewListingData : data })
            }
            else {
                this.refs.toast.show("No Results Found.", 3000);
            }
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
    renderListingsCards = (data) => {
        data.item.fav = Boolean(Number(data.item.Cocktail.is_favorite))
        return (
            <Pressable android_ripple={{ color: 'grey', borderless: false }} onPress={() => { this.renderRecipeView(data.item.Cocktail.id) }}>
                <Card style={{ width: wp('95%'), alignSelf: "center", alignContent: "center" }}>
                    { console.log(data) }
                    <CardItem>
                        {/* <Thumbnail round large source={{ uri: data.item.image }} /> */}
                        <Image source={{ uri: data.item.Cocktail.image }} style={{borderRadius:20, width: wp('18%'), height: wp('23%')}} /> 
                        <View style={{ marginLeft: "5%", width: wp('57%') }}>
                            <Text style={{ fontWeight: "700", fontSize: 22, textTransform: "capitalize" }}>
                                
                                {data.item.Cocktail.name}
                            </Text>
                            <Text>
                            {data.item.Cocktail.subcategory}
                            </Text>
                            <Text style={{ marginTop: 15, color: '#e8b037' }}>
                                {data.item.Cocktail.strength}
              </Text>
                        </View>
                        <Pressable android_disableSound onPress={() => { data.item.fav = !data.item.fav; this.setState({ fav: !this.state.fav }); data.item.Cocktail.is_favorite = String(Number(data.item.fav)); this.handleFavs(data.item.Cocktail, data.item.fav); }}>
                            <View style={{ marginHorizontal: null, width: wp('7%') }}>
                                {
                                    data.item.fav ? <Icon name="heart" color="#F67F21" size={24}/> :
                                    <Icon name="heart-outline" color="#F67F21" size={24}/>
                                }
                            </View>
                        </Pressable>
                    </CardItem>
                </Card>
            </Pressable>
        )
    }

    async handleFavs(data, isFav) {
        //https://jadookijhappi.com/pubgrub/apis/markFavorite/{favorite}/{user_id}/{cocktail_id}
        const instance = axios.create({
            baseURL: 'https://jadookijhappi.com/pubgrub/apis/',
            timeout: 5000,
        });
        var newFav = 0;
        if(isFav){
            newFav = 1
        }
        var favPost = "markFavorite/" + newFav + "/" + this.device_id + "/" + data.id + "/"
        console.log(favPost);
        const payload = new FormData();
        payload.append(favPost)
        await instance
            .get(favPost)
            .then(response => {
                console.log(response);
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
        this.handleRequest();
    }

    renderRecipeView(data) {
        this.props.navigation.navigate('Recipe', { cocktail_id: data })
    }

    renderEmprty = () => {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex:1, flexGrow:1}}>
                <Text style={{color:"#b7afaf"}}>
                    Your Favorited Drinks Will Appear Here
                </Text>
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor:'white', flex: 1}}>
                <SearchBar round lightTheme
                    searchIcon style={{ width: 0.5 }} onSubmitEditing={() => this.handleSearch()}
                    onChangeText={text => this.SearchFilterFunction(text)} onClear={text => this.SearchFilterFunction('')} placeholder="Search..." value={this.state.search}
                />
                <View style={{flex:1, flexGrow:1}}>
                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={this.state.favDictionary}
                    extraData={this.state}
                    keyExtractor={(article, id) => id.toString()}
                    renderItem={data => this.renderListingsCards(data)}
                    ListEmptyComponent={() => this.renderEmprty()}
                    contentContainerStyle={{ flexGrow: 1 }} 
                />
                </View>
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
