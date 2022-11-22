import {Alignment, Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import {px} from '../../utils/responsive';

export default {
  fixedheaderStyle: {marginRight: px(Value.CONSTANT_VALUE_20)},
  mainContainer: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  header: {marginTop: px(10), marginLeft: px(30)},
  Inbox: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: px(Value.CONSTANT_VALUE_11),
    letterSpacing: px(Value.CONSTANT_VALUE_2_84),
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  Match: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: px(Value.CONSTANT_VALUE_23),
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginTop: px(Value.CONSTANT_VALUE_8),
  },

  chatText: {
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
    fontSize: px(Value.CONSTANT_VALUE_13),
    fontWeight:Alignment.BOLD
  },
  chatTime:{
    fontFamily:Fonts.OpenSansRegular,
    fontSize: px(Value.CONSTANT_VALUE_13),
    color: '#ada99f',
  },
  chatContainer: {
    paddingVertical:12,
    paddingHorizontal: 24,
    maxWidth:250
  },
  senderID: {
    alignSelf: Alignment.FLEXEND,
    flexDirection: Alignment.ROW,
    backgroundColor: Colors.WHITE,
    alignItems:Alignment.CENTER,
    marginRight:20,
    justifyContent:'center',
  },
  receiverID: {
    alignSelf: Alignment.FLEX_START,
    flexDirection: Alignment.ROW,
    justifyContent:'center',
    alignItems:Alignment.CENTER,
    marginLeft:10,
    backgroundColor: Colors.GREEN,
  },
  mainContainerDetail: {
    backgroundColor: 'white',
    borderTopColor: '#E8E8E8',
    borderRadius: 15,
    marginHorizontal: 15,
    paddingTop: 5,
    paddingLeft: 5,
  },
  border: {
    borderBottomWidth: Value.CONSTANT_VALUE_1,
    borderBottomColor: Colors.COLOR_228226216,
    marginTop: Value.CONSTANT_VALUE_16,
  },
  titleText: {
    fontFamily: Fonts.OpenSansBold,
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_16,
  },
  descText: {
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_14,
  },
  topContainer: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.FLEX_START,
    flex: 2,
    justifyContent: Alignment.FLEX_START,
  },
  avatar: {
    width: Value.CONSTANT_VALUE_35,
    height: Value.CONSTANT_VALUE_35,

    borderRadius: Value.CONSTANT_VALUE_35 / 2,
  },
  outerContainer: {
    flexDirection:  Alignment.ROW,
    alignItems:  Alignment.CENTER,
    marginTop: 40,
    marginHorizontal: 20,
  },
  thumbContain: color => ({
    height: 41,
    width: 132,
    borderWidth: 1,
    borderColor: color,
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.CENTER,
    alignItems:  Alignment.CENTER,
    borderRadius: 6,
  }),
  thumbImg: {height: 15, width: 14},
  thumbInnerContain: {
    flexDirection: Alignment.ROW,
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  matchTxt: {
    textAlign:  Alignment.CENTER,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: Fonts.OpenSansBold,
  },
  thumbTxt: {
    paddingLeft: 12,
    fontSize: 15,
    fontFamily: Fonts.OpenSansRegular,
    lineHeight: 21,
    color: Colors.COLOR_535858,
  },
  smDonorEmptyView: {
    position: Alignment.ABSOLUTE,
    justifyContent: Alignment.FLEX_START,
    bottom: 0,
    right: 0,
    left: 0,
    height: '80%',
  },
  crossImage: {width: 30, height: 30},
  searchBar:{
    marginHorizontal:20,
   marginTop:10,
    backgroundColor:'white',
    width: 303,
  },
  messageSendTextInput:{
    flexDirection: 'row',
    marginBottom: 50,
    marginHorizontal: 20,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',

  },messageSend:{
    alignSelf:Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    position: Alignment.ABSOLUTE,
    right: 12,
  }
};
