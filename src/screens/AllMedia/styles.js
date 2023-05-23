import {Alignment} from '../../constants';
import Colors from '../../constants/Colors';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import {dynamicSize, statusHide, width} from '../../utils/responsive';

export default {
  flex: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  androidHeaderIcons: {
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    marginTop: statusHide(105),
  },
  imageStyling: {
    resizeMode: Alignment.COVER,
  },
  galleryImgContainer: {
    flex: Value.CONSTANT_VALUE_1,
    flexWrap: 'wrap',
    flexDirection: Alignment.ROW,
    backgroundColor: 'green',
  },
  paddingView: {
    paddingHorizontal: Value.CONSTANT_VALUE_1,
    paddingVertical: Value.CONSTANT_VALUE_2,
  },
  galleryImgView: {
    width: width / Value.CONSTANT_VALUE_3 - Value.CONSTANT_VALUE_2,
    height: width / Value.CONSTANT_VALUE_3 - Value.CONSTANT_VALUE_2,
    backgroundColor: Colors.WHITE,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  month: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    marginLeft: Value.CONSTANT_VALUE_30,
    color: Colors.BLACK,
    marginTop: Value.CONSTANT_VALUE_37,
    marginBottom: Value.CONSTANT_VALUE_15,
  },
  Bottom: {
    marginBottom: Value.CONSTANT_VALUE_40,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
};
