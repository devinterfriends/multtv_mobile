import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../../pages/Login';

const Stack = createNativeStackNavigator();

export const AuthRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
};
