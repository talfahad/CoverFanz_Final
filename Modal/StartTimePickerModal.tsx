import React, { useState } from 'react';
import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';
import { deviceHeight, deviceWidth } from '../../utils/utils';
import { Text, View } from 'react-native';
import CloseModalButton from '../Buttons/CloseModalButton';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

const StartTimePickerModal: React.FC<{
  onPress: () => any;
  isVisible: boolean;
  date: Date;
  onDateChange: (event: DateTimePickerEvent, date?: Date) => void;
}> = ({ onPress, isVisible, onDateChange, date }) => {
  return (
    <Modal
      testID={'modal'}
      isVisible={isVisible}
      backdropColor={Colors.dark}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      backdropOpacity={0.8}
      animationIn='zoomInDown'
      animationOut='zoomOutUp'
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: Colors.xlight,
            borderRadius: 10,
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 20,
          }}>
          <DateTimePicker
            value={new Date(date)}
            mode='time'
            display='spinner'
            onChange={onDateChange}
            style={{
              backgroundColor: Colors.xlight,
            }}
          />
        </View>
        <CloseModalButton onPress={onPress} title='CLOSE' />
      </View>
    </Modal>
  );
};

export default StartTimePickerModal;
