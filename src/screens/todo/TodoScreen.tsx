import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../assets/colors/colors";
import { TodoItem } from "../../components/TodoItem";
import Entypo from 'react-native-vector-icons/Entypo';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParams } from "../../types/navigation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppContext } from "../../context/AppContext";
import { IToDo } from "../../types/IToDo";
import { BaseService } from "../../services/base-service";
import { ICategory } from "../../types/ICategory";
import { IPriority } from "../../types/IPriority";
import { DefaultDropdown } from "../../components/DefaultDropdown";
import { ErrorDisplay } from "../../components/ErrorDisplay";
import { IFetchResponse } from "../../types/IFetchResponse";

const height = Dimensions.get("window").height;
const checklist = require("../../assets/images/checklist.png")
Entypo.loadFont();
MaterialIcons.loadFont();

type Props = NativeStackScreenProps<StackParams, 'Todo'>;

export const TodoScreen = ({ route, navigation }: Props) => {

    const appState = useContext(AppContext);
    const [toDos, setToDos] = useState([] as IToDo[])
    const [category, setCategory] = useState(appState.categories[0])
    const [priority, setPriority] = useState(appState.priorities[0])
    const [error, setError] = useState(undefined as (IFetchResponse<any> | undefined));

    const [load, setLoad] = useState(true)

    const LoadInitialData = async () => {       

        let [resultToDoTasks, resultToDoCategories, resultToDoPriorities]: any = await Promise.all([
            BaseService.getAll<IToDo>('/TodoTasks', appState.authInfo?.token),
            BaseService.getAll<ICategory>('/TodoCategories', appState.authInfo?.token),
            BaseService.getAll<IPriority>('/TodoPriorities', appState.authInfo?.token)
        ])
        
        if (resultToDoTasks.ok && resultToDoTasks.data &&
            resultToDoCategories.ok && resultToDoCategories.data &&
            resultToDoPriorities.ok && resultToDoPriorities.data) {
            appState.setToDosCategoriesPriorities(appState, resultToDoTasks.data, resultToDoCategories.data, resultToDoPriorities.data)
            setToDos(appState.toDos);
            setLoad(false)
        } else {
            setError(getErrorResponse([resultToDoTasks, resultToDoCategories, resultToDoPriorities])); 
        }
    }

    const getErrorResponse = (responses: any[]): any => {
        for (let index = 0; index < responses.length; index++) {
            if (!responses[index].ok) {
                return responses[index];
            }
        }
    }

    const categorySelect = (obsCategory: ICategory): void => {
        setCategory(obsCategory);

        let newToDos = appState.toDos;
        if (obsCategory.categoryName != "All") {
            newToDos = appState.toDos.filter((toDo) => toDo.todoCategoryId === obsCategory.id)
        }

        if (priority != undefined && priority.priorityName != "All") {
            newToDos = newToDos.filter((toDo) => toDo.todoPriorityId === priority.id)
        }
        
        setToDos(newToDos);
    }

    const prioritySelect = (obsPriority: IPriority): void => {
        setPriority(obsPriority);

        let newToDos = appState.toDos;
        if (obsPriority.priorityName != "All") {
            newToDos = appState.toDos.filter((toDo) => toDo.todoPriorityId === obsPriority.id)
        }

        if (category != undefined && category.categoryName != "All") {
            newToDos = newToDos.filter((toDo) => toDo.todoCategoryId === category.id)
        }
        
        setToDos(newToDos);
    }

    const loadData = () => {
        let newToDos = appState.toDos;

        if (category != undefined && category.categoryName != "All") {
            newToDos = newToDos.filter((toDo) => toDo.todoCategoryId === category.id)
        }

        if (priority != undefined && priority.priorityName != "All") {
            newToDos = newToDos.filter((toDo) => toDo.todoPriorityId === priority.id)
        }
        
        setToDos(newToDos);
    }

    useEffect(() => {
        if (load) {
            LoadInitialData();
        } else {
            loadData();
        }
    }, [appState]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <View style={styles.container}>
            <ErrorDisplay toggleOverlay={() => setError(undefined)} data={error}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                
                <View style={styles.header}>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerText}>
                            Hi {appState.authInfo?.firstName}!
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate("Settings")}>
                        <MaterialIcons name='settings' size={32} color={colors.white} />
                    </TouchableOpacity>
                </View>

                <View style={styles.middleContainer}>
                    <View style={styles.taskTodoInformation}>
                        <Text style={styles.taskTodoInformationText}>
                            You have {"\n        "} {appState.toDos.length} {"\n    "} tasks {"\n   "} to do!
                        </Text>
                    </View>
                    <View style={styles.backgroundImages}>
                        <Image source={checklist} style={styles.backgroundImage} />
                    </View>
                </View>

                <View style={[styles.wrapper, (toDos.length <= 4) ? {height: height * 0.6} : {flex: 1}]}>
                    <View style={styles.filterSort}>

                        <DefaultDropdown
                            headerName={"Category"}
                            data={appState.categories}
                            selectFunction={categorySelect}
                            textSelectionFunction={(category: ICategory) => category.categoryName}
                            buttonWidth={undefined} 
                            validation={undefined} />

                        <DefaultDropdown
                            headerName={"Priority"}
                            data={appState.priorities}
                            selectFunction={prioritySelect}
                            textSelectionFunction={(priority: IPriority) => priority.priorityName}
                            buttonWidth={undefined} 
                            validation={undefined} />

                    </View>

                    <TouchableOpacity style={styles.addTodo} onPress={() => navigation.navigate("TodoMake")}>
                        <Entypo name="plus" size={32} color={colors.white} />
                    </TouchableOpacity>

                    {toDos.map(toDo =>
                        <TodoItem key={toDo.id} item={toDo} />
                    )}

                </View>
            </ScrollView>
            
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkPurple
    },
    header: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerText: {
        fontFamily: "Lato-Bold",
        fontSize: 24,
        color: colors.white
    },
    backgroundImages: {
        height: height * 0.32,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    backgroundImage: {
        marginLeft: -20,
    },
    wrapper: {
        backgroundColor: colors.white,
        marginTop: -20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 15,
    },
    backIcon: {
        marginRight: 15,
        alignItems: "flex-end"
    },
    headerTextContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 20
    },
    taskTodoInformation: {
        marginTop: 20,
        marginLeft: 10,
    },
    middleContainer: {
        justifyContent: "center",
        flexDirection: "row",
    },
    taskTodoInformationText: {
        fontFamily: "Lato-Bold",
        fontSize: 28,
        color: colors.white
    },
    addTodo: {
        position: 'absolute',
        right: 10,
        top: -10,
        width: 64,
        height: 64,
        backgroundColor: colors.lightPurple,
        borderRadius: 64,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    filterSort: {
        flexDirection: 'row'
    },
})
