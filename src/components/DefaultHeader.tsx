import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Entypo from "react-native-vector-icons/Entypo";
import { colors } from "../assets/colors/colors";

export interface IProps {
    navigation: any,
    headerText: string
}


export const DefaultHeader = (props: IProps) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => props.navigation.goBack()}>
                <Entypo name="chevron-left" size={32} color={colors.black} />
            </TouchableOpacity>
            <Text style={styles.headerText}>
                {props.headerText}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    backButton: {
        marginTop: 15,
        marginLeft: 10,
    },
    container: {
        flexDirection: 'row',
    },
    headerText: {
        fontFamily: "Lato-Bold",
        fontSize: 24,
        paddingRight: 85,
        textAlign: 'center',
        marginTop: 15,
        width: '100%'
    },
});
