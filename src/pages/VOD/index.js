import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {theme} from '../../style/theme';

import VodHomeImage from '../../assets/images/vod.png';

export const VOD = () => {
  return (
    <View style={styles.container}>
      <Image source={VodHomeImage} resizeMode="contain" style={{flex: 1}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
