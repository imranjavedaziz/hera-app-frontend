// VideoUpload
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet,SafeAreaView } from "react-native"
import videoPicker from "../utils/videoPicker";
import OtpInputs from "../components/OtpInputs";
import FloatingLabelInput from "../components/inputs/FloatingLabelInput";
import Container from '../components/Container';
import Button from "../components/Button";
import { CircleBtn } from "../components/Header";
import Images from "../constants/Images";

const VideoUpload = ()=>{
    const [email,setEmail] = React.useState('');
    const headerComp = ()=><CircleBtn icon={Images.BACK_ICON}/>
    return (
        <Container scroller={true} showHeader={true} headerComp={headerComp} headerEnd={true}>
            <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={videoPicker}>
                <Text>Choose Video</Text>
            </TouchableOpacity>
            <FloatingLabelInput
                label='Email'
                value={email}
                onChangeText={mail=>setEmail(mail)}
            />
            <OtpInputs/>
            <Button label='Custom Button->' onPress={()=>alert('hi')} style={{flex: 0,}}/>
            </View>
        </Container>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        flex: 0,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
    }
})
export default VideoUpload;
