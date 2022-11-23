import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import {theme} from '../../style/theme';
import {CardNextChannel} from './components/CardNextChannel';
import Icon from 'react-native-vector-icons/Entypo';
import {BannerChannel} from './components/BannerChannel';
import {useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {getChannels} from '../../services/channels';
import {useAuth} from '../../context/auth';
import {PlayerVideoAndroid} from './components/PlayerVideoAndroid';

import {PlayerVideoIOS} from './components/PlayerVideoIOS';
import {useFavoriteChannel} from '../../hooks/useFavoriteChannel';

const {width} = Dimensions.get('window');

export const Channel = () => {
  const [channels, setChannels] = useState([]);
  const [favoriteChannels, setFavoriteChannels] = useState([]);

  const {token} = useAuth();
  const route = useRoute();
  const {listEpgIdOfFavoriteChannels} = useFavoriteChannel();

  const {channel} = route.params;

  useEffect(() => {
    async function getCanais() {
      
      const response = await getChannels({token});

      const filterByRatingNow =
        response?.data?.canais?.filter(
          item => item.ratingNow === channel.ratingNow,
        ) ?? [];

      const excludeCurrentChannel =
        filterByRatingNow?.filter(ch => ch.epg_id !== channel.epg_id) ?? [];

      const listFavoriteChannels =
        response?.data?.canais?.filter(ch =>
          listEpgIdOfFavoriteChannels.includes(ch.epg_id),
        ) ?? [];

      setFavoriteChannels(listFavoriteChannels);
      setChannels(excludeCurrentChannel);
    }
    getCanais();
  }, [token, channel, listEpgIdOfFavoriteChannels]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        background={theme.colors.white}
        translucent
      />

      {Platform.OS === 'ios' ? (
        <PlayerVideoIOS url={channel.url} />
      ) : (
        <PlayerVideoAndroid url={channel.url} />
      )}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.wrapperCardNextChannel}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={{width: width / 1.3, marginRight: 12}}>
              <CardNextChannel
                channel={channel}
                channelLogo={channel?.logo}
                title={channel?.agora}
                description={channel?.descnow}
                hoursInit={channel?.inicio}
                hoursFim={channel?.fim}
              />
            </View>
            <View style={{width: width / 1.3, marginRight: 12}}>
              <CardNextChannel
                channel={channel}
                channelLogo={channel?.logo}
                title={channel?.depois}
                description={channel?.descnext}
                hoursInit={null}
                hoursFim={null}
                hoursPreviousFim={channel?.fim}
              />
            </View>
          </ScrollView>
        </View>

        {channels?.length > 0 && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 10,
              }}>
              <Text style={styles.titleWrapperListChannels}>
                Semelhantes a este evento
              </Text>
              <Icon name="chevron-right" color={theme.colors.white} size={24} />
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={channels}
              keyExtractor={(_, index) => index}
              renderItem={({item}) => (
                <View
                  style={{
                    width: width / 1.4,
                    marginRight: 10,
                  }}>
                  <BannerChannel channel={item} />
                </View>
              )}
            />
          </View>
        )}

        {favoriteChannels?.length > 0 && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 10,
              }}>
              <Text style={styles.titleWrapperListChannels}>
                Canais favoritos
              </Text>
              <Icon name="chevron-right" color={theme.colors.white} size={24} />
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={favoriteChannels}
              keyExtractor={(_, index) => index}
              renderItem={({item}) => (
                <View
                  style={{
                    width: width / 1.4,
                    marginRight: 10,
                  }}>
                  <BannerChannel channel={item} />
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flexGrow: 1,
    paddingLeft: 12,
    paddingBottom: 50,
    zIndex: -1,
  },
  titleWrapperListChannels: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  wrapperCardNextChannel: {
    marginTop: 20,
    width: '100%',
  },
});
