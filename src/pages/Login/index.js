import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '../../style/theme';
import {Input} from '../../components';
import {Controller, useForm} from 'react-hook-form';
import {useAuth} from '../../context/auth';
import LogoPng from '../../assets/images/logo.png';

export const Login = () => {
  const {control, handleSubmit} = useForm();
  const {signIn} = useAuth();

  const onSubmit = data => {
    signIn(data);
  };

  return (
    <View style={styles.container}>
      <View style={{width: 200, height: 100}}>
        <Image
          source={LogoPng}
          style={{width: 200, height: 100}}
          resizeMode="contain"
        />
      </View>

      <View style={styles.wrapperFields}>
        <Controller
          name="userName"
          control={control}
          render={({field: {value, onChange}}) => (
            <Input
              placeholder="Login"
              onChangeText={text => onChange(text)}
              value={value}
            />
          )}
        />

        <View style={styles.wrapperFieldPassword}>
          <Controller
            name="password"
            control={control}
            render={({field: {value, onChange}}) => (
              <Input
                placeholder="Senha"
                onChangeText={text => onChange(text)}
                value={value}
              />
            )}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.buttonSignIn}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>
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
  wrapperFieldPassword: {
    marginTop: 14,
    width: '100%',
  },
  text: {
    color: theme.colors.black,
    fontSize: 32,
  },
  wrapperFields: {
    width: '80%',
    borderRadius: 12,
    paddingVertical: 80,
    marginTop: 30,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
  buttonSignIn: {
    marginTop: 50,
    paddingVertical: 6,
    paddingHorizontal: 22,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: theme.colors.white,
  },
  textButton: {
    fontSize: 18,
    color: theme.colors.black,
  },
});
