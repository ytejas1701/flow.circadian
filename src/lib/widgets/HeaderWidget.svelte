<script lang="ts">
	import { showSettingsContext } from "$lib/context/showSettings";
    let showSettings:boolean = false
    showSettingsContext.subscribe(x=>showSettings=x)
</script>

<header class="outHeaderWidget">
    <button data-selected={showSettings} data-ignore="SettingsEditorWidget" on:click={()=>showSettingsContext.update(x=>!x)}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
    </svg>
    </button>
</header>

<style>
    .outHeaderWidget{
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 60vw;
        left: 50%;
        transform: translateX(-50%);
        padding: var(--midGap);
    }

    .outHeaderWidget button {
        position: relative;
        height: fit-content;
        cursor: pointer;
    }

    .outHeaderWidget button svg {
        width: 15px;
        height: 15px;
        fill: var(--light3);
        transition:var(--basicTransition);
        pointer-events: none;
    }

    .outHeaderWidget button[data-selected="true"] svg,
    .outHeaderWidget button:hover svg, 
    .outHeaderWidget button:focus svg {

        rotate: -45deg;
        fill: var(--dark3);
    }

</style>