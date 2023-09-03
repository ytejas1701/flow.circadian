import type { Collection, Task } from "$lib/interfaces/general";
import { writable, type Writable } from "svelte/store";

export const taskCollectionContext: Writable<Collection<Task>> = writable({})

export const addTaskToCollection = (task:Task):void=>{
    taskCollectionContext.update(x=>({
        ...x,
        [task.id]:task
    }))
}