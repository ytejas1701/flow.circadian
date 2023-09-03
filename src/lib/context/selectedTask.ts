import type { TaskId } from "$lib/interfaces/general";
import { writable, type Writable } from "svelte/store";

export const selectedTaskContext: Writable<TaskId|null> = writable(null)

export const selectTask = (taskId:TaskId)=>{selectedTaskContext.set(taskId)}

export const deselectTask = ()=>{selectedTaskContext.set(null)}