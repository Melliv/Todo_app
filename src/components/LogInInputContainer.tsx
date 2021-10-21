import React from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { ILoginInputProps } from "../types/ILoginInputProps";
import { Alert } from "./Alert";

export interface IProps {
    loginInputProps: ILoginInputProps,
    handleChange: Function,
    validation: string,
}

export const LoginInputContainer = (props: IProps) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputHeaderText}>
                {props.loginInputProps.headerText}
            </Text>
            <TextInput
                value={props.loginInputProps.inputText}
                onChangeText={(value) => props.handleChange(value, props.loginInputProps)}
                secureTextEntry={props.loginInputProps.secure}
                style={styles.input}
            />
            <Alert message={props.validation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingHorizontal: 20,
        marginVertical: 7,
    },
    input: {
        borderBottomWidth: 1,
    },
    inputHeaderText: {
        alignContent: 'flex-start',
        fontFamily: 'Lato-Bold',
        fontSize: 14
    },
})