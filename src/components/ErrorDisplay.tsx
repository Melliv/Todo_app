import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Overlay, Text } from 'react-native-elements';
import { colors } from "../assets/colors/colors";
import { IFetchResponse } from "../types/IFetchResponse";
import { SubmitButton } from "./SubmitButton";

interface IProps {
    toggleOverlay: Function,
    data: IFetchResponse<any> | undefined,
}

const errorImage = require("../assets/images/error.png");

export const ErrorDisplay = (props: IProps) => {

    const getErrorMessage = (statusCode: number) => {        
        if (400 <= statusCode && statusCode < 500) {
            return "There was problem with client"
        } else if (500 <= statusCode && statusCode < 600) {
            return "There was problem with server"
        } 
        return "There was some strange error"
    }
    
    return (
        <Overlay isVisible={props.data != undefined}>
            <View style={styles.imageContainer}>
                <Image source={errorImage} style={styles.errorImage}/>
            </View>
            
            <Text style={styles.errorText}>
                {(props.data != undefined) ? getErrorMessage(props.data!.statusCode) + " [" + props.data!.statusCode + "]" : null}
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
    errorImage: {
        backgroundColor: colors.gray,
        height: 150,
        aspectRatio: 579 / 481,
        borderRadius: 8,
    }
})