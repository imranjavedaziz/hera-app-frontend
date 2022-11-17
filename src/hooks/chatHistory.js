// chatHistory
import React, { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import moment from 'moment';
import { useDispatch,useSelector } from 'react-redux';
 import {append } from '../redux/actions/Chat';
import  store  from '../redux/reducers';
import {chat} from '../constants/Constants';

const chatHistory = ()=>{
    const {log_in_data} = useSelector(state => state.Auth);

    console.log(log_in_data.id,'log_in_data::::::')
    console.log(`${chat}/Users/${log_in_data?.id}`,'local/Users/${log_in_data?.id}')
    const [ user, setUser ] = useState();
    const dispatch = useDispatch();
    const fetchChats = ()=>{
        database().ref(`${chat}/Users/${log_in_data?.id}`).once('value')
        .then(async snapshot=>{
            // await dispatch(empty());
            snapshot.forEach(async (childSnapshot,key)=>{
                // console.log(childSnapshot,'childSnapshot:::')
                const item = childSnapshot.val();
            //     Object.values(item).forEach((data,key)=>{
            //         dispatch(append(data));
            //    })
                // if(key===undefined)return;
                dispatch(append(Object.values(item)));
                console.log(Object.values(item),'item')
                return Object.values(item)
               
         

                // if(item.timestamp)item.timestamp = moment(item.timestamp).valueOf();
                // const chatState = store.getState().Chat.chats;
                // if(chatState.length===0){
                //     await dispatch(append(item));
                // }
                // else if(chatState[chatState.length-1].timestamp<item.timestamp){
                //     await dispatch(prepend(item));
                // }
                // else{
                //     await dispatch(append(item));
                // }
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
