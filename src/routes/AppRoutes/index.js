import React from 'react';
import {Home} from '../../pages/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {theme} from '../../style/theme';
import {AppStackRoutes} from './appStack.routes';
import {Settings} from '../../pages/Settings';
import {VOD} from '../../pages/VOD';
import {Games} from '../../pages/Games';
import {getBottomSpace} from 'react-native-iphone-x-helper';

const Tab = createBottomTabNavigator();

export const AppRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Canais') {
            iconName = 'live-tv';
            return (
              <Icon
                name={iconName}
                size={size}
                color={color}
                style={{opacity: focused ? 1 : 0.3}}
              />
            );
          } else if (route.name === 'Home') {
            iconName = 'home';
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
                style={{opacity: focused ? 1 : 0.3}}
              />
            );
          } else if (route.name === 'Configurações') {
            iconName = 'settings';
            return (
              <Feather
                name={iconName}
                size={size}
                color={color}
                style={{opacity: focused ? 1 : 0.3}}
              />
            );
          } else if (route.name === 'Games') {
            iconName = 'game-controller-outline';
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
                style={{opacity: focused ? 1 : 0.3}}
              />
            );
          } else {
            iconName = 'film';
            return (
              <Feather
                name={iconName}
                size={size}
                color={color}
                style={{opacity: focused ? 1 : 0.3}}
              />
            );
          }
        },
        tabBarStyle: {
          height: getBottomSpace() + 50,
          backgroundColor: theme.colors.black,
          borderColor: 'transparent',
        },
        tabBarActiveTintColor: theme.colors.white,
        tabBarInactiveTintColor: theme.colors.silver,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Canais" component={AppStackRoutes} />
      <Tab.Screen name="VOD" component={VOD} />
      <Tab.Screen name="Games" component={Games} />
      <Tab.Screen name="Configurações" component={Settings} />
    </Tab.Navigator>
  );
};
