import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';
import {
  showAppLoader,
  hideAppLoader,
  showAppToast,
} from '../redux/actions/loader';
import {Routes} from '../constants/Constants';
import {setUser, signoutUser} from '../redux/actions/auth';
import getRoute from '../utils/getRoute';
import axios from 'axios';

const SetterData =()=>{
    const[myState,setMyState] = React.useState([]);
    const[sexsualOrient,setSexualOrient] = React.useState([]);
    const[relationship,setRelationship] = React.useState([]);
    const[education,setEducation]= React.useState([]);
    const[race,setRace]= React.useState([]);
    const[ethnicity,setEthnicity]= React.useState([]);
    const[role,setRole]=React.useState([]);
    const[eye,setEye]=React.useState([]);
    const[hair,setHair]=React.useState([]);


  const dispatch = useDispatch();
  const navigation = useNavigation();

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
    role
  }
};

export default SetterData;
