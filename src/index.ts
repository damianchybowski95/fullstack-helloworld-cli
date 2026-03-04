#!/usr/bin/env node

import { program } from "commander";
import { detectJavaVersion, detectNodeVersion, detectNpmVersion, detectOperatingSystem, detectProjects } from "./blocks.js";
import { input, select } from "@inquirer/prompts";
import { exec } from "node:child_process";

program
    .name('fullstack-cli')
    .description('Description: An opinionated tool to manage a fullstack project')
    .version('1.0.0');

program
    .command("interactive")
    .description("Runs terminnal in react mode, making it interactive")
    .action( async () => {
        console.log("Running in react mode...");
        console.log("This mode is not implemented yet, but it will allow you to interact with the CLI in a more user-friendly way, using prompts and interactive menus.");
    })

program
    .command('status')    
    .description('Shows the status of the project')
    .action( async () => {
        console.log("Status:");
        const platform    = detectOperatingSystem();
        const nodeVersion = detectNodeVersion();
        const npmVersion  = await detectNpmVersion();
        const javaVersion = await detectJavaVersion();
        const projects    = await detectProjects();

        if( !platform ){
            console.log("Your operating system is currenlty not supported.");
        }

        if( !nodeVersion || !npmVersion || !javaVersion ) {
            console.log("Some tools are not detected, please make sure you have node, npm and java installed.");
        }
    });

program
    .command(`status-os`)
    .description('Shows the operating system of the user')
    .action( async () => {
        const os = detectOperatingSystem();
    });

program
    .command(`status-node`)
    .description('Shows the node version of the user')
    .action( async () => {
        const nodeVersion = detectNodeVersion();
    });

program.command(`status-npm`)
    .description('Shows the npm version of the user')
    .action( async () => {
        const npmVersion = await detectNpmVersion();
    });

program.command(`status-java`)
    .description('Shows the java version of the user')
    .action( async () => {
        const javaVersion = await detectJavaVersion();
    });

program.command(`status-projects`)
    .description('Shows the projects detected in the current directory')
    .action( async () => {
        const projects = await detectProjects();
    });

program.command(`init-documentation`)
    .description(`Initialize a new documentation project`)
    .argument('[string]', 'project name')
    .argument('[string]', 'framework to use (default: docusaurus)')
    .action( async (projectNameOption, frameworkNameOption ) => {                
        
        let projectNameInput: string | null = null;
        let projectName : string = "";
        let frameworkNameInput : string = "";
        let frameworkName : string = '';

        if( !projectNameOption ) {
            projectNameInput = await input({ message: 'Enter project name' });
            if( !projectNameInput ){
                console.log("Project name is required.");
            }
        }
        
        projectName = projectNameOption ? projectNameOption : 
            projectNameInput ? projectNameInput : null;

        if( !frameworkNameOption ) {
            frameworkNameInput = await select({ message: 'Select framework', choices: ['docusaurus'] });
            if( !frameworkNameInput ){
                console.log("Framework name is required.");
            }
        }

        frameworkName = frameworkNameOption ? frameworkNameOption : 
            frameworkNameInput ? frameworkNameInput : null;


        if( projectName ) {
            console.log("Initializing documentation project with name: " + projectName);
            let command = "";            
            if( frameworkName === 'docusaurus' ) {
                command = `npx create-docusaurus@latest ${projectName} classic --typescript`;
                console.log("Running command: " + command);
            }            
            const process = exec(command);
            process.stdout?.on("data", (data)=>{
                console.log(data);
            });
            process.stderr?.on("data", (data)=>{
                console.error(data);
            });
            process.on("close", (code) => {
                if( code === 0 ) {
                    console.log("Documentation project initialized successfully.");
                } else {
                    console.error("Failed to initialize documentation project with exit code: " + code);
                }                
            });
        } 
    });

program.command(`init-frontend`)
    .description(`Initialize a new frontend project`)
    .argument('[string]', 'project name')
    .argument('[string]', 'framework to use (default: next)')
    .action( async (projectNameOption, frameworkNameOption ) => {
        let projectNameInput: string | null = null;
        let projectName : string = "";
        let frameworkNameInput : string = "";
        let frameworkName : string = '';
        
        if( !projectNameOption ) {
            projectNameInput = await input({ message: 'Enter project name' });
            if( !projectNameInput ){
                console.log("Project name is required.");
            }        
        }

        projectName = projectNameOption ? projectNameOption : 
            projectNameInput ? projectNameInput : null;

        if( !frameworkNameOption ) {
            frameworkNameInput = await select({ message: 'Select framework', choices: ['next'] });
            if( !frameworkNameInput ){
                console.log("Framework name is required.");
            }
        }

        frameworkName = frameworkNameOption ? frameworkNameOption : 
            frameworkNameInput ? frameworkNameInput : null;
        
        if( projectName ) {
            console.log("Initializing frontend project with name: " + projectName);
            let command = "";

            if( frameworkName === 'next' ) {
                command = `npx create-next-app@latest ${projectName} --typescript --react-compiler --eslint --app --turbopack --use-npm --no-tailwind --src-dir --yes`;                
            }

            console.log("Running command: " + command);
            const process = exec(command);
            process.stdout?.on("data", (data)=>{
                console.log(data);
            });
            process.stderr?.on("data", (data)=>{
                console.error(data);
            });
            process.on("close", (code) => {
                if( code === 0 ) {
                    console.log("Documentation project initialized successfully.");
                } else {
                    console.error("Failed to initialize documentation project with exit code: " + code);
                }                
            });
        }

    });

program.command(`init-backend`)
    .description(`Initialize a new backend project`)
    .argument('[string]', 'project name')
    .argument('[string]', 'framework to use')
    .action( async (projectNameOption, frameworkNameOption ) => {
        let projectNameInput: string | null = null;
        let projectName : string = "";
        let frameworkNameInput : string = "";
        let frameworkName : string = '';
        let command : string[] = new Array<string>();

        if( !projectNameOption ) {
            projectNameInput = await input({ message: 'Enter project name' });  
            if( !projectNameInput ){
                console.log("Project name is required.");
            }
        }

        projectName = projectNameOption ? projectNameOption : 
            projectNameInput ? projectNameInput : null;

        if( frameworkNameOption !== "express" ) {
            frameworkNameInput = await select({ message: 'Select framework', choices: ['express'] });
            if( !frameworkNameInput ){
                console.log("Framework name is required.");
            }
            command = [`mkdir ${projectName}`,`cd ${projectName}`,`npm install express`];
        }

        frameworkName = frameworkNameOption ? frameworkNameOption : 
            frameworkNameInput ? frameworkNameInput : null;
        
        if( projectName && frameworkName && command[0] && command[1] && command[2] ) {
            console.log("Initializing backend project with name: " + projectNameOption + " and framework: " + frameworkNameOption);
            const process = exec(command[0]);
            process.on("close", (code) => {
                if( code === 0 && command[1] ) {
                    const process1 = exec(command[1]);
                    process1.on("close", (code) => {
                        if( code === 0 && command[2] ) {
                            const process2 = exec(command[2]);
                            process2.stdout?.on("data", (data)=>{
                                console.log(data);
                            });
                            process2.stderr?.on("data", (data)=>{
                                console.error(data);
                            });
                            process2.on("close", (code) => {
                                if( code === 0 ) {
                                    console.log("Express project initialized successfully.");
                                } else {
                                    console.error("Failed to initialize documentation project with exit code: " + code);
                                }                
                            });
                        }
                    })  
                } else {
                    console.error("Failed to create a folder for a project");
                }                
            });                    
        }
        
    });

program.parse();