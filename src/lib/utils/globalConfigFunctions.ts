import type { GlobalConfig } from "$lib/interfaces/general";

export const getGlobalConfig = async (userId:string):Promise<GlobalConfig> => {
    const response = await fetch(
        `https://flow-be0c2-default-rtdb.firebaseio.com/${userId}/globalConfig.json`
    );
    if (!response.ok) throw new Error(`could not get globalConfig for user ${userId}`);
    return await response.json()
};

export const updateGlobalConfig = async ({userId,globalConfig}:{userId:string, globalConfig: GlobalConfig}):Promise<GlobalConfig> => {
    const response = await fetch(
        `https://flow-be0c2-default-rtdb.firebaseio.com/${userId}/globalConfig.json`,{
            method:"PUT",
            body:JSON.stringify(globalConfig)
        }
    );
    if (!response.ok) throw new Error(`could not update globalConfig for user ${userId}`);
    return await response.json()
};
