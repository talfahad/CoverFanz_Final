import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { EULAScreensProps } from '../../types/guestNavigatorTypes';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import FontSizes from '../../constants/FontSizes';
import GlobalButton from '../../components/Buttons/GlobalButton';
import { CheckBox } from 'react-native-elements';

const EULAScreen: React.FC<EULAScreensProps> = ({
  route,
  navigation,
}: EULAScreensProps) => {
  const [checked, setChecked] = useState(false);
  const [isDisableCB, setIsDisableCB] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ padding: 20, marginTop: 20 }}
        onMomentumScrollEnd={() => setIsDisableCB(false)}>
        <View style={{ paddingBottom: 10 }}>
          <Text style={styles.eulaMainHeadline}>
            END user LICENSE AGREEMENT
          </Text>

          <Text style={styles.eulaText}>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Why do we use it? It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters, as opposed to using
            'Content here, content here
          </Text>

          <Text style={styles.eulaheadline}>
            This is a headline inside Eula
          </Text>

          <Text style={styles.eulaText}>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Why do we use it? It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters, as opposed to using
            'Content here, content here
          </Text>

          <Text style={styles.eulaheadline}>
            This is a headline inside Eula
          </Text>

          <Text style={styles.eulaText}>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Why do we use it? It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters, as opposed to using
            'Content here, content here
          </Text>

          <Text style={styles.eulaheadline}>
            This is a headline inside Eula
          </Text>

          <Text style={styles.eulaText}>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Why do we use it? It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters, as opposed to using
            'Content here, content here
          </Text>

          <Text style={styles.eulaheadline}>
            This is a headline inside Eula
          </Text>

          <Text style={styles.eulaText}>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Why do we use it? It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters, as opposed to using
            'Content here, content here
          </Text>

          <Text style={styles.eulaheadline}>
            This is a headline inside Eula
          </Text>

          <Text style={styles.eulaText}>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Why do we use it? It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters, as opposed to using
            'Content here, content here
          </Text>
        </View>
      </ScrollView>

      <View
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <CheckBox
          disabled={isDisableCB}
          containerStyle={{
            backgroundColor: Colors.greyBackgroundColor,
            borderColor: Colors.greyBackgroundColor,
          }}
          textStyle={{
            fontFamily: FontNames.MyriadProRegular,
            color: Colors.primaryColor,
          }}
          title='I have Read & Agree To the Terms & Agreements'
          style={{}}
          checked={checked}
          onPress={() => setChecked((checked) => !checked)}
        />

        <GlobalButton
          title='Next'
          onPress={() => {
            navigation.navigate('EULAWelcome');
          }}
          width={100}
          color={Colors.primaryColor}
          disabled={!checked}
        />
      </View>
    </SafeAreaView>
  );
};

export const screenOptions = (navigator: EULAScreensProps) => {
  return {
    headerTitle: 'EULA Screen',
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greyBackgroundColor,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 0,
    padding: 20,
  },

  eulaMainHeadline: {
    fontFamily: FontNames.MyriadProBold,
    fontSize: 20,
    marginBottom: 10,
    color: Colors.primaryColor,
    textTransform: 'uppercase',
  },

  eulaheadline: {
    fontFamily: FontNames.MyriadProBold,
    fontSize: 17,
    marginTop: 15,
    marginBottom: 5,
    color: Colors.primaryColor,
  },

  eulaText: {
    fontFamily: FontNames.MyriadProRegular,
    fontSize: FontSizes.normalFS,
    lineHeight: 25,
    marginVertical: 10,
    color: Colors.primaryColor,
  },
});
export default EULAScreen;
