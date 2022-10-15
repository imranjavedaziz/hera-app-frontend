import {combineReducers} from 'redux';
import Auth from './Auth';
import loader from './loader';
import CreateGallery from './CreateGallery';
const allReducers = combineReducers({
  Auth,
  loader,
  CreateGallery
});

export default allReducers;
