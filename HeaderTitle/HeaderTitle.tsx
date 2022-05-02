import React from 'react';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import { Text, View } from 'react-native';

const HeaderTitle: React.FC<{ title: string; t1?: string }> = ({
  title,
  t1 = 'COVERFANZ',
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
      }}>
      <Text
        style={{
          fontFamily: FontNames.MyriadProBold,
          fontSize: 23,
          color: Colors.white,
          textTransform: 'uppercase',
        }}>
        {t1}{' '}
      </Text>
      <Text
        style={{
          fontFamily: FontNames.StrasuaRegular,
          fontSize: 23,
          color: Colors.secondaryColor,
          textTransform: 'uppercase',
        }}>
        {title}
      </Text>
    </View>
  );
};

export default HeaderTitle;
