<script lang="ts">
	import { addFlowToCollection } from "$lib/context/flowCollection";
	import { selectedMonthContext } from "$lib/context/selectedMonth";
	import { selectedTaskContext } from "$lib/context/selectedTask";
	import { addTaskToCollection } from "$lib/context/taskCollection";
	import { userIdContext } from "$lib/context/userId";
	import { Drop, type Flow, type MonthCode, type Task } from "$lib/interfaces/general";
	import { createFlow } from "$lib/utils/flowFunctions";
	import { getCurrentMonthCode, getNumberOfDaysFromMonthCode } from "$lib/utils/general";
	import { createTask } from "$lib/utils/taskFunctions";

    let monthCode:MonthCode = getCurrentMonthCode()

    selectedMonthContext.subscribe(x=>monthCode=x)
    let isLoading:boolean = false;
    let userId:string
    userIdContext.subscribe(x=>userId=x)
    const clickHandler = async (event:MouseEvent)=>{
        isLoading = true
        try {
			const newTask:Task = await createTask(userId)
			await createFlow({userId, taskId:newTask.id, monthCode})
			addFlowToCollection({flow:Array(getNumberOfDaysFromMonthCode(getCurrentMonthCode())).fill(Drop.UNMARKED), taskId:newTask.id})
			addTaskToCollection(newTask)
            selectedTaskContext.set(newTask.id)
		} catch (err:any) {
			console.error(`failed to create new task : ${err.message}`)
		}
        isLoading = false
	}
</script>

	{#if isLoading}
    {:else}
    <button style={`--rightDis:${getNumberOfDaysFromMonthCode(monthCode)*25 + 10}px`} on:click={clickHandler} class="outTaskCreatorWidget">

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
		<path
			fill-rule="evenodd"
			d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
		/>
	</svg>
    </button>
    {/if}

<style>
    .outTaskCreatorWidget {
        width: var(--boxSize);
        height: var(--boxSize);
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: -30px;
        right: var(--rightDis);
    }

    svg{
        height: 20px;
        width: 20px;
        fill: var(--light3);
        transition: var(--basicTransition);
        cursor: pointer;
    }

    .outTaskCreatorWidget:focus,
    .outTaskCreatorWidget:hover svg{
        fill: var(--dark3);
    }
</style>
