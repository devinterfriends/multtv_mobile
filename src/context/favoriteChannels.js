import React, {useEffect, useState, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';

const favoriteChannelsStorageToken = '@fastermobile:favoriteChannels';

export const FavoriteContext = createContext({});

export const FavoriteChannelsProvider = ({children}) => {
  const [listEpgIdOfFavoriteChannels, setListEpgIdOfFavoriteChannels] =
    useState([]);
  const toast = useToast();

  const addFavoriteChannel = async channelEpgId => {
    const newArrayItems = [...listEpgIdOfFavoriteChannels, channelEpgId];
    setListEpgIdOfFavoriteChannels(newArrayItems);
    await AsyncStorage.setItem(
      favoriteChannelsStorageToken,
      JSON.stringify(newArrayItems),
    ).then(() => {
      toast.show('Favoritado', {
        type: 'success',
        placement: 'top',
        duration: 2500,
        offset: 30,
        animationType: 'zoom-in',
      });
    });
  };

  const removeFavoriteChannel = async channelEpgId => {
    const filteredChannels = listEpgIdOfFavoriteChannels.filter(
      epgId => epgId !== channelEpgId,
    );
    setListEpgIdOfFavoriteChannels(filteredChannels);
    await AsyncStorage.setItem(
      favoriteChannelsStorageToken,
      JSON.stringify(filteredChannels),
    ).then(() => {
      toast.show('Desfavoritado', {
        type: 'danger',
        placement: 'top',
        duration: 2500,
        offset: 30,
        animationType: 'zoom-in',
      });
    });
  };

  useEffect(() => {
    const getFavoriteChannels = async () => {
      await AsyncStorage.getItem(favoriteChannelsStorageToken)
        .then(response => {
          if (response) {
            setListEpgIdOfFavoriteChannels(JSON.parse(response));
          }
        })
        .catch(err => console.log('ERR', err));
    };

    getFavoriteChannels();
  }, []);

  return (
    <FavoriteContext.Provider
      value={{
        addFavoriteChannel,
        removeFavoriteChannel,
        listEpgIdOfFavoriteChannels,
      }}>
      {children}
    </FavoriteContext.Provider>
  );
};
