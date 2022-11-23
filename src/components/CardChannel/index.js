import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconIonicos from 'react-native-vector-icons/Ionicons';
import {theme} from '../../style/theme';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import {useFavoriteChannel} from '../../hooks/useFavoriteChannel';
import {sizeBar} from '../../helpers/date';

export const CardChannel = ({size, notFavorite, channel}) => {
  const navigation = useNavigation();
  const {
    addFavoriteChannel,
    removeFavoriteChannel,
    listEpgIdOfFavoriteChannels,
  } = useFavoriteChannel();

  const verifyIfAlreadyFavorite = listEpgIdOfFavoriteChannels?.some(
    channelEpgId => channelEpgId === channel.epg_id,
  );

  const favoriteOrDesfavoriteChannel = () => {
    if (verifyIfAlreadyFavorite) {
      removeFavoriteChannel(channel.epg_id);
    } else {
      addFavoriteChannel(channel.epg_id);
    }
  };

  const handleGoToProfileChannel = () => {
    navigation.navigate('channel', {
      channel,
    });
  };

  const progress = sizeBar(channel) / 100;

  return (
    <TouchableOpacity
      style={styles.wrapperCard}
      onPress={handleGoToProfileChannel}>
      <View
        style={[
          styles.dataCard,
          {
            paddingHorizontal: size ? 14 : 20,
            paddingVertical: size ? 14 : 20,
          },
        ]}>
        <View
          style={[
            styles.wrapperLogoChannel,
            {width: size ? 35 : 60, height: size ? 35 : 60},
          ]}>
          <Image
            source={{uri: channel?.logo ?? ''}}
            style={styles.logoChannel}
            resizeMode="contain"
          />
        </View>
        <View style={{flex: 1}}>
          <Text
            style={[styles.titleCard, {fontSize: size ? 12 : 14}]}
            numberOfLines={1}>
            {channel?.nome ?? ''}
          </Text>
          <Text
            style={[styles.subtitleCard, {fontSize: size ? 10 : 12}]}
            numberOfLines={1}>
            {channel?.agora ?? ''}
          </Text>
        </View>
        {notFavorite ? (
          <IconIonicos
            name="ios-stats-chart"
            size={20}
            color={theme.colors.yellow}
          />
        ) : (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={favoriteOrDesfavoriteChannel}>
            <Icon
              name={verifyIfAlreadyFavorite ? 'heart' : 'hearto'}
              size={20}
              color={
                verifyIfAlreadyFavorite ? theme.colors.red : theme.colors.white
              }
            />
          </TouchableOpacity>
        )}
      </View>
      <Progress.Bar
        progress={progress}
        width={null}
        height={size ? 3 : 5}
        unfilledColor="#393C3D"
        color={theme.colors.yellow}
        borderColor="transparent"
        style={styles.progressBar}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapperCard: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#1D1E21',
  },
  dataCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperLogoChannel: {
    marginRight: 20,
  },
  logoChannel: {
    flex: 1,
    backgroundColor: 'silver',
    borderRadius: 1000,
  },
  titleCard: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  subtitleCard: {
    color: theme.colors.white,
    fontWeight: '400',
    opacity: 0.5,
    marginTop: 5,
  },
  favoriteButton: {},
  progressBar: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
