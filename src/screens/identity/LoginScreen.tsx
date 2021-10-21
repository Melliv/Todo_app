import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView} from "react-native";
import { colors } from "../../assets/colors/colors";
import { StackParams } from "../../types/navigation";
import { LoginLayout } from "../../components/LoginLayout";
import { LoginInputContainer } from "../../components/LogInInputContainer";
import { Login } from "../../dto/Login";
import { ILoginInputProps } from "../../types/ILoginInputProps";
import { AppContext } from "../../context/AppContext";
import { IdentityService } from "../../services/identity-service";
import { SubmitButton } from "../../components/SubmitButton";
import { ErrorDisplay } from "../../components/ErrorDisplay";
import { IFetchResponse } from "../../types/IFetchResponse";
import { ILoginResponse } from "../../types/ILoginResponse";
import { keyboardVerticalOffset } from "../../helpers/Overall";
import { LoginValidation } from "../../dto/validations/loginValidation";

type Props = NativeStackScreenProps<StackParams, 'Login'>;

export const LoginScreen = ({ route, navigation }: Props) => {
    const appState = useContext(AppContext);
    const [login, setLogin] = useState(new Login());
    const [error, setError] = useState(undefined as (IFetchResponse<ILoginResponse> | undefined));
    const [alertMessage, setAlertMessage] = useState(new LoginValidation());

    const handleChange = (value: string, props: ILoginInputProps) => {
        setLogin({ ...login, [props.name]: value });
    };

    const handleValidation = (): boolean => {
        let formIsValid = true;

        setAlertMessage(new LoginValidation());

        if (!login.email) {
            setAlertMessage(prevState => ({
                ...prevState,
                email: "Email field cannot be empty!"
            }));
            formIsValid = false;
        }

        if (!login.password) {
            setAlertMessage(prevState => ({
                ...prevState,
                password: "Password field cannot be empty!"
            }));
            formIsValid = false;
        }


        return formIsValid;
    }

    const logInSubmit = async () => {
        if (!handleValidation()) {
            return;
        }

        let response = await IdentityService.Login('/Account/Login', login);
        if (!response.ok) {
            setError(response);
        } else {
            appState.setAuthInfo(response.data!);

            navigation.navigate("Todo");
        }

    }

    return (

        <LoginLayout isLogin={true}>
            <ErrorDisplay toggleOverlay={() => setError(undefined)} data={error} />

            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                <View style={styles.headerContainer}>
                    <Text style={styles.loginHeaderText}>
                        Log In
                    </Text>
                </View>
                <LoginInputContainer
                    handleChange={handleChange}
                    loginInputProps={{
                        headerText: "Email",
                        inputText: login.email,
                        name: "email",
                        secure: false,
                    }}
                    validation={alertMessage.email} />

                <LoginInputContainer
                    handleChange={handleChange}
                    loginInputProps={{
                        headerText: "Password",
                        inputText: login.password,
                        name: "password",
                        secure: true
                    }}
                    validation={alertMessage.password} />

            </KeyboardAvoidingView>

            <SubmitButton onPressFunction={logInSubmit} submitText={"Log in"} iconName={"login"} />

            <TouchableOpacity style={styles.RegisterContainer} onPress={() => navigation.navigate("Register")}>
                <Text style={styles.registerText}>
                    Create Account
                </Text>
            </TouchableOpacity>
        </LoginLayout>

    );
};

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center'
    },
    loginHeaderText: {
        fontFamily: 'Lato-Bold',
        fontSize: 32,
    },
    registerText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: colors.darkPurple
    },
    RegisterContainer: {
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 30,
    }
})

