import {useContext} from 'react';
import {FavoriteContext} from '../context/favoriteChannels';

export const useFavoriteChannel = () => useContext(FavoriteContext);
