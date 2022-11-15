// Chats
import React, {useEffect, useState} from 'react';
// import { View, TextInput as TextInp, RefreshControl } from "react-native";
// import { useSelector } from "react-redux";
// import { Title, Text } from "react-native-paper";
// import IconIon from "react-native-vector-icons/Ionicons";
// import { FlatList } from "react-native-gesture-handler";
import Container from '../../components/Container';
// import styles from '../../styles/dashboard/chats-page';
// import colors from "../../theme/colors";
// import chatHistory from "../../hooks/chatHistory";
// import matchedList from "../../services/matchedList";
// import { Chat, Match } from "../../components/dashboard-chats";
// import { chatsTab } from "../../constants/strings";

const ChatList = ({navigation}) => {
  // const auth = useSelector((state) => state.auth.user);
  const chats = useSelector((state) => state.Chat.chats);
  // const matchedUsers = useSelector((state) => state.chat.matchedUsers);
  const [matches, setMatches] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // const chatData = chatHistory(auth.user);
  const [searched, setSearched] = useState('');
  const fetchData = React.useCallback(() => {
    chatData.update();
    // matchedList(setRefreshing, setMatches);
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);
  useEffect(() => {
    return navigation.addListener('focus', fetchData);
  }, [navigation]);
  console.log(chats,'chats::::::::::::')
  return <Container
  scroller={false}
  showHeader={true}
  headerComp={headerComp}
  headerEnd={true}>
  <ScrollView showsVerticalScrollIndicator={false}>
    {/* <View style={styles.mainContainer}>
      <Image source={Images.LOGO} style={styles.logo} />
      <TitleComp
        Title={Strings.subscribe.Subscribe_Now}
        Subtitle={Strings.Subscription.SubHeader}
        Midtitle={Strings.Subscription.MidHeader}
        isCenter={true}
      />
     
    
    </View> */}
  </ScrollView>
</Container>;
};

export default ChatList;
