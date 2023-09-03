<script lang="ts">
    export let dropColor:string
    export let updateFlowHandler:any
    export let index:number
    const currDate:number = (new Date()).getDate()
    const canToggle = index+1===currDate
    $: styleVar = `--dropColor:${dropColor};`
</script>

<button data-show-date={index>=currDate?null:index+1} on:click={canToggle?()=>updateFlowHandler(index):null} style={styleVar} class={`outDropWidget ${canToggle?"clickable":""}`}/>

<style>
    .outDropWidget{
        width: var(--boxSize);
        height: var(--boxSize);
        background-color: var(--dropColor);
        border-radius: var(--smallRadius);
        transition: var(--basicTransition);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .clickable:focus,
    .clickable:hover {
        cursor: pointer;
        box-shadow: var(--primary2) 0px 2px 8px 0px;
    }
</style>