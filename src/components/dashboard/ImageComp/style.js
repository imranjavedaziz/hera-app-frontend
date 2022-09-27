import Colors from '../../../constants/Colors';
import {Value} from '../../../constants/FixedValues';
import Alignment from '../../../constants/Alignment';
import {Fonts} from '../../../constants/Constants';
import {
  normalizeFont,
  scaleHeight,
  scaleWidth,
  dynamicSize,
} from '../../../utils/responsive';

export default {
  mainContainer: {
    height: 390,
    width:300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    width: 360,
    height: 463,
  },
  iconContainer: {
    flex: 0.88,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconImage:{
    marginBottom: 38
  },
  innerContainer: {
    flexDirection: 'row',
  },
  locationText: {
    fontSize: 12,
    paddingLeft: 10,
    color: 'white',
    fontWeight: '800',
  },
  codeText: {
    fontSize: 28,
    color: 'white',
  },
  donerAge: {
    fontSize: 12,
    color: 'white',
    marginTop:12,
  },
  textInnerContainer:{
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
};
