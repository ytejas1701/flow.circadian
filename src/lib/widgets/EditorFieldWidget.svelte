<script lang="ts">
	import {
		EditorField,
		FrequencyConfig,
		ToggleConfig,
		VisibilityConfig,
		VisibilityToggleConfig,
		type Config
	} from '$lib/interfaces/general';
	import {
		getLabelFromConfig,
		getLabelFromEditorField,
		getOptionsFromEditorField
	} from '$lib/utils/general';

	export let editorField: EditorField;
	export let selectedConfig: Config;
	export let updateConfigHandler: Function;

	let options: Config[] = getOptionsFromEditorField(editorField);
	$: index = options.indexOf(selectedConfig as never);
	$: updateConfigHandler({ editorField, config: options[index] });
</script>

<div class="outTaskEditorField">
	<div class="labelBox">
		{#if editorField === EditorField.SHOW_ICON}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
				<path
					d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z"
				/>
			</svg>
		{:else if editorField === EditorField.SHOW_NAME}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				<path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z" />
				<path
					d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z"
				/>
			</svg>
		{:else if editorField === EditorField.NEXT_FREQUENCY}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				<path
					d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
				/>
				<path
					d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
				/>
			</svg>
		{:else if editorField === EditorField.SHOW_TASK}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				<path
					d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
				/>
				<path
					d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
				/>
			</svg>
		{:else if editorField === EditorField.SHOW_DATES}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				<path d="M9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z" />
				<path
					d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2Z"
				/>
			</svg>
		{:else if editorField === EditorField.SHOW_DAYS}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				<path
					d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
				/>
			</svg>
		{:else if editorField === EditorField.SHOW_TODAY}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
			</svg>
		{:else if editorField === EditorField.SHOW_WEEK}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				<path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z"/>
				<path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z"/>
			</svg>
		{:else if editorField === EditorField.SHOW_DEADLINE}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
				<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
			</svg>
		{/if}
		{getLabelFromEditorField(editorField)}
	</div>
	<button class="valueBox">
		<button
			on:click={() => {
				index = (index + 1 + options.length) % options.length;
			}}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				<path
					d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"
				/>
			</svg>
		</button>
		{getLabelFromConfig(options[index])}
		<button
			on:click={() => {
				index = (index - 1 + options.length) % options.length;
			}}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				<path
					d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
				/>
			</svg>
		</button>
	</button>
</div>

<style>
	.outTaskEditorField {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 15px;
		padding: var(--smallGap);
		justify-content: space-between;
		border-radius: var(--smallRadius);
	}

	.labelBox {
		display: block;
		color: var(--dark2);
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--smallGap);
	}

	.labelBox svg {
		width: 15px;
		height: 15px;
		fill: var(--dark2);
	}

	.valueBox {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--smallGap);
		color: var(--light3);
		width: 100px;
		height: 20px;
		text-align: center;
		justify-content: space-between;
	}

	.valueBox svg {
		width: 12.5px;
		height: 12.5px;
		opacity: 0;
		fill: var(--light2);
	}

	.valueBox button {
		cursor: pointer;
	}

	.valueBox button:hover svg {
		fill: var(--light3);
	}

	.valueBox:focus svg,
	.outTaskEditorField:hover svg {
		opacity: 1;
	}
</style>
