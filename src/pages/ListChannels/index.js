import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useAuth} from '../../context/auth';
import {getChannels} from '../../services/channels';
import {theme} from '../../style/theme';
import {CardChannel} from '../../components/CardChannel';

const renderItem = ({item}) => {
  return <CardChannel channel={item} />;
};

export const ListChannels = () => {
  const [channels, setChannels] = useState([]);
  const {token} = useAuth();

  useEffect(() => {
    async function getCanais() {
      const response = await getChannels({token});
      setChannels(response?.data?.canais ?? []);
    }

    getCanais();
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Canais</Text>
      <View style={{flex: 1, marginTop: 20}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={channels}
          keyExtractor={(_, index) => index}
          renderItem={renderItem}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 30,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingTop: 20,
  },
  text: {
    color: theme.colors.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
});
