import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ListChannels} from '../../pages/ListChannels';
import {Channel} from '../../pages/Channel';

const Stack = createNativeStackNavigator();

export const AppStackRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="listChannels"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="listChannels" component={ListChannels} />
      <Stack.Screen name="channel" component={Channel} />
    </Stack.Navigator>
  );
};
