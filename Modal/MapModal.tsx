import React, { useState } from 'react';
import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';
import { deviceHeight, deviceWidth } from '../../utils/utils';
import { Text, View } from 'react-native';
import CloseModalButton from '../Buttons/CloseModalButton';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const MapModal: React.FC<{
  onPress: () => any;
  isVisible: boolean;
}> = ({ onPress, isVisible }) => {
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
          flex: 1,
          borderRadius: 10,
          padding: 10,
        }}>
        <View style={{ width: '100%', flex: 1 }}>
          <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            onFail={(error) => console.error(error)}
            query={{
              key: 'AIzaSyB7F2so8oIYXsEhcXjHMcv2ylHbQzPSY5A',
              language: 'en',
            }}
          />
        </View>
        <CloseModalButton onPress={onPress} title='CLOSE' />
      </View>
    </Modal>
  );
};

export default MapModal;
