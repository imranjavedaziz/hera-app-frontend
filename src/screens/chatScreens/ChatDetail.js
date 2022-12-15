import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Images, Strings} from '../../constants';
import styles from './styles';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import {getMessageID} from '../../redux/actions/MessageId';
import {GiftedChat} from 'react-native-gifted-chat';

const ChatDetail = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMessageID(props?.route?.params?.item?.recieverId));
  });
  const customSystemMessage = item => {
    return (
      <View>
        <View>
          <View>
            <View>
              <View style={styles.chatContainer}>
                <Text style={styles.chatText}>{item.currentMessage.text}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text>
              {moment(item.currentMessage.createdAt).format('h:mm a')}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View>
        <View style={styles.outerContainer}>
          <TouchableOpacity>
            <Image source={Images.iconDarkMore} />
          </TouchableOpacity>
          <View />
        </View>
        <View style={styles.border} />
      </View>
      <View>
        <GiftedChat
          renderBubble={customSystemMessage}
          scrollToBottom
          infiniteScroll
          disableComposer={
            props.route.params.item.status_id !== 1 ? true : false
          }
          user={{
            _id: props?.route?.params?.item?.senderId,
            name: props?.route?.params?.item?.senderName,
            avatar: props?.route?.params?.item?.senderImage,
          }}
          containerStyle={styles.mainContainerDetail}
          renderAvatar={null}
          textInputProps={styles.textInput}
          maxInputLength={1024}
        />
      </View>
      {props?.route?.params?.item?.currentRole === 1 && (
        <View>
          <GiftedChat
            renderBubble={customSystemMessage}
            scrollToBottom
            user={{
              _id: props?.route?.params?.item?.senderId,
              name: props?.route?.params?.item?.senderName,
              avatar: props?.route?.params?.item?.senderImage,
            }}
            containerStyle={styles.mainContainerDetail}
            renderAvatar={null}
            textInputProps={styles.textInput}
            maxInputLength={1024}
            placeholder={Strings.search_Bar.write_message}
          />
        </View>
      )}
      <View>
        <GiftedChat
          scrollToBottom={true}
          renderBubble={customSystemMessage}
          user={{
            _id: props?.route?.params?.item?.senderId,
            name: props?.route?.params?.item?.senderName,
            avatar: props?.route?.params?.item?.senderImage,
          }}
          containerStyle={styles.mainContainerDetail}
          renderAvatar={null}
          textInputProps={styles.textInput}
          disableComposer={
            props.route.params.item.status_id !== 1 ? true : false
          }
          listViewProps={{
            scrollEventThrottle: 400,
            marginBottom: 10,
          }}
          maxInputLength={1024}
          placeholder={
            props.route.params.item.status_id !== 1
              ? Strings.search_Bar.Inactive
              : Strings.search_Bar.write_message
          }
        />
      </View>
    </View>
  );
};

export default React.memo(ChatDetail);
