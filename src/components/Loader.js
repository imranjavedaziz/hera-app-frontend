// Loader
import React from "react";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import { Value } from "../constants/FixedValues";
import Alignment from "../constants/Alignment";

const {width,height} = Dimensions.get('window');
const styles = {
    container: {
        position: Alignment.ABSOLUTE,
        top: (height/Value.CONSTANT_VALUE_2)-Value.CONSTANT_VALUE_35,
        left: (width/Value.CONSTANT_VALUE_2)-Value.CONSTANT_VALUE_35,
        width: Value.CONSTANT_VALUE_70,
        height: Value.CONSTANT_VALUE_70,
        alignItems: Alignment.CENTER,
        justifyContent: Alignment.CENTER,
        borderRadius: Value.CONSTANT_VALUE_35,
        backgroundColor: Colors.WHITE,
        zIndex: Value.CONSTANT_VALUE_999999
    }
}
const Loader = ()=>{
    const loaderState = useSelector(state=>state.loader);
    React.useEffect(()=>{
        console.log(loaderState);
    },[loaderState])
    if(loaderState.loading){
        return (
            <View style={styles.container}>
                <ActivityIndicator color={Colors.COLOR_A3C6C4} size='large'/>
            </View>
        );
    }
    return null;
}
export default Loader;
