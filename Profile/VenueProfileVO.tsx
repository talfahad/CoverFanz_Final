import React from 'react';
import { Text, View, StatusBar, Image, ActivityIndicator } from 'react-native';
import { GuestNavigatorParamList } from '../../types/guestNavigatorTypes';
import Colors from '../../constants/Colors';
import SingleThumbs from '../../components/Thumbs/SingleThumbs';
import AppBar from '../../components/AppBar/AppBar';
import AvatarView from './../../components/AvatarView/AvatarView';
import NameDisplay from '../../components/NameDisplay/NameDisplay';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LIUSearchStackParamList } from '../../types/mainNavigatorTypes';
import Description from '../Description/Description';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { gql, useMutation, useQuery } from '@apollo/client';
import { getAvatarViewType, getAverageRating } from '../../utils/functions';

const GET_USER_BY_ID = gql`
  query ($input: UserIdInput!) {
    getUserById(input: $input) {
      _id
      avatar
      name
      email
      identifier
      mediaUrl
      userType
      description
      premium
      location
      entertrainerFeatures
      performanceSummary
      ratingByFan
      ratingByStar
      ratingByVenue
    }
  }
`;

const VenueProfileVO: React.FC<{
  liuNavigation?: StackNavigationProp<LIUSearchStackParamList>;
  liuRoute?: RouteProp<LIUSearchStackParamList>;
  sNavigation?: StackNavigationProp<GuestNavigatorParamList>;
  sRoute?: RouteProp<GuestNavigatorParamList>;
}> = ({ liuNavigation, liuRoute, sNavigation, sRoute }) => {
  let userId;
  if (liuRoute) {
    userId = liuRoute.params?.userId;
  }

  if (sRoute) {
    userId = sRoute.params?.userId;
  }

  const { isAuthenticated, user: c_user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  //FIXME: Not so serious matching this 625b814556ad4919749ea54b will almost impossible
  const {
    data: t_user,
    loading: t_userLodaing,
    error: t_userError,
  } = useQuery(GET_USER_BY_ID, {
    variables: {
      input: {
        _id: userId ?? '625b814556ad4919749ea54b',
      },
    },
  });

  let userInfoX;
  let viewType;

  if (t_user?.getUserById) {
    userInfoX = t_user.getUserById;
    viewType = getAvatarViewType(
      isAuthenticated,
      userInfoX.userType,
      userInfoX.entertrainerFeatures,
      c_user.userType
    );
  }

  return (
    <>
      {t_userLodaing && (
        <ActivityIndicator
          style={{ marginTop: 50 }}
          animating={true}
          color={Colors.primaryColor}
        />
      )}

      {t_userError && (
        <View style={{ marginTop: 50 }}>
          <Text>Unknown Error Occured.</Text>
        </View>
      )}

      {t_user && !t_userLodaing && !t_userError && (
        <>
          <StatusBar backgroundColor={Colors.greyHeaderColorB80} />
          {liuNavigation && liuRoute && (
            <AppBar
              reportTo={liuRoute.params.userId!}
              title='VENUE PROFILE'
              isLoggedIn={isAuthenticated}
              viewOnly={true}
            />
          )}

          {sNavigation && sRoute && (
            <AppBar
              reportTo={sRoute!.params!.userId}
              title='VENUE PROFILE'
              isLoggedIn={isAuthenticated}
              viewOnly={true}
            />
          )}

          <View style={{ flexGrow: 1, paddingTop: 10 }}>
            <NameDisplay name={userInfoX.name} dType='VENUE' />

            {liuNavigation && liuRoute && (
              <AvatarView
                userId={userInfoX._id}
                avatar={userInfoX.avatar}
                name={userInfoX.name}
                viewType={
                  viewType
                    ? viewType
                    : userInfoX.userType === 'star'
                    ? 'showNPPlay'
                    : 'fanVenue'
                }
                liuNavigation={liuNavigation}
              />
            )}
            {sNavigation && sRoute && (
              <AvatarView
                userId={userInfoX._id}
                avatar={userInfoX.avatar}
                name={userInfoX.name}
                viewType={
                  viewType
                    ? viewType
                    : userInfoX.userType === 'star'
                    ? 'showNPPlay'
                    : 'fanVenue'
                }
                sNavigation={sNavigation}
              />
            )}

            {/* Description */}
            <Description
              desIsVisible={
                !(
                  (c_user.userType === 'fan' || c_user.userType === 'venue') &&
                  userInfoX.entertrainerFeatures === 'dancer'
                )
              }
              description={userInfoX.description}
              title={
                userInfoX.userType === 'venue'
                  ? userInfoX.location
                  : userInfoX.performanceSummary
              }
            />
          </View>

          {/* Thumbs */}
          {userInfoX.userType === 'venue' && (
            <View>
              <SingleThumbs
                identifier={userInfoX.identifier}
                averageRating={getAverageRating(
                  userInfoX.ratingByFan,
                  userInfoX.ratingByStar,
                  userInfoX.ratingByVenue,
                  'venue'
                )}
                ratedBy='Star'
                userType='Venue'
                rating={getAverageRating(
                  userInfoX.ratingByFan,
                  userInfoX.ratingByStar,
                  userInfoX.ratingByVenue,
                  'venue'
                )}
              />
            </View>
          )}
        </>
      )}
    </>
  );
};

export default VenueProfileVO;
