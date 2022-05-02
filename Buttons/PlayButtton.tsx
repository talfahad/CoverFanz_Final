import React, { useState } from 'react';
import { Button } from '@rneui/themed';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import FontSizes from '../../constants/FontSizes';
import { Linking } from 'react-native';
import ErrorModal from '../Modal/ErrorModal';

const PlayButton: React.FC<{ mediaUrl: string }> = ({ mediaUrl }) => {
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  return (
    <>
      <Button
        title='PLAY'
        buttonStyle={{
          backgroundColor: Colors.secondaryColor,
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
        onPress={async () => {
          try {
            const supported = await Linking.canOpenURL(mediaUrl);
            if (supported) {
              await Linking.openURL(mediaUrl);
            } else {
              setIsErrorVisible(true);
            }
          } catch (e) {
            setIsErrorVisible(true);
          }
        }}
      />
      <ErrorModal
        isVisible={isErrorVisible}
        message='Star did not attached the media'
        onPress={() => setIsErrorVisible(false)}
      />
    </>
  );
};

export default PlayButton;
