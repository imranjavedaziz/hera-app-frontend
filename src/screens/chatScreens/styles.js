import {Alignment, Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import {px} from '../../utils/responsive';

export default {
  fixedheaderStyle: {marginRight: px(Value.CONSTANT_VALUE_20)},
  mainContainer: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    marginTop: 30,
  },
  header: {marginTop: px(10)},
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
    paddingVertical: 10,
    paddingHorizontal: 24,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.COLOR_535858,
    fontSize: px(Value.CONSTANT_VALUE_13),
  },
  chatContainer: {
    // backgroundColor: Colors.WHITE,
    padding: 5,
        // borderRadius: 10,
        // flex: 1,
    // width: '70%',
    // marginVertical: 5,
    // flexDirection:'row'
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
  topContainer: {flexDirection: 'row', alignItems: 'center', flex: 2},
  avatar: {
    width: Value.CONSTANT_VALUE_35,
    height: Value.CONSTANT_VALUE_35,

    borderRadius: Value.CONSTANT_VALUE_35 / 2,
  },
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 20,
  },
  thumbContain: color => ({
    height: 41,
    width: 132,
    borderWidth: 1,
    borderColor: color,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  }),
  thumbImg: {height: 15, width: 14},
  thumbInnerContain: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  matchTxt: {
    // paddingTop: 20,
    textAlign: 'center',
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
    position: 'absolute',
    justifyContent: 'flex-end',
    bottom: 0,
    right: 0,
    left: 0,
    height: '80%',
  },
  crossImage:{width:30,height:30}
};
