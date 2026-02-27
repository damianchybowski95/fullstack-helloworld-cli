import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync, spawn } from 'child_process';

/**
 * Lists folders in current directory
 */
export const listFolders = () => {
    const currentDir = process.cwd();
    let folders: string[] | false = [];
    try {
    folders = fs.readdirSync(currentDir)
        .filter((file: string) => fs.statSync(path.join(currentDir, file)).isDirectory());
    } catch (err) {
        // Error reading folders
        folders = false;
    }
    return folders;
}

export type ProjectFilePattern = {
    nameOfProjectFile : string,
    keyOfProjectFile : string,
    valueOfProjectFile : string
}

export type ProjectTypes = {
    nextJsStatic  : ProjectFilePattern[],
    nextJsSsr     : ProjectFilePattern[],
    documentation : ProjectFilePattern[],
    cms           : ProjectFilePattern[],
    adminPanel    : ProjectFilePattern[],
    springBackend : ProjectFilePattern[],
    expoMobile    : ProjectFilePattern[]
};

export const projectTypes : ProjectTypes = {
    nextJsStatic : [{
        keyOfProjectFile : "",
        nameOfProjectFile : "",
        valueOfProjectFile : ""
    }],
    nextJsSsr : [{
        keyOfProjectFile : "",
        nameOfProjectFile : "",
        valueOfProjectFile : ""
    }],
    documentation : [{
        keyOfProjectFile : "",
        nameOfProjectFile : "",
        valueOfProjectFile : ""
    }],
    cms : [{
        keyOfProjectFile : "",
        nameOfProjectFile : "",
        valueOfProjectFile : ""
    }],
    adminPanel : [{
        keyOfProjectFile : "",
        nameOfProjectFile : "",
        valueOfProjectFile : ""
    }],
    springBackend : [{
        keyOfProjectFile : "",
        nameOfProjectFile : "",
        valueOfProjectFile : ""
    }],
    expoMobile : [{
        keyOfProjectFile : "",
        nameOfProjectFile : "",
        valueOfProjectFile : ""
    }]
}

export const checkIfFolderIs = (folderName: string, projectType: keyof ProjectTypes ): boolean => {
    const currentDir = process.cwd();
    const folderPath = path.join(currentDir, folderName);
    if ( !fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) return false;
    // Logika testu

    return false;
}

export const returnSdkVersion = () => {
    const platformString = os.platform().toString();
    const isWindows = platformString.includes("win");
    const isLinux = platformString.includes("linux");
    const nodeVersion = execSync(`node -v`).toString().trim();
    const npmVersion = execSync(`npm -v`).toString().trim();
    const javaRaw = execSync('java --version').toString();
    const javaVersionMatch = javaRaw.match(/\d+\.\d+\.\d+/);
    const javaVersion = javaVersionMatch ? javaVersionMatch[0] : 'Not found';
    
    return {
        platform : isWindows ? "windows" : (isLinux ? "linux" : "Error: platform is not a windows, or linux"),
        nodeVersion : nodeVersion,
        npmVersion : npmVersion,
        javaVersion : javaVersion        
    }
}

export const initNextjsStatic = ( projectName : string ) => {
    const child = spawn(
        "npx",
        [
            "create-next-app@latest",
            projectName,
        ],
        {
            stdio : "inherit",
            shell : true
        }
    );
}