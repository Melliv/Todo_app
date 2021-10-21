import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Overlay, Text } from 'react-native-elements';
import { SubmitButton } from "./SubmitButton";

interface IProps {
    toggleOverlay: Function,
    message: string | undefined,
    visible: boolean
}

const thumbImage = require("../assets/images/thumb.png");

export const NotificationDisplay = (props: IProps) => {
    
    return (
        <Overlay isVisible={props.visible}>
            <View style={styles.imageContainer}>
                <Image source={thumbImage} style={styles.thumbImage}/>
            </View>
            
            <Text style={styles.errorText}>
                {props.message}
            </Text>
            <SubmitButton onPressFunction={props.toggleOverlay} submitText={"OK"} iconName={null} />
        </Overlay>
    );
}

const styles = StyleSheet.create({
    errorText: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        textAlign: 'center'
    },
    imageContainer: {
        alignItems: 'center',
        padding: 10
    },
    thumbImage: {
        height: 160,
        aspectRatio: 1990 / 2400,
        borderRadius: 8,
    }
})