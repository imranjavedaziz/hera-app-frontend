// chatHistory
import React, { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import moment from 'moment';
import { useDispatch } from 'react-redux';
// import {empty } from '../redux/actions/chat';
import  store  from '../redux/reducers';

const chatHistory = ()=>{
    const [ user, setUser ] = useState();
    const dispatch = useDispatch();
    const fetchChats = ()=>{
        database().ref(`https://making-baby-connection-default-rtdb.firebaseio.com/local/Users/7`).once('value')
        .then(async snapshot=>{
            // await dispatch(empty());
            snapshot.forEach(async (childSnapshot,key)=>{
                if(key===undefined)return;
                const item = childSnapshot.val();
                if(item.timestamp)item.timestamp = moment(item.timestamp).valueOf();
                const chatState = store.getState().Chat.chats;
                if(chatState.length===0){
                    await dispatch(append(item));
                }
                else if(chatState[chatState.length-1].timestamp<item.timestamp){
                    await dispatch(prepend(item));
                }
                else{
                    await dispatch(append(item));
                }
            });
        })
    }
    useEffect(()=>{
        setUser();
    },[]);
    return {
        update: fetchChats,
    };
}
export default chatHistory;
