import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { colors } from "../../assets/colors/colors";
import { AppContext } from "../../context/AppContext";
import { StackParams } from "../../types/navigation";
import { DefaultHeader } from "../../components/DefaultHeader";
import { SubmitButton } from "../../components/SubmitButton";

type Props = NativeStackScreenProps<StackParams, 'Login'>;
MaterialCommunityIcons.loadFont();
Entypo.loadFont();

const profile = require("../../assets/images/profile.jpg")

export const SettingsMainScreen = ({ route, navigation }: Props) => {

    const appState = useContext(AppContext);

    const logOut = () => {
        appState.clearAuthInfo(appState);
        navigation.navigate("Login")
    }

    return (
        <View>
            <DefaultHeader navigation={navigation} headerText={"Settings"}/>

            <View style={styles.profileContainer}>
                <Image source={profile} style={styles.profileImage} />
            </View>
            

            <View style={styles.subContainer}>
                <Text style={styles.text}>
                    Name: {appState.authInfo?.firstName} {appState.authInfo?.lastName}
                </Text>


            </View>

            <SubmitButton onPressFunction={logOut} submitText={"Log out"} iconName={"logout"}/>

        </View>
    );
};
const styles = StyleSheet.create({
    text: {
        fontFamily: "Lato-Regular",
        fontSize: 16
    },
    subContainer: {
        backgroundColor: colors.gray,
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    logOutContainer: {
        backgroundColor: colors.darkGray,
        margin: 10,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    logOutText: {
        fontFamily: "Lato-Bold",
        color: colors.white,
        fontSize: 20,
        marginLeft: 5
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.lightPurple,
    },
    profileContainer: {
        marginTop: 10,
        alignItems: 'center',
    }
})