import { flowCollectionContext } from "$lib/context/flowCollection"
import { globalConfigContext } from "$lib/context/golbalConfig"
import { taskCollectionContext } from "$lib/context/taskCollection"
import { userIdContext } from "$lib/context/userId"
import { VisibilityConfig, EditorField, FrequencyConfig, VisibilityToggleConfig, ToggleConfig, type Task, type Flow } from "$lib/interfaces/general"
import { type MonthCode, type DayOfWeek, type Config, Drop } from "$lib/interfaces/general"
import { getFlowCollection } from "./flowFunctions"
import { getGlobalConfig } from "./globalConfigFunctions"
import { getTaskCollection } from "./taskFunctions"

export const getDropColor = ({drop,index,frequency}:{drop:Drop, index:number,frequency:FrequencyConfig}):string=>{
    const colors = {
        [Drop.UNMARKED]:"transparent",
        [Drop.STAGE1]:"var(--primary4)",
        [Drop.STAGE2]:"var(--primary3)",
        [Drop.STAGE3]:"var(--primary2)",
        [Drop.STAGE4]:"var(--primary1)",
        [Drop.STAGE5]:"var(--primary0)",
        [Drop.STAGE6]:"var(--primary0)",
    }
    
    const currDate:number = (new Date()).getDate()
    const offset:number = getDayOffsetFromDateAndMonthCode(currDate,getCurrentMonthCode())
    if(drop===Drop.UNMARKED){
        if(index+1>currDate)return colors[Drop.UNMARKED]
        if(index+1===currDate)return "#DDD"
        if(frequency===FrequencyConfig.DAILY)return "#CDCDCD"
        if(index+1>=currDate-offset)return "#DDD"
        return "#CDCDCD"
    }
    return colors[drop]
}

export const getCanToggle = ({index, taskConfig}:{index:number, taskConfig:Task["config"] }):boolean=>{
    const currDate = (new Date()).getDate()
    return index+1 === currDate
}

export const  getClassFromVisibilityConfig = (config:VisibilityConfig):string => {
    const classes = {
        [VisibilityConfig.ALWAYS]:"alwaysShow",
        [VisibilityConfig.ON_HOVER]:"onHoverShow",
        [VisibilityConfig.NEVER]:""
    }
    return classes[config]
}

export const generateRandomString = (length:number)=>{
    let result:string  = ""
    const characters:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    for ( let i = 0; i < length; i++ ) 
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}

export const getCurrentMonthCode = ()=>{
    const now = new Date();
    const month = now.getMonth()+1 < 10 ? `0${now.getMonth()+1}` : `${now.getMonth()+1}`
    const year = `${now.getFullYear()%100}`
    return `${month}${year}`
}

export const getNumberOfDaysFromMonthCode = (monthCode: MonthCode):number=>{
    const month = monthCode.substring(0,2)
    if(month==="02")return 28
    if((["01","03","05","07","08","10","12"]).includes(month))return 31
    return 30
}

export const getMonthAndYearFromMonthCode = (monthCode: MonthCode):{month:string,year:string}=>{
    const month = monthCode.substring(0,2)
    const year = monthCode.substring(2,4)
    const monthNames:{[month:string]:string} = {
        "01":"JAN",
        "02":"FEB",
        "03":"MAR",
        "04":"APR",
        "05":"MAY",
        "06":"JUN",
        "07":"JUL",
        "08":"AUG",
        "09":"SEP",
        "10":"OCT",
        "11":"NOV",
        "12":"DEC"
    }
    return {month:monthNames[month],year:`20${year}`}
}

export const getDayOfWeekFromDateAndMonthCode = (date:number, monthCode:MonthCode):DayOfWeek =>{
    const month = parseInt(monthCode.substring(0,2))-1
    const year = parseInt(monthCode.substring(2,4))+2000
    const dayIndex:number = (new Date(year,month,date)).getDay()
    return ["S","M","T","W","T","F","S"][dayIndex]as DayOfWeek
}

export const getDayOffsetFromDateAndMonthCode = (date:number, monthCode:MonthCode):number =>{
    const month = parseInt(monthCode.substring(0,2))-1
    const year = parseInt(monthCode.substring(2,4))+2000
    return (new Date(year,month,date)).getDay()
}

export const getLabelFromConfig = (config:Config):string=>{
    switch(config){
        case VisibilityConfig.ALWAYS: return "always"
        case VisibilityConfig.ON_HOVER: return "on hover"
        case VisibilityConfig.NEVER: return "never"
        case FrequencyConfig.DAILY: return "daily"
        case FrequencyConfig.BIWEEKLY: return "biweekly"
        case FrequencyConfig.WEEKLY: return "weekly"
        case VisibilityToggleConfig.SHOW: return "show"
        case VisibilityToggleConfig.HIDE: return "hide"
        case ToggleConfig.ON: return "on"
        case ToggleConfig.OFF: return "off"
        default: return ""
    }
}


