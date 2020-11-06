import React, { Component } from 'react';

import Home from "./screens/home"
import RecipeView from "./screens/recipe"
import ListingsView from "./screens/listings"
import SubListingsView from "./screens/sublistings"
import MoreView from "./screens/more"
import FavouritesView from "./screens/favourites"
import OnboardingView from './screens/onboarding'
import LoginAuth from './screens/LoginAuth'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

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
          } else if (route.name === 'Listings') {
            iconName = 'wine-sharp';
          } else if (route.name === 'Explore') {
            iconName = 'compass';
          } else if (route.name === 'Favourites') {
            iconName = 'star-sharp';
          } else if (route.name === 'More') {
            iconName = 'search-sharp';
          }
          

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
        <Tab.Screen name="Explore" component={MoreView} />
        <Tab.Screen name="Favourites" component={FavouritesView} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Listings" component={ListingsStackScreen} />
        <Tab.Screen name="More" component={MoreView} />
      </Tab.Navigator>
  );
}

const ListingsStack = createStackNavigator();

function ListingsStackScreen() {
  return (
    <ListingsStack.Navigator>
      <ListingsStack.Screen name="Listings" component={ListingsView} options={{headerShown: false}}/>
      <ListingsStack.Screen name="Recipe" component={RecipeView} options={{headerShown: false}}/>
      <ListingsStack.Screen name="SubListing" component={SubListingsView} options={{headerShown: false}}/>
    </ListingsStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
    <HomeStack.Navigator initialRouteName='LoginAuth'>
      <HomeStack.Screen name="LoginAuth" component={LoginAuth} options={{headerShown: false}} />
      <HomeStack.Screen name="Onboarding" component={OnboardingView} options={{headerShown: false}} />
      <HomeStack.Screen name="Home" component={HomeStackScreen} options={{headerShown: false}} />
    </HomeStack.Navigator>
    </NavigationContainer>
  );
}