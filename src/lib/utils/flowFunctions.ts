import { Drop, type Collection, type Flow,  type TaskId, FrequencyConfig } from "$lib/interfaces/general";
import { getCurrentMonthCode, getDayOffsetFromDateAndMonthCode, getNumberOfDaysFromMonthCode, increaseDrop } from "./general";

export const getFlowCollection = async ({userId,monthCode}:{userId:string, monthCode: string}):Promise<Collection<Flow>> => {
    const response = await fetch(
        `https://flow-be0c2-default-rtdb.firebaseio.com/${userId}/flow/${monthCode}.json`
    );
    if (!response.ok) throw new Error(`could not get flows for month ${monthCode}`);
    return convertResponseObject(await response.json())
};

export const convertResponseObject = (responseObject:{[id:TaskId]:string}):Collection<Flow>=>{
    let flowCollection: Collection<Flow> = {}
    Object.entries(responseObject).forEach(([id,flowString])=>{
        flowCollection[id] = [...flowString] as Flow
    })
    return flowCollection
}

export const updateFlow = async ({userId, taskId, newFlow, monthCode}:{userId:string, taskId: string, newFlow:Flow, monthCode:string}) => {
    await fetch(
        `https://flow-be0c2-default-rtdb.firebaseio.com/${userId}/flow/${monthCode}/${taskId}.json`,
        {
            method: 'PUT',
            body: JSON.stringify(newFlow.join(""))
        }
    );
};

export const createFlow = async ({userId, taskId, monthCode}:{userId:string, taskId: string, monthCode:string}) => {
    await fetch(
        `https://flow-be0c2-default-rtdb.firebaseio.com/${userId}/flow/${monthCode}/${taskId}.json`,
        {
            method: 'PUT',
            body: JSON.stringify(Drop.UNMARKED.repeat(getNumberOfDaysFromMonthCode(monthCode)))
        }
    );
};

export const setCurrentWeekFlow = ({flow,index,drop}:{flow:Flow,index:number,drop:Drop}):Flow=>{
    const offset = getDayOffsetFromDateAndMonthCode(index+1, getCurrentMonthCode())
    for(let i = Math.max(0,index-offset);i<Math.min(flow.length,index-offset+7);i++)
        flow[i] = drop
    return flow;

}

export const refreshFlow = ({flow,index,frequency}:{flow:Flow,index:number,frequency:FrequencyConfig}):Flow=>{
    switch(frequency){
        case FrequencyConfig.DAILY:{
            flow[index] = flow[index]===Drop.UNMARKED ? increaseDrop(index===0?Drop.UNMARKED:flow[index-1]) : Drop.UNMARKED
            return flow
        }case FrequencyConfig.BIWEEKLY:{
            const offset = getDayOffsetFromDateAndMonthCode(index+1,getCurrentMonthCode())
            const prevDrop:Drop = index-offset<=0?Drop.UNMARKED:flow[index-offset-1]
            let newDrop:Drop = Drop.UNMARKED
            if(flow[index]===Drop.UNMARKED)
                newDrop = increaseDrop(prevDrop)
            else if(flow[index]===increaseDrop(prevDrop))
                newDrop = increaseDrop(flow[index])
            setCurrentWeekFlow({flow,index,drop:newDrop})
            return flow
        }case FrequencyConfig.WEEKLY:{
            const offset = getDayOffsetFromDateAndMonthCode(index+1,getCurrentMonthCode())
            const newDrop:Drop = flow[index]===Drop.UNMARKED ? increaseDrop(index-offset<=0?Drop.UNMARKED:flow[index-offset-1]) : Drop.UNMARKED
            setCurrentWeekFlow({flow,index,drop:newDrop})
            return flow
        }
    }
}