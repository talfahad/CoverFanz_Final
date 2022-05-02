import { Button } from '@rneui/themed';
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Avatar } from 'react-native-paper';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import FontSizes from '../../constants/FontSizes';
import { getNameAvatar } from '../../utils/functions';
import NextPerformanceButton from '../Buttons/NextPerformanceButton';
import PlayButton from '../Buttons/PlayButtton';
import ShowTime from '../Buttons/ShowTime';
import BookingAgentButton from '../Buttons/BookingAgentButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { GuestNavigatorParamList } from '../../types/guestNavigatorTypes';
import {
  LIUSearchStackParamList,
  UserHomeStackParamList,
} from '../../types/mainNavigatorTypes';

const AvatarView: React.FC<{
  userId: string;
  url?: string;
  avatar: string;
  name: string;
  liuNavigation?: StackNavigationProp<LIUSearchStackParamList>;
  sNavigation?: StackNavigationProp<GuestNavigatorParamList>;
  viewType:
    | string
    | 'fanVenue'
    | 'showPlay'
    | 'showNPPlay'
    | 'showNPBAPlay'
    | 'showNPBA'
    | 'justShow';
}> = ({
  avatar,
  name,
  userId,
  url = '',
  viewType,
  liuNavigation,
  sNavigation,
}) => {
  return (
    <View
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}>
      {viewType === 'fanVenue' && (
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {avatar !== '' && (
            <Avatar.Image
              size={130}
              source={{ uri: `data:image/jpeg;base64,${avatar}` }}
            />
          )}

          {avatar === '' && (
            <Avatar.Text
              labelStyle={{ fontFamily: FontNames.MyriadProRegular }}
              size={130}
              label={getNameAvatar(name)}
            />
          )}
        </View>
      )}

      {viewType !== 'fanVenue' && (
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View>
            {avatar !== '' && (
              <Avatar.Image
                size={130}
                source={{ uri: `data:image/jpeg;base64,${avatar}` }}
              />
            )}

            {avatar === '' && (
              <Avatar.Text
                labelStyle={{ fontFamily: FontNames.MyriadProRegular }}
                size={130}
                label={getNameAvatar(name)}
              />
            )}
          </View>
          <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 15,
            }}>
            {(viewType === 'justShow' ||
              viewType === 'showPlay' ||
              viewType === 'showNPBA' ||
              viewType === 'showNPBAPlay' ||
              viewType === 'showNPPlay') && <ShowTime />}

            {(viewType === 'showNPBA' ||
              viewType === 'showNPBAPlay' ||
              viewType === 'showNPPlay') &&
              liuNavigation && (
                <NextPerformanceButton
                  liuSSType='LIUNextPerformance'
                  liuNavigation={liuNavigation}
                  userId={userId}
                />
              )}

            {(viewType === 'showNPBA' ||
              viewType === 'showNPBAPlay' ||
              viewType === 'showNPPlay') &&
              sNavigation && (
                <NextPerformanceButton
                  sGNPType='NextPerformance'
                  sNavigation={sNavigation}
                  userId={userId}
                />
              )}

            {(viewType === 'showNPBA' || viewType === 'showNPBAPlay') &&
              liuNavigation && (
                <BookingAgentButton
                  liuNavigation={liuNavigation}
                  star_id={userId}
                />
              )}

            {(viewType === 'showNPBAPlay' ||
              viewType === 'showNPPlay' ||
              viewType === 'showPlay') && <PlayButton mediaUrl={url} />}
          </View>
        </View>
      )}
    </View>
  );
};

export default AvatarView;
