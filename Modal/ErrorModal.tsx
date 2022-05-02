import React, { useState } from 'react';
import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';
import { deviceHeight, deviceWidth } from '../../utils/utils';
import { Text, View } from 'react-native';
import CloseModalButton from '../Buttons/CloseModalButton';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import FontNames from '../../constants/FontNames';
import FontSizes from '../../constants/FontSizes';
import { Button } from '@rneui/themed';

const ErrorModal: React.FC<{
  onPress: () => any;
  isVisible: boolean;
  message?: string;
}> = ({ onPress, isVisible, message = 'Some unknown error Occured.' }) => {
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
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: FontNames.MyriadProRegular,
              textAlign: 'center',
              padding: 20,

              fontSize: 18,
              color: Colors.accentColor,
            }}>
            {message}
          </Text>
        </View>
        <Button
          onPress={onPress}
          title='CLOSE'
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
            paddingTop: 20,
            width: 100,
            alignSelf: 'center',
          }}
        />
      </View>
    </Modal>
  );
};

export default ErrorModal;
