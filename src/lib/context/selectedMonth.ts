import type { Collection, Flow, MonthCode, TaskId } from "$lib/interfaces/general";
import { getCurrentMonthCode } from "$lib/utils/general";
import { writable, type Writable } from "svelte/store";

export const selectedMonthContext: Writable<MonthCode> = writable(getCurrentMonthCode())
