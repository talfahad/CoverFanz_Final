import React, { useState } from 'react';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import FontSizes from '../../constants/FontSizes';
import { Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import { isAndroid, isLarge, isSmall } from '../../utils/utils';
import ViewMoreModal from '../Modal/ViewMoreModal';

const Description: React.FC<{
  title: string;
  description: string;
  desIsVisible: boolean;
  isFan?: boolean;
}> = ({ title, desIsVisible, description, isFan = false }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const isViewMore = isLarge
    ? description.length > 370
    : isSmall
    ? description.length > 95
    : false;
  const descriptionVM = isLarge
    ? description.slice(0, 370)
    : isSmall
    ? description.slice(0, 95)
    : '';

  return (
    <View
      style={{
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 15,
      }}>
      {!isFan && (
        <Text
          style={{
            fontFamily: FontNames.MyriadProBold,
            fontSize: 20,
            color: Colors.primaryColor,
            textAlign: 'center',
          }}>
          "{title}"
        </Text>
      )}
      <Text
        style={{
          fontFamily: FontNames.MyriadProRegular,
          fontSize: FontSizes.descriptionFS,
          color: Colors.primaryColor,
          marginTop: 10,
          lineHeight: 20,
          textAlign: 'center',
        }}>
        {isViewMore && desIsVisible ? descriptionVM + '...' : description}
      </Text>

      {isViewMore && desIsVisible && (
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
              marginTop: isAndroid ? -3 : 0,
            }}
            containerStyle={{
              width: '95%',
              padding: 10,
            }}
            onPress={() => toggleModal()}
          />

          <ViewMoreModal
            isVisible={isModalVisible}
            onPress={toggleModal}
            description={description}
          />
        </View>
      )}
    </View>
  );
};

export default Description;
