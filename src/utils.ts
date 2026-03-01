import { exec } from "child_process";
import type { ProjectType } from "./types.js";

export const getOperatingSystem = () : "windows" | "linux" | null => {
    return process.platform.includes("win")   ? "windows" :
           process.platform.includes("linux") ? "linux"   : null;
}

export const getNodeVersion = () : string => {
    return process.version;
}

export const getNpmVersion = async () : Promise<string | null> => {
    return new Promise((resolve, reject) => {
        exec("npm -v", (error, stdout, stderr) => {
            if (error) {
                reject(null);
            } else if (stderr) {
                reject(null);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

export const getJavaVersion = async () : Promise<string | null> => {    
    return new Promise((resolve) => {
        exec("java -version", (error, stdout, stderr) => {
            if (error) {                
                resolve(null);            
            } else if ( stderr) {
                resolve(null);
            } else {
                resolve(stdout.trim());
            }        
        });
    });    
}

export const getDocumentationProjects = async () : Promise<[{ name : string, type : ProjectType }] | []> => {
    return []
}

export const getFronendProjects = async () : Promise<[{ name : string, type : ProjectType }] | []> => {
    return []
}

export const getBackendProjects = async () : Promise<[{ name : string, type : ProjectType }] | []> => {
    return []
}

export const getMobileProjects = async () : Promise<[{ name : string, type : ProjectType }] | []> => {
    return []
}