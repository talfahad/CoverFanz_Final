import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { globalStyles } from '../../styles/globalStyle';
import Colors from '../../constants/Colors';
import { Searchbar } from 'react-native-paper';
import FontNames from '../../constants/FontNames';
import StarSearchListView from '../ListView/StarSearchListView';
import VenueSearchListView from '../ListView/VenueSearchListView';
import { RadioButton } from 'react-native-paper';
import { gql, useMutation, useQuery } from '@apollo/client';
import { LIUSearchStackParamList } from '../../types/mainNavigatorTypes';
import { GuestNavigatorParamList } from '../../types/guestNavigatorTypes';
import { StackNavigationProp } from '@react-navigation/stack';

const GET_STAR = gql`
  query ($input: SearchInput!) {
    getPerformerByNameOrIdentifier(input: $input) {
      _id
      name
      userType
      ratingByFan
      avatar
      ratingByStar
      ratingByVenue
      performanceSummary
      identifier
      location
    }
  }
`;

const GET_VENUE = gql`
  query ($input: SearchInput!) {
    getVenueByNameOrAddress(input: $input) {
      _id
      name
      userType
      avatar
      ratingByFan
      ratingByStar
      ratingByVenue
      performanceSummary
      identifier
      location
    }
  }
`;

const Search: React.FC<{
  liuNavigation?: StackNavigationProp<LIUSearchStackParamList>;
  sNavigation?: StackNavigationProp<GuestNavigatorParamList>;
}> = ({ liuNavigation, sNavigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [radioValue, setRadioValue] = useState('star');

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  const {
    data: venueData,
    loading: venueLoading,
    error: venueError,
  } = useQuery(GET_VENUE, {
    variables: {
      input: {
        query: searchQuery,
        limit: 5,
      },
    },
  });

  const {
    data: starData,
    loading: starLoading,
    error: starError,
  } = useQuery(GET_STAR, {
    variables: {
      input: {
        query: searchQuery,
        limit: 5,
      },
    },
  });

  let venueArr;
  let starArr;

  if (venueData?.getVenueByNameOrAddress) {
    venueArr = venueData.getVenueByNameOrAddress;
  }

  if (starData?.getPerformerByNameOrIdentifier) {
    starArr = starData.getPerformerByNameOrIdentifier;
  }

  return (
    <View style={{ ...globalStyles.screen, ...styles.background }}>
      <View style={{ marginBottom: 10 }}>
        <Text
          style={{
            fontFamily: FontNames.MyriadProRegular,
            fontSize: 20,
            textTransform: 'uppercase',
            color: Colors.xlight,
          }}>
          Search for your Performer
        </Text>
      </View>

      <View>
        <RadioButton.Group
          onValueChange={(radioValue: string) => setRadioValue(radioValue)}
          value={radioValue}>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: FontNames.MyriadProRegular,
                color: Colors.xlight,
                textTransform: 'uppercase',
              }}>
              Performer Type:{' '}
            </Text>
            <RadioButton.Item
              color={Colors.xlight}
              uncheckedColor={Colors.xlight}
              label='Star'
              labelStyle={{
                color: Colors.xlight,
                fontFamily: FontNames.MyriadProRegular,
                textTransform: 'uppercase',
              }}
              value='star'
            />
            <RadioButton.Item
              color={Colors.xlight}
              uncheckedColor={Colors.xlight}
              label='Venue'
              value='venue'
              labelStyle={{
                color: Colors.xlight,
                textTransform: 'uppercase',
                fontFamily: FontNames.MyriadProRegular,
              }}
            />
          </View>
        </RadioButton.Group>
      </View>

      <View>
        <Searchbar
          placeholder={
            radioValue === 'star' ? 'NAME OR STAR #' : 'NAME OR ADDRESS'
          }
          onChangeText={onChangeSearch}
          value={searchQuery}
          inputStyle={{ fontFamily: FontNames.MyriadProRegular }}
          style={{
            width: '95%',
            backgroundColor: Colors.xlight,
            fontFamily: FontNames.MyriadProBold,
          }}
        />
      </View>
      <View style={{ width: '95%' }}>
        {liuNavigation &&
          starArr &&
          starArr?.length > 0 &&
          radioValue === 'star' && (
            <StarSearchListView
              liuNavigation={liuNavigation}
              liuSSType={'LIUStarPVO'}
              data={starArr}
            />
          )}

        {liuNavigation &&
          venueArr &&
          venueArr?.length > 0 &&
          radioValue === 'venue' && (
            <VenueSearchListView
              liuNavigation={liuNavigation}
              liuSSType={'LIUVenuePVO'}
              data={venueArr}
            />
          )}

        {sNavigation &&
          starArr &&
          starArr?.length > 0 &&
          radioValue === 'star' && (
            <StarSearchListView
              sNavigation={sNavigation}
              sGNPType={'StarPVO'}
              data={starArr}
            />
          )}

        {sNavigation &&
          venueArr &&
          venueArr?.length > 0 &&
          radioValue === 'venue' && (
            <VenueSearchListView
              sNavigation={sNavigation}
              sGNPType={'VenuePVO'}
              data={venueArr}
            />
          )}

        {(!venueArr || !starArr) && (
          <Text
            style={{
              fontFamily: FontNames.MyriadProRegular,
              color: Colors.xlight,
              alignSelf: 'center',
              marginTop: 20,
              textTransform: 'uppercase',
            }}>
            {venueLoading || starLoading
              ? 'PLEASE WAIT....'
              : 'Start typing to see the result....'}
          </Text>
        )}

        {radioValue === 'star' && starArr?.length === 0 && (
          <Text
            style={{
              fontFamily: FontNames.MyriadProRegular,
              color: Colors.xlight,
              alignSelf: 'center',
              marginTop: 20,
              textTransform: 'uppercase',
            }}>
            Tpye something else to get results.
          </Text>
        )}

        {radioValue === 'venue' && venueArr?.length === 0 && (
          <Text
            style={{
              fontFamily: FontNames.MyriadProRegular,
              color: Colors.xlight,
              alignSelf: 'center',
              marginTop: 20,
              textTransform: 'uppercase',
            }}>
            Tpye something else to get results.
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    justifyContent: 'flex-start',
    paddingTop: 80,
    backgroundColor: Colors.primaryColor,
  },
});

export default Search;
