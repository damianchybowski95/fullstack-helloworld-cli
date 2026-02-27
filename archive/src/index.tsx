#!/usr/bin/env node
import { Command } from 'commander';
import { render, Text } from 'ink';
import { EkranStartowy, menu, ProjektyObecnegoFolderu, ZainstalowaneSDK } from './blocks.js';
import { initNextjsStatic } from './utils.js';

// Inicjuje program
const program = new Command();

if (process.argv.length < 3) { 
  render(<EkranStartowy/>);
  await menu();
} else {

  program
    .name('fullstack-cli')
    .description('Description: An opinionated tool to manage a fullstack project')
    .version('1.0.0');

  program
    .command('menu')    
    .description('Shows a list of available commands')
    .action( async () => {
      render(<></>);
      const answer = await menu();
    });

  program
    .command("sdks")
    .description("Shows installed sdks")
    .action( async ()=>{
      render(<ZainstalowaneSDK/>);
    });

  program
    .command("sdk-node")
    .description("Allows to update nodejs")
    .action(()=>{
      console.clear();
      render(<>
        <EkranStartowy/>
        <Text color={"red"}>sdk-nodejs ( not implemented )</Text>
      </>);
    });

  program
    .command("sdk-npm")
    .description("Allows to update npm")
    .action(()=>{
      console.clear();
      render(<>
        <EkranStartowy/>
        <Text color={"red"}>npm-java ( not implemented )</Text>
      </>);   
      console.log("sdk-npm ( not implemented ) ")
    });

  program
    .command("sdk-java")
    .description("Allows to update javasdk")
    .action(()=>{
      console.clear();
      render(<>
        <EkranStartowy/>
        <Text color={"red"}>sdk-java ( not implemented )</Text>
      </>);      
    });

  program
    .command("projects")
    .description("Shows state of projects in current folder")
    .action(()=>{
      console.clear();
      render(<ProjektyObecnegoFolderu/>)
    });

  program
    .command("init-nextjs-static")
    .description("inits nextjs static website")
    .argument("<name>","The name of a project")
    .action((name, options)=>{
      initNextjsStatic(name);
      render(<></>);
    });

  program
    .command("init-nextjs-ssr")
    .description("inits nextjs website with ssr")
    .action(()=>{
      render(<></>);
    });

  program
    .command("init-documentation")
    .description("inits documentation project")
    .action(()=>{
      render(<></>);
    });

  program
    .command("init-cms")
    .description("inits content menagement system project")
    .action(()=>{
      render(<></>);
    });

  program
    .command("init-admin-panel")
    .description("inits admin panel project")
    .action(()=>{
      render(<></>);
    });

  program
    .command("init-spring")
    .description("inits spring backend project")
    .action(()=>{
      render(<></>);
    });

  program
    .command("init-expo-mobile")
    .description("Inits expo mobile project")
    .action(()=>{
      render(<></>);
    });

  program
    .command("manage")
    .description("Show properties of each projects")
    .action(()=>{
      render(<></>);
    });

  program
    .command("manage-signapk")
    .description("Signs mobile apk")
    .action(()=>{
      render(<></>);
    });

  program
    .command("run-projects")
    .description("Allows to run projects from interactive menu")
    .action(()=>{
      render(<></>);
    });

  program
    .command("run-dev")
    .description("Allows to run dev version of project")
    .action(()=>{
      render(<></>);
    });

  program
    .command("run-build")
    .description("Allows to build production version of a project")
    .action(()=>{
      render(<></>);
    });

  program
    .command("run-start")
    .description("Starts current production build of a project")
    .action(()=>{
      render(<></>);
    });

  program
    .command("run-start-build")
    .description("Builds and starts a current production build of a project")
    .action(()=>{
      render(<></>);
    });

  program
    .command("run-test")
    .description("Builds and starts a current production build of a project")
    .action(()=>{
      render(<></>);
    });

  program.parse();
}
