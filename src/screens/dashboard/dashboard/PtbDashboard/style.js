
import Alignment from '../../../../constants/Alignment';
import {
  dynamicSize,
} from '../../../../utils/responsive';
import { Value } from '../../../../constants/FixedValues';
import Colors from '../../../../constants/Colors';

export default {
  mainContainer: {
    flex:dynamicSize(Value.CONSTANT_VALUE_1),
  },
  innerContainer:{
    flexDirection: Alignment.ROW,
    justifyContent:'center'
  },
  overlayLabel: {
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  iconContainer: {
    flex: 0.88,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
};
