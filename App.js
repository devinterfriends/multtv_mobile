import * as React from 'react';
import {Routes} from './src/routes';
import {AuthProvider} from './src/context/auth';
import {FavoriteChannelsProvider} from './src/context/favoriteChannels';
import {ToastProvider} from 'react-native-toast-notifications';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <FavoriteChannelsProvider>
          <Routes />
        </FavoriteChannelsProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