export const getLabelFromEditorField = (editorField:EditorField):string=>{
    return ({
        [EditorField.SHOW_ICON]:"Show Icon",
        [EditorField.SHOW_NAME]:"Show Name",
        [EditorField.NEXT_FREQUENCY]:"Upcoming Frequency",
        [EditorField.SHOW_TASK]:"Show Task",
        [EditorField.SHOW_DATES]:"Show Dates",
        [EditorField.SHOW_DAYS]:"Show Days",
        [EditorField.SHOW_DEADLINE]:"Show Deadline",
        [EditorField.SHOW_WEEK]:"Show Week",
        [EditorField.SHOW_TODAY]:"Show Today",
    })[editorField]
}

export const getOptionsFromEditorField = (editorField:EditorField):Config[]=>{
    return getOptionsFromConfig(({
		[EditorField.NEXT_FREQUENCY]:FrequencyConfig,
		[EditorField.SHOW_ICON]:VisibilityConfig,
		[EditorField.SHOW_NAME]:VisibilityConfig,
		[EditorField.SHOW_TASK]:VisibilityToggleConfig,
		[EditorField.SHOW_DATES]:VisibilityConfig,
		[EditorField.SHOW_DAYS]:VisibilityConfig,
		[EditorField.SHOW_DEADLINE]:VisibilityConfig,
		[EditorField.SHOW_TODAY]:VisibilityConfig,
		[EditorField.SHOW_WEEK]:VisibilityConfig
    })[editorField])
}

export const getOptionsFromConfig = (config:any):Config[]=>{
    return Object.entries(config).map(([_,option])=>(option as Config))
}

export const outsideClickHandler = ({node,name,action}:{node:Node,name:string,action:Function})=>{
    const closeWidgetOnClick = (event: MouseEvent)=>{
        if(!node.contains(event.target as Node) && (event.target as HTMLElement).getAttribute("data-ignore")!==name){
            action()
        }
    }
    const closeWidgetOnEsc = (event:KeyboardEvent)=>{
        if(event.key === "Escape") {
            action()
        }
    }
    document.addEventListener("click",closeWidgetOnClick)
    document.addEventListener("keyup",closeWidgetOnEsc)
}

export const initialize = async ()=>{
    const userId:string = localStorage.getItem("id")??"" 
    userIdContext.set(userId)
    flowCollectionContext.set(await getFlowCollection({userId,monthCode:getCurrentMonthCode()}))
    taskCollectionContext.set(await getTaskCollection(userId))
    globalConfigContext.set(await getGlobalConfig(userId))
}

export const increaseDrop = (drop:Drop):Drop =>{
    switch(drop){
        case Drop.UNMARKED:return Drop.STAGE1
        case Drop.STAGE1:return Drop.STAGE2
        case Drop.STAGE2:return Drop.STAGE3
        case Drop.STAGE3:return Drop.STAGE4
        case Drop.STAGE4:return Drop.STAGE5
        case Drop.STAGE5:return Drop.STAGE6
        case Drop.STAGE6:return Drop.STAGE6
    }
}

export const calculateStreak = (flow:Flow):number=>{
    const currDate = (new Date()).getDate()
    let streak:number = 0
    for(let i = currDate-1;i>=0;i--){
        if(flow[i]===Drop.UNMARKED)break
        else streak++
    }
    return streak
}

export const calculateDeadline = ({flow,frequency}:{flow:Flow,frequency:FrequencyConfig}):Date=>{
    const interval = frequency===FrequencyConfig.DAILY?1:7 
    let lastIndex = 0
    for(let i = flow.length-1;i>=0;i--){
        if(flow[i]!==Drop.UNMARKED){
            lastIndex = i;
            break;
        }
    }
    let deadlineDate = new Date(2023,7,lastIndex+1)
    deadlineDate.setDate(deadlineDate.getDate()+interval)
    return deadlineDate
}

export const getDeadlineLabel = ({flow,frequency}:{flow:Flow,frequency:FrequencyConfig}):string=>{
    let deadlineDate = calculateDeadline({flow,frequency})
    const monthNumber = deadlineDate.getUTCMonth()+1
    const monthCode = monthNumber<10?`0${monthNumber}23`:`${monthNumber}23`
    let monthLabel:any = getMonthAndYearFromMonthCode(monthCode)["month"]
    monthLabel = monthLabel.toLowerCase().split("")
    monthLabel[0] = monthLabel[0].toUpperCase()
    monthLabel = monthLabel.join("")
    return `${deadlineDate.getDate()} ${monthLabel}`
}

export const getCapColor = (date:number):string=>{
    const currDate = (new Date()).getDate()
    const offset = getDayOffsetFromDateAndMonthCode(currDate,getCurrentMonthCode())
    if(date===currDate)return "var(--light3)"
    if(date>=currDate-offset && date<currDate-offset+7)return "var(--light2)"
    return "transparent"
}