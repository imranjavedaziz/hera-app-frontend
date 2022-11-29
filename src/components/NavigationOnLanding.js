// Loader

import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../constants/Constants';

const NavigationOnLanding = () => {
  const navigation = useNavigation();
  const navigateON = useSelector(state => state.NavigationOnLanding);
  console.log(navigateON, 'navigateON');
  if (navigateON) {
    return navigation.navigate(Routes.Landing);
  }
  return null;
};
export default NavigationOnLanding;
