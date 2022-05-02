import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '@rneui/themed';
import React from 'react';
import { Alert, View } from 'react-native';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import { GuestNavigatorParamList } from '../../types/guestNavigatorTypes';
import { LIUSearchStackParamList } from '../../types/mainNavigatorTypes';
import { useDispatch } from 'react-redux';
import { updateTargetStarIdBE } from '../../store/reducer/bookingEvent';

const BookingBottomButton: React.FC<{
  buttonText: string;
  liuNavigation?: StackNavigationProp<LIUSearchStackParamList>;
  isPremium?: boolean;
  sNavigation?: StackNavigationProp<GuestNavigatorParamList>;
  disabled?: boolean;
  star_id?: string;
}> = ({
  buttonText,
  liuNavigation,
  sNavigation,
  isPremium,
  star_id,
  disabled = false,
}) => {
  const dispatch = useDispatch();

  return (
    <View style={{ paddingBottom: 15 }}>
      <Button
        title={buttonText}
        disabled={disabled}
        buttonStyle={{
          backgroundColor: Colors.primaryColor,
          borderRadius: 100,
          justifyContent: 'flex-start',
          height: 38,
        }}
        titleStyle={{
          fontFamily: FontNames.MyriadProRegular,
          fontSize: 16,
          paddingHorizontal: 10,
        }}
        containerStyle={{
          width: '95%',
        }}
        onPress={() => {
          if (sNavigation) {
            sNavigation.navigate('Login');
          }

          if (liuNavigation && isPremium && star_id) {
            dispatch(updateTargetStarIdBE({ star_id }));
            liuNavigation
              .getParent()
              ?.navigate('CalendarDr', { star_id: star_id });
          }

          if (liuNavigation && !isPremium) {
            Alert.alert(
              'Subscription with GPay and ApplePay is permitted only when the application is published'
            );
          }
        }}
      />
    </View>
  );
};

export default BookingBottomButton;
