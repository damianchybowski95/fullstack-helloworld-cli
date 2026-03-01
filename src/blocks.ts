import { getBackendProjects, getDocumentationProjects, getFronendProjects, getJavaVersion, getMobileProjects, getNodeVersion, getNpmVersion, getOperatingSystem } from "./utils.js";
import type { ProjectType } from "./types.js";

/**
 * Detect the operating system, and print it to the console
 * It may be useful, to change commands for managing sdks
 * @returns  "windows" | "linux" | null
 */
export const detectOperatingSystem = () : "windows" | "linux" | null => {
    console.log(`Current platform: ${process.platform}`);
    return getOperatingSystem();
}

export const detectNodeVersion = () : string | null=> {
    const nodeVersion = getNodeVersion();
    console.log(`Current node version: ${nodeVersion}`);
    return nodeVersion;
}

export const detectNpmVersion = async () : Promise<string | null> => {
    const npmVersion = await getNpmVersion();
    console.log(`Current npm version: ${npmVersion}`);
    return npmVersion;
}

export const detectJavaVersion = async () : Promise<string | null> => {
    const javaVersion = await getJavaVersion();
    console.log(`Current java version: ${javaVersion}`);
    return javaVersion;
}

export const detectProjects = async () : Promise<{[ key : string ] : ProjectType }> => {
    const documentationProjects = await getDocumentationProjects();
    const frontendProjects      = await getFronendProjects();
    const backendProjects       = await getBackendProjects();
    const mobileProjects        = await getMobileProjects();

    if( documentationProjects.length === 0 && frontendProjects.length === 0 && backendProjects.length === 0 && mobileProjects.length === 0 ) {
        console.log("No projects detected in current directory.");
        return {};
    }

    console.log(`Projects detected in current directory : `);
    let projects : { [ key : string ] : ProjectType } = {};    
        
    if (documentationProjects.length > 0) {
        console.log("Documentations: ")
        documentationProjects.forEach( (projectName) => {
            console.log(`- ${projectName.name}, using : ${projectName.type.framework}`);
        });
        documentationProjects.forEach( (projectName) => {
            if( projectName.name && projectName.name.trim() !== "" ) projects[projectName.name] = { type : "documentation" };
        });
    }        
        
    if (frontendProjects.length > 0) {
        console.log("Frontend projects: ");
        frontendProjects.forEach( (projectName) => {
            console.log(`- ${projectName.name}, using : ${projectName.type.framework}`);
        });
        frontendProjects.forEach( (projectName) => {
            if( projectName.name && projectName.name.trim() !== "" ) projects[projectName.name] = { type : "frontend" };
        });
    }
        
    if (backendProjects.length > 0) {
        console.log("Backend projects : ");
        backendProjects.forEach( (projectName) => {
            console.log(`- ${projectName.name}, using : ${projectName.type.framework}`);
        });
        backendProjects.forEach( (projectName) => {
            if( projectName.name && projectName.name.trim() !== "" ) projects[projectName.name] = { type : "backend" };
        });
    }

    console.log("Mobile projects : ");
    if (mobileProjects.length > 0) {
        mobileProjects.forEach( (projectName) => {
            console.log(`- ${projectName.name}, using : ${projectName.type.framework}`);
        });
        mobileProjects.forEach( (projectName) => {
            if( projectName.name && projectName.name.trim() !== "" ) projects[projectName.name] = { type : "mobile" };
        });
    }

    return projects;
}