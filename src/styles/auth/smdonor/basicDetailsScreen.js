import Colors from '../../../constants/Colors';
import {Value, Prencentage} from '../../../constants/FixedValues';
import Alignment from '../../../constants/Alignment';
import {Fonts} from '../../../constants/Constants';
import { scaleWidth, normalizeFont } from '../../../utils/responsive';

export default {
  radioBtn: {
    flex: Value.CONSTANT_VALUE_0,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    paddingVertical: Value.CONSTANT_VALUE_10,
    justifyContent: Alignment.FLEX_START,
    marginRight: scaleWidth(Value.CONSTANT_VALUE_12),
  
  },
  radioImg: {
    width: scaleWidth(Value.CONSTANT_VALUE_25),
    resizeMode: 'cover',
    height: scaleWidth(Value.CONSTANT_VALUE_25),
  },
  radioLabel: {
    marginLeft: scaleWidth(Value.CONSTANT_VALUE_5),
    fontSize: normalizeFont(Value.CONSTANT_VALUE_18),
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
  },
  radioContainer: {
    flexDirection: Alignment.ROW,
    width: Prencentage.PRECENTAGE_100,
    justifyContent:Alignment.SPACE_BETWEEN
  },
  textArea: {
    borderWidth: Value.CONSTANT_VALUE_1,
    marginTop: Value.CONSTANT_VALUE_10,
    borderRadius: Value.CONSTANT_VALUE_10,
    padding: Value.CONSTANT_VALUE_10,
    minHeight: Value.CONSTANT_VALUE_80,
    textAlignVertical: 'top',
  },
  label: {
    color: Colors.LABEL_BLACK,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_14,
    width: Prencentage.PRECENTAGE_100,
    textAlign: Alignment.LEFT,
    marginBottom:10
  },
  Btn:{
    height:Value.CONSTANT_VALUE_80,
    width:Value.CONSTANT_VALUE_197,
    paddingVertical:Value.CONSTANT_VALUE_0,
    paddingHorizontal:Value.CONSTANT_VALUE_0
  }
};
