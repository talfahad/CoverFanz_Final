import { LIUSearchStackParamList } from '../../types/mainNavigatorTypes';
import React from 'react';
import { View, StatusBar, ActivityIndicator, Text } from 'react-native';
import Colors from '../../constants/Colors';
import SingleThumbs from '../../components/Thumbs/SingleThumbs';
import BookingBottomButton from '../../components/Buttons/BookingBottomButton';
import AppBar from '../../components/AppBar/AppBar';
import NameDisplay from '../../components/NameDisplay/NameDisplay';
import AvatarView from '../../components/AvatarView/AvatarView';
import { StackNavigationProp } from '@react-navigation/stack';
import { GuestNavigatorParamList } from '../../types/guestNavigatorTypes';
import { RouteProp } from '@react-navigation/native';
import Description from '../Description/Description';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { gql, useMutation, useQuery } from '@apollo/client';
import { getAvatarViewType, getAverageRating } from '../../utils/functions';
import BackStage from '../Utils/Backstage';
import DoubleThumbs from './../Thumbs/DoubleThumbs';

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
      location
      description
      entertrainerFeatures
      performanceSummary
      ratingByFan
      ratingByStar
      premium
      ratingByVenue
    }
  }
`;

const StarProfileVO: React.FC<{
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

      {userInfoX && !t_userLodaing && !t_userError && (
        <>
          <StatusBar backgroundColor={Colors.greyHeaderColorB80} />

          {liuNavigation && liuRoute && (
            <AppBar
              reportTo={liuRoute.params.userId!}
              title='STAR PROFILE'
              isLoggedIn={isAuthenticated}
              viewOnly={!isAuthenticated ? true : false}
            />
          )}

          {sNavigation && sRoute && (
            <AppBar
              title='STAR PROFILE'
              isLoggedIn={isAuthenticated}
              viewOnly={true}
            />
          )}

          <View
            style={{
              flexGrow: 1,
              paddingTop: 10,
              width: '100%',
            }}>
            <NameDisplay name={userInfoX.name} dType='STAGE' />

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
                url={userInfoX.mediaUrl ?? 'slack://open?team=123456'}
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
                url={userInfoX.mediaUrl ?? 'slack://open?team=123456'}
              />
            )}

            {/* Description */}
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Description
                desIsVisible={
                  !(
                    (c_user.userType === 'fan' ||
                      c_user.userType === 'venue') &&
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
          </View>

          {c_user.userType === 'venue' && (
            <View>
              <BackStage />
            </View>
          )}

          {/* Thumbs */}

          {!isAuthenticated && (
            <View>
              <SingleThumbs
                identifier={userInfoX.identifier}
                averageRating={getAverageRating(
                  userInfoX.ratingByFan,
                  userInfoX.ratingByStar,
                  userInfoX.ratingByVenue,
                  'star'
                )}
                ratedBy='Venue'
                userType='Star'
                rating={getAverageRating(
                  userInfoX.ratingByFan,
                  userInfoX.ratingByStar,
                  userInfoX.ratingByVenue,
                  'star'
                )}
              />
            </View>
          )}

          {isAuthenticated && c_user.userType === 'fan' && (
            <View>
              <SingleThumbs
                identifier={userInfoX.identifier}
                ratedBy='Fan'
                userType='Star'
                rating={userInfoX.ratingByFan}
              />
            </View>
          )}

          {isAuthenticated && c_user.userType === 'venue' && (
            <DoubleThumbs
              identifier={userInfoX.identifier}
              ratingByFan={userInfoX.ratingByFan}
              ratingByVenue={userInfoX.ratingByVenue}
            />
          )}

          {isAuthenticated && c_user.userType === 'star' && (
            <View>
              <SingleThumbs
                identifier={userInfoX.identifier}
                averageRating={getAverageRating(
                  userInfoX.ratingByFan,
                  userInfoX.ratingByStar,
                  userInfoX.ratingByVenue,
                  'star'
                )}
                ratedBy='Venue'
                userType='Star'
                rating={getAverageRating(
                  userInfoX.ratingByFan,
                  userInfoX.ratingByStar,
                  userInfoX.ratingByVenue,
                  'star'
                )}
              />
            </View>
          )}

          {/* isLoggedIn and isPremium currentUserType !== 'star' */}
          {isAuthenticated &&
            c_user.premium &&
            userInfoX.premium &&
            c_user.userType !== 'star' && (
              <BookingBottomButton
                buttonText='I am Ready - Use Booking Agent Now!'
                liuNavigation={liuNavigation}
                star_id={userInfoX._id}
                isPremium={true}
              />
            )}

          {isAuthenticated &&
            c_user.premium &&
            !userInfoX.premium &&
            c_user.userType !== 'star' && (
              <BookingBottomButton
                disabled={true}
                buttonText='I am Ready - Use Booking Agent Now!'
                liuNavigation={liuNavigation}
                star_id={userInfoX._id}
              />
            )}

          {/* isLoggedIn and !isPremium  currentUserType !== 'star' &&*/}
          {isAuthenticated && !c_user.premium && c_user.userType !== 'star' && (
            <BookingBottomButton
              buttonText='Subscribe To Use Booking Agent'
              liuNavigation={liuNavigation}
              isPremium={false}
            />
          )}

          {/* !isLoggedIn   currentUserType !== 'star' &&*/}
          {!isAuthenticated && (
            <BookingBottomButton
              buttonText='Login To Use Booking Agent'
              sNavigation={sNavigation}
            />
          )}
        </>
      )}
    </>
  );
};

export default StarProfileVO;
