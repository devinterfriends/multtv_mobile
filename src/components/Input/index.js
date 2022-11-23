import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {theme} from '../../style/theme';

export const Input = props => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={theme.colors.black}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingVertical: 4,
    borderBottomColor: theme.colors.black,
    borderBottomWidth: 1.5,
    borderStyle: 'solid',
    color: theme.colors.black,
  },
});
