#!/usr/bin/env node
import { program } from "commander";
import { detectNpmVersion, detectOperatingSystem } from "./utils.js";
console.log("Hello, World, from commander!");
program
    .name('fullstack-cli')
    .description('Description: An opinionated tool to manage a fullstack project')
    .version('1.0.0');
program
    .command('menu')
    .description('Shows a list of available commands')
    .action(async () => {
    console.log("Available commands:");
    console.log("1. menu - Shows a list of available commands");
    console.log("2. status - Shows the status of the project");
});
program
    .command('status')
    .description('Shows the status of the project')
    .action(async () => {
    console.log("Status:");
    // Detect the operating system, and print it to the console
    // It may be useful, to change commands for managing sdks
    const platform = detectOperatingSystem();
    console.log(`Installed system: windows, or linux : ${platform}`);
    const nodeVersion = process.version;
    const npmVersion = await detectNpmVersion();
    console.log("Installed sdks: node, npm, java : ");
    console.log(`Node version: ${nodeVersion}`);
    console.log(`Npm version: ${npmVersion}`);
    console.log("Projects in current directory : ");
    console.log("1.1. Documentation project, usig docosaur : ");
    console.log("1.2. Admin documenation project, using docosaur : ");
    console.log("2.1. Frontend project, using nextjs static export, or SSR : ");
    console.log("3.1. Backend project, using springboot, or node express : ");
    console.log("4.1. Mobile project, using expo react native : ");
});
program.parse();
//# sourceMappingURL=index.js.map