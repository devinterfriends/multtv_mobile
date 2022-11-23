import React, {useState, createContext, useContext, useEffect} from 'react';
import {signInService} from '../services/user';
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const toast = useToast();

  const signIn = async ({userName, password}) => {
    await signInService({userName, password})
      .then(response => {
        const {token: authToken} = response.data;
        if (authToken) {
          AsyncStorage.setItem('@multitv:token', authToken);
          setToken(authToken);
          toast.show('Login realizado com sucesso', {
            type: 'success',
            placement: 'top',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
        }

        if (response.data.status === 'erro') {
          toast.show('Falha ao realizar o login', {
            type: 'danger',
            placement: 'top',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      })
      .catch(() => {
        toast.show('Falha ao realizar o login', {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      });
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('@multitv:token');
    setToken(null);
  };

  useEffect(() => {
    const verifyTokenStorage = async () => {
      const tokenAlreadyExists = await AsyncStorage.getItem('@multitv:token');
      if (tokenAlreadyExists) {
        setToken(tokenAlreadyExists);
      } else {
        setToken(null);
      }
    };
    verifyTokenStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
