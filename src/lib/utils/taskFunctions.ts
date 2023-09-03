import { VisibilityConfig, type Collection, type Task, VisibilityToggleConfig, FrequencyConfig, ToggleConfig } from "$lib/interfaces/general";
import { generateRandomString } from "./general";

export const getTaskCollection = async ():Promise<Collection<Task>> => {
    const response = await fetch(
        'https://flow-be0c2-default-rtdb.firebaseio.com/LsOIdmuPBmZI1R5Kxhggvsl1G0o1/task.json'
    );
    if (!response.ok) throw new Error('could not get tasks');
    return await response.json()
}

export const updateTask = async (task:Task) => {
    await fetch(
        `https://flow-be0c2-default-rtdb.firebaseio.com/LsOIdmuPBmZI1R5Kxhggvsl1G0o1/task/${task.id}.json`,
        {
            method: 'PUT',
            body: JSON.stringify(task)
        }
    );
};

export const createTask = async ():Promise<Task> =>{
    const newTaskId:string =  generateRandomString(6)
    const newTask = {
        id:newTaskId,
        icon:"❓",
        name:"New Task",
        description:"Maintaining a flow is crucial for building habits.",
        config:{
            showIcon:VisibilityConfig.ALWAYS,
            showName:VisibilityConfig.ON_HOVER,
            showTask:VisibilityToggleConfig.SHOW,
            currFrequency:FrequencyConfig.DAILY,
            nextFrequency:FrequencyConfig.DAILY,
            showDeadline:VisibilityConfig.ALWAYS
        }
    }
    await fetch(
        `https://flow-be0c2-default-rtdb.firebaseio.com/LsOIdmuPBmZI1R5Kxhggvsl1G0o1/task/${newTaskId}.json`,
        {
            method: 'PUT',
            body: JSON.stringify(newTask)
        }
    );
    return newTask
}