import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "../assets/colors/colors";

interface IProps {
    message: string | undefined
}

export const Alert = (props: IProps) => {
    return (props.message) ? (
        <View style={styles.alertContainer}>
            <Text style={styles.alertText}>
                {props.message}
            </Text>
        </View>
    ) : null;
}
const styles = StyleSheet.create({
    alertContainer: {
        margin: 6
    },
    alertText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: colors.red
    }
})