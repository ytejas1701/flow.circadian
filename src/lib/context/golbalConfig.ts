import type { GlobalConfig } from "$lib/interfaces/general";
import { writable, type Writable } from "svelte/store";

export const globalConfigContext: Writable<GlobalConfig|null> = writable(null)
