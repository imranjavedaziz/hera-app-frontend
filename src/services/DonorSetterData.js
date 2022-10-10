import React,{useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';
import {
  showAppLoader,
  hideAppLoader,
  showAppToast,
} from '../redux/actions/loader';

const DonorSetterData =()=>{
    const [state,setState] = useState([]);



    return{
        
    }

}

export default DonorSetterData;
