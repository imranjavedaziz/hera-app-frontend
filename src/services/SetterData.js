import React from 'react';
import {useDispatch} from 'react-redux';
import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';
import {showAppLoader, hideAppLoader} from '../redux/actions/loader';
import axios from 'axios';

const SetterData = () => {
  const [myState, setMyState] = React.useState([]);
  const [sexsualOrient, setSexualOrient] = React.useState([]);
  const [relationship, setRelationship] = React.useState([]);
  const [education, setEducation] = React.useState([]);
  const [race, setRace] = React.useState([]);
  const [ethnicity, setEthnicity] = React.useState([]);
  const [role, setRole] = React.useState([]);
  const [eye, setEye] = React.useState([]);
  const [hair, setHair] = React.useState([]);
  const [donorHeight, setDonorHeight] = React.useState([]);
  const [donorRace, setDonorRace] = React.useState([]);
  const [donorEthinicity, setDonorEthinicity] = React.useState([]);
  const [donorWeight, setDonorWeight] = React.useState([]);
  const [donorhair, setDonorHair] = React.useState([]);
  const [donoreye, setDonorEye] = React.useState([]);
  const [donorEducation, setDonorEducation] = React.useState([]);
  const [donorDashboard, setDonorDashboard] = React.useState([{}]);
  const [ptbDashboard, setPtbDashboard] = React.useState([{}]);
  const [smDonorDetails, setSmDonorDetails] = React.useState([]);

  const [ptbProfileDetails, setPtbProfileDetails] = React.useState([]);
  const [highlits, setHighlits] = React.useState({data: []});
  const dispatch = useDispatch();

  const state = () => {
    dispatch(showAppLoader());
    axiosRequest
      .get(ApiPath.states)
      .then(async response => {
        setMyState(response.data.data);
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  };
  const sexsualOrientation = () => {
    axiosRequest.get(ApiPath.profile_setter_data).then(async res => {
      setSexualOrient(res.data.data.sexual_orientation);
      setRelationship(res.data.data.relationship_status);
    });
  };
  const preferenceData = () => {
    dispatch(showAppLoader());
    axiosRequest
      .get(ApiPath.preference_setter_data)
      .then(async res => {
        console.log('Preferences', res.data.data);
        setRole(res.data.data.role);
        setEducation(res.data.data.education);
        setRace(res.data.data.race);
        setEthnicity(res.data.data.ethnicity);
        setEye(res.data.data.eye_colour);
        setHair(res.data.data.hair_colour);
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  };
  const attribute = () => {
    dispatch(showAppLoader());
    axiosRequest
      .get(ApiPath.get_attributes)
      .then(async res => {
        console.log('Attribute --->', res.data.data.race);
        setDonorHeight(res.data.data.height);
        setDonorRace(res.data.data.race);
        setDonorEthinicity(res.data.data.ethnicity);
        setDonorWeight(res.data.data.weight);
        setDonorHair(res.data.data.hair_colour);
        setDonorEye(res.data.data.eye_colour);
        setDonorEducation(res.data.data.education);
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  };

  const smDororDashBoard = endPoint => {
    dispatch(showAppLoader());
    const api = `${ApiPath.ptbProfileCard}${endPoint}`
    axiosRequest
      .get(api)
      .then(async res => {
        console.log('sm donor data ==>', res.data.data.data);
        setDonorDashboard(res.data.data.data);
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  };

  const ptbCardDashboard = () => {
    dispatch(showAppLoader());
    axiosRequest
      .get(ApiPath.parents_matched_doner)
      .then(async res => {
        setPtbDashboard(res.data.data.data);
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  };

  const smDonorProfileDetail = userid => {
    console.log(`${ApiPath.doner_profile_details}?user_id=${userid}`)
    dispatch(showAppLoader());
    axiosRequest

      .get(`${ApiPath.doner_profile_details}?user_id=${userid}`)
      .then(async res => {

        setSmDonorDetails(res.data.data);
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  };

  const ptbProfileDetail = userid => {
    dispatch(showAppLoader());
    axiosRequest
      .get(`${ApiPath.ptbProfileDetails}?user_id=${userid}`)
      .then(async res => {
        console.log('PTB profile details ==>', res.data.data);
        setPtbProfileDetails(res.data.data);
        setHighlits(res.data.data.user_profile);
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  };
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
    smDonorDetails,
    donorhair,
    donoreye,
    donorEducation,
    ptbDashboard,
    ptbCardDashboard,
    smDonorProfileDetail,
    smDororDashBoard,
    donorDashboard,
    ptbProfileDetail,
    ptbProfileDetails,
    highlits,

  };
};

export default SetterData;
