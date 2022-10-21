
import {Value} from '../../../constants/FixedValues';
import Alignment from '../../../constants/Alignment';
import {Fonts} from '../../../constants/Constants';

import Colors from '../../../constants/Colors';



export default {
    mainContainer: {
        flex: 1,
        alignItems: Alignment.CENTER,
        justifyContent: Alignment.FLEX_START,
      },
      title: {
        textAlign: Alignment.CENTER,
        fontSize: Value.CONSTANT_VALUE_12,
        fontFamily: Fonts.OpenSansSemibold,
       
      },
      title1: {
        textAlign: Alignment.CENTER,
        fontSize: Value.CONSTANT_VALUE_23,
        fontFamily: Fonts.OpenSansBold,
        color: Colors.COLOR_535858,
       
      },
      textArea: {
        borderWidth: Value.CONSTANT_VALUE_1,
        marginTop: Value.CONSTANT_VALUE_10,
        borderRadius: Value.CONSTANT_VALUE_10,
        padding: Value.CONSTANT_VALUE_10,
        minHeight: Value.CONSTANT_VALUE_80,
        textAlignVertical: 'top',
        borderColor:Colors.COLOR_228226216
      },


}
