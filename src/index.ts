#!/usr/bin/env node

import { program } from "commander";
import { getJavaVersion, getNpmVersion, getOperatingSystem } from "./utils.js";
import { detectOperatingSystem } from "./blocks.js";

program
    .name('fullstack-cli')
    .description('Description: An opinionated tool to manage a fullstack project')
    .version('1.0.0');

program
    .command('menu')    
    .description('Shows a list of available commands')
    .action( async () => {
        console.log("Available commands:");
        console.log("1. menu - Shows a list of available commands");
        console.log("2. status - Shows the status of the project");
    });

program
    .command('status')    
    .description('Shows the status of the project')
    .action( async () => {
        console.log("Status:");        
        const platform = detectOperatingSystem();
        
        const nodeVersion = process.version;
        const npmVersion = await getNpmVersion();
        const javaVersion = await getJavaVersion();

        console.log("Installed sdks: node, npm, java : ");
        console.log(`Node version: ${nodeVersion}`);
        console.log(`Npm version: ${npmVersion}`);
        console.log(`Java version: ${javaVersion}`);            

        console.log("Projects in current directory : ");
        console.log("1.1. Main, admin documentation for entire project, usig docosaur : ");
        console.log("1.2. Documentation for web frontend, usig docosaur : ");
        console.log("1.3. Documentation for web backend, usig docosaur : ");
        console.log("1.4. Documentation for mobile app, usig docosaur : ");
        console.log("2.1. Frontend project, using nextjs static export, or SSR : ");
        console.log("3.1. Backend project, using springboot, or node express : ");
        console.log("4.1. Mobile project, using expo react native : ");
    });

program
    .command(`status-os`)
    .description('Shows the operating system of the user')
    .action( async () => {
        const os = detectOperatingSystem();
    });

program.parse();