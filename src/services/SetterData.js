import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';
import {
  showAppLoader,
  hideAppLoader,
} from '../redux/actions/loader';

const SetterData =()=>{
    const[myState,setMyState] =useState([]);
    const[sexsualOrient,setSexualOrient] = useState([]);
    const[relationship,setRelationship] = useState([]);
    const[education,setEducation]= useState([]);
    const[race,setRace]= useState([]);
    const[ethnicity,setEthnicity]= useState([]);
    const[role,setRole]=useState([]);
    const[eye,setEye]=useState([]);
    const[hair,setHair]=useState([]);
    const[donorHeight,setDonorHeight]=useState([]);
    const[donorRace,setDonorRace]=useState([]);
    const[donorEthinicity,setDonorEthinicity]=useState([]);
    const[donorWeight,setDonorWeight]=useState([]);;
    const[donorhair,setDonorHair]=useState([]);
    const[donoreye,setDonorEye]=useState([]);
    const[donorEducation,setDonorEducation]=useState([]);
    const[donorDashboard,setDonorDashboard]=useState([{}]);
    const [ptbProfileDetails,setPtbProfileDetails] = useState([]);
  const dispatch = useDispatch();

  const state = () => {
    dispatch(showAppLoader());
    axiosRequest
      .get(ApiPath.states)
      .then(async response => {
        setMyState(response.data.data)
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  };
  const sexsualOrientation = () => {
    axiosRequest
    .get(ApiPath.profile_setter_data)
    .then( async res =>{
        setSexualOrient(res.data.data.sexual_orientation);
        setRelationship(res.data.data.relationship_status);
    })
  }
  const preferenceData=()=>{
    dispatch(showAppLoader());
    axiosRequest
    .get(ApiPath.preference_setter_data)
    .then( async res => {
        console.log("Preferences",res.data.data)
        setRole(res.data.data.role);
        setEducation(res.data.data.education)
        setRace(res.data.data.race);
        setEthnicity(res.data.data.ethnicity);
        setEye(res.data.data.eye_colour);
        setHair(res.data.data.hair_colour);
    }).finally(() => {
        dispatch(hideAppLoader());
      });
  }
  const attribute=()=>{
    dispatch(showAppLoader());
    axiosRequest
    .get(ApiPath.get_attributes)
    .then( async res => {
      console.log('Attribute --->', res.data.data.race)
      setDonorHeight(res.data.data.height);
      setDonorRace(res.data.data.race);
      setDonorEthinicity(res.data.data.ethnicity);
      setDonorWeight(res.data.data.weight);
      setDonorHair(res.data.data.hair_colour);
      setDonorEye(res.data.data.eye_colour);
      setDonorEducation(res.data.data.education);
    }).finally(() => {
        dispatch(hideAppLoader());
      });
  }

  const smDororDashBoard=(endPoint)=>{
    dispatch(showAppLoader());
    const api = `${ApiPath.ptbProfileCard}${endPoint}`
   console.log('my dashboard', api);
    axiosRequest
    .get(api)
    .then(async res => {
      setDonorDashboard(res.data.data.data);
    }).finally(() => {
      dispatch(hideAppLoader());
    });
  }

  const ptbProfileDetail =(userid)=>{
    dispatch(showAppLoader());
    axiosRequest
    .get(`${ApiPath.ptbProfileDetails}?user_id=${userid}`)
    .then(async res => {
      console.log("PTB profile details ==>",res.data.data)
      setPtbProfileDetails(res.data.data)
      setHighlits(res.data.data.user_profile);
    }).finally(() => {
      dispatch(hideAppLoader());
    });
  }


  return {
    state,
    myState,
    sexsualOrientation,
    sexsualOrient,
    relationship,
    preferenceData,
    education,
    race,
    ethnicity,
    eye,
    hair,
    role,
    attribute,
    donorHeight,
    donorRace,
    donorEthinicity,
    donorWeight,
    donorhair,
    donoreye,
    donorEducation,
    smDororDashBoard,
    donorDashboard,
    ptbProfileDetail,
    ptbProfileDetails,


  }
};

export default SetterData;
