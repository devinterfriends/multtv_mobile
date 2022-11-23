import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {theme} from '../../style/theme';
import ImageHome from '../../assets/images/img-home.png';
import {useNavigation} from '@react-navigation/native';
import LogoHome from '../../assets/images/logo.png';
import VodHomeImage from '../../assets/images/img-vod.png';
//import Video from 'react-native-video';
//import VideoHome from '../../assets/video/video.mp4';

const {height} = Dimensions.get('window');

export const Home = () => {
  const navigation = useNavigation();
  const [loadedVideo, setLoadVideo] = useState(true);

  const handleNavigationChannels = () => {
    navigation.navigate('Canais');
  };

  return (
    <>
      {!loadedVideo ? (
        <View style={styles.container}>
          <Video
            resizeMode={'cover'}
            style={{...StyleSheet.absoluteFill}}
            source={VideoHome}
            onEnd={() => setLoadVideo(true)}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.wrapperVideo}>
            <Image
              source={LogoHome}
              resizeMode="contain"
              style={{height: 200, width: 200}}
            />
          </View>
          <View style={{flex: 1}}>
            <View style={styles.wrapperBanner}>
              <Image
                source={ImageHome}
                resizeMode="contain"
                style={styles.imageBanner}
                blurRadius={0.5}
              />
              <Text style={styles.titleBanner}>
                A Faster+ evoluiu com os{'\n'}canais ao vivo
              </Text>

              <TouchableOpacity
                style={styles.buttonBanner}
                onPress={handleNavigationChannels}>
                <Text style={styles.titleButtonBanner}>ASSISTA AOS CANAIS</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={VodHomeImage}
              resizeMode="cover"
              style={styles.imageWrapper}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  wrapperVideo: {
    height: height / 3,
    width: '100%',
    backgroundColor: theme.colors.black,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  wrapperBanner: {
    width: '100%',
    height: height / 3,
    backgroundColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  titleBanner: {
    fontSize: 22,
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  imageBanner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonBanner: {
    marginTop: 20,
    padding: 12,
    borderRadius: 4,
    backgroundColor: theme.colors.orange,
  },
  titleButtonBanner: {
    color: theme.colors.black,
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageWrapper: {
    flex: 1,
  },
});
