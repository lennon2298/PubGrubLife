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

export default class NewListingsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sublistingDictionary: [],
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

        const heart = "../res/doFav.png"
    }

    componentDidMount() {
        this.setState({sublistingDictionary : this.props.route.params.NewListingData});
        //this.handleRequest();
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const favToken = await AsyncStorage.getItem('favourites');
        console.log(JSON.parse(favToken));
        if(favToken != null)
            this.favItems = JSON.parse(favToken);
      };

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

    // async handleRequest() {
    //     const instance = axios.create({
    //       baseURL: 'https://jadookijhappi.com/pubgrub/apis/',
    //       timeout: 5000,
    //     });
    //     console.log("lolol");
    //     const payload = new FormData();
    //     payload.append("subcategory_id", this.props.route.params.SubcategoryData)
    //     console.log(this.props)
    //     await instance
    //       .post('listCocktails/', payload)
    //       .then(response => {
    //         this.setState({ sublistingDictionary : response.data });
            
    //         //console.log(this.state.sublistingDictionary);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //         if (error.response) {
    //           console.log("error data" + error.response.data);
    //           console.log("error status" + error.response.status);
    //           console.log("error header" + error.response.headers);
    //         } else if (error.request) {
    //             console.log("error request" + error.request);
    //           this.refs.toast.show('Network Error');
    //         } else {
    //             console.log('Error', error.message);
    //         }
    //         console.log(error.config);
    //       });
    //   }

    renderListingsCards = (data) => {
        let isFav = data.item.fav;
        return (
            <Pressable onPress={() => { this.renderRecipeView(data.item.Cocktail.id) }}>
                <Card style={{ width: wp('95%'), alignSelf: "center", alignContent: "center" }}>
                    { /*console.log(data)*/ }
                    <CardItem>
                        {/* <Thumbnail round large source={{ uri: data.item.Cocktail.image }} /> */}
                        <Image source={{ uri: data.item.Cocktail.image }} style={{borderRadius:20, width: wp('18%'), height: wp('23%')}} /> 
                        <View style={{ marginLeft: "5%", width: wp('57%') }}>
                            <Text style={{ fontWeight: "700", fontSize: 22, textTransform: "capitalize" }}>
                                
                                {data.item.Cocktail.name}
                            </Text>
                            <Text>
                                sub-text
              </Text>
                            <Text style={{ marginTop: 15, color: '#e8b037' }}>
                                {data.item.Cocktail.strength}
              </Text>
                        </View>
                        <Pressable android_disableSound onPress={() => { data.item.fav = !data.item.fav; this.setState({ fav: !this.state.fav }); this.handleFavs(data.item.Cocktail); }}>
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

    handleFavs(data) {
        this.favItems.push(data);
        console.log(this.favItems);
        AsyncStorage.setItem('favourites', JSON.stringify(this.favItems));
    }

    renderRecipeView(data) {
        this.props.navigation.navigate('Recipe', { cocktail_id: data })
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor:'white'}}>
                <SearchBar round lightTheme
                    searchIcon style={{ width: 0.5 }}
                    onChangeText={text => this.SearchFilterFunction(text)} onClear={text => this.SearchFilterFunction('')} placeholder="Search..." value={this.state.search}
                />
                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={this.state.sublistingDictionary}
                    extraData={this.state}
                    keyExtractor={(article, id) => id.toString()}
                    renderItem={data => this.renderListingsCards(data)}
                    style={{ marginBottom: hp('10%') }}
                />
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
