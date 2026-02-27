import { Box, Newline, render, Text } from "ink";
import { checkIfFolderIs, listFolders, projectTypes, returnSdkVersion, type ProjectTypes } from "./utils.js";
import { select, Separator } from "@inquirer/prompts";
import { exec } from "child_process";

export const EkranStartowy = () => (
  <Box padding={1} marginY={1} borderStyle={'round'} alignItems="center">    
    <Text color={'green'}>Hello from <Text color={"red"}>fullstack-cli! </Text></Text>
    <Text color={'green'}>An opinionated tool to manage a fullstack project</Text>      
  </Box>
);

export const menu = async () => {
  const answer = await select({
    message: 'Select command',
    choices: [
      {
        name : "1. Select project",
        value : "1. Select project",
        description: 'Menu, available under command : npx fullstack-cli menu',
      },      
      {
        name: '2. SDKs', 
        value: '2. SDKs',
        description: "Shows SDKs installed, available under command : npx fullstack-cli sdks"
      },
      {
        name : "2.1. Update node",
        value : "2.1. Update node",
        description : "Updates node using chocolatey",
        disabled : "( not implemented )"
      },
      {
        name: '2.2. Update npm',
        value : '2.2. Update npm',
        description : "Updates npm",
        disabled : "( not implemented )"
      },
      {
        name: '2.3. Update java',
        value : '2.3. Update java',
        description : "Updates java sdk",
        disabled : "( not implemented )"
      },
      {
        name: '3. Projects',
        value: '3. Projects',
        description : "Shows current state of projects, available under command : npx fullstack-cli projects",        
      },
      {
        name: '3.1. Init NextJS static website',
        value: '3.1. Init NextJS static website',
        description: "Inits a project, available under command : npx fullstack-cli init-nextjs-static",
        disabled : "(not implemented)"
      },
      {
        name: '3.2. Init NextJS SSR website',
        value : '3.2. Init NextJS SSR website',
        description : "Inits a NextJs SSR website, available under command: npx fullstack-cli init-nextjs-ssr",
        disabled : "(not implemented)"
      },
      {
        name: '3.3. Init documentation', 
        value: '3.3. Init documentation',
        description : "Inits docosaurus documentation, available under command : npx fullstack-cli init-documentation",
        disabled : "(not implemented)"
      },
      {
        name: '3.4. Init CMS',
        value : '3.4. Init CMS',
        description : "Inits cms, available under command : npx fullstack-cli init-cms",
        disabled : "(not implemented)"
      },
      {
        name: '3.5. Init admin panel - ', 
        value : '3.5. init admin panel',
        description : "Inits admin panel, available under command : npx fullstack-cli init-admin-panel",
        disabled : "(not implemented)"
      },
      {
        name: '3.6. Init java spring backend - ', 
        value : '3.6. Init java spring backend',
        description : "Inits java script backend, available under command : npx fullstack-cli init-spring",
        disabled : "(not implemented)"
      },
      {
        name: '3.7. Init expo mobile app', 
        value : '3.7. Init expo mobile app',
        description : "Inits expo mobile project, available under command : npx fullstack-cli init-expo-mobile",
        disabled : "(not implemented)"
      },
      {
        name: '4. Manage projects', 
        value: '4. Manage projects',
        description : "Show properties of each projects, available under command : npx fullstack-cli manage",
        disabled : "(not implemented)"
      },
      {
        name : "4.x. Sign mobile apk",
        value : "4.x. Sign mobile apk",
        description : "Signs mobile apk, available under command : npx fullstack-cli manage-signapk",
        disabled : "(not implemented)"
      },
      {
        name: '5. Run projects', value: '5. Run projects',
        description : "runs projects, available under command run-projects",
        disabled : "(not implemented)"
      },
      {
        name: '5.1. Run dev version', value: '5.1. Run dev versions',
        description : "runs projects,",
        disabled : "(not implemented)"
      },
      {
        name: '5.2. Build production project', value: '5.2. Build production project',
        description : "runs projects,",
        disabled : "(not implemented)"
      },
      {
        name: '5.3. Start build production project', value: '5.3. Start build production project',
        description : "runs projects,",
        disabled : "(not implemented)"
      },
      {
        name: '5.4. Start-build production project', value: '5.4. Start-build production project',
        description : "Builds and runs a current production version of a project,",
        disabled : "(not implemented)"
      },
      {
        name: '5.5. Run tests', value: '5.5. Run tests',
        description : "runs projects,",
        disabled : "(not implemented)"
      },
    ],
  });

  if( answer === "1. Select project"){
    console.clear();
    await menu();
  } else if ( answer === "2. SDKs" ) {
    render(<ZainstalowaneSDK/>);
  } else if ( answer === "3. Projects" ){
    render(<ProjektyObecnegoFolderu/>)
  }
  
  return answer;
};

export const ZainstalowaneSDK = () => {
    const zainstalowaneSdk = returnSdkVersion();
    return <Box padding={1} marginY={1} borderStyle={'round'}>
    <Text>
        <Text>Sdk state: </Text>
        <Newline/>
        <Text>Operating system : { zainstalowaneSdk.platform }</Text>      
        <Newline/>
        <Text>nodeVersion : { zainstalowaneSdk.nodeVersion }</Text>
        <Newline/>
        <Text>npmVersion : { zainstalowaneSdk.npmVersion }</Text>
        <Newline/>
        <Text>java jdk : { zainstalowaneSdk.javaVersion }</Text>
    </Text>
    </Box>
}

export const ProjektyObecnegoFolderu = () => {

    const currentDir = process.cwd();
    const currentFolders = listFolders();
    /**
     * Used to make sure line of code is only printed once.
     */
    let printedText = false;
    
    return <Box padding={1} marginY={1} borderStyle={'round'} flexDirection="column">
        <Text>
            <Text>Projects in current directory: </Text>
            <Newline/>
            <Text>Directory {currentDir}</Text>
            <Newline/>
            <Text>Folders in current directory : {currentFolders ? currentFolders.join(', ') : " "}</Text>
            <Newline/>
            <Text>Current projects: </Text>
          </Text>
          <Box padding={1} marginY={1} borderStyle={'round'} flexDirection="column">
          { Object.keys(projectTypes).map(( type, typeIdx )=> {
            printedText = false;
            return <Text>
              <Text color={"green"}>{type} : </Text>
              { currentFolders && currentFolders.map(( folder, folderIdx )=>{
                if( checkIfFolderIs( folder, type as keyof ProjectTypes ) ) { 
                  printedText = true;
                  return <Text>{folder} </Text>
                }
                if ( !printedText ) { 
                  printedText = true;
                  return <Text> Project not initialized or found</Text>
                }
                else return <Text></Text>
              })}                
              <Newline/>
            </Text>
          })}
          </Box>
        
    </Box>
}
