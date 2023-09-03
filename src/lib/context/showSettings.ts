import { writable, type Writable } from "svelte/store";

export const showSettingsContext: Writable<boolean> = writable(false)
