import React from 'react';
import {AppRoutes} from './AppRoutes';
import {AuthRoutes} from './AuthRoutes';
import {useAuth} from '../context/auth';
import {NavigationContainer} from '@react-navigation/native';

export const Routes = () => {
  const {token} = useAuth();
  return (
    <NavigationContainer>
      {token ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
