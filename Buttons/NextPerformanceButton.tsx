import React from 'react';
import { Button } from '@rneui/themed';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import { View, Text } from 'react-native';
import FontSizes from '../../constants/FontSizes';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  GuestNavigatorParamList,
  GuestNavigatorParamType,
} from '../../types/guestNavigatorTypes';
import {
  LIUSearchStackParamList,
  LIUSearchStackParamType,
} from '../../types/mainNavigatorTypes';

const NPButtonText = () => {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontFamily: FontNames.FuturaBook,
          color: Colors.white,
          fontSize: FontSizes.mainButtonFS,
          textTransform: 'uppercase',
        }}>
        Next Performance
      </Text>
      <Text
        style={{
          fontFamily: FontNames.FuturaBook,
          color: Colors.white,
          fontSize: FontSizes.mainButtonFS,
          textTransform: 'uppercase',
        }}>
        (Details + Directions)
      </Text>
    </View>
  );
};

const NextPerformanceButton: React.FC<{
  userId: string;
  liuNavigation?: StackNavigationProp<LIUSearchStackParamList>;
  liuSSType?: LIUSearchStackParamType;
  sNavigation?: StackNavigationProp<GuestNavigatorParamList>;
  sGNPType?: GuestNavigatorParamType;
}> = ({ userId, liuNavigation, liuSSType, sNavigation, sGNPType }) => {
  return (
    <Button
      title={<NPButtonText />}
      buttonStyle={{
        backgroundColor: Colors.accentColor,
        borderRadius: 5,
        justifyContent: 'center',
        height: 45,
      }}
      titleStyle={{
        fontFamily: FontNames.FuturaBook,
        fontSize: FontSizes.mainButtonFS,
        color: Colors.white,
        paddingHorizontal: 10,
      }}
      containerStyle={{
        width: '100%',
        paddingTop: 5,
      }}
      onPress={() => {
        if (liuNavigation && liuSSType) {
          liuNavigation.navigate(liuSSType, { userId });
        }
        if (sNavigation && sGNPType) {
          sNavigation.navigate(sGNPType, { userId });
        }
      }}
    />
  );
};

export default NextPerformanceButton;
