import type { Collection, Flow, TaskId } from "$lib/interfaces/general";
import { writable, type Writable } from "svelte/store";

export const flowCollectionContext: Writable<Collection<Flow>> = writable({})

export const addFlowToCollection = ({taskId, flow}:{taskId:TaskId,flow:Flow}):void=>{
    flowCollectionContext.update(x=>({
        ...x,
        [taskId]:flow
    }))
}