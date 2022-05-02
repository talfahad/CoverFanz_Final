import React from 'react';
import { Button } from '@rneui/themed';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import FontSizes from '../../constants/FontSizes';
import { StackNavigationProp } from '@react-navigation/stack';
import { LIUSearchStackParamList } from '../../types/mainNavigatorTypes';
import { useDispatch } from 'react-redux';
import { updateTargetStarIdBE } from '../../store/reducer/bookingEvent';

const BookingAgentButton: React.FC<{
  star_id: string;
  liuNavigation?: StackNavigationProp<LIUSearchStackParamList>;
  title?: string;
}> = ({ star_id, liuNavigation, title = 'BOOKING AGENT' }) => {
  const dispatch = useDispatch();

  return (
    <Button
      title={title}
      buttonStyle={{
        backgroundColor: Colors.primaryColor,
        borderRadius: 5,
        justifyContent: 'center',
        height: 35,
      }}
      titleStyle={{
        fontFamily: FontNames.FuturaBook,
        fontSize: FontSizes.mainButtonFS,
        paddingHorizontal: 10,
        color: Colors.white,
      }}
      containerStyle={{
        width: '100%',
        paddingTop: 5,
      }}
      onPress={() => {
        dispatch(updateTargetStarIdBE({ star_id }));
        if (liuNavigation) {
          liuNavigation
            .getParent()
            ?.navigate('CalendarDr', { star_id: star_id });
        }
      }}
    />
  );
};

export default BookingAgentButton;
