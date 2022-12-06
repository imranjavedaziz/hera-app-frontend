// chatHistory
import React from 'react';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {append} from '../redux/actions/Chat';
import {chat} from '../constants/Constants';

const chatHistory = () => {
  const {log_in_data} = useSelector(state => state.Auth);
  const dispatch = useDispatch();
  const fetchChats = () => {
    database()
      .ref(`${chat}/Users/${log_in_data?.id}`)
      .once('value')
      .then(async snapshot => {
        snapshot.forEach(async childSnapshot => {
          const item = childSnapshot.val();
          dispatch(append(Object.values(item)));
          return Object.values(item);
        });
      });
  };
  return {
    update: fetchChats,
  };
};
export default chatHistory;
