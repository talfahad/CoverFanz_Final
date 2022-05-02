import React, { useState } from 'react';
import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';
import { deviceHeight, deviceWidth } from '../../utils/utils';
import DefaultModalContent from './DefaultModalContent';

const ViewMoreModal: React.FC<{
  description: string;
  onPress: () => any;
  isVisible: boolean;
}> = ({ description, onPress, isVisible }) => {
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
      <DefaultModalContent onPress={onPress} description={description} />
    </Modal>
  );
};

export default ViewMoreModal;
