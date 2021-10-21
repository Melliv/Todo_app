import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { colors } from "../../assets/colors/colors";
import { DefaultHeader } from "../../components/DefaultHeader";
import { ErrorDisplay } from "../../components/ErrorDisplay";
import { LoginInputContainer } from "../../components/LogInInputContainer";
import { NotificationDisplay } from "../../components/NotificationDisplay";
import { SubmitButton } from "../../components/SubmitButton";
import { AppContext } from "../../context/AppContext";
import { Category } from "../../dto/Category";
import { keyboardVerticalOffset } from "../../helpers/Overall";
import { BaseService } from "../../services/base-service";
import { ICategory } from "../../types/ICategory";
import { IFetchResponse } from "../../types/IFetchResponse";
import { ILoginInputProps } from "../../types/ILoginInputProps";
import { StackParams } from "../../types/navigation";

type Props = NativeStackScreenProps<StackParams, 'CategoryMake'>;

export const CategoryMakeScreen = ({ route, navigation }: Props) => {

    const appState = useContext(AppContext);

    const [category, setCategory] = useState(new Category());
    const [error, setError] = useState(undefined as (IFetchResponse<ICategory> | undefined));
    const [alertMessage, setAlertMessage] = useState(new Category());
    const [creatDone, setCreatDone] = useState(false);

    const handleChange = (value: string, props: ILoginInputProps) => {
        setCategory({ ...category, [props.name]: value });
    };

    const handleValidation = (): boolean => {
        let formIsValid = true;

        setAlertMessage(new Category());

        if(!category.categoryName){
            setAlertMessage(prevState => ({
                ...prevState,
                categoryName: "Category name field cannot be empty!"
            }));
            formIsValid = false;
        }

        return formIsValid;
    }

    const submit = async () => {
        if (!handleValidation()) {
            return;
        }

        let response = await BaseService.post<ICategory>('/TodoCategories', category, appState.authInfo?.token);
        if (!response.ok) {
            setError(response);
        } else {
            appState.addCategory(appState, response.data!);
            setCreatDone(true);
            setCategory(new Category())
            //navigation.navigate("Todo");
        }

    }

    return (
        <View style={styles.container}>
            <ErrorDisplay toggleOverlay={() => setError(undefined)} data={error}/>
            <NotificationDisplay toggleOverlay={() => setCreatDone(false)} message={"Category added!"} visible={creatDone}/>
            <DefaultHeader navigation={navigation} headerText={"Category"} />

            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>

                <LoginInputContainer
                    handleChange={handleChange}
                    loginInputProps={{
                        headerText: "Name",
                        inputText: category.categoryName,
                        name: "categoryName",
                        secure: false
                    }}
                    validation={alertMessage.categoryName}/>

            </KeyboardAvoidingView>

            <SubmitButton onPressFunction={submit} submitText={"Add Category"} iconName={null} />

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
