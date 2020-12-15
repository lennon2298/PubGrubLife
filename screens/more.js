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

export default class MoreView extends Component {
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

    }


    renderRecipeView(data) {
        this.props.navigation.navigate('RecipeView', { RecipeData: data })
    }

    render() {
        return (
            <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
                <SearchBar round lightTheme
                    searchIcon style={{ width: 0.5 }}
                    onChangeText={text => this.SearchFilterFunction(text)} onClear={text => this.SearchFilterFunction('')} placeholder="Search..." value={this.state.search}
                />
                <View style={{width:'100%', height: '100%', alignItems: 'center'}}>
                <ImageBackground source={require('../res/More.png')} style={{width: '98%', height: '100%', marginLeft: wp('2%')}} resizeMode="cover" >
                    <View style={{marginRight: wp('4%')}}>
                    <View style={{height: hp("8%"), marginTop:'7%', marginHorizontal: '4%', flexDirection:"row", alignItems:'center'}}>
                        <Icon name="beer-outline" size={25} color='white'/>
                        <Text style={styles.content}> Alcohol Review </Text>
                        <Icon name="chevron-forward-outline" size={33} color='white' style={{ marginRight: '4%'}} />
                    </View>
                    <View style={{height: hp("8%"), marginHorizontal: '4%', flexDirection:"row", alignItems:'center'}}>
                        <Icon name="document-text-outline" size={25} color='white'/>
                        <Text style={styles.content}> Terms of Use </Text>
                        <Icon name="chevron-forward-outline" size={33} color='white' style={{ marginRight: '4%'}} />
                    </View>
                    <View style={{height: hp("8%"), marginHorizontal: '4%', flexDirection:"row", alignItems:'center'}}>
                        <Icon name="shield-checkmark-outline" size={25} color='white'/>
                        <Text style={styles.content}> Privacy Policy </Text>
                        <Icon name="chevron-forward-outline" size={33} color='white' style={{ marginRight: '4%'}} />
                    </View>
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
