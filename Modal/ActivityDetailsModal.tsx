import React, { useState } from 'react';
import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';
import { deviceHeight, deviceWidth } from '../../utils/utils';
import { Share, Text, View } from 'react-native';
import CloseModalButton from '../Buttons/CloseModalButton';
import GlobalButton from '../Buttons/GlobalButton';
import FontNames from '../../constants/FontNames';

const ActivityDetailsModal: React.FC<{
  onClosePress: () => any;
  isVisible: boolean;
}> = ({ onClosePress, isVisible }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Free drink Details',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
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
          padding: 20,
        }}>
        <View style={{ width: '100%' }}>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontFamily: FontNames.MyriadProBold,
                fontSize: 20,
                textTransform: 'uppercase',
              }}>
              Free drink
            </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontFamily: FontNames.MyriadProBold,
                fontSize: 16,
                textTransform: 'uppercase',
              }}>
              Details
            </Text>
            <Text
              style={{ fontFamily: FontNames.MyriadProRegular, fontSize: 12 }}>
              Get a Free drink with any Purchase with an additional discount
            </Text>
          </View>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontFamily: FontNames.MyriadProBold,
                  fontSize: 14,
                  textTransform: 'uppercase',
                }}>
                Discount:{' '}
              </Text>
              <Text
                style={{
                  fontFamily: FontNames.MyriadProRegular,
                  fontSize: 14,
                }}>
                10%
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontFamily: FontNames.MyriadProBold,
                  fontSize: 14,
                  textTransform: 'uppercase',
                }}>
                Expires:{' '}
              </Text>

              <Text
                style={{
                  fontFamily: FontNames.MyriadProRegular,
                  fontSize: 14,
                }}>
                20 April, 2022
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <GlobalButton
            color={Colors.primaryColor}
            onPress={onClosePress}
            title='CLOSE'
            width='30%'
          />
          <GlobalButton
            color={Colors.primaryColor}
            onPress={onShare}
            title='SHARE'
            width='30%'
          />
        </View>
      </View>
    </Modal>
  );
};

export default ActivityDetailsModal;
