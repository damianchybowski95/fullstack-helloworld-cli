#!/usr/bin/env node
import { program } from "commander";
import { detectJavaVersion, detectNodeVersion, detectNpmVersion, detectOperatingSystem, detectProjects } from "./blocks.js";
import { input } from "@inquirer/prompts";
import { exec } from "node:child_process";
program
    .name('fullstack-cli')
    .description('Description: An opinionated tool to manage a fullstack project')
    .version('1.0.0');
program
    .command("interactive")
    .description("Runs terminnal in react mode, making it interactive")
    .action(async () => {
    console.log("Running in react mode...");
    console.log("This mode is not implemented yet, but it will allow you to interact with the CLI in a more user-friendly way, using prompts and interactive menus.");
});
program
    .command('status')
    .description('Shows the status of the project')
    .action(async () => {
    console.log("Status:");
    const platform = detectOperatingSystem();
    const nodeVersion = detectNodeVersion();
    const npmVersion = await detectNpmVersion();
    const javaVersion = await detectJavaVersion();
    const projects = await detectProjects();
    if (!platform) {
        console.log("Your operating system is currenlty not supported.");
    }
    if (!nodeVersion || !npmVersion || !javaVersion) {
        console.log("Some tools are not detected, please make sure you have node, npm and java installed.");
    }
});
program
    .command(`status-os`)
    .description('Shows the operating system of the user')
    .action(async () => {
    const os = detectOperatingSystem();
});
program
    .command(`status-node`)
    .description('Shows the node version of the user')
    .action(async () => {
    const nodeVersion = detectNodeVersion();
});
program.command(`status-npm`)
    .description('Shows the npm version of the user')
    .action(async () => {
    const npmVersion = await detectNpmVersion();
});
program.command(`status-java`)
    .description('Shows the java version of the user')
    .action(async () => {
    const javaVersion = await detectJavaVersion();
});
program.command(`status-projects`)
    .description('Shows the projects detected in the current directory')
    .action(async () => {
    const projects = await detectProjects();
});
program.command(`init-documentation`)
    .description(`Initialize a new documentation project`)
    .argument('[string]', 'project name')
    .action(async (projectNameOption) => {
    let projectNameInput = null;
    let projectName = "";
    if (!projectNameOption) {
        projectNameInput = await input({ message: 'Enter project name' });
        if (!projectNameInput) {
            console.log("Project name is required.");
        }
    }
    projectName = projectNameOption ? projectNameOption :
        projectNameInput ? projectNameInput : null;
    if (projectName) {
        console.log("Initializing documentation project with name: " + projectName);
        const command = `npx create-docusaurus@latest ${projectName} classic --typescript`;
        console.log("Running command: " + command);
        const process = exec(command, (error, stdout, stderr) => { });
        process.stdout?.on("data", (data) => {
            console.log(data);
        });
        process.stderr?.on("data", (data) => {
            console.error(data);
        });
        process.on("close", (code) => {
            console.log(`Process exited with code ${code}`);
        });
    }
});
program.parse();
//# sourceMappingURL=index.js.map