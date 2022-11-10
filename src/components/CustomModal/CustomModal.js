import React from "react";
import { View, Image, TouchableOpacity, Platform,Modal } from "react-native";
// import IMAGES from "../../Constants/Images";
import styles from "./styles";
// import Modal from "react-native-modal";
const CustomModel = (props) => {
  const {
    onBackButtonPress,
    onSwipeComplete,
    onBackdropPress,
    modalVisible,
    swipeDownIconCustom,
    children,
    customModelStyle,
  } = props;
  return (
    <View>
      <Modal
        propagateSwipe={true}
        onBackButtonPress={onBackButtonPress}
        onSwipeComplete={onSwipeComplete}
        // animationInTiming={400}
        // animationOutTiming={400}
        // swipeDirection="down"
        onBackdropPress={onBackdropPress}
        isVisible={modalVisible}
        style={styles.bottomModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        avoidKeyboard={Platform.OS === "ios" ? true : false}
      >
        {/* <TouchableOpacity
          activeOpacity={1}
          style={[styles.swipeDownIcon, swipeDownIconCustom]}
          onPress={onBackButtonPress}
        >
          <Image source={IMAGES.SWIPE_ICON} />
        </TouchableOpacity> */}
        <View style={[styles.modalContainer, customModelStyle]}>
          {children}
        </View>
      </Modal>
    </View>
  );
};
export default React.memo(CustomModel);
