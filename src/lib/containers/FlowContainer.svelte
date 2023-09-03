<script lang="ts">
	import { flowCollectionContext } from "$lib/context/flowCollection";
	import { selectedTaskContext } from "$lib/context/selectedTask";
	import { showSettingsContext } from "$lib/context/showSettings";
	import { taskCollectionContext } from "$lib/context/taskCollection";
	import { VisibilityToggleConfig, type Collection, type Flow, type Task, type TaskId } from "$lib/interfaces/general";
	import FlowWidget from "$lib/widgets/FlowWidget.svelte";
    
    let taskCollection:Collection<Task> = {}
    let flowCollection:Collection<Flow> = {}
    let selectedTask:TaskId|null = null
    let showSettings:boolean = false

    
    taskCollectionContext.subscribe(x=>taskCollection=x)
    flowCollectionContext.subscribe(x=>flowCollection=x)
    selectedTaskContext.subscribe(x=>selectedTask=x)
    showSettingsContext.subscribe(x=>showSettings=x)
    $:console.log(flowCollection)
</script>

<div class="outFlowContainer">
    {#each Object.entries(taskCollection) as [_,task]}
    {#if showSettings || selectedTask===task.id || task.config.showTask===VisibilityToggleConfig.SHOW}
    <FlowWidget task={task} flow={flowCollection[task.id]} />
    {/if}
    {/each}
</div>

<style>
    .outFlowContainer {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        transition:var(--basicTransition)
    }
</style>