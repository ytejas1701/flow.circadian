<script lang="ts">
	import {type Flow, VisibilityConfig,type Task,Drop} from '$lib/interfaces/general';
	import { getCanToggle, getCurrentMonthCode, getDropColor, increaseDrop } from '$lib/utils/general';
	import TaskLabelWidget from './TaskLabelWidget.svelte';
	import DropWidget from './DropWidget.svelte';
	import { refreshFlow, updateFlow } from '$lib/utils/flowFunctions';
	import { addFlowToCollection } from '$lib/context/flowCollection';
	import { afterUpdate } from 'svelte';
	import { addRowToCollection } from '$lib/context/rowCollection';
	import { selectedTaskContext } from '$lib/context/selectedTask';
	export let flow: Flow;
	export let task: Task;
	let row: HTMLElement;
	let isSelected: boolean = false;
	selectedTaskContext.subscribe((x) => (isSelected = x === task.id));
	const updateFlowHandler = async (index: number) => {
		try {
			flow = refreshFlow({flow,index,frequency:task.config.currFrequency})
			await updateFlow({ monthCode: getCurrentMonthCode(), newFlow: flow, taskId: task.id });
			addFlowToCollection({ taskId: task.id, flow });
		} catch (err: any) {
			console.error(`failed to update flow: ${err.message}`);
		}
	};

	afterUpdate(() => {
		addRowToCollection({ taskId: task.id, row: { topDistance: row.offsetTop } });
	});
	let showDeadline:boolean
	$: showDeadline = task.config.showDeadline===VisibilityConfig.ALWAYS
	const hoverHandler = (node:Node)=>{
		node.addEventListener("mouseover",()=>{
			showDeadline = task.config.showDeadline===VisibilityConfig.ON_HOVER||task.config.showDeadline===VisibilityConfig.ALWAYS
		})
		node.addEventListener("mouseout",()=>{
			showDeadline = task.config.showDeadline===VisibilityConfig.ALWAYS
		})
	}
</script>

<div use:hoverHandler data-selected={isSelected} bind:this={row} class="outFlowContainer">
	<TaskLabelWidget {task} />
	{#each flow as drop, index}
		<DropWidget
			{index}
			{updateFlowHandler}
			dropColor={getDropColor({drop,index,frequency:task.config.currFrequency})}
		/>
	{/each}
</div>

<style>
	.outFlowContainer {
		display: flex;
		flex-direction: row;
		background-color: transparent;
		border-radius: var(--midRadius);
		transition: all 0.3s ease-out;
		padding: calc(var(--smallGap) / 2) 0;
	}
</style>
