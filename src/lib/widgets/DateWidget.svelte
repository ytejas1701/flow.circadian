<script lang="ts">
	import { globalConfigContext } from "$lib/context/golbalConfig";
	import type { Day, GlobalConfig } from "$lib/interfaces/general";
	import { getClassFromVisibilityConfig } from "$lib/utils/general";

    let globalConfig:GlobalConfig|null = null
    globalConfigContext.subscribe(x=>globalConfig=x)
    export let day:Day
    export let isHovered:boolean = false
    export let capColor:string
    const isToday:boolean = day.dayOfMonth===(new Date()).getDate()
</script>

<div style={`--capColor:${capColor};`} class="outDateWidget">
    <div class={`capBox ${isHovered?"hovered":""} ${globalConfig?getClassFromVisibilityConfig(globalConfig.showWeek):""}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>
    </div>
    <span class={`${isHovered?"hovered":""} ${globalConfig?getClassFromVisibilityConfig(globalConfig.showDays):""}`}>{day.dayOfWeek}</span>
    <span class={`${isHovered?"hovered":""} ${globalConfig?getClassFromVisibilityConfig(globalConfig.showDates):""}`}>{day.dayOfMonth}</span>
</div>

<style>
    .outDateWidget{
        display: flex;
        flex-direction: column;
        text-align: center;
        width: var(--boxSize);
        color: var(--dark2);
        font-size: 12.5px;
        position: relative;
    }
    .outDateWidget span {
        opacity: 0;
        transition: var(--basicTransition);
        cursor: default;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .alwaysShow,
    .hovered,
    .outDateWidget:focus .onHoverShow,
    .outDateWidget:hover .onHoverShow{
        opacity: 1 !important;
    }

    .capBox {
        width: fit-content;
        position: absolute;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        transition: var(--basicTransition);
    }
    .capBox svg {
        width: 12.5px;
        height: 12.5px;
        fill: var(--capColor);
    }
</style>