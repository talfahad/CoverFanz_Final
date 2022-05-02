import React from 'react';
import { Text, View, Image } from 'react-native';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import FontSizes from '../../constants/FontSizes';

const SingleThumbs: React.FC<{
  ratedBy: 'Star' | 'Venue' | 'Fan';
  rating: number;
  averageRating?: number;
  userType: 'Star' | 'Venue';
  identifier: string;
}> = ({ ratedBy, rating, userType, identifier, averageRating }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Image
            style={{ width: 100, height: 110, marginLeft: -10 }}
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
            {averageRating ? averageRating : rating}
          </Text>
          <Text
            style={{
              fontFamily: FontNames.MyriadProRegular,
              fontSize: FontSizes.ratedByFS,
              color: Colors.primaryColor,
            }}>
            {averageRating || averageRating === 0
              ? `Rating`
              : `Rated By ${ratedBy}`}
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        {userType === 'Star' && (
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
        )}
        <Text
          style={{
            fontFamily: FontNames.MyriadProRegular,
            marginVertical: 5,
            color: Colors.greyTextColorB70,
            textAlign: 'center',
            textTransform: 'uppercase',
          }}>
          {userType === 'Star'
            ? `STAR #${identifier} - PERFORMANCE`
            : `VENUE #${identifier}`}
        </Text>
      </View>
    </View>
  );
};

export default SingleThumbs;
