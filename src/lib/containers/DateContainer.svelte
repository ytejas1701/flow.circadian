<script lang="ts">
	import { globalConfigContext } from "$lib/context/golbalConfig";
	import { selectedMonthContext } from "$lib/context/selectedMonth";
	import type { Day, GlobalConfig, MonthCode } from "$lib/interfaces/general";
	import { getCapColor, getCurrentMonthCode, getDayOfWeekFromDateAndMonthCode, getDayOffsetFromDateAndMonthCode, getNumberOfDaysFromMonthCode } from "$lib/utils/general";
	import DateWidget from "$lib/widgets/DateWidget.svelte";
	import MonthLabelWidget from "$lib/widgets/MonthLabelWidget.svelte";
    let monthCode:MonthCode = getCurrentMonthCode()
    let hoveredDate:number|null = null
    let globalConfig:GlobalConfig|null = null 
    selectedMonthContext.subscribe(x=>monthCode=x)
    globalConfigContext.subscribe(x=>globalConfig=x)

    let days:Day[] = []
    $:{days = []
    for(let i:number = 1;i<=getNumberOfDaysFromMonthCode(monthCode);i++){
        days.push({dayOfMonth:i,dayOfWeek:getDayOfWeekFromDateAndMonthCode(i,monthCode)})
    }}

    let showDateOnHover = (_:Node)=>{
        document.addEventListener("mouseover",(event:MouseEvent)=>{
            let showDateAttr = ((event.target as HTMLElement).getAttribute("data-show-date") ?? null)
            if(showDateAttr)
                hoveredDate = parseInt(showDateAttr)
        })
        document.addEventListener("mouseout",(event:MouseEvent)=>{
            hoveredDate = null
        })
    }
</script>

<div use:showDateOnHover class="outDateContainer">
    <MonthLabelWidget {monthCode}/>
    {#each days as day}
        <DateWidget isHovered={hoveredDate===day.dayOfMonth} {day} capColor={getCapColor(day.dayOfMonth)}/>
    {/each}
</div>

<style>
    .outDateContainer {
        display: flex;
        flex-direction: row;
    }
</style>