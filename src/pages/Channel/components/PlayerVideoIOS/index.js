import React, {useEffect, useState} from 'react';
import Video from 'react-native-video';
import {TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import {theme} from '../../../../style/theme';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import { getPlayer } from '../../../../services/player';
const {height} = Dimensions.get('window');

export const PlayerVideoIOS = ({url}) => {
  const [paused, setPaused] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const navigation = useNavigation();
  const [videoUri, setVideoUri] = useState("");
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
        navigation.getParent().setOptions({
          tabBarStyle: {
            height: getBottomSpace() + 50,
            backgroundColor: theme.colors.black,
            borderColor: 'transparent',
          },
        });
      } else {
        setFullScreen(true);
        navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
      }
    }
    Orientation.addOrientationListener(_onOrientationDidChange);

    //cleanup optional code
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
      <Video
        resizeMode={'cover'}
        style={{...StyleSheet.absoluteFill}}
        source={{uri: videoUri}}
        paused={paused}
        controls
        onError={err => console.log('ERR', err)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  video: {
    height: height / 3,
    marginTop: getStatusBarHeight() + 5,
    width: '100%',
    zIndex: 100,
  },
  fullscreenVideo: {
    ...StyleSheet.absoluteFill,
    zIndex: 100,
  },
});
