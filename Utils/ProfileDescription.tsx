import React from 'react';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import FontSizes from '../../constants/FontSizes';
import { Text, View } from 'react-native';
import { Button } from '@rneui/themed';

const ProfileDescription = () => {
  return (
    <View
      style={{
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <Text
        style={{
          fontFamily: FontNames.MyriadProBold,
          fontSize: 20,
          color: Colors.primaryColor,
          textAlign: 'center',
        }}>
        "ELECTRONICA A DJ LIGHTS AND SOUNDS"
      </Text>
      <Text
        style={{
          fontFamily: FontNames.MyriadProRegular,
          fontSize: FontSizes.descriptionFS,
          color: Colors.primaryColor,
          marginTop: 10,
          lineHeight: 20,
          textAlign: 'center',
        }}>
        My fans and followers are all ages, who seek High energy dance and
        lightshows, strobe, and fog. Its dance party where ever i jam.
      </Text>

      <View>
        <Button
          title='Read More'
          buttonStyle={{
            backgroundColor: Colors.primaryColor,
            borderRadius: 100,
            justifyContent: 'center',
            height: 30,
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
          titleStyle={{
            fontFamily: FontNames.MyriadProRegular,
            fontSize: FontSizes.readMoreFS,
            paddingHorizontal: 10,
          }}
          containerStyle={{
            width: '95%',
            padding: 10,
          }}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default ProfileDescription;
