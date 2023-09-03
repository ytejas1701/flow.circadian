import type { GlobalConfig } from "$lib/interfaces/general";

export const getGlobalConfig = async ():Promise<GlobalConfig> => {
    const response = await fetch(
        `https://flow-be0c2-default-rtdb.firebaseio.com/LsOIdmuPBmZI1R5Kxhggvsl1G0o1/globalConfig.json`
    );
    if (!response.ok) throw new Error(`could not get globalConfig for user LsOIdmuPBmZI1R5Kxhggvsl1G0o1`);
    return await response.json()
};

export const updateGlobalConfig = async (globalConfig: GlobalConfig):Promise<GlobalConfig> => {
    const response = await fetch(
        `https://flow-be0c2-default-rtdb.firebaseio.com/LsOIdmuPBmZI1R5Kxhggvsl1G0o1/globalConfig.json`,{
            method:"PUT",
            body:JSON.stringify(globalConfig)
        }
    );
    if (!response.ok) throw new Error(`could not update globalConfig for user LsOIdmuPBmZI1R5Kxhggvsl1G0o1`);
    return await response.json()
};
