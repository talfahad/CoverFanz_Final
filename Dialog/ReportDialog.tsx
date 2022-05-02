import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Dialog from 'react-native-dialog';
import { RadioButton, Text, TextInput } from 'react-native-paper';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import moment from 'moment';

import { gql, useMutation, useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';

const SUBMIT_REPORT = gql`
  mutation submitReport($input: ReportInput!) {
    submitReport(input: $input) {
      report
      reportTime
      reportedBy {
        _id
      }
    }
  }
`;

const ReportDialog: React.FC<{
  visible: boolean;
  reportTo: string;
  setVisible: (command: boolean) => void;
}> = ({ visible, setVisible, reportTo }) => {
  const { isAuthenticated, user: c_user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  const [report, setReport] = useState('abusive_language');
  const [otherReason, setOtherReason] = React.useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitReport, reportData] = useMutation(SUBMIT_REPORT);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitReport({
        variables: {
          input: {
            report: otherReason ?? report,
            reportedTo: reportTo,
            reportTime: moment().format(),
          },
        },
      });
      setIsSubmitting(false);
    } catch (e) {
      //console.log(e);
      // TODO: ADD MODAL
    }

    setIsSubmitting(false);
    setVisible(false);
  };

  return (
    <View>
      <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
        <Dialog.Title style={styles.textStyle}>
          {isSubmitting ? 'Please wait....' : 'Report User'}
        </Dialog.Title>
        <Dialog.Description>
          <RadioButton.Group
            onValueChange={(newValue) => {
              setOtherReason('');
              setReport(newValue);
            }}
            value={report}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.textStyle}>Abusive Language</Text>
              <RadioButton
                color={Colors.accentColor}
                value='abusive_language'
                uncheckedColor={Colors.accentColor}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.textStyle}>Inappropriate Picture</Text>
              <RadioButton
                color={Colors.accentColor}
                uncheckedColor={Colors.accentColor}
                value='inappropriate_picture'
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.textStyle}>Other Reason</Text>
              <RadioButton
                color={Colors.accentColor}
                uncheckedColor={Colors.accentColor}
                value='other'
              />
            </View>
          </RadioButton.Group>
        </Dialog.Description>

        {report === 'other' && (
          <Dialog.Input
            underlineColorAndroid={Colors.accentColor}
            style={{
              width: '100%',
              maxWidth: 200,
              ...styles.textStyle,
            }}
            placeholder='Explain the reason'
            onChangeText={(text) => setOtherReason(text)}></Dialog.Input>
        )}
        <Dialog.Button
          style={styles.textStyle}
          color={Colors.accentColor}
          label='Cancel'
          onPress={handleCancel}
        />
        <Dialog.Button
          style={styles.textStyle}
          color={Colors.accentColor}
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

export default ReportDialog;
