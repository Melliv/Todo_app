import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../assets/colors/colors";

MaterialCommunityIcons.loadFont();

export interface IProps {
    onPressFunction: Function,
    submitText: string,
    iconName: string | null,
}

export const SubmitButton = (props: IProps) => {

    return (
        <TouchableOpacity style={styles.submitContainer} onPress={() => props.onPressFunction()}>
            {(props.iconName != null) 
                ? <MaterialCommunityIcons name={props.iconName} size={24} color={colors.white} style={styles.icon} />
                : null}
            <Text style={styles.submitText}>
                {props.submitText}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    submitContainer: {
        backgroundColor: colors.lightPurple,
        marginHorizontal: 50,
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        padding: 8,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 10,
    },
    submitText: {
        fontFamily: 'Lato-Bold',
        color: colors.white,
        fontSize: 20,
    },
    icon: {
        paddingRight: 5
    }
});
