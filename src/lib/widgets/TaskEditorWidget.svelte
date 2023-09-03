<script lang="ts">
	import { flowCollectionContext } from "$lib/context/flowCollection";
	import { deselectTask, selectedTaskContext } from "$lib/context/selectedTask";
	import { addTaskToCollection, taskCollectionContext } from "$lib/context/taskCollection";
	import { userIdContext } from "$lib/context/userId";
	import { type Collection, type Task, VisibilityConfig, EditorField, FrequencyConfig, VisibilityToggleConfig, type Config, ToggleConfig, Drop, type Flow } from "$lib/interfaces/general";
	import { getDeadlineLabel, calculateStreak, getLabelFromConfig, outsideClickHandler } from "$lib/utils/general";
	import { updateTask } from "$lib/utils/taskFunctions";
	import EditorFieldWidget from "./EditorFieldWidget.svelte";
	import TaskTagsWidget from "./TaskTagsWidget.svelte";

    let task:Task|null
    let streak:number
    let deadlineLabel:string
    let taskCollection:Collection<Task>
    let flowCollection:Collection<Flow>
    let userId:string
    userIdContext.subscribe(x=>userId=x)

    taskCollectionContext.subscribe(x=>taskCollection=x)
    flowCollectionContext.subscribe(x=>flowCollection=x)
    selectedTaskContext.subscribe(x=>{
        task=x?taskCollection[x]:null
        streak = x?calculateStreak(flowCollection[x]):0
        deadlineLabel = (x&&task)?getDeadlineLabel({flow:flowCollection[x],frequency:task.config.currFrequency}):""
    })


	const updateLabelHandler = async(event: FocusEvent | KeyboardEvent)=>{
		if(event instanceof FocusEvent && event.type!=="blur") return
		if(event instanceof KeyboardEvent && event.key!=="Enter") return
		try {
			if(task===null)throw new Error("no task selected")
			addTaskToCollection(task)
			await updateTask({userId,task})
		} catch (err:any) {
			console.error(`failed to update task = ${task?.id} : ${err.message}`)
		}
	}

    const updateConfigHandler = async({editorField, config}:{editorField:EditorField, config:Config})=>{
		try {
			if(task===null)throw new Error("no task selected")
            if(editorField===EditorField.SHOW_ICON)task.config.showIcon= config as VisibilityConfig
            else if(editorField===EditorField.SHOW_NAME)task.config.showName = config as VisibilityConfig
            else if(editorField===EditorField.NEXT_FREQUENCY)task.config.nextFrequency = config as FrequencyConfig
            else if(editorField===EditorField.SHOW_TASK)task.config.showTask = config as VisibilityToggleConfig
            else if(editorField===EditorField.SHOW_DEADLINE)task.config.showDeadline = config as VisibilityConfig
            addTaskToCollection(task)
			await updateTask({userId,task})
		} catch (err:any) {
			console.error(`failed to update task = ${task?.id} : ${err.message}`)
		}
	}

    const closeWidget = (node:Node)=>{
        outsideClickHandler({node,name:"TaskEditorWidget",action:()=>deselectTask()})
    }
</script>

<div use:closeWidget class="outTaskEditorWidget">
    {#if task}
        <TaskTagsWidget {streak} frequencyLabel={getLabelFromConfig(task.config.currFrequency)} {deadlineLabel}/>
        <div class="headingBox">
            <input id="icon" bind:value={task.icon} on:blur={updateLabelHandler} on:keyup={updateLabelHandler}/>
            <input id="name" bind:value={task.name} on:blur={updateLabelHandler} on:keyup={updateLabelHandler}/>
        </div>
        <textarea on:blur={updateLabelHandler} on:keyup={updateLabelHandler} bind:value={task.description}/> 
        <div class="editorFieldBox">
        <EditorFieldWidget editorField={EditorField.SHOW_ICON} selectedConfig={task.config.showIcon} {updateConfigHandler}/>
        <EditorFieldWidget editorField={EditorField.SHOW_NAME} selectedConfig={task.config.showName} {updateConfigHandler}/>
        <EditorFieldWidget editorField={EditorField.NEXT_FREQUENCY} selectedConfig={task.config.nextFrequency} {updateConfigHandler}/>
        <EditorFieldWidget editorField={EditorField.SHOW_DEADLINE} selectedConfig={task.config.showDeadline} {updateConfigHandler}/>
        <!-- <EditorFieldWidget editorField={EditorField.SHOW_TASK} selectedConfig={task.config.showTask} {updateConfigHandler}/> -->
    </div>
    {/if}
</div>

<style>
    .outTaskEditorWidget{
        width: 350px;
        background-color: white;
        border-radius: var(--midRadius);
        padding: var(--midGap);
        transition: var(--basicTransition);
        height: fit-content;
    }

    .headingBox {
        display: flex;
        flex-direction: row;
        gap: var(--midGap);
        margin-top: var(--midGap);
        margin-bottom: var(--midGap);
    }

    .headingBox input {
        font-size: 20px;
        color: var(--dark2);
        height: var(--boxSize);
        width: 100%;
    }

    .headingBox input#icon {
        width: var(--boxSize);
        text-align: center;
    }

    textarea {
        width: 100%;
        height: 80px;
        resize: none;
        border-radius: var(--smallRadius);
        padding: var(--smallGap);
        color: var(--dark3);
        font-size: 15px;
    }

    .editorFieldBox {
        border-top: 1px solid var(--light1);
        padding: var(--midGap);
    }
</style>