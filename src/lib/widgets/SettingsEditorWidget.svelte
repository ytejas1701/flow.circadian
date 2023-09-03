<script lang="ts">
	import { globalConfigContext } from "$lib/context/golbalConfig";
	import { showSettingsContext } from "$lib/context/showSettings";
	import { userIdContext } from "$lib/context/userId";
	import { EditorField, VisibilityConfig, FrequencyConfig, VisibilityToggleConfig, type GlobalConfig } from "$lib/interfaces/general";
	import { outsideClickHandler } from "$lib/utils/general";
	import { updateGlobalConfig } from "$lib/utils/globalConfigFunctions";


	import EditorFieldWidget from "./EditorFieldWidget.svelte";

    let globalConfig:GlobalConfig|null = null
    let userId:string
    globalConfigContext.subscribe(x=>globalConfig=x)
    userIdContext.subscribe(x=>userId=x)

    const updateConfigHandler = async({editorField, config}:{editorField:EditorField.SHOW_DATES|EditorField.SHOW_DAYS|EditorField.SHOW_TODAY|EditorField.SHOW_WEEK, config:VisibilityConfig})=>{
		try {
			if(globalConfig===null)throw new Error("no globalConfig present")
			if(editorField===EditorField.SHOW_DATES)globalConfig.showDates= config
			if(editorField===EditorField.SHOW_DAYS)globalConfig.showDays = config
			if(editorField===EditorField.SHOW_TODAY)globalConfig.showToday= config
			if(editorField===EditorField.SHOW_WEEK)globalConfig.showWeek= config
            globalConfigContext.set(globalConfig)
			await updateGlobalConfig({userId, globalConfig})
		} catch (err:any) {
			console.error(`failed to update globalConfig : ${err.message}`)
		}
	}

    const closeWidget = (node:Node)=>{
        outsideClickHandler({node,name:"SettingsEditorWidget",action:()=>showSettingsContext.set(false)})
    }
</script>

<div use:closeWidget class="outSettingsEditorWidget">
    {#if globalConfig}
    <EditorFieldWidget editorField={EditorField.SHOW_DATES} selectedConfig={globalConfig.showDates} updateConfigHandler={updateConfigHandler}/>
    <EditorFieldWidget editorField={EditorField.SHOW_DAYS} selectedConfig={globalConfig.showDays} updateConfigHandler={updateConfigHandler}/>
    <EditorFieldWidget editorField={EditorField.SHOW_TODAY} selectedConfig={globalConfig.showToday} updateConfigHandler={updateConfigHandler}/>
    <EditorFieldWidget editorField={EditorField.SHOW_WEEK} selectedConfig={globalConfig.showWeek} updateConfigHandler={updateConfigHandler}/>
    {/if}
</div>

<style>
    .outSettingsEditorWidget{
        width: 350px;
        background-color: white;
        border-radius: var(--midRadius);
        padding: var(--midGap);
        transition: var(--basicTransition);
        height: fit-content;
    }
</style>