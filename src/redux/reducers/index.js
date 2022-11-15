import {combineReducers} from 'redux';
import Auth from './Auth';
import loader from './loader';
import CreateGallery from './CreateGallery';
import Register from './Register';
import PtbDashboard from './PtbDashboard';
import SetAttribute from './SetAttribute';
import DonorDashBoard from './DonorDashboard';
import PtbProfileDetail from './PtbProfileDetail';
import SmDonorDetail from './SmDonerDetail';
import SetPreference from './SetPreference';
import Support from './Support';
import Chat from './Chat';
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
  SmDonorDetail,
  Support,
  Chat
});

export default allReducers;
