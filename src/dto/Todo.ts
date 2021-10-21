import { IToDo } from "../types/IToDo"

export class Todo implements IToDo {
    id: string = "00000000-0000-0000-0000-000000000000"
    taskName: string = ""
    taskSort: number = 0
    createdDt: string = "0001-01-01T00:00:00"
    dueDt: string = "0001-01-01T00:00:00"
    isCompleted: boolean = false
    isArchived: boolean = false
    todoCategoryId: string | undefined = undefined
    todoPriorityId: string | undefined = undefined
    syncDt: string = "0001-01-01T00:00:00"
}
