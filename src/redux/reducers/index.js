import {combineReducers} from 'redux';
import Auth from './Auth';
import loader from './loader';
import CreateGallery from './CreateGallery';
import Register from './Register';
import PtbDashboard from './PtbDashboard';
import SetPreference from './SetPreference';

const allReducers = combineReducers({
  Auth,
  loader,
  CreateGallery,
  Register,
  PtbDashboard,
  SetPreference,
});

export default allReducers;
