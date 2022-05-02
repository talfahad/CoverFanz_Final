import React from 'react';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import FontSizes from '../../constants/FontSizes';
import { View, Text } from 'react-native';

const BackStage = () => {
  return (
    <View>
      <Text
        style={{
          fontFamily: FontNames.PainterRegular,
          color: Colors.accentColor,
          fontSize: FontSizes.backstageFS,
        }}>
        backstage
      </Text>
    </View>
  );
};

export default BackStage;
