import { getJavaVersion, getNodeVersion, getNpmVersion, getOperatingSystem, getProjectsInSubfolders } from "./utils.js";
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
 
    let projects : { [ key : string ] : ProjectType } = {};
    
    // Documentation projects
    const docosaurusProjects = await getProjectsInSubfolders({ 
        type : "documentation", 
        framework : "docosaurus",
        packageJsonDependancy : "@docusaurus/core"
    });
    const nextProjects = await getProjectsInSubfolders({
        type : "frontend",
        framework : "next",
        packageJsonDependancy : "next"
    });

    // Frontend projects, with duplicates from documentation and next projects
    let reactProjects = await getProjectsInSubfolders({ 
        type :"frontend",
        framework :"react",
        packageJsonDependancy : "react"
    });
    // Removing duplicates from documenation projects and next project, since they also have react as a dependancy
    for( const projectName in reactProjects ){
        if( Object.keys(docosaurusProjects).includes(projectName) || 
            Object.keys(nextProjects).includes(projectName)
        ){
            delete reactProjects[projectName];
        }
    }

    // Backend projects
    const expressProjects = await getProjectsInSubfolders({
        type : "backend",
        framework : "express",
        packageJsonDependancy : "express"
    });
    // Mobile projects
    const reactNativeProjects = await getProjectsInSubfolders({
        type : "mobile",
        framework : "react-native-expo",
        packageJsonDependancy : "react-native-expo"
    });
    const ionicProjects = await getProjectsInSubfolders({
        type : "mobile",
        framework : "ionic",
        packageJsonDependancy : "ionic"
    });

    // Printing console output for documentation projects, and adding them to the projects object
    if( Object.keys(docosaurusProjects).length > 0 ) {
        console.log("Documentations: ")   
        for ( const project in docosaurusProjects ) {
            if( project.trim() !== "" && docosaurusProjects[project] ){
                console.log(`- ${project}, using : ${docosaurusProjects[project].framework}`);
                projects[project] = docosaurusProjects[project];
            }
        }
    }

    // Printing console output for frontend projects, and adding them to the projects object
    if( Object.keys(reactProjects).length > 0 || Object.keys(nextProjects).length > 0 ) {
        console.log("Frontend projects: ") 
        for ( const project in reactProjects ) {
            if( project.trim() !== "" && reactProjects[project] && !Object.keys(docosaurusProjects).includes(project) ){
                console.log(`- ${project}, using : ${reactProjects[project].framework}`);
                projects[project] = reactProjects[project];
            }
        }
        for ( const project in nextProjects ) {
            if( project.trim() !== "" && nextProjects[project] ){
                console.log(`- ${project}, using : ${nextProjects[project].framework}`);
                projects[project] = nextProjects[project];
            }
        }
    }

    // Printing console output for backend projects, and adding them to the projects object
    if( Object.keys(expressProjects).length > 0 ) {
        console.log("Backend projects: ")   
        for ( const project in expressProjects ) {
            if( project.trim() !== "" && expressProjects[project] ){
                console.log(`- ${project}, using : ${expressProjects[project].framework}`);
                projects[project] = expressProjects[project];
            }
        }
    }
    
    // Printing console output for mobile projects, and adding them to the projects object
    if( Object.keys(reactNativeProjects).length > 0 || Object.keys(ionicProjects).length > 0 ) {
        console.log("Mobile projects: ");
        for ( const project in reactNativeProjects ) {
            if( project.trim() !== "" && reactNativeProjects[project] ){
                console.log(`- ${project}, using : ${reactNativeProjects[project].framework}`);
                projects[project] = reactNativeProjects[project];
            }
        }
        for ( const project in ionicProjects ) {
            if( project.trim() !== "" && ionicProjects[project] ){
                console.log(`- ${project}, using : ${ionicProjects[project].framework}`);
                projects[project] = ionicProjects[project];
            }
        }
    }

    return projects;
}