import { useState } from 'react';
import { SearchScreensProps } from '../../types/guestNavigatorTypes';
import Search from '../../components/Search/Search';

const SearchScreen: React.FC<SearchScreensProps> = ({
  route,
  navigation,
}: SearchScreensProps) => {
  return <Search sNavigation={navigation} />;
};

export const screenOptions = (navigator: SearchScreensProps) => {
  return {
    headerTitle: 'Search Screen',
  };
};

export default SearchScreen;
