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
import Profile_Match from './Profile_Match';
import Chat from './Chat';
import Subscription from './Subscription';
import DeleteAccount from './DeleteAccount';
import Edit_profile from './Edit_profile';
import VerificationMail from './VerificationMail';
import DeactivateAccount from './DeactivateAccount';
import NavigationOnLanding from './NavigationOnLanding';
import ReportUser from './ReportUser';
import MessageId from './MessageId';

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
  Profile_Match,
  Chat,
  Subscription,
  DeleteAccount,
  Edit_profile,
  DeactivateAccount,
  VerificationMail,
  NavigationOnLanding,
  ReportUser,
  MessageId,
});

export default allReducers;
