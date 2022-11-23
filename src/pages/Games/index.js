import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {theme} from '../../style/theme';
import Game from '../../assets/images/game.png';

export const Games = () => {
  return (
    <View style={styles.container}>
      <Image source={Game} resizeMode="contain" style={{flex: 1}} />
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
