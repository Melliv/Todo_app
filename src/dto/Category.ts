import { ICategory } from "../types/ICategory"

export class Category implements ICategory {
    id: string = "00000000-0000-0000-0000-000000000000"
    categoryName: string = ""
    taskSort: number = 0
    syncDt: string = "0001-01-01T00:00:00"
}
