// VideoUpload
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import videoPicker from "../utils/videoPicker";

const VideoUpload = ()=>{
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={videoPicker}>
                <Text>Choose Video</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
    }
})
export default VideoUpload;
