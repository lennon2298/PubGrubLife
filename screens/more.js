import React, { Component } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import { SearchBar } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Pressable } from 'react-native';
import axios from 'axios';

export default class MoreView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listingsDictionary: [],
            reloadKey: 0,
            blogData: false,
            addsData: false,
            search: "",
            alcVisible: false,
            nalcVisible: false,
            privacyPolicy: "",
            aboutUs: ""
        }
        this.arrayholder = [];
    }

    componentDidMount() {
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

    renderRecipeView(data) {
        this.props.navigation.navigate('RecipeView', { RecipeData: data })
    }

    async handleRequest() {
        axios.defaults.headers.post['Content-Type'] = 'text/html';
        const instance = axios.create({
          baseURL: 'https://jadookijhappi.com/pubgrub/apis/static_content/',
          timeout: 5000,
          headers: {'Content-Type': 'text/html'}
        });
        console.log("lolol");
        await instance
          .get('privacy_policy/')
          .then(response => {
            this.setState({ privacyPolicy : response.data });
            
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
        await instance
          .get('about/')
          .then(response => {
            this.setState({ aboutUs : response.data });
            
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
      }

    render() {
        return (
            <SafeAreaView style={{flex:1, backgroundColor: 'white', flexGrow: 1}}>
                <SearchBar round lightTheme
                    searchIcon style={{ width: 0.5 }} onSubmitEditing={() => this.handleSearch()}
                    onChangeText={text => this.SearchFilterFunction(text)} onClear={text => this.SearchFilterFunction('')} placeholder="Search..." value={this.state.search}
                />
                <View style={{width:'100%', height: '100%', alignItems: 'center'}}>
                <ImageBackground source={require('../res/More.png')} style={{width: '98%', height: '100%', marginLeft: wp('2%')}} resizeMode="cover" >
                    <View style={{marginRight: wp('4%')}}>
                    <Pressable onPress={() => { this.props.navigation.navigate('Reviews') }}>
                        <View style={{height: hp("8%"), marginTop:'7%', marginHorizontal: '4%', flexDirection:"row", alignItems:'center'}}>
                            <Icon name="beer-outline" size={25} color='white'/>
                            <Text style={styles.content}> Whisk(e)y Review </Text>
                            <Icon name="chevron-forward-outline" size={33} color='white' style={{ marginRight: '4%'}} />
                        </View>
                    </Pressable>
                    <Pressable onPress={() => { this.props.navigation.navigate('About Us', {staticData : this.state.aboutUs.StaticPage.content}) }}>
                    <View style={{height: hp("8%"), marginHorizontal: '4%', flexDirection:"row", alignItems:'center'}}>
                        <Icon name="document-text-outline" size={25} color='white'/>
                        <Text style={styles.content}> About Us </Text>
                        <Icon name="chevron-forward-outline" size={33} color='white' style={{ marginRight: '4%'}} />
                    </View>
                    </Pressable>
                    <Pressable onPress={() => { this.props.navigation.navigate('Privacy Policy', {staticData : this.state.privacyPolicy.StaticPage.content}) }}>
                    <View style={{height: hp("8%"), marginHorizontal: '4%', flexDirection:"row", alignItems:'center'}}>
                        <Icon name="shield-checkmark-outline" size={25} color='white'/>
                        <Text style={styles.content}> Privacy Policy </Text>
                        <Icon name="chevron-forward-outline" size={33} color='white' style={{ marginRight: '4%'}} />
                    </View>
                    </Pressable>
                    </View>
                </ImageBackground>
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
        width: "82%",
        alignSelf: "center",
        color: 'white',
        fontSize: 16,
        marginLeft: '4%',
        fontWeight: '100'
    }
});
