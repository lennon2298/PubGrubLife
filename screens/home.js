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
    BackHandler,
    Pressable,
    LogBox
} from 'react-native';

import { Card, CardItem, Thumbnail } from 'native-base';
import { SearchBar } from 'react-native-elements'
import Modal, { BottomModal, ModalContent, SlideAnimation, ModalButton } from 'react-native-modals'
import Icon from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SplashScreen from 'react-native-splash-screen'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Toast, {DURATION} from 'react-native-easy-toast'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featureDictionary: [],
            listingsDictionary: [],
            alcDict: [],
            nonAlcDict: [],
            reloadKey: 0,
            blogData: false,
            addsData: false,
            search: "",
            alcVisible: false,
            nalcVisible: false,
        }
        this.arrayholder = [];
        this.testBool = false;
    }     

    async componentDidMount() {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        LogBox.ignoreLogs(['Animated.event now requires a second argument for options'])
        setTimeout(() => SplashScreen.hide(), 1000);
        this.handleRequest();
    }

    async handleSearch() {
        const instance = axios.create({
          baseURL: 'https://jadookijhappi.com/pubgrub/apis/',
          timeout: 5000,
        });
        console.log("lolol");
        var keywords = "/search/keyword:" + this.state.search
        
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

    async handleRequest() {
        axios.defaults.headers.post['Content-Type'] = 'text/html';
        const instance = axios.create({
          baseURL: 'https://jadookijhappi.com/pubgrub/apis/',
          timeout: 5000,
          headers: {'Content-Type': 'text/html'}
        });
        console.log("lolol");
        await instance
          .post('featured_cocktails/')
          .then(response => {
            this.setState({ featureDictionary : response.data });
            
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
          const payload = new FormData();
        payload.append("category_id", "1")
        await instance
          .post('subcategories/', payload)
          .then(response => {
            this.setState({ alcDict : response.data });
            
            console.log(this.state.alcDict);
          })
          .catch(error => {
            console.log(error);
            if (error.response) {
              console.log("error data" + error.response.data);
              console.log("error status" + error.response.status);
              console.log("error header" + error.response.headers);
            } else if (error.request) {
                console.log("error request" + error.request);
            //   this.refs.toast.show('Network Error');
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
          });
          const npayload = new FormData();
        npayload.append("category_id", "2")
        await instance
          .post('subcategories/', npayload)
          .then(response => {
            this.setState({ nonAlcDict : response.data });
            
            console.log(response.data);
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

    renderFeaturedCards = (data) => {
        return (
            <View style={{ paddingHorizontal: 6, paddingBottom: 4 }} >
                <Pressable onPress={() => this.renderRecipeView(data.item.Cocktail.id)}>
                    <Card style={{ marginVertical: hp("3%"), marginHorizontal: wp("2%"), borderRadius: 25 }}>
                        <Image source={{ uri: data.item.Cocktail.image }}
                            style={{
                                resizeMode: "cover",
                                height: hp('20%'), width: wp('39%'), borderRadius: 25
                            }} />
                    </Card>
                    <Text style={styles.content}>
                        {data.item.Cocktail.name}
                    </Text>
                </Pressable>
            </View>
        )
    }

    renderCatList = (data) => {
        let newBool = this.testBool;
        return (
            <SafeAreaView style={{alignItems: "center", width: wp('30%'), marginVertical: '4%'}}>
            {
                this.testBool ? <View style={{ backgroundColor:'#f68e56', borderRadius: 150}} >
                <Pressable onPress={() => { this.renderSublistingsView(data.item.Subcategory.id) }}>
                    <Image source={{ uri: data.item.Subcategory.image }} style={{borderColor:"red", width: wp('12%'), resizeMode:"center", height: wp("12%")}} />
                </Pressable>
            </View> : 
            <View style={{ backgroundColor:'#a3d39c', borderRadius: 150}} >
            <Pressable onPress={() => { this.renderSublistingsView(data.item.Subcategory.id) }}>
                <Image source={{ uri: data.item.Subcategory.image }} style={{borderColor:"red", width: wp('12%'), resizeMode:"center", height: wp("12%")}} />
            </Pressable>
        </View>
            }
                <Text>{data.item.Subcategory.name}</Text>
                {this.testBool = !newBool}
            </SafeAreaView>
        )
    }

    renderRecipeView(data) {
        this.props.navigation.navigate('Recipe', { cocktail_id : data })
    }

    renderSublistingsView(data) {
        this.setState({ alcVisible: false })
        this.setState({ nalcVisible: false })
        this.props.navigation.navigate('SubListing', { SubcategoryData: data })
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor:'white'}}>
                <SearchBar round lightTheme
                    searchIcon style={{ width: 0.5 }} onSubmitEditing={() => this.handleSearch()}
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
                        <Card style={{ borderTopLeftRadius: 25, borderTopRightRadius: 25, marginTop: 16, height: hp('75%'), width: wp('95%') }}>
                            <ImageBackground source={require('../res/alcoholicHome.jpeg')}
                                style={{
                                    height: hp('35%'), width: wp('95%'), borderTopLeftRadius: 25, resizeMode: "cover",
                                    borderTopRightRadius: 25, alignSelf: "center", overflow: "hidden", textAlignVertical: "center"
                                }}>
                                <View style={{width: wp('80%'), height:hp('12%'), alignItems: 'center', alignSelf: 'center'}}>
                                    <Text style={{ alignSelf: "stretch", fontSize: 26, fontWeight: "700", color: "white", marginTop: hp('3%'), textAlign:'center' }}>
                                        Wanks
                                    </Text>
                                </View>
                                <View style={{height:hp('12%'), justifyContent: 'flex-end'}}>
                        <Icon name="chevron-down" color="#ffffff" size={25} style={{alignSelf: "center", marginBottom: hp('3%')}}></Icon>
                        </View>
                            </ImageBackground>
                        </Card>
                    </Pressable>
                    <Pressable onPress={() => { this.setState({ nalcVisible: true }) }} style={{ position: "absolute", top: hp('24%'), alignSelf: "center" }}>
                        <Card style={{ borderTopLeftRadius: 25, borderTopRightRadius: 25, alignSelf: "center", textAlignVertical: "flex-start" }}>
                            <ImageBackground source={require('../res/nonalcoholicHome.jpeg')}
                                style={{
                                    height: hp('35%'), width: wp('95%'), borderTopLeftRadius: 25, resizeMode: "contain",
                                    borderTopRightRadius: 25, alignSelf: "center", overflow: "hidden", flex:1
                                }}>
                                <View style={{width: wp('80%'), height:hp('12%'), alignItems: 'center', alignSelf: 'center', }}>
                                    <Text style={{alignSelf: "stretch", fontSize: 26, fontWeight: "700", color: "white", marginTop: hp('3%'), textAlign:'center' }}>
                                        Virgin Drinks
                                    </Text>
                                </View>
                                <View style={{position: "absolute", top: hp('12%'), height:hp('12%'), alignItems: 'center', justifyContent: 'flex-end', width: wp('95%') }}>
                                <Icon name="chevron-down" color="#ffffff" size={25} style={{alignSelf: "center", marginBottom: hp('2%')}}></Icon>
                                </View>
                            </ImageBackground>
                        </Card>
                    </Pressable>
                </View>
                <BottomModal visible={this.state.alcVisible} onTouchOutside={() => { this.setState({ alcVisible: false }) }}
                    onHardwareBackPress={() => {
                        console.log('onHardwareBackPress');
                        this.setState({ alcVisible: false });
                        return true;
                      }}
                    modalAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    swipeDirection={['up', 'down']} // can be string or an array
                    swipeThreshold={100} // default 100
                    onSwipeOut={(event) => {
                        this.setState({ alcVisible: false });
                    }} 
                    height={hp('45%')} style={{alignItems:'center'}}
                    footer={null} >
                    <ModalContent>
                    <FlatList
                    showsVerticalScrollIndicator={true}
                    data={this.state.alcDict}
                    extraData={this.state}
                    keyExtractor={(article, id) => id.toString()}
                    renderItem={data => this.renderCatList(data)}
                    numColumns={3}
                />
                    </ModalContent>
                </BottomModal>
                <BottomModal visible={this.state.nalcVisible} onTouchOutside={() => { this.setState({ nalcVisible: false }) }}
                    onHardwareBackPress={() => {
                        console.log('onHardwareBackPress');
                        this.setState({ nalcVisible: false });
                        return true;
                      }}
                    modalAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    swipeDirection={['up', 'down']} // can be string or an array
                    swipeThreshold={100} // default 100
                    onSwipeOut={(event) => {
                        this.setState({ nalcVisible: false });
                    }}
                    height={hp('45%')} style={{alignItems:'center'}}>
                    <ModalContent>
                    <FlatList
                    showsVerticalScrollIndicator={true}
                    data={this.state.nonAlcDict}
                    extraData={this.state}
                    keyExtractor={(article, id) => id.toString()}
                    renderItem={data => this.renderCatList(data)}
                    numColumns={3}
                />
                    </ModalContent>
                </BottomModal>
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
        fontSize: 24,
        paddingHorizontal: 4,
        paddingVertical: 7,
    },
    content: {
        width: "90%",
        alignSelf: "center",
        color: '#b7afaf'
    }
});
