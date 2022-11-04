import Alignment from '../../../../../constants/Alignment';
import {dynamicSize, normalizeFont} from '../../../../../utils/responsive';
import {Fonts} from '../../../../../constants/Constants';
import Colors from '../../../../../constants/Colors';

export default {
  mainContainer: {
    justifyContent: Alignment.SPACE_BETWEEN,
    alignItems: Alignment.CENTER,
    flexDirection: Alignment.ROW,
  },
  Image: {
    height: dynamicSize(86.8),
    width: dynamicSize(86.8),
    borderRadius: dynamicSize(90),
  },
  row: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
  },
  locationText: {
    fontSize: normalizeFont(16),
    marginLeft: 5,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
  },
  codeText: {
    fontSize: normalizeFont(32),
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  typeText: {
    fontSize: normalizeFont(20),
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
  },
};
