import React, {useCallback, useEffect, useState} from 'react';
import VideoPlayer from 'react-native-video-controls';
import {useToast} from 'react-native-toast-notifications';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import {theme} from '../../../../style/theme';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';

import { getPlayer } from '../../../../services/player';

const {height} = Dimensions.get('window');

export const PlayerVideoAndroid = ({url}) => {
  const [paused, setPaused] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [videoUri, setVideoUri] = useState("");
  const navigation = useNavigation();
  const toast = useToast();

  const handleOpenFullScreen = useCallback(() => {
    setFullScreen(true);
    Orientation.lockToLandscape();
    StatusBar.setHidden(true);
    navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
  }, [navigation]);

  const handleCloseFullScreen = useCallback(() => {
    setFullScreen(false);
    Orientation.lockToPortrait();
    StatusBar.setHidden(false);
    navigation.getParent().setOptions({
      tabBarStyle: {
        height: getBottomSpace() + 50,
        backgroundColor: theme.colors.black,
        borderColor: 'transparent',
      },
    });
  }, [navigation]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setPaused(false);
    });

    navigation.addListener('blur', () => {
      setPaused(true);
    });

    return () => {
      navigation.removeListener();
    };
  }, [navigation]);

  useEffect(() => {
    function _onOrientationDidChange(orientation) {
      if (orientation === 'PORTRAIT') {
        setFullScreen(false);
        StatusBar.setHidden(false);
        navigation.getParent().setOptions({
          tabBarStyle: {
            height: getBottomSpace() + 50,
            backgroundColor: theme.colors.black,
            borderColor: 'transparent',
          },
        });
      } else {
        setFullScreen(true);
        StatusBar.setHidden(true);
        navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
      }
    }
    Orientation.addOrientationListener(_onOrientationDidChange);

    return () => {
      Orientation.unlockAllOrientations();
      Orientation.removeOrientationListener(_onOrientationDidChange);
    };
  }, [navigation]);

  useEffect(() => {
   
    async function getPlayerV2(){
      var response = await getPlayer({
        url: url
      })
      setVideoUri(response?.data?.url)
      console.log(response?.data?.url)
    } 

    getPlayerV2()
  }, [])

  return (
    <TouchableOpacity
      style={[fullScreen ? styles.fullscreenVideo : styles.video]}
      activeOpacity={1}>
      <VideoPlayer
        resizeMode={'contain'}
        style={[{...StyleSheet.absoluteFill}]}
        source={{uri: videoUri, type: 'm3u8'}}
        paused={paused}
        fullScreen={fullScreen}
        disableTimer
        navigator={navigation}
        onError={() => {
          toast.show('Ocorreu um erro ao carregar o video', {
            type: 'warning',
            placement: 'top',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
        }}
        onEnterFullscreen={handleOpenFullScreen}
        onExitFullscreen={handleCloseFullScreen}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  video: {
    height: height / 3,
    width: '100%',
    zIndex: 100,
    elevation: 1,
    marginTop: getStatusBarHeight(),
    backgroundColor: theme.colors.background,
  },
  fullscreenVideo: {
    ...StyleSheet.absoluteFill,
    zIndex: 100,
  },
});
