import React from 'react';
import { Text, View, Image } from 'react-native';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import FontSizes from '../../constants/FontSizes';

const DoubleThumbs: React.FC<{
  ratingByFan: number;
  ratingByVenue: number;
  identifier: string;
}> = ({ ratingByFan, ratingByVenue, identifier }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Image
              style={{ width: 80, height: 80 }}
              source={require('../../../assets/images/thumbsup.png')}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: FontNames.MyriadProBold,
                fontSize: FontSizes.bigRatingFS,
                color: Colors.primaryColor,
              }}>
              {ratingByVenue}
            </Text>
            <Text
              style={{
                fontFamily: FontNames.MyriadProRegular,
                fontSize: FontSizes.ratedByFS,
                color: Colors.primaryColor,
              }}>
              Rated By Venue
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Image
              style={{ width: 80, height: 80 }}
              source={require('../../../assets/images/thumbsup.png')}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: FontNames.MyriadProBold,
                fontSize: FontSizes.bigRatingFS,
                color: Colors.primaryColor,
              }}>
              {ratingByFan}
            </Text>
            <Text
              style={{
                fontFamily: FontNames.MyriadProRegular,
                fontSize: FontSizes.ratedByFS,
                color: Colors.primaryColor,
              }}>
              Rated By Fan
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{ width: 20, height: 20 }}
            source={require('../../../assets/images/thumbsupsmall.png')}
          />
          <Image
            style={{ width: 20, height: 20 }}
            source={require('../../../assets/images/thumbsupsmall.png')}
          />
          <Image
            style={{ width: 20, height: 20 }}
            source={require('../../../assets/images/thumbsupsmall.png')}
          />
          <Image
            style={{ width: 20, height: 20 }}
            source={require('../../../assets/images/thumbsupsmall.png')}
          />
          <Image
            style={{ width: 20, height: 20 }}
            source={require('../../../assets/images/thumbsupsmall.png')}
          />
        </View>
        <Text
          style={{
            fontFamily: FontNames.MyriadProRegular,
            marginVertical: 10,
            color: Colors.greyTextColorB70,
            textAlign: 'center',
          }}>
          STAR #{identifier} - PERFORMANCE
        </Text>
      </View>
    </View>
  );
};

export default DoubleThumbs;
