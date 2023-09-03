import { writable, type Writable } from "svelte/store";

export const userIdContext: Writable<string> = writable()
