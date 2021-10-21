import React from "react"
import { StyleSheet, View, Dimensions, Image, ScrollView } from "react-native"
import { colors } from "../assets/colors/colors"

const height = Dimensions.get("window").height;
const GetStarted = require("../assets/images/GetStarted.png")
const WelcomeBack = require("../assets/images/WelcomeBack.png")
const Login2 = require("../assets/images/Login2.png")
const Register2 = require("../assets/images/Register2.png")

export interface IProps {
    children: Element
    isLogin: boolean
}

export const LoginLayout = (props: IProps) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.container}>
                <View style={styles.backgroundImages}>
                    <View style={styles.backgroundImage1}>
                        <Image source={(props.isLogin) ? WelcomeBack : GetStarted} />
                    </View>
                    <Image source={(props.isLogin) ? Register2 : Login2} style={styles.backgroundImage2} />
                </View>


                <View style={styles.wrapper}>
                    {props.children}
                </View>
            </View>

        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkPurple
    },
    backgroundImages: {
        height: height * 0.4,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    backgroundImage1: {
        marginLeft: 20,
        marginTop: 44,
        height: 80,
        width: 60,
    },
    backgroundImage2: {
        marginLeft: 36,
        height: 260,
        width: 330,
    },
    wrapper: {
        flexGrow: 1,
        backgroundColor: colors.white,
        marginTop: -20,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        padding: 15
    },
})