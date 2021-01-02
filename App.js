import React, { Component } from 'react';

import Home from "./screens/home"
import RecipeView from "./screens/recipe"
import ReviewView from "./screens/review"
import ListingsView from "./screens/listings"
import SubListingsView from "./screens/sublistings"
import ReviewListingsView from "./screens/reviewlistings"
import MoreView from "./screens/more"
import ExploreView from "./screens/explore"
import FavouritesView from "./screens/favourites"
import OnboardingView from './screens/onboarding'
import LoginAuth from './screens/LoginAuth'
import MyBarView from './screens/myBar'
import NewListingsView from './screens/newlistings'
import StaticDataView from './screens/staticPage'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();
function HomeStackScreen() {
  return (
      <Tab.Navigator initialRouteName="Home"         
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'My Bar') {
            iconName = 'wine-sharp';
          } else if (route.name === 'Explore') {
            iconName = 'compass';
          } else if (route.name === 'Favourites') {
            iconName = 'star-sharp';
          } else if (route.name === 'More') {
            iconName = 'options-outline';
          }
          

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          paddingBottom: hp("1%"),
          paddingTop: hp('1.5%'),
          height: hp('8%') 
        }
      }}>
        <Tab.Screen name="Explore" component={exploreStackScreen}/>
        <Tab.Screen name="Favourites" component={favStackScreen} options= {{unmountOnBlur: true}}/>
        <Tab.Screen name="Home" component={featuredStackScreen} options= {{unmountOnBlur: true}}/>
        <Tab.Screen name="My Bar" component={ListingsStackScreen} />
        <Tab.Screen name="More" component={MoreStackScreen} />
      </Tab.Navigator>
  );
}

const featuredStack = createStackNavigator();

function featuredStackScreen() {
  return (
    <featuredStack.Navigator>
      <featuredStack.Screen name="Home" component={Home} options={{headerShown: false}}/>
    </featuredStack.Navigator>
  );
}

const favStack = createStackNavigator();

function favStackScreen() {
  return (
    <favStack.Navigator>
      <favStack.Screen name="Favourites" component={FavouritesView} options={{headerShown: false, unmountOnBlur: true}}/>
    </favStack.Navigator>
  );
}

const exploreStack = createStackNavigator();

function exploreStackScreen() {
  return (
    <exploreStack.Navigator>
      <exploreStack.Screen name="Explore" component={ExploreView} options={{headerShown: false, unmountOnBlur: true}}/>
    </exploreStack.Navigator>
  );
}

const ListingsStack = createStackNavigator();

function ListingsStackScreen() {
  return (
    <ListingsStack.Navigator>
      <ListingsStack.Screen name="Listings" component={MyBarView} options={{headerShown: false}}/>
      <ListingsStack.Screen name="NewListing" component={NewListingsView} options={{headerShown: false, unmountOnBlur: true}}/>
    </ListingsStack.Navigator>
  );
}

const MoreStack = createStackNavigator();

function MoreStackScreen() {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen name="More" component={MoreView} options={{headerShown: false}}/>
      <MoreStack.Screen name="Reviews" component={ReviewListingsView}/>
    </MoreStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
    <HomeStack.Navigator initialRouteName='LoginAuth'>
      <HomeStack.Screen name="LoginAuth" component={LoginAuth} options={{headerShown: false}} />
      <HomeStack.Screen name="Onboarding" component={OnboardingView} options={{headerShown: false}} />
      <HomeStack.Screen name="Home" component={HomeStackScreen} options={{headerShown: false}} />
      <HomeStack.Screen name="Recipe" component={RecipeView} options={{unmountOnBlur: true}}/>
      <HomeStack.Screen name="NewListing" component={NewListingsView} options={{headerShown: false, unmountOnBlur: true}}/>
      <HomeStack.Screen name="SubListing" component={SubListingsView} options={{headerShown: false}}/>
      <MoreStack.Screen name="Review" component={ReviewView} options={{ unmountOnBlur: true}}/>
      <MoreStack.Screen name="About Us" component={StaticDataView} options={{ unmountOnBlur: true}}/>
      <MoreStack.Screen name="Privacy Policy" component={StaticDataView} options={{ unmountOnBlur: true}}/>
    </HomeStack.Navigator>
    </NavigationContainer>
  );
}