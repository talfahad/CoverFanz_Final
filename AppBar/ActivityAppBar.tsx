import React, { useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';

const ActivityAppBar: React.FC<{
  color?: string;
}> = ({ color = Colors.greyHeaderColorB80 }) => {
  return (
    <View
      style={{
        height: 70,
        backgroundColor: color,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: '100%',
          height: 70,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View style={{ marginBottom: -30 }}>
          <Image
            source={require('../../../assets/images/demo.png')}
            style={styles.image}
          />
        </View>
        <View style={{ paddingRight: 60 }}>
          <Text
            style={{
              fontFamily: FontNames.MyriadProBold,
              color: Colors.white,
              fontSize: 15,
            }}>
            Bo Ziemee
          </Text>
          <Text
            style={{
              fontFamily: FontNames.MyriadProRegular,
              color: Colors.white,
              fontSize: 15,
            }}>
            bo39#5654
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
});

export default ActivityAppBar;
