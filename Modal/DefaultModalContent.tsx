import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import FontNames from '../../constants/FontNames';
import CloseModalButton from '../Buttons/CloseModalButton';

const DefaultModalContent: React.FC<{
  onPress: () => any;
  description: string;
}> = (props) => (
  <View style={styles.content}>
    <Text style={styles.contentTitle}>{props.description}</Text>
    <CloseModalButton onPress={props.onPress} title='CLOSE' />
  </View>
);

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 16,
    marginBottom: 12,
    fontFamily: FontNames.MyriadProRegular,
    lineHeight: 25,
  },
});

export default DefaultModalContent;
