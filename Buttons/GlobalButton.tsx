import React from 'react';
import FontNames from '../../constants/FontNames';
import { Button } from '@rneui/themed';
import FontSizes from '../../constants/FontSizes';
import Colors from '../../constants/Colors';

const GlobalButton: React.FC<{
  onPress: () => void;
  title: string;
  width: number | string;
  color: string;
  disabled?: boolean;
  isLoading?: boolean;
  disabledColor?: string;
}> = ({
  onPress,
  title,
  width,
  color,
  isLoading = false,
  disabled = false,
  disabledColor = Colors.white,
}) => {
  return (
    <Button
      onPress={onPress}
      disabled={disabled}
      loading={isLoading}
      title={title}
      disabledStyle={{ backgroundColor: disabledColor }}
      disabledTitleStyle={{ color: Colors.darkGray }}
      buttonStyle={{
        backgroundColor: color,
        borderRadius: 5,
        justifyContent: 'center',
        height: 35,
      }}
      titleStyle={{
        fontFamily: FontNames.FuturaBook,
        fontSize: FontSizes.mainButtonFS,
        paddingHorizontal: 10,
        color: Colors.white,
        textTransform: 'uppercase',
      }}
      containerStyle={{
        width: width,
        paddingVertical: 10,
      }}
    />
  );
};

export default GlobalButton;
