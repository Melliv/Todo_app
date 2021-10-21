import React from "react";
import { Overlay, Text } from 'react-native-elements';
import { Todo } from "../dto/Todo";
import { IFetchResponse } from "../types/IFetchResponse";
import { SubmitButton } from "./SubmitButton";

interface IProps {
    toggleOverlay: Function,
    data: IFetchResponse<Todo> | undefined,
}

export const DeveloperErrorDisplay = (props: IProps) => {

    return (
        <Overlay isVisible={props.data != undefined}>
            <Text>
                StatusCode: {props.data?.statusCode + "\n"} 
                Message: {props.data?.messages} 
            </Text>
            <SubmitButton onPressFunction={props.toggleOverlay} submitText={"Close"} iconName={null} />
        </Overlay>
    );
}