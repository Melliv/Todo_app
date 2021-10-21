import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../../assets/colors/colors";
import { DefaultDropdown } from "../../components/DefaultDropdown";
import { DefaultHeader } from "../../components/DefaultHeader";
import { LoginInputContainer } from "../../components/LogInInputContainer";
import { SubmitButton } from "../../components/SubmitButton";
import { AppContext } from "../../context/AppContext";
import { Todo } from "../../dto/Todo";
import { keyboardVerticalOffset } from "../../helpers/Overall";
import { BaseService } from "../../services/base-service";
import { ICategory } from "../../types/ICategory";
import { ILoginInputProps } from "../../types/ILoginInputProps";
import { IPriority } from "../../types/IPriority";
import { StackParams } from "../../types/navigation";
import { IFetchResponse } from "../../types/IFetchResponse";
import { ErrorDisplay } from "../../components/ErrorDisplay";
import { TodoValidation } from "../../dto/validations/TodoValidation";
import { NotificationDisplay } from "../../components/NotificationDisplay";

type Props = NativeStackScreenProps<StackParams, 'TodoMake'>;

export const TodoMakeScreen = ({ route, navigation }: Props) => {

    const appState = useContext(AppContext);

    const [toDo, setToDo] = useState(new Todo());
    const [error, setError] = useState(undefined as (IFetchResponse<Todo> | undefined));
    const [alertMessage, setAlertMessage] = useState(new TodoValidation());
    const [creatDone, setCreatDone] = useState(false);
    const categories = appState.categories.slice(1);
    const priorities = appState.priorities.slice(1);

    const handleValidation = (): boolean => {
        let formIsValid = true;

        setAlertMessage(new TodoValidation());

        if (!toDo.taskName) {
            setAlertMessage(prevState => ({
                ...prevState,
                taskName: "task name field cannot be empty!"
            }));
            formIsValid = false;
        }

        if (!toDo.todoCategoryId) {
            setAlertMessage(prevState => ({
                ...prevState,
                category: "Category field cannot be empty!"
            }));
            formIsValid = false;
        }

        if (!toDo.todoPriorityId) {
            setAlertMessage(prevState => ({
                ...prevState,
                priority: "Priority field cannot be empty!"
            }));
            formIsValid = false;
        }

        return formIsValid;
    }

    const makeToDo = async () => {
        if (!handleValidation()) {
            return;
        }

        let response = await BaseService.post<Todo>('/TodoTasks', toDo, appState.authInfo?.token);
        if (!response.ok) {
            setError(response);
        } else {
            appState.addTodo(appState, response.data!);
            setCreatDone(true);
            setToDo(new Todo());
            //navigation.navigate("Todo");
        }

    }

    useEffect(() => {
        if (appState.categories.length >= 2 && appState.priorities.length >= 2) {
            setToDo({...toDo, todoCategoryId: appState.categories[1].id, todoPriorityId: appState.priorities[1].id})
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <NotificationDisplay toggleOverlay={() => setCreatDone(false)} message={"Task added!"} visible={creatDone}/>
                <ErrorDisplay toggleOverlay={() => setError(undefined)} data={error} />
                {/* <DeveloperErrorDisplay toggleOverlay={toggleErrorOverlay} data={error}/> */}
                <DefaultHeader navigation={navigation} headerText={"Task"} />

                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>

                    <LoginInputContainer
                        handleChange={(value: string, props: ILoginInputProps) => setToDo({ ...toDo, [props.name]: value })}
                        loginInputProps={{
                            headerText: "Task description",
                            inputText: toDo.taskName,
                            name: "taskName",
                            secure: false
                        }}
                        validation={alertMessage.taskName} />

                    <DefaultDropdown
                        headerName={"Category"}
                        data={categories}
                        selectFunction={(item: ICategory) => setToDo({ ...toDo, todoCategoryId: item.id })}
                        textSelectionFunction={(category: ICategory) => category.categoryName}
                        buttonWidth={250}
                        validation={alertMessage.category} />

                    <DefaultDropdown
                        headerName={"Priority"}
                        data={priorities}
                        selectFunction={(item: IPriority) => setToDo({ ...toDo, todoPriorityId: item.id })}
                        textSelectionFunction={(priority: IPriority) => priority.priorityName}
                        buttonWidth={250}
                        validation={alertMessage.priority} />

                </KeyboardAvoidingView>

                <SubmitButton onPressFunction={makeToDo} submitText={"Add task"} iconName={null} />
                <SubmitButton onPressFunction={() => navigation.navigate("CategoryMake")} submitText={"Make Category"} iconName={null} />
                <SubmitButton onPressFunction={() => navigation.navigate("PriorityMake")} submitText={"Make Priority"} iconName={null} />
            </ScrollView>
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

