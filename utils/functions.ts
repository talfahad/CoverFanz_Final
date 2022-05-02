export const getNameAvatar = (name: string) => {
  const avtrArr = name.match(/\b(\w)/g);
  if (!avtrArr) return name;
  const avtr = avtrArr.slice(0, 2).join('').toUpperCase();
  return avtr;
};

export const getAverageRating = (
  ratingByFan: number,
  ratingByStar: number,
  ratingByVenue: number,
  userType: string
) => {
  if (userType === 'star') {
    return (ratingByFan + ratingByVenue) / 2;
  }
  if (userType === 'venue') {
    return ratingByStar;
  }
  return 4.3;
};

export const getAvatarViewType = (
  isLoggedIn: boolean,
  targetUserType: string,
  targetStarFeature: string,
  currentUserType?: string
) => {
  if ((targetUserType === 'fan' || targetUserType === 'venue') && !isLoggedIn)
    return 'fanVenue';
  if (targetUserType === 'star' && !isLoggedIn) return 'showNPPlay';

  if (targetUserType === 'star' && currentUserType) {
    if (currentUserType === 'fan') {
      if (targetStarFeature === 'music') {
        return 'showNPBAPlay';
      }

      if (targetStarFeature === 'dancer') {
        return 'showNPBA';
      }
      return 'showNPBA';
    }

    if (currentUserType === 'venue') {
      if (targetStarFeature === 'music') {
        return 'showPlay';
      }

      if (targetStarFeature === 'dancer') {
        return 'justShow';
      }
      return 'justShow';
    }
  }
};
