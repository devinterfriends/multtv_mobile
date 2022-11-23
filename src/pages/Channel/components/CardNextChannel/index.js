import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {theme} from '../../../../style/theme';
import * as Progress from 'react-native-progress';

import {dataFormater, sizeBar} from '../../../../helpers/date';

export const CardNextChannel = ({
  channel,
  channelLogo,
  title,
  description,
  hoursInit,
  hoursFim,
  hoursPreviousFim,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (hoursInit) {
      const currentProgress = sizeBar(channel) / 100;
      setProgress(currentProgress);

      setInterval(() => {
        const progreesInterval = sizeBar(channel) / 100;
        setProgress(progreesInterval);
      }, 60000);
    }

    return () => {
      clearInterval();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.wrapperCardNextChannel}>
      <View style={{flex: 1, paddingVertical: 12, paddingHorizontal: 12}}>
        <Text style={styles.titleNextChannel}> {title ?? ''} </Text>
        <View
          style={[styles.wrapperLogoChannel, {flex: 1, overflow: 'hidden'}]}>
          <Image
            source={{uri: channelLogo ?? ''}}
            style={styles.logoChannel}
            resizeMode="contain"
          />
          <View style={{flexGrow: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {hoursInit && (
                <Text
                  style={[styles.textOpacity, {opacity: 0.8}]}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  {dataFormater(hoursInit ?? '')} -{' '}
                  {dataFormater(hoursFim ?? '')}
                </Text>
              )}
              {hoursPreviousFim && (
                <Text
                  style={[styles.textOpacity, {opacity: 0.8}]}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  Inicia - {dataFormater(hoursPreviousFim ?? '')}
                </Text>
              )}
            </View>
            <Text style={styles.textOpacity} numberOfLines={2}>
              {description ?? ''}
            </Text>
          </View>
        </View>
      </View>
      <Progress.Bar
        progress={progress}
        width={null}
        height={3}
        unfilledColor="#393C3D"
        color={theme.colors.yellow}
        borderColor="transparent"
        style={styles.progressBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperCardNextChannel: {
    width: '100%',
    backgroundColor: theme.colors.silver_dark,
    borderRadius: 8,
  },
  titleNextChannel: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  wrapperLogoChannel: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoChannel: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textOpacity: {
    fontSize: 12,
    color: theme.colors.white,
    opacity: 0.5,
    marginLeft: 12,
  },
});
