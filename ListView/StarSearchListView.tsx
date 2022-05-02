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
import { Header, ListItem, Avatar as RNEAvatar } from 'react-native-elements';
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
import { Avatar } from 'react-native-paper';
import { getAverageRating, getNameAvatar } from '../../utils/functions';

const StarSearchListView: React.FC<{
  liuNavigation?: StackNavigationProp<LIUSearchStackParamList>;
  liuSSType?: LIUSearchStackParamType;
  sNavigation?: StackNavigationProp<GuestNavigatorParamList>;
  sGNPType?: GuestNavigatorParamType;
  data: any;
}> = ({ liuNavigation, liuSSType, sNavigation, sGNPType, data }) => {
  return (
    <View style={styles.mainbox}>
      {data.map((l: any) => {
        const averageRating = getAverageRating(
          l.ratingByFan,
          l.ratingByStar,
          l.ratingByVenue,
          l.userType
        );

        return (
          <ListItem
            onPress={() => {
              if (liuNavigation && liuSSType) {
                liuNavigation.navigate(liuSSType, { userId: l._id });
              }

              if (sNavigation && sGNPType) {
                sNavigation.navigate(sGNPType, {
                  userId: l._id,
                });
              }
            }}
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
            key={l._id}
            style={{
              marginVertical: 5,
              borderRadius: 5,
            }}>
            {l.avatar !== '' && (
              <Avatar.Image
                size={60}
                source={{ uri: `data:image/jpeg;base64,${l.avatar}` }}
              />
            )}

            {l.avatar === '' && (
              <Avatar.Text
                labelStyle={{ fontFamily: FontNames.MyriadProRegular }}
                size={60}
                label={getNameAvatar(l!.name)}
              />
            )}

            <ListItem.Content>
              <ListItem.Title style={{ fontFamily: FontNames.MyriadProBold }}>
                {l.name}
              </ListItem.Title>
              <ListItem.Subtitle
                style={{ fontFamily: FontNames.MyriadProRegular }}>
                Average Rating - {averageRating}
              </ListItem.Subtitle>

              <ListItem.Subtitle
                style={{
                  fontFamily: FontNames.MyriadProRegular,
                  marginTop: 10,
                  textTransform: 'uppercase',
                }}>
                {l.performanceSummary}
              </ListItem.Subtitle>
            </ListItem.Content>

            <Icon
              tvParallaxProperties={Icon}
              name='chevron-forward-outline'
              type='ionicon'
              onPress={() => {
                if (liuNavigation && liuSSType) {
                  liuNavigation.navigate(liuSSType, { userId: l._id });
                }

                if (sNavigation && sGNPType) {
                  sNavigation.navigate(sGNPType, {
                    userId: l._id,
                  });
                }
              }}
            />
          </ListItem>
        );
      })}
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

export default StarSearchListView;
