// Loader

import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../constants/Constants';

const NavigationOnLanding = () => {
  const navigation = useNavigation();
  const navigateON = useSelector(state => state.navigator);
  if (navigateON) {
    return navigation.navigate(Routes.Alignment);
  }
  return null;
};
export default NavigationOnLanding;
