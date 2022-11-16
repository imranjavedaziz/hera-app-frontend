import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import FirebaseDB from '../../utils/FirebaseDB';
import {IconHeader} from '../../components/Header';
import {Images, Strings, Colors} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import {useDispatch} from 'react-redux';
import {showAppToast} from '../../redux/actions/loader';
const ChatDetail = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [textData,setTextData] = useState('')
  const [db, setDB] = useState({messages: [], loading: true});
  const dispatch = useDispatch();
  const renderActions = message => {
    return (
      <View style={{flexDirection: 'row', paddingBottom: 10, paddingRight: 10}}>
        <TouchableOpacity style={styles.select} onPress={() => onSend(message)}>
          <Image source={Images.ICON_SEND} style={{width: 30, height: 30}} />
        </TouchableOpacity>
      </View>
    );
  };


  useEffect(async () => {
if(props.route.params.item.senderSubscription===2){
  dispatch(showAppToast(true,Strings.Chat.YOUR_SUBSCRIPTION_EXPIRED ));
}
   
  
    const now = Date.now().toString();
    const user = {
      user_id: props.route.params.item.senderId,
      name: props.route.params.item.senderName,
      image: props.route.params.item.senderImage,
    };
    const receiver = {
      user_id: props.route.params.item.recieverId,
      name: props.route.params.item.recieverName,
      image: props.route.params.item.recieverImage,
    };
    let fireDB = new FirebaseDB(user, receiver);
    await fireDB.setTotalSize();
    await fireDB.initMessages();
    await fireDB.readAll();
    fireDB.lastIdInSnapshot = now;
    console.log(fireDB, 'fireDB');
    setDB(fireDB);
    let onChildAdd = fireDB.reference
      .orderByKey()
      .startAt(now)
      .on('child_added', async (snapshot, _previousChildKey) => {
        const messageItem = fireDB.parseMessages(snapshot);
        console.log(messageItem,'messageItem')
        if (parseInt(snapshot.key) > parseInt(fireDB.lastIdInSnapshot)) {
          setLoading(true);
          fireDB.lastKey = snapshot.key;
          fireDB.prependMessage(messageItem);
          await fireDB.readAll();
          setLoading(false);
          fireDB.lastIdInSnapshot = snapshot.key;
        }
      });
     async function cleanUp() {
      setDB({messages: [], loading: false});
      fireDB.reference.off('child_added', onChildAdd);
      db.reference.off('child_added', onChildAdd);
      fireDB = null;
    };
    return cleanUp;
  }, [props.route.params.item.recieverId]);

 

  const onSend = (messages = '') => {
    console.log(messages.text,'messages')
    if(props.route.params.item.senderSubscription===2){
      dispatch(showAppToast(true,Strings.Chat.YOUR_SUBSCRIPTION_EXPIRED ));
    }else{
      if (messages.text !== '') {
        db.sendMessage(messages.text)
          .then(() => {
            setTextData('')
           
               
            Keyboard.dismiss();
         
          })
          .catch(e => {
            // topToast(e.message);
          });
      }
    }

  };

  const customSystemMessage = props => {
    console.log(props.currentMessage, 'props');
    return (
      <View style={styles.chatContainer}>
        <Text style={styles.chatText}>{props.currentMessage.text}</Text>
      </View>
    );
  };
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      leftPress={() => navigation.goBack()}
      style={styles.header}
    />
  );
  const setText = (text)=> (
    setTextData(text)
 );
 console.log(props.route.params.item,'props.route.params.item')
  return (
    <>
      <View style={{flex: 1, backgroundColor: Colors.BACKGROUND}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.BACKGROUND}
          animated={true}
          hidden={false}
        />
        <SafeAreaView />
        <View>
          <View style={styles.outerContainer}>
            <View style={{flex: 0.8}}>
              <Pressable onPress={() => props.navigation.goBack()}>
                <Image
                  source={Images.BACK_PLAN_ARROW}
                  style={{ width: 14.7,
                    height: 12.6,}}
                />
              </Pressable>
            </View>
            <View style={styles.topContainer}>
              <View style={styles.avatar}>
                <Image
                  source={{uri: props.route.params.item.recieverImage}}
                  style={styles.avatar}
                />
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={styles.titleText}>
                  {props.route.params.item.recieverName}
                </Text>
                <Text style={styles.descText}>#{props?.route?.params?.item?.recieverUserName}</Text>
              </View>
            </View>
            <View />
          </View>
          <View style={styles.border} />
        </View>
        {/* <View
          style={{height: 117, width: '100%', backgroundColor: Colors.WHITE}}>
          <Text style={styles.matchTxt}>{Strings.Chat.WHAT_DO_YO}</Text>
          <View style={styles.thumbInnerContain}>
            <View style={styles.thumbContain(Colors.RED)}>
              <Image source={Images.THUMB_DOWN} style={styles.thumbImg} />
              <Text style={styles.thumbTxt}>{Strings.Chat.NOT_GOOD}</Text>
            </View>
            <View style={styles.thumbContain(Colors.GREEN)}>
              <Image source={Images.THUMB_UP} style={styles.thumbImg} />
              <Text style={styles.thumbTxt}>{Strings.Chat.GOING_WELL}</Text>
            </View>
          </View>
        </View> */}
        <GiftedChat
          messages={db?.messages}
          onSend={messages => onSend(messages)}
          renderSend={message => renderActions(message)}
          renderBubble={customSystemMessage}
          scrollToBottom
          onInputTextChanged={()=>setText()}
          text={textData}
          user={{
            _id: props.route.params.item.senderId,
            name: props.route.params.item.senderName,
            avatar: props.route.params.item.senderImage,
          }}
          containerStyle={styles.mainContainerDetail}
          renderAvatar={() => null}
          textInputProps={{
            autoCorrect: false
        }}
        />
      </View>
    </>
  );
};

export default ChatDetail;
