import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image,StatusBar,SafeAreaView} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import FirebaseDB from '../../utils/FirebaseDB'
import {IconHeader} from '../../components/Header';
import {Images, Strings,Colors} from '../../constants';
import {useNavigation} from '@react-navigation/native';
// import Images from '../constants/Images';
import styles from './style'
import {Container} from '../../components';
const ChatDetail = (props) => {
  console.log(props.route.params.item,'item::::::::::')
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [loading,setLoading]= useState(false)
  const [db, setDB] = useState({ messages: [], loading: true });
  const renderActions = (message) => {
    return (
      <View style={{flexDirection: 'row', paddingBottom: 10, paddingRight: 10}}>
        <TouchableOpacity style={styles.select} onPress={()=>onSend(message)}>
          <Text style={{color:'red'}}>send data</Text>
          {/* <Image source={Images.iconChat} style={{width: 20, height: 20}} /> */}
        </TouchableOpacity>
      </View>
    );
  };
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  useEffect(async () => {
    const now = Date.now().toString();
    const user = {
      user_id: props.route.params.item.senderId,
      name: props.route.params.item.senderName,
      image: props.route.params.item.senderImage,
    };
    const receiver = {
      user_id:props.route.params.item.recieverId,
      name:props.route.params.item.recieverName,
      image:props.route.params.item.recieverImage,
    };
    let fireDB = new FirebaseDB(user, receiver);
    await fireDB.setTotalSize();
    await fireDB.initMessages();
    fireDB.lastIdInSnapshot = now;
    console.log(fireDB,'fireDB')
    setDB(fireDB);
    let onChildAdd = fireDB.reference
      .orderByKey()
      .startAt(now)
      .on("child_added", async (snapshot, _previousChildKey) => {
        const messageItem = fireDB.parseMessages(snapshot);
        if (parseInt(snapshot.key) > parseInt(fireDB.lastIdInSnapshot)) {
          setLoading(true);
          fireDB.lastKey = snapshot.key;
          fireDB.prependMessage(messageItem);
          await fireDB.readSingle(messageItem);
          setLoading(false);
          fireDB.lastIdInSnapshot = snapshot.key;
        }
      });
   
        return () => {
          setDB({ messages: [], loading: false });
          fireDB.reference.off("child_added", onChildAdd);
          db.reference.off("child_added", onChildAdd);
          fireDB = null;
        };

  }, [props.route.params.item.recieverId]);

  const onSend = (messages = '') => {
    // console.log(messages,'messages')

    if (messages[0].text !== "") {
      db.sendMessage(messages[0].text)
        .then(() => {
          Keyboard.dismiss();
          // setDB(previousMessages =>
          //   GiftedChat.append(previousMessages, messages),
          // );
        })
        .catch((e) => {
          // topToast(e.message);
        });
    }
   
  }

 

  const customSystemMessage = props => {
    console.log(props.currentMessage,'props')
    return (
      <View style={styles.chatContainer}>
        <Text style={styles.chatText}>
         {props.currentMessage.text}
        </Text>
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
  return (
    <>
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
            {/* <Image source={Images.BACK_ICON} style={{height: 15, width: 14}} /> */}
          </View>
          <View style={styles.topContainer}>
            <View style={styles.avatar}>
            <Image source={{uri:props.route.params.item.recieverImage}} style={styles.avatar} /> 
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={styles.titleText}>{props.route.params.item.recieverName}</Text>
              <Text style={styles.descText}>#SD5882</Text>
            </View>
          </View>
          <View />
        </View>
        <View style={styles.border} />
      </View>
     
<GiftedChat
messages={db?.messages}
onSend={messages => onSend(messages)}
// renderSend={(message)=>renderActions(message)}
renderBubble={customSystemMessage}
scrollToBottom
user={{
  _id: props.route.params.item.senderId,
name: props.route.params.item.senderName,
avatar: props.route.params.item.senderImage,
}}
containerStyle={styles.mainContainerDetail}
renderAvatar={() => null}
/>
</>
  );
};


export default ChatDetail;


