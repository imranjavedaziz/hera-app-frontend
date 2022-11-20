// chatHistory
import React, { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { append } from '../redux/actions/Chat';
import { chat } from '../constants/Constants';

const chatHistory = () => {
    const { log_in_data } = useSelector(state => state.Auth);
    const [user, setUser] = useState();
    const dispatch = useDispatch();
    const fetchChats = () => {
        database().ref(`${chat}/Users/${log_in_data?.id}`).once('value')
            .then(async snapshot => {
                snapshot.forEach(async (childSnapshot, key) => {
                    const item = childSnapshot.val();
                    dispatch(append(Object.values(item)));
                    return Object.values(item)
                });
            })
    }
    useEffect(() => {
        setUser();
    }, []);
    return {
        update: fetchChats,
    };
}
export default chatHistory;
