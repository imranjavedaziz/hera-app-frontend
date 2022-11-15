import {Alignment, Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import {px} from '../../utils/responsive';

export default {
  fixedheaderStyle: {marginRight: px(Value.CONSTANT_VALUE_20)},
  mainContainer: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    marginTop:30
    
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
    backgroundColor: Colors.GREEN,
    width: '70%',
    marginVertical: 5,
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
    // backgroundColor: Colors.RED,
    borderRadius: Value.CONSTANT_VALUE_35 / 2,
  },
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 20,
  },
};

