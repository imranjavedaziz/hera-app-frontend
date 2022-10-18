import {combineReducers} from 'redux';
import Auth from './Auth';
import loader from './loader';
import CreateGallery from './CreateGallery';
import Register from './Register';
import PtbDashboard from './PtbDashboard';
import SetPreference from './SetPreference';
import SetAttribute from './SetAttribute';
import DonorDashBoard from './DonorDashboard';
import PtbProfileDetail from './PtbProfileDetail';

const allReducers = combineReducers({
  Auth,
  loader,
  CreateGallery,
  Register,
  PtbDashboard,
  SetPreference,
  SetAttribute,
  DonorDashBoard,
  PtbProfileDetail,
});

export default allReducers;
