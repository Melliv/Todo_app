import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform } from "react-native";
import { colors } from "../../assets/colors/colors";
import { StackParams } from "../../types/navigation";
import { LoginLayout } from "../../components/LoginLayout";
import { LoginInputContainer } from "../../components/LogInInputContainer";
import { Register } from "../../dto/Register";
import { ILoginInputProps } from "../../types/ILoginInputProps";
import { IdentityService } from "../../services/identity-service";
import { AppContext } from "../../context/AppContext";
import { SubmitButton } from "../../components/SubmitButton";
import { ErrorDisplay } from "../../components/ErrorDisplay";
import { IFetchResponse } from "../../types/IFetchResponse";
import { ILoginResponse } from "../../types/ILoginResponse";
import { AxiosResponse } from "axios";

type Props = NativeStackScreenProps<StackParams, 'Register'>;
const keyboardVerticalOffset = Platform.OS === 'ios' ? 70 : 0


export const RegisterScreen = ({ route, navigation }: Props) => {
    const appState = useContext(AppContext);
    const [register, setRegister] = useState(new Register());
    const [error, setError] = useState(undefined as (IFetchResponse<AxiosResponse> | undefined));
    const [alertMessage, setAlertMessage] = useState(new Register());

    const handleChange = (value: string, props: ILoginInputProps) => {
        setRegister({ ...register, [props.name]: value });
    };

    const handleValidation = () => {
        let formIsValid = true;

        setAlertMessage(new Register());

        const emailRe = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\],;:\s@"]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,})$/i;
        if (!emailRe.test(register.email)) {
            setAlertMessage(prevState => ({
                ...prevState,
                email: "Email is not valid!"
            }));
            formIsValid = false;
        }

        const passwordRe = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/i;
        if (!passwordRe.test(register.password)) {
            setAlertMessage(prevState => ({
                ...prevState,
                password: "Password requirements: Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character:"
            }));
            formIsValid = false;
        }

        if (!register.firstName) {
            setAlertMessage(prevState => ({
                ...prevState,
                firstName: "First name field cannot be empty!"
            }));
            formIsValid = false;
        }

        if (!register.lastName) {
            setAlertMessage(prevState => ({
                ...prevState,
                lastName: "Last name field cannot be empty!"
            }));
            formIsValid = false;
        }

        return formIsValid;
    }


    const signInSubmit = async () => {
        if (!handleValidation()) {
            return;
        }

        let response = await IdentityService.Register('/Account/Register', register);
        if (!response.ok) {
            setError(response);
        } else {
            navigation.navigate("Login")
        }

    }

    return (
        <LoginLayout isLogin={false}>
            <ErrorDisplay toggleOverlay={() => setError(undefined)} data={error} />

            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                <View style={styles.headerContainer}>
                    <Text style={styles.loginHeaderText}>
                        Sign Up
                    </Text>
                </View>

                <LoginInputContainer
                    handleChange={handleChange}
                    loginInputProps={{
                        headerText: "First name",
                        inputText: register.firstName,
                        name: "firstName",
                        secure: false
                    }}
                    validation={alertMessage.firstName} />

                <LoginInputContainer
                    handleChange={handleChange}
                    loginInputProps={{
                        headerText: "Last name",
                        inputText: register.lastName,
                        name: "lastName",
                        secure: false
                    }}
                    validation={alertMessage.lastName} />

                <LoginInputContainer
                    handleChange={handleChange}
                    loginInputProps={{
                        headerText: "Email",
                        inputText: register.email,
                        name: "email",
                        secure: false
                    }}
                    validation={alertMessage.email} />

                <LoginInputContainer
                    handleChange={handleChange}
                    loginInputProps={{
                        headerText: "Password",
                        inputText: register.password,
                        name: "password",
                        secure: true
                    }}
                    validation={alertMessage.password} />

            </KeyboardAvoidingView>

            <SubmitButton onPressFunction={signInSubmit} submitText={"Sign up"} iconName={null} />

            <TouchableOpacity style={styles.RegisterContainer} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.registerText}>
                    Log In
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
