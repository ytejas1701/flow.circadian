<script lang="ts">
	import '$lib/global.css';
	import FlowContainer from '$lib/containers/FlowContainer.svelte';
	import DateContainer from '$lib/containers/DateContainer.svelte';
	import TaskEditorWidget from '$lib/widgets/TaskEditorWidget.svelte';
	import { selectedTaskContext } from '$lib/context/selectedTask';
	import { rowCollectionContext } from '$lib/context/rowCollection';
	import type { Collection, Row, TaskId } from '$lib/interfaces/general';
	import TaskCreatorWidget from '$lib/widgets/TaskCreatorWidget.svelte';
	import HeaderWidget from '$lib/widgets/HeaderWidget.svelte';
	import { showSettingsContext } from '$lib/context/showSettings';
	import SettingsEditorWidget from '$lib/widgets/SettingsEditorWidget.svelte';
	import { onMount } from 'svelte';
	import { initialize } from '$lib/utils/general';
	import { userIdContext } from '$lib/context/userId';

	let selectedTask: TaskId | null = null;
	let showSettings: boolean = false
	let rowCollection: Collection<Row> = {}
	let isLoading:boolean = true
	let userId:string
    userIdContext.subscribe(x=>userId=x)
	selectedTaskContext.subscribe(x => selectedTask = x)
	rowCollectionContext.subscribe(x => rowCollection = x)
	showSettingsContext.subscribe(x => showSettings=x)
    let styleVar:string
	let mainElement:HTMLElement
	let leftDis:string
	$:leftDis = showSettings ? "370px" : selectedTask ? `100vw - ${mainElement?.offsetWidth}px - 370px` : `50vw - ${mainElement?.offsetWidth/2}px`
    $:{
        styleVar = `
            --leftDis:${leftDis};
            --topRight:${selectedTask?rowCollection[selectedTask]?.topDistance+50:200}px;
            --opacityRight:${selectedTask?"1":"0"};
			--opacityLeft:${showSettings?"1":"0"};
            `}
	onMount(async ()=>{
		try {
			await initialize()
			isLoading = false
		} catch (err:any) {
			console.error(`failed to initialize: ${err.message}`)
		}
	})

</script>

<div style={styleVar}>
	{#if isLoading}
	loading
	{:else}
	<HeaderWidget/>
	<left>
		<SettingsEditorWidget/>
	</left>
	<main bind:this={mainElement}>
		<DateContainer />
		<FlowContainer />
		<TaskCreatorWidget />
	</main>
	<right>
		<TaskEditorWidget />
	</right>
	{/if}
</div>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: var(--midGap);
		align-items: flex-end;
		position: absolute;
		top: 50px;
		left: calc(var(--leftDis));
		transition: var(--basicTransition);
	}

	right {
		position: absolute;
		right: var(--midGap);
		top: var(--topRight);
		transition: var(--basicTransition);
		opacity: var(--opacityRight);
	}

	left {
		position: absolute;
		left: var(--midGap);
		top: 50px;
		opacity: var(--opacityLeft);
		transition: var(--basicTransition);
	}
</style>
