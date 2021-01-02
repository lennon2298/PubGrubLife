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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Card, CardItem, Thumbnail} from 'native-base';
import axios from 'axios';
import Toast, {DURATION} from 'react-native-easy-toast'

export default class ExploreView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listingDictionary: [],
            sublistingsDictionary: [],
        }
        this.arrayHolder = [];
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
        await instance
          .post('subcategory_products/')
          .then(response => {
            this.setState({ listingDictionary : response.data });
            // console.log(this.state.listingDictionary);
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
        var A = data.item.Subcategory.name;
        var upperCase = A.toUpperCase();
        return (
            <View>
                {/* {console.log(data)} */}
                <Text style={{alignContent: "flex-start", fontWeight: "bold", fontSize: 24, marginTop: hp("2%")}}>
                    {upperCase}
                </Text>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0}
                    snapToAlignment={"center"}
                    data={data.item.Subcategory.drinks}
                    extraData={data.item.Subcategory}
                    keyExtractor={(article, id) => id.toString()}
                    renderItem={data => this.renderSublistingsCards(data)}
                />
            </View>
        )
    }

    renderSublistingsCards = (data) => {
        let name = data.item.Cocktail.name;
        return (
            <View style={{ paddingRight: 6, paddingBottom: 4 }} >
                {/* {console.log(data.item.Cocktail.name)} */}
                <Pressable android_ripple={{ color: 'grey', borderless: false }} delayLongPress={250} onPress={() => this.renderRecipeView(data.item.Cocktail.id)} onLongPress={() => this.renderToast(name)}>
                    <Card style={{ marginVertical: hp("3%"),  borderRadius: 10 }}>
                        <Image source={{ uri: data.item.Cocktail.image }}
                            style={{
                                resizeMode: "cover",
                                height: wp('32%'), width: wp('25%'), borderRadius: 10
                            }} />
                    </Card>
                    <Text style={styles.content} numberOfLines={1}>
                        {data.item.Cocktail.name}
                    </Text>
                </Pressable>
            </View>
        )
    }

    renderToast(data) {
        this.refs.toast.show(data, 3000);
    }

    renderRecipeView(data) {
        this.props.navigation.navigate('Recipe', { cocktail_id : data })
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor:'white'}}>
                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={this.state.listingDictionary}
                    extraData={this.state}
                    keyExtractor={(article, id) => id.toString()}
                    renderItem={data => this.renderListingsCards(data)}
                    style={{ marginLeft: wp('4%'), marginTop: hp('3%') }}
                />
                <Toast ref="toast" style={{opacity: 0.71,borderRadius: 20,padding: 10}} positionValue={140} fadeInDuration={1500} fadeOutDuration={2500}/>
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
        fontSize: 21,
        paddingVertical: 7,
    },
    content: {
        width: "90%",
        alignSelf: "center",
        color: '#b7570e',
        width: wp('25%')
    }
});
