import React from 'react';
import FontNames from '../../constants/FontNames';
import { Button } from '@rneui/themed';
import FontSizes from '../../constants/FontSizes';
import Colors from '../../constants/Colors';

const CloseModalButton: React.FC<{
  onPress: () => void;
  title: string;
  width?: string;
}> = (props) => {
  return (
    <Button
      onPress={props.onPress}
      title={props.title}
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
        paddingTop: 5,
      }}
    />
  );
};

export default CloseModalButton;
