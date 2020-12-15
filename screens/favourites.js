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
    }

    componentDidMount() {
        this._bootstrapAsync();
        this.onLoad();
    }

    _bootstrapAsync = async () => {
        const favToken = await AsyncStorage.getItem('favourites');
        this.favItems = JSON.parse(favToken);
        console.log(this.favItems);
        var arr = this.favItems;
        this.setState({fav : true});
        var clean = arr.filter((arr, index, self) =>
        index === self.findIndex((t) => (t.id === arr.id && t.name === arr.name)))
        this.favItems = clean;
        console.log(this.favItems)
        this.setState({fav : true});
      };

    onLoad = () => {
        this.props.navigation.addListener('focus', () => this._bootstrapAsync())
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
        let isFav = data.item.fav;
        return (
            <Pressable onPress={() => { this.renderRecipeView(data.item.id) }}>
                <Card style={{ width: wp('95%'), alignSelf: "center", alignContent: "center" }}>
                    { /*console.log(data)*/ }
                    <CardItem>
                        {/* <Thumbnail round large source={{ uri: data.item.image }} /> */}
                        <Image source={{ uri: data.item.image }} style={{borderRadius:20, width: wp('18%'), height: wp('23%')}} /> 
                        <View style={{ marginLeft: "5%", width: wp('57%') }}>
                            <Text style={{ fontWeight: "700", fontSize: 22, textTransform: "capitalize" }}>
                                
                                {data.item.name}
                            </Text>
                            <Text>
                                sub-text
                            </Text>
                            <Text style={{ marginTop: 15, color: '#e8b037' }}>
                                {data.item.strength}
              </Text>
                        </View>
                        {/* <Pressable android_disableSound onPress={() => { data.item.fav = !data.item.fav; this.setState({ fav: !this.state.fav }); this.handleFavs(data.item.Cocktail); }}>
                            <View style={{ marginHorizontal: null, width: wp('7%') }}>
                                {
                                    data.item.fav ? <Icon name="heart-outline" color="rgba(0, 0, 0, 1)" size={24}/> :
                                    <Icon name="heart" color="rgba(0, 0, 0, 1)" size={24}/>
                                }
                            </View>
                        </Pressable> */}
                    </CardItem>
                </Card>
            </Pressable>
        )
    }

    handleFavs(data) {
        if(this.favItems == null) {
            this.favItems = data;
        }
        else {
            this.favItems.push(data);
        }
        console.log(this.favItems);
        this.setState({fav : true});
        AsyncStorage.setItem('favourites', JSON.stringify(this.favItems));
    }

    renderRecipeView(data) {
        this.props.navigation.navigate('Recipe', { cocktail_id: data })
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor:'white', flex: 1}}>
                <SearchBar round lightTheme
                    searchIcon style={{ width: 0.5 }}
                    onChangeText={text => this.SearchFilterFunction(text)} onClear={text => this.SearchFilterFunction('')} placeholder="Search..." value={this.state.search}
                />
                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={this.favItems}
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
