<script lang="ts">
	import { deselectTask, selectTask, selectedTaskContext } from "$lib/context/selectedTask";
	import type { Task, TaskId } from "$lib/interfaces/general";
	import { getClassFromVisibilityConfig } from "$lib/utils/general";

    export let task:Task
    
    let selectedTask:TaskId|null
    
    selectedTaskContext.subscribe(x=>selectedTask=x)

    const clickHandler = ()=>{
        if(selectedTask===task.id) deselectTask()
        else selectTask(task.id)
    }
</script>

<button data-ignore="TaskEditorWidget" on:click={clickHandler} class="outTaskLabelWidget">
    <span data-ignore="TaskEditorWidget" class={`${getClassFromVisibilityConfig(task.config.showName)}`} id="name">{task.name}</span>
    <span data-ignore="TaskEditorWidget" class={`${getClassFromVisibilityConfig(task.config.showIcon)}`} id="icon">{task.icon}</span>
</button>

<style>
    .outTaskLabelWidget {
        height: var(--boxSize);
        display: flex;
        flex-flow: row;
        align-items: center;
        gap: var(--smallGap);
        cursor: pointer;
		margin-right: var(--midGap);
    }

    .outTaskLabelWidget span {
        height: var(--boxSize);
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        color: var(--dark2);
        transition: var(--basicTransition);
        opacity: 0;
        white-space: nowrap;
    }

    .outTaskLabelWidget span#icon {
        width: var(--boxSize);
    }

    .outTaskLabelWidget:focus span#icon,
    .outTaskLabelWidget:hover span#icon{
        font-size: 20px;
    }

    span.alwaysShow,
    .outTaskLabelWidget:focus span.onHoverShow,
    .outTaskLabelWidget:hover span.onHoverShow{
        opacity: 1;
    }
</style>