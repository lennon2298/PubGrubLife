import React, { Component } from 'react';
import {
    Button,
    View,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Pressable,
} from 'react-native';
import { SearchBar } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, CardItem, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import TagInput from 'react-native-tags-input';
import axios from 'axios';
import Toast, {DURATION} from 'react-native-easy-toast'
import AsyncStorage from '@react-native-community/async-storage'
import Triangle from 'react-native-triangle';

const mainColor = '#3ca897';
export default class MyBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listingsDictionary: [],
            tags: {
                tag: '',
                tagsArray: []
            },
            tagsColor: mainColor,
            tagsText: '#fff',
        }
        this.arrayholder = [];
        this.device_id = -1;
    }

    async componentDidMount() {
        const device_id = await AsyncStorage.getItem('device_id');
        console.log(device_id);
        this.device_id = JSON.parse(device_id);
    }


    renderRecipeView(data) {
        if(this.state.tags.tagsArray.length > 5){
            this.refs.toast.show("Please enter a maximum of 5 Search parameters", 3000);
        }
        else if(this.state.tags.tagsArray.length == 0) {
            this.refs.toast.show("No Results Found", 3000);
        }
        else {
            if(this.state.listingsDictionary.length > 0) {
                this.props.navigation.navigate('NewListing', { NewListingData : data })
            }
            else {
                this.refs.toast.show("No Results Found.", 3000);
            }
        }
    }

    updateTagState = (state) => {
        this.setState({
            tags: state
        })
    };

    async handleRequest() {
        const instance = axios.create({
          baseURL: 'https://jadookijhappi.com/pubgrub/apis/',
          timeout: 5000,
        });
        console.log("lolol");
        var keywords = "/search/keyword:"
        for(i = 0; i < 5; i++) {
            if(this.state.tags.tagsArray[i] != undefined) {
                if(i == 0) {
                    keywords += this.state.tags.tagsArray[i] + "/";
                }
                else {
                    keywords += "keyword" + i + ":" + this.state.tags.tagsArray[i] + "/";
                }
            } 
        }
        console.log(keywords);
        keywords += this.device_id + "/"
        await instance
          .get(keywords)
          .then(response => {
            this.setState({ listingsDictionary : response.data });
            console.log(this.state.listingsDictionary);
            console.log(response)
            this.renderRecipeView(this.state.listingsDictionary);
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

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ alignItems: 'center'}}>
                    <TagInput
                        updateState={this.updateTagState}
                        tags={this.state.tags}
                        placeholder="Search..."
                        labelStyle={{ color: '#fff' }}
                        leftElement={<Icon name={'pricetags-outline'} size={18}  />}
                        leftElementContainerStyle={{ justifyContent: 'center' }}
                        containerStyle={{ width: wp('100%'), alignItems: 'center', justifyContent: 'center' }}
                        inputContainerStyle={[styles.textInput, { backgroundColor: '#bfbfbf' }]}
                        onFocus={() => this.setState({ tagsColor: '#fff', tagsText: mainColor })}
                        onBlur={() => this.setState({ tagsColor: mainColor, tagsText: '#fff' })}
                        autoCorrect={false}
                        tagStyle={styles.tag}
                        tagTextStyle={{color: '#ffffff', fontSize: 24, marginRight: wp('3%'), marginVertical: hp('1%')}}
                        keysForTag={', '} />
                </View>
                <View style={{ flex: 1, alignItems: 'center'}}>
                    {
                        Boolean(this.state.tags.tagsArray.length) ? <View></View> : 
                        <View>
                            <Triangle width={30} height={50} color={'#f7941d'} direction={'down-left'} style={{marginLeft: wp('8%'), marginBottom: -1}}/>
                            <View style={{width: wp('90%'), borderRadius: 15, alignContent: 'center', padding: 5, backgroundColor: '#f7941d'}}>
                            <Text style={{alignSelf: "stretch", fontSize: 20, textAlign:'center', color: 'white', marginVertical: hp('1%')}}>
                                Why should only professionals have all the boozy fun? Type the ingredients you have at home and we will give you recipes you can create.
                            </Text>
                        </View>
                            </View>
                    }
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'center', marginBottom: hp('3%') }}>
                <Pressable android_ripple={{ color: 'grey', borderless: false }} onPress={() => this.handleRequest()} style={{borderRadius: 6, backgroundColor: '#f7941d', alignItems: 'center'}}> 
                    <Text style={{color: 'white', fontSize: 23, paddingHorizontal: 8, paddingVertical: 2}}>
                        Search
                    </Text>
                </Pressable>
                </View>
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
        alignSelf: "center",
        color: 'white',
        fontSize: 18,
        marginLeft: '4%',
        fontWeight: '100'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColor,
    },
    textInput: {
        height: hp('7%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        marginVertical: 8,
        borderRadius: 15,
        padding: 5,
    },
    tag: {
        backgroundColor: '#f7941d', 
        flexShrink: 1,
        color: '#ffffff',
        borderRadius: 10,
        paddingVertical: 6,
        height: hp('5%')
    },
    tagText: {
        color: mainColor
    },
});
