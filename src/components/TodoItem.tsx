import React, { useContext } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../assets/colors/colors";
import { AppContext } from "../context/AppContext";
import { BaseService } from "../services/base-service";
import { IToDo } from "../types/IToDo";

export interface IProps {
    item: IToDo
}

export const TodoItem = (props: IProps) => {
    const appState = useContext(AppContext);

    const press = async () => {
        props.item.isCompleted = !props.item.isCompleted;

        let response = await BaseService.put<IToDo>('/TodoTasks/' + props.item.id, props.item, appState.authInfo?.token);
        if (!response.ok) {
            console.log("error :(");
        } else {
            appState.updateTodo(appState, props.item)
        }
    }

    const longPress = async () => {
        let response = await BaseService.delete<IToDo>('/TodoTasks/' + props.item.id, appState.authInfo?.token);
        if (!response.ok) {
            console.log("error :(");
        } else {
            appState.removeTodo(appState, props.item)
        }
    }

    return (
        <TouchableOpacity onPress={press} onLongPress={longPress} >
            <View style={[styles.container, (props.item.isCompleted) ? { backgroundColor: colors.orange } : null]}>

                <Text style={[styles.messageText, (props.item.isCompleted) ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid' } : null]}>
                    {props.item.taskName}
                </Text>

            </View >
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.gray,
        borderRadius: 15,
        margin: 10,
        padding: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    },
    messageText: {
        fontFamily: 'Lato-Bold',
        fontSize: 14
    }
});
