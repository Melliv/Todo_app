export interface IToDo {
    id: string
    taskName: string
    taskSort: number
    createdDt: string
    dueDt: string
    isCompleted: boolean
    isArchived: boolean
    todoCategoryId: string | undefined
    todoPriorityId: string | undefined
    syncDt: string
}