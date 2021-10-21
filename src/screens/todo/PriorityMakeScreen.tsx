import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { colors } from "../../assets/colors/colors";
import { DefaultDropdown } from "../../components/DefaultDropdown";
import { DefaultHeader } from "../../components/DefaultHeader";
import { ErrorDisplay } from "../../components/ErrorDisplay";
import { LoginInputContainer } from "../../components/LogInInputContainer";
import { NotificationDisplay } from "../../components/NotificationDisplay";
import { SubmitButton } from "../../components/SubmitButton";
import { AppContext } from "../../context/AppContext";
import { Priority } from "../../dto/Priority";
import { PriorityValidation } from "../../dto/validations/PriorityValidation";
import { keyboardVerticalOffset } from "../../helpers/Overall";
import { BaseService } from "../../services/base-service";
import { IFetchResponse } from "../../types/IFetchResponse";
import { ILoginInputProps } from "../../types/ILoginInputProps";
import { IPriority } from "../../types/IPriority";
import { StackParams } from "../../types/navigation";

type Props = NativeStackScreenProps<StackParams, 'PriorityMake'>;

export const PriorityMakeScreen = ({ route, navigation }: Props) => {
    const appState = useContext(AppContext);

    const [priority, setPriority] = useState({...new Priority(), prioritySort: 1});
    const [error, setError] = useState(undefined as (IFetchResponse<IPriority> | undefined));
    const [alertMessage, setAlertMessage] = useState(new PriorityValidation());
    const [creatDone, setCreatDone] = useState(false);

    const handleValidation = (): boolean => {
        let formIsValid = true;

        setAlertMessage(new PriorityValidation());

        if (!priority.priorityName) {
            setAlertMessage(prevState => ({
                ...prevState,
                priorityName: "Priority name field cannot be empty!"
            }));
            formIsValid = false;
        }

        if (!priority.prioritySort) {
            setAlertMessage(prevState => ({
                ...prevState,
                prioritySort: "Task sort name field cannot be empty!"
            }));
            formIsValid = false;
        }

        return formIsValid;
    }

    const submit = async () => {
        if (!handleValidation()) {
            return;
        }

        let response = await BaseService.post<IPriority>('/TodoPriorities', priority, appState.authInfo?.token);
        if (!response.ok) {
            setError(response);
        } else {
            appState.addPriority(appState, response.data!);
            setCreatDone(true);
            setPriority({...new Priority(), prioritySort: 1});
            //navigation.navigate("Todo");
        }

    }

    return (
        <View style={styles.container}>
            <ErrorDisplay toggleOverlay={() => setError(undefined)} data={error} />
            <NotificationDisplay toggleOverlay={() => setCreatDone(false)} message={"Priority added!"} visible={creatDone}/>
            <DefaultHeader navigation={navigation} headerText={"Priority"} />

            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>

                <LoginInputContainer
                    handleChange={(value: string, props: ILoginInputProps) => setPriority({ ...priority, [props.name]: value })}
                    loginInputProps={{
                        headerText: "Name",
                        inputText: priority.priorityName,
                        name: "priorityName",
                        secure: false
                    }}
                    validation={alertMessage.priorityName} />

                <DefaultDropdown
                    headerName={"Priority level"}
                    data={[1, 2, 3]}
                    selectFunction={(item: number) => setPriority({ ...priority, prioritySort: item })}
                    textSelectionFunction={(level: number) => level}
                    buttonWidth={250}
                    validation={alertMessage.prioritySort} />

            </KeyboardAvoidingView>

            <SubmitButton onPressFunction={submit} submitText={"Add Priority"} iconName={null} />

        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    headerContainer: {
        alignItems: 'center'
    },
    loginHeaderText: {
        fontFamily: 'Lato-Bold',
        fontSize: 32,
    },
    makeToDo: {
        backgroundColor: colors.lightPurple,
        height: 35,
        marginHorizontal: 50,
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    makeToDoText: {
        fontFamily: 'Lato-Bold',
        color: colors.white
    }
});
