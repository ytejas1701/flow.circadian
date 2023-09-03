export type Flow = Drop[]

export type TaskId = string

export type MonthCode = string

export type DayOfWeek = "M"|"T"|"W"|"F"|"S"

export type Config = VisibilityConfig | FrequencyConfig | VisibilityToggleConfig | ToggleConfig

export enum VisibilityConfig {
    ALWAYS="always",
    ON_HOVER="onHover",
    NEVER="never"
}

export enum FrequencyConfig {
    DAILY="daily",
    BIWEEKLY="biweekly",
    WEEKLY="weekly"
}

export enum VisibilityToggleConfig {
    SHOW="show",
    HIDE="hide",
}

export enum ToggleConfig {
    ON="on",
    OFF="off"
}

export enum EditorField {
    SHOW_ICON="showIcon",
    SHOW_NAME="showName",
    NEXT_FREQUENCY="nextFrequency",
    SHOW_TASK="showTask",
    SHOW_DATES="showDates",
    SHOW_DAYS="showDays",
    SHOW_DEADLINE="showDeadline",
    SHOW_WEEK="showWeek",
    SHOW_TODAY="showToday"
}

export enum Drop {
    UNMARKED = "0",
    STAGE1 = "1",
    STAGE2 = "2",
    STAGE3 = "3",
    STAGE4 = "4",
    STAGE5 = "5",
    STAGE6 = "6"
 }

export interface Day {
    dayOfMonth:number,
    dayOfWeek : DayOfWeek
}

export interface Task {
    id:TaskId
    icon:string,
    name:string,
    description:string,
    config:{
        showTask:VisibilityToggleConfig,
        showIcon:VisibilityConfig,
        showName:VisibilityConfig,
        currFrequency:FrequencyConfig,
        nextFrequency:FrequencyConfig,
        showDeadline:VisibilityConfig
    }
}

export interface Row {
    topDistance:number
}

export interface EditorFieldOption {
    value:string,
    label:string
}

export interface GlobalConfig {
    showDays: VisibilityConfig,
    showDates: VisibilityConfig,
    showToday: VisibilityConfig,
    showWeek: VisibilityConfig
}

export interface Collection<T> {
    [id:TaskId]:T
}

