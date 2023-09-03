import type { Collection, Row, TaskId } from "$lib/interfaces/general";
import { writable, type Writable } from "svelte/store";

export const rowCollectionContext: Writable<Collection<Row>> = writable({})

export const addRowToCollection = ({taskId, row}:{taskId:TaskId,row:Row}):void=>{
    rowCollectionContext.update(x=>({
        ...x,
        [taskId]:row
    }))
}