import React from 'react';
import {View, Text} from 'react-native';
import {Chat_listing_Comp, Container} from '../../components';
import {IconHeader} from '../../components/Header';
import {Images, Strings} from '../../constants';
import styles from './style';
import {useNavigation} from '@react-navigation/native';

const Chat_Request = () => {
  const navigation = useNavigation();
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      leftPress={() => navigation.goBack()}
      style={styles.header}
    />
  );
  return (
    <Container
      mainStyle={true}
      scroller={true}
      showHeader={true}
      headerComp={headerComp}>
      <View style={styles.mainContainer}>
        <Text style={styles.Inbox}>{Strings.INBOX}</Text>
        <Text style={styles.Match}>{Strings.All_Matches}</Text>
        <Chat_listing_Comp
          image={Images.DASHBOARD_IMG}
          name={'#SM5890'}
          message={'I have a good exposure to different cultures of the world.'}
          time={'Just now'}
          latest={false}
        />
        <Chat_listing_Comp
          image={Images.DASHBOARD_IMG}
          name={'#SM5890'}
          message={'I have a good exposure to different cultures of the world.'}
          time={'Just now'}
          latest={true}
        />
        <Chat_listing_Comp
          image={Images.DASHBOARD_IMG}
          name={'#SM5890'}
          message={'I have a good exposure to different cultures of the world.'}
          time={'Just now'}
          latest={false}
        />
        <Chat_listing_Comp
          image={Images.DASHBOARD_IMG}
          name={'#SM5890'}
          message={'I have a good exposure to different cultures of the world.'}
          time={'Just now'}
          latest={false}
        />
        <Chat_listing_Comp
          image={Images.DASHBOARD_IMG}
          name={'#SM5890'}
          message={'I have a good exposure to different cultures of the world.'}
          time={'Just now'}
          latest={false}
        />
        <Chat_listing_Comp
          image={Images.DASHBOARD_IMG}
          name={'#SM5890'}
          message={'I have a good exposure to different cultures of the world.'}
          time={'Just now'}
          latest={false}
        />
        <Chat_listing_Comp
          image={Images.DASHBOARD_IMG}
          name={'#SM5890'}
          message={'I have a good exposure to different cultures of the world.'}
          time={'Just now'}
          latest={true}
        />
        <Chat_listing_Comp
          image={Images.DASHBOARD_IMG}
          name={'#SM5890'}
          message={'I have a good exposure to different cultures of the world.'}
          time={'Just now'}
          latest={false}
        />
      </View>
    </Container>
  );
};

export default Chat_Request;
