import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';

const NameDisplay: React.FC<{
  name: string;
  dType: 'VENUE' | 'FAN' | 'STAGE';
}> = ({ name, dType }) => {
  return (
    <View style={{ alignItems: 'center', paddingTop: 5 }}>
      <Text
        style={{
          fontFamily: FontNames.MyriadProRegular,
          color: Colors.primaryColor,
          textTransform: 'uppercase',
        }}>
        {dType} NAME
      </Text>
      <Text
        style={{
          fontFamily: FontNames.MyriadProBold,
          color: Colors.primaryColor,
          textTransform: 'uppercase',
          fontSize: 20,
          marginTop: 5,
        }}>
        {name}
      </Text>
    </View>
  );
};

export default NameDisplay;
