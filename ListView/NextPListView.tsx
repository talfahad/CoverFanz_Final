import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  Linking,
  Platform,
} from 'react-native';
import { Header, ListItem, Avatar } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  GuestNavigatorParamList,
  GuestNavigatorParamType,
} from '../../types/guestNavigatorTypes';
import {
  LIUSearchStackParamList,
  LIUSearchStackParamType,
} from '../../types/mainNavigatorTypes';

const NextPListView: React.FC<{
  liuNavigation?: StackNavigationProp<LIUSearchStackParamList>;
  liuSSType?: LIUSearchStackParamType;
  sNavigation?: StackNavigationProp<GuestNavigatorParamList>;
  sGNPType?: GuestNavigatorParamType;
}> = ({ liuNavigation, liuSSType, sNavigation, sGNPType }) => {
  const list = [
    {
      _id: 'kejfioajwefioja',
      name: 'Kids Birthday Party',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: '20 April [APPEARING TODAY]',
    },
    {
      _id: 'kejfioajwefiojasss',
      name: 'Another Weeding Party',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: '21 April [APPEARING AFTER 1 DAY]',
    },
  ];

  return (
    <View style={styles.mainbox}>
      {list.map((l, i) => (
        <ListItem
          onPress={() => {}}
          containerStyle={{
            borderRadius: 5,
            backgroundColor: Colors.xlight,
            shadowColor: Colors.white,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0,
            shadowRadius: 4.65,
            elevation: 8,
          }}
          key={i}
          style={{
            marginVertical: 5,
            borderRadius: 5,
          }}>
          <Avatar source={{ uri: l!.avatar_url }} />
          <ListItem.Content>
            <ListItem.Title style={{ fontFamily: FontNames.MyriadProBold }}>
              {l!.name}
            </ListItem.Title>
            <ListItem.Subtitle
              style={{ fontFamily: FontNames.MyriadProRegular }}>
              {l!.subtitle}
            </ListItem.Subtitle>

            <ListItem.Subtitle
              style={{ fontFamily: FontNames.MyriadProRegular }}>
              Location: 123 Dr, Count, MI'
            </ListItem.Subtitle>
          </ListItem.Content>

          <Icon
            tvParallaxProperties={Icon}
            name='navigate-outline'
            type='ionicon'
            onPress={() => {
              const scheme =
                Platform.OS === 'ios' ? 'maps:0,0?q=' : 'geo:0,0?q=';
              const url = scheme + `${'Dhaka, Bangladesh'}`;
              Linking.openURL(url);
            }}
          />
        </ListItem>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textinfo: {
    margin: 10,
    textAlign: 'center',
    fontSize: 17,
  },
  mainbox: {
    width: '100%',
    marginTop: 5,
  },
});

export default NextPListView;
