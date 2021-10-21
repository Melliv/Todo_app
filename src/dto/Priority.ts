import { IPriority } from "../types/IPriority";

export class Priority implements IPriority {
    id: string = "00000000-0000-0000-0000-000000000000"
    appUserId: string = "00000000-0000-0000-0000-000000000000"
    priorityName: string = ""
    prioritySort: number = 0
    syncDt: string = "0001-01-01T00:00:00"
}