<script lang="ts">
	import type { MonthCode } from "$lib/interfaces/general";
	import { getMonthAndYearFromMonthCode } from "$lib/utils/general";

    export let monthCode:MonthCode

    let {month,year} = getMonthAndYearFromMonthCode(monthCode)
</script>

<div class="outMonthLabelWidget">
    <span>{month}</span>
    <span>{year}</span>
</div>

<style>
    .outMonthLabelWidget{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-right: var(--midGap);
        color: var(--dark2);
        font-size: 12.5px;
        font-weight: bold;
    }
    .outMonthLabelWidget span {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height:20px;
    }
</style>