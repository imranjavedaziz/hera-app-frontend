import {Alignment} from '../../constants';
import Colors from '../../constants/Colors';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import {dynamicSize, px, statusHide, width} from '../../utils/responsive';

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
    justifyContent: Alignment.SPACE_BETWEEN,
    marginTop: Value.CONSTANT_VALUE_15,
  },
  galleryImgView: {
    width: width / Value.CONSTANT_VALUE_3 - Value.CONSTANT_VALUE_2,
    height: width / Value.CONSTANT_VALUE_3 - Value.CONSTANT_VALUE_2,
    backgroundColor: Colors.WHITE,
    marginTop: Value.CONSTANT_VALUE_3,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  month: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    marginLeft: Value.CONSTANT_VALUE_30,
    color: Colors.BLACK,
    marginTop: px(Value.CONSTANT_VALUE_29),
  },
};
