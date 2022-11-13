import Colors from '../../constants/Colors';
import {Value, Prencentage} from '../../constants/FixedValues';
import Alignment from '../../constants/Alignment';
import {Fonts} from '../../constants/Constants';

export default {
  radioBtn: {
    flex: Value.CONSTANT_VALUE_0,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    paddingVertical: Value.CONSTANT_VALUE_10,
    justifyContent: Alignment.FLEX_START,
    marginRight: Value.CONSTANT_VALUE_15,
  },
  radioImg: {
    width: Value.CONSTANT_VALUE_30,
    resizeMode: 'cover',
    height: Value.CONSTANT_VALUE_30,
  },
  radioLabel: {
    marginLeft: Value.CONSTANT_VALUE_10,
    fontSize: Value.CONSTANT_VALUE_18,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
  },
  radioContainer: {
    width: Prencentage.PRECENTAGE_100,
  },
  textArea: {
    borderWidth: Value.CONSTANT_VALUE_1,
    marginTop: Value.CONSTANT_VALUE_10,
    borderRadius: Value.CONSTANT_VALUE_10,
    padding: Value.CONSTANT_VALUE_10,
    minHeight: Value.CONSTANT_VALUE_80,
    textAlignVertical: 'top',
  },
};
