import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Alert } from "./Alert";

interface IProps {
    headerName: string
    data: any[]
    selectFunction: Function
    textSelectionFunction: Function
    buttonWidth: number | undefined
    validation: string | undefined
}


export const DefaultDropdown = (props: IProps) => {

    return (
        <View style={styles.filterSortItem}>
            <Text style={styles.filterSortText}>
                {props.headerName}
            </Text>
            <SelectDropdown
                data={props.data}
                onSelect={(selectedItem) => {
                    props.selectFunction(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem) => props.textSelectionFunction(selectedItem)}
                rowTextForSelection={(item) => props.textSelectionFunction(item)}
                buttonStyle={[styles.select, {width: (props.buttonWidth) ? props.buttonWidth : 150}]}
                defaultValue={props.data[0]}
            />
            <Alert message={props.validation}/>

        </View>
    )
}

const styles = StyleSheet.create({
    filterSortText: {
        padding: 10,
        fontFamily: "Lato-Bold",
        fontSize: 16
    },
    filterSortItem: {
        alignItems: "center"
    },
    select: {
        marginHorizontal: 5,
        height: 40,
        borderRadius: 10
    }
})