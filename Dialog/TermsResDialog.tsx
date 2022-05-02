import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Dialog from 'react-native-dialog';
import { RadioButton, Text, TextInput } from 'react-native-paper';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';

const TermResDialog: React.FC<{
  visible: boolean;
  setVisible: (command: boolean) => void;
}> = ({ visible, setVisible }) => {
  const [terms, setTerms] = React.useState('');
  const [restrictions, setRestrictions] = React.useState('');

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    console.log(terms, restrictions);
    setVisible(false);
  };

  return (
    <View>
      <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
        <Dialog.Title style={styles.textStyle}>
          Tell them about your terms and restrictions.
        </Dialog.Title>
        <Dialog.Description></Dialog.Description>

        <Dialog.Input
          underlineColorAndroid={Colors.primaryColor}
          style={{
            width: '100%',
            maxWidth: 200,
            ...styles.textStyle,
          }}
          placeholder='Your Terms'
          onChangeText={(text) => setTerms(text)}></Dialog.Input>

        <Dialog.Input
          underlineColorAndroid={Colors.primaryColor}
          style={{
            width: '100%',
            maxWidth: 200,
            ...styles.textStyle,
          }}
          placeholder='Your Restrictions'
          onChangeText={(text) => setRestrictions(text)}></Dialog.Input>

        <Dialog.Button
          style={styles.textStyle}
          color={Colors.primaryColor}
          label='Cancel'
          onPress={handleCancel}
        />
        <Dialog.Button
          style={styles.textStyle}
          color={Colors.primaryColor}
          label='Submit'
          onPress={handleSubmit}
        />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: FontNames.MyriadProRegular,
  },
});

export default TermResDialog;
