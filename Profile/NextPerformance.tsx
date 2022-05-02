import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, View, Text } from 'react-native';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import { GuestNavigatorParamList } from '../../types/guestNavigatorTypes';
import { LIUSearchStackParamList } from '../../types/mainNavigatorTypes';
import AppBar from '../AppBar/AppBar';
import NextPListView from './../ListView/NextPListView';

const NextPerformance: React.FC<{
  liuNavigation?: StackNavigationProp<LIUSearchStackParamList>;
  liuRoute?: RouteProp<LIUSearchStackParamList>;
  sNavigation?: StackNavigationProp<GuestNavigatorParamList>;
  sRoute?: RouteProp<GuestNavigatorParamList>;
}> = ({ liuNavigation, liuRoute, sNavigation, sRoute }) => {
  return (
    <>
      <StatusBar backgroundColor={Colors.greyHeaderColorB80} />

      <View
        style={{
          marginVertical: 10,
          paddingTop: 20,
        }}>
        <Text
          style={{
            fontFamily: FontNames.MyriadProRegular,
            fontSize: 20,
            textTransform: 'uppercase',
            color: Colors.xlight,
          }}>
          bo39#2311: Next Performance
        </Text>
      </View>

      <View style={{ width: '90%' }}>
        {sNavigation && (
          <NextPListView sNavigation={sNavigation} sGNPType={'VenuePVO'} />
        )}

        {liuNavigation && (
          <NextPListView
            liuNavigation={liuNavigation}
            liuSSType={'LIUVenuePVO'}
          />
        )}
      </View>
    </>
  );
};

export default NextPerformance;
