import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  View,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { globalStyles } from '../../styles/globalStyle';
import FontNames from '../../constants/FontNames';

type TextInputTypeProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  ref?: React.Ref<RNTextInput>;
  touched?: boolean;
} & TextInputProps;

const TextInput: React.FC<TextInputTypeProps> = React.forwardRef(
  ({ icon, error, touched, ...props }, ref) => {
    const [iconEye, setIconEye] =
      useState<keyof typeof Ionicons.glyphMap>('eye-off');
    const [hidePassword, setHidePassword] = useState(true);
    const validationColor = !touched
      ? Colors.primaryColor
      : error
      ? Colors.accentColor
      : Colors.primaryColor;

    const _changeIconEye = () => {
      iconEye !== 'eye-off'
        ? (setIconEye('eye-off'), setHidePassword(true))
        : (setIconEye('eye'), setHidePassword(false));
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 48,
          borderRadius: 8,
          borderColor: validationColor,
          borderWidth: StyleSheet.hairlineWidth,
          backgroundColor: Colors.xlight,
          padding: 8,
        }}>
        <View style={{ padding: 8 }}>
          <Ionicons name={icon} color={validationColor} size={16} />
        </View>

        <View style={{ flex: 1 }}>
          <RNTextInput
            underlineColorAndroid='transparent'
            style={{
              fontFamily: FontNames.MyriadProBold,
              color: Colors.primaryColor,
            }}
            placeholderTextColor={Colors.primaryColor}
            {...props}
            ref={ref}
            secureTextEntry={props.secureTextEntry ? hidePassword : false}
          />
        </View>

        {props.secureTextEntry && (
          <View style={{ padding: 8 }}>
            <Ionicons
              onPress={_changeIconEye}
              name={iconEye}
              color='#223e4b'
              size={16}
            />
          </View>
        )}
      </View>
    );
  }
);

export default TextInput;
