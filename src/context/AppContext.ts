import React from "react";
import { Category } from "../dto/Category";
import { Priority } from "../dto/Priority";
import { ICategory } from "../types/ICategory";
import { ILoginResponse } from "../types/ILoginResponse"
import { IPriority } from "../types/IPriority";
import { IToDo } from "../types/IToDo";

export interface IAppState {
    authInfo: ILoginResponse | null;
    toDos: IToDo[];
    categories: ICategory[];
    priorities: IPriority[];
    setAuthInfo: (authInfo: ILoginResponse) => void;
    setToDos: (appState: IAppState, toDos: IToDo[]) => void;
    clearAuthInfo: (appState: IAppState) => void;
    addTodo: (appState: IAppState, toDo: IToDo) => void;
    removeTodo: (appState: IAppState, toDo: IToDo) => void;
    updateTodo: (appState: IAppState, toDo: IToDo) => void;
    addCategory: (appState: IAppState, category: ICategory) => void;
    addPriority: (appState: IAppState, priority: IPriority) => void;
    setToDosCategoriesPriorities: (appState: IAppState, toDos: IToDo[], categories: ICategory[], priorities: IPriority[]) => void;
}

export const initialAppState : IAppState = {
    authInfo: null,
    toDos: [] = [],
    categories: [] = [],
    priorities: [] = [],
    setAuthInfo: (authInfo: ILoginResponse): void => { },
    setToDos: (appState: IAppState, toDos: IToDo[]): void => {
        appState.toDos = toDos;
    },
    clearAuthInfo: (appState: IAppState): void => {
        appState.authInfo = null;
    },
    addTodo: (appState: IAppState, toDo: IToDo): void => { },
    updateTodo: (appState: IAppState, toDo: IToDo): void => { },
    removeTodo: (appState: IAppState, toDo: IToDo): void => { },
    addCategory: (appState: IAppState, category: ICategory): void => { },
    addPriority: (appState: IAppState, priority: IPriority): void => { },
    setToDosCategoriesPriorities: (appState: IAppState, toDos: IToDo[], categories: ICategory[], priorities: IPriority[]): void => {
        appState.toDos = toDos;

        let category = new Category();
        category.categoryName = "All";
        appState.categories = [category, ...categories];

        let priority = new Priority();
        priority.priorityName = "All";
        appState.priorities = [priority, ...priorities];
    }
}

export const AppContext = React.createContext<IAppState>(initialAppState);
export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;
