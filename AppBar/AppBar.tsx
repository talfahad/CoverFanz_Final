import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import { Icon } from 'react-native-elements';
import ReportDialog from '../../components/Dialog/ReportDialog';

const AppBar: React.FC<{
  title: string;
  reportTo?: string;
  isLoggedIn: boolean;
  viewOnly?: boolean;
  color?: string;
  cfColor?: string;
}> = ({
  title,
  reportTo,
  isLoggedIn,
  viewOnly,
  color = Colors.greyHeaderColorB80,
  cfColor = Colors.white,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <View
      style={{
        height: 60,
        backgroundColor: color,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: FontNames.MyriadProBold,
              fontSize: 23,
              color: cfColor,
              textTransform: 'uppercase',
            }}>
            COVERFANZ{' '}
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
        {viewOnly && (
          <Text
            style={{
              color: Colors.white,
              fontFamily: FontNames.MyriadProRegular,
            }}>
            View-Only
          </Text>
        )}
      </View>

      {isLoggedIn && reportTo && (
        <>
          <View style={{ position: 'absolute', right: 10 }}>
            <Icon
              tvParallaxProperties={Icon}
              name='more-vert'
              type='material-icons'
              color={Colors.white}
              onPress={() => {
                setVisible((visibility) => !visibility);
              }}
            />
          </View>

          <View>
            <ReportDialog
              visible={visible}
              reportTo={reportTo}
              setVisible={setVisible}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default AppBar;
