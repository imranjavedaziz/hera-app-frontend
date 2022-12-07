import {Value} from '../../../constants/FixedValues';
import {Alignment, Colors} from '../../../constants';
import {Fonts} from '../../../constants/Constants';

export default {
  mainContainer: {
    flex: 1,
    justifyContent: Alignment.FLEX_START,
    paddingHorizontal: 40,
    marginTop: Value.CONSTANT_VALUE_95,
  },
  androidMainContainer: {
    flex: 1,
    justifyContent: Alignment.FLEX_START,
    paddingHorizontal: 40,
    marginTop: Value.CONSTANT_VALUE_59,
  },
  title: {
    color: Colors.BLACK,
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_11,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: Value.CONSTANT_VALUE_2_84,
  },
  title1: {
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_23,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
    marginTop: Value.CONSTANT_VALUE_8,
  },
  textArea: {
    borderWidth: Value.CONSTANT_VALUE_1,
    marginTop: Value.CONSTANT_VALUE_10,
    borderRadius: Value.CONSTANT_VALUE_10,
    padding: Value.CONSTANT_VALUE_10,
    minHeight: Value.CONSTANT_VALUE_80,
    textAlignVertical: 'top',
    borderColor: Colors.COLOR_228226216,
  },
  flex: {flex: Value.CONSTANT_VALUE_1, backgroundColor: Colors.BACKGROUND},
};
