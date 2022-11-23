import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {theme} from '../../../../style/theme';
import {dataFormater} from '../../../../helpers/date';
import {useNavigation} from '@react-navigation/native';

export const BannerChannel = ({channel}) => {
  const navigation = useNavigation();

  const handleGoToChannel = () => {
    navigation.replace('channel', {
      channel: channel,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleGoToChannel}>
      <View style={styles.wrapperBanner}>
        <Image
          resizeMode="contain"
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
          }}
          source={{uri: channel.logo}}
        />
      </View>
      <View style={styles.dataBanner}>
        <Text style={styles.titleBanner} numberOfLines={1}>
          {channel.agora}
        </Text>
        <View style={styles.wrapperLogoChannel}>
          <Image
            source={{uri: channel.logo}}
            style={styles.logoChannel}
            resizeMode="contain"
          />
          {channel?.inicio && (
            <Text
              style={[styles.textMuted, {opacity: 0.8, marginLeft: 12}]}
              numberOfLines={1}>
              {dataFormater(channel.inicio)} - {dataFormater(channel.fim)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    width: '100%',
    backgroundColor: theme.colors.silver_dark,
    flexDirection: 'row',
    position: 'relative',
  },
  wrapperBanner: {
    height: 120,
    width: 95,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataBanner: {
    flex: 1,
    alignItem: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  titleBanner: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  wrapperLogoChannel: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoChannel: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.silver,
    borderRadius: 20,
  },
  textMuted: {
    fontSize: 11,
    fontWeight: '400',
    color: theme.colors.white,
    opacity: 0.5,
    marginLeft: 5,
  },
});
