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

import Icon from 'react-native-vector-icons/MaterialIcons'

import axios from 'axios';

export default class ListingsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listingDictionary: [],
            reloadKey: 0,
            blogData: false,
            addsData: false,
            search: "",
            alcVisible: false,
            nalcVisible: false,
            fav: false
        }
        this.arrayholder = [];

        const heart = "../res/doFav.png"
    }

    componentDidMount() {
        this.handleRequest();
    }

    async handleRequest() {
        const instance = axios.create({
          baseURL: 'https://jadookijhappi.com/pubgrub/apis/',
          timeout: 5000,
        });
        console.log("lolol");
        const payload = new FormData();
        payload.append("category_id", "1")
        await instance
          .post('subcategories/', payload)
          .then(response => {
            this.setState({ listingDictionary : response.data });
            
            console.log(this.state.listingDictionary);
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

    renderListingsCards = (data) => {
        let isFav = data.item.fav;
        return (
            <Pressable onPress={() => { this.renderRecipeView(data.item.Subcategory.id) }}>
                <Card style={{ width: wp('95%'), alignSelf: "center", alignContent: "center" }}>
                    {console.log(data.item.Subcategory.name)}
                    <CardItem>
                        {/* <Thumbnail round large source={{ uri: data.item.Subcategory.image }} /> */}
                        <Image source={require('../res/rum.jpg')} style={{borderRadius:20, width: wp('18%'), height: wp('23%')}} /> 
                        <View style={{ marginLeft: "5%", width: wp('57%') }}>
                            <Text style={{ fontWeight: "700", fontSize: 22, textTransform: "capitalize" }}>
                                {console.log(data.item.Subcategory.id)}
                                {data.item.Subcategory.name}
                            </Text>
                            <Text>
                            {data.item.Subcategory.subdesc}
                            {/*change the object name to match sub description*/}
              </Text>
                            <Text style={{ marginTop: 15, color: '#e8b037' }}>
                                light
                                {/*Add in the strength if we recieve it from API*/}
              </Text>
                        </View>
                        
                    </CardItem>
                </Card>
            </Pressable>
        )
    }

    renderRecipeView(data) {
        this.props.navigation.navigate('SubListing', { SubcategoryData: data })
    }

    render() {
        return (
            <SafeAreaView>
                <SearchBar round lightTheme
                    searchIcon style={{ width: 0.5 }}
                    onChangeText={text => this.SearchFilterFunction(text)} onClear={text => this.SearchFilterFunction('')} placeholder="Search..." value={this.state.search}
                />
                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={this.state.listingDictionary}
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
